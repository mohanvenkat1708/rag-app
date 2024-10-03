import chromadb
import requests
from sentence_transformers import SentenceTransformer
import json

class RAGService:
    def __init__(self, ollama_url="http://localhost:11434"):
        self.chroma_client = chromadb.Client()
        self.collection = self.chroma_client.create_collection("documents")
        self.encoder = SentenceTransformer('all-MiniLM-L6-v2')
        self.ollama_url = ollama_url

    def add_documents(self, documents, source):
        embeddings = self.encoder.encode(documents).tolist()
        self.collection.add(
            embeddings=embeddings,
            documents=documents,
            metadatas=[{"source": source} for _ in documents],
            ids=[f"{source}_{i}" for i in range(len(documents))]
        )

    def query(self, query, k=3):
        query_embedding = self.encoder.encode([query]).tolist()
        results = self.collection.query(query_embeddings=query_embedding, n_results=k)
        context = " ".join(results['documents'][0]) if results['documents'] else ""

        prompt = f"Context: {context}\n\nQuestion: {query}\n\nAnswer:"
        
        # Send the query to Ollama and enable streaming
        response = requests.post(f"{self.ollama_url}/api/generate", 
                                 json={"model": "llama2:latest", "prompt": prompt}, 
                                 stream=True)
        
        if response.status_code != 200:
            raise Exception(f"Ollama API returned status code {response.status_code}: {response.text}")
        
        # Accumulate the response chunks into a single response string
        consolidated_response = ""
        
        try:
            for line in response.iter_lines():
                if line:
                    # Decode the chunk and parse it as JSON
                    line_json = json.loads(line.decode('utf-8'))
                    
                    # Append the current chunk's response text to the consolidated string
                    consolidated_response += line_json.get("response", "")
                    
                    # Stop accumulating once we receive the "done" flag
                    if line_json.get("done", False):
                        break

        except json.JSONDecodeError as e:
            print(f"JSON decode error: {str(e)}")
            raise Exception("Failed to parse streamed response from Ollama API")
        
        # Return the final consolidated response
        return consolidated_response

    def update_data_source(self, source, new_documents):
        self.collection.delete(where={"source": source})
        self.add_documents(new_documents, source)

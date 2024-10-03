from langchain_community.llms import Ollama
from langchain_core.output_parsers import StrOutputParser
from langchain.prompts import PromptTemplate
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import DocArrayInMemorySearch

# Initialize the model
MODEL = "tinyllama:1.1b"
model = Ollama(model=MODEL)
parser = StrOutputParser()

# Initialize embeddings and vector store
embeddings = OllamaEmbeddings()
vector_store = None

def load_document(file_path: str):
    global vector_store
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    vector_store = DocArrayInMemorySearch.from_documents(pages, embeddings)

def query_rag(question: str) -> str:
    if vector_store is None:
        raise ValueError("No documents loaded. Please upload a document first.")
    
    template = """
    Answer the question based on the context below. If you can't answer the question, reply "I don't know."

    Context: {context}

    Question: {question}
    """

    prompt = PromptTemplate.from_template(template)
    chain = prompt | model | parser

    # Query the vector store to retrieve context
    results = vector_store.query(question)
    if not results:
        context = "No relevant information found."
    else:
        context = " ".join([doc.content for doc in results])

    result = chain.invoke({"context": context, "question": question})
    return result

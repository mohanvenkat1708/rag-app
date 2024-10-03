print('Hello')

from langchain_community.llms import Ollama
from flask import Flask, request

app = Flask(__name__)

cached_llm = Ollama(model='llama2')
# response = llm.invoke("Who is father of computer.")
# print(response)

@app.route("/ai", methods=["POST"])
def aiPost():
    print("Post /ai called")
    json_content = request.json
    query = json_content.get("query")
    print(f"query: {query}")
    
    response = cached_llm.invoke(query)
    print(response)
    
    query_response = "Sample respose:"+response+" Query: "+query;
    return query_response
    

def start_app():
    app.run(host="0.0.0.0", port="8080", debug=True)
    
if __name__ == "__main__":
    start_app()
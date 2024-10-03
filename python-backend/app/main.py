from fastapi import FastAPI, HTTPException, File, UploadFile
from rag import query_rag, load_document
import os

app = FastAPI()

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Save the uploaded file
    file_location = f"data/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(file.file.read())
    
    # Load document into the vector store
    try:
        load_document(file_location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading document: {e}")
    
    return {"filename": file.filename}

@app.post("/query/")
async def query(question: str):
    try:
        # Run the query through the RAG system
        result = query_rag(question)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

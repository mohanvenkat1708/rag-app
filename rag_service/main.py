import os
import sys
import json
from rag_service import RAGService

def main():
    rag_service = RAGService()

    if len(sys.argv) < 2:
        print("Usage: python main.py <command> [args]")
        sys.exit(1)

    command = sys.argv[1]

    if command == "query":
        query = sys.argv[2]
        try:
            response = rag_service.query(query)
            print(json.dumps({"response": response}))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
    elif command == "add_documents":
        source = sys.argv[2]
        documents = json.loads(sys.argv[3])
        rag_service.add_documents(documents, source)
        print(json.dumps({"status": "success"}))
    elif command == "update_source":
        source = sys.argv[2]
        documents = json.loads(sys.argv[3])
        rag_service.update_data_source(source, documents)
        print(json.dumps({"status": "success"}))
    else:
        print(json.dumps({"error": "Invalid command"}))

if __name__ == "__main__":
    main()
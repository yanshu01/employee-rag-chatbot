import shutil

from app.rag.document_loader import load_policy_documents
from app.rag.text_splitter import split_documents
from app.rag.vector_store import (
    VECTOR_DB_PATH,
    create_vector_store,
)


def index_policies() -> None:
    print("Loading policy documents...")

    documents = load_policy_documents()

    print(f"Loaded {len(documents)} PDF pages.")

    chunks = split_documents(documents)

    print(f"Created {len(chunks)} chunks.")

    if VECTOR_DB_PATH.exists():
        print("Removing old vector database...")

        shutil.rmtree(VECTOR_DB_PATH)

    create_vector_store(chunks)

    print("Policy documents indexed successfully.")
    print(f"Vector database saved in {VECTOR_DB_PATH}.")


if __name__ == "__main__":
    index_policies()
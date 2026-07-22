from pathlib import Path

from langchain_chroma import Chroma
from langchain_core.documents import Document

from app.rag.embeddings import get_embedding_model


VECTOR_DB_PATH = Path("app/vector_db")
COLLECTION_NAME = "company_policies"


def create_vector_store(
    documents: list[Document],
) -> Chroma:
    VECTOR_DB_PATH.mkdir(
        parents=True,
        exist_ok=True,
    )

    embeddings = get_embedding_model()

    vector_store = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory=str(VECTOR_DB_PATH),
    )

    return vector_store


def load_vector_store() -> Chroma:
    embeddings = get_embedding_model()

    return Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
        persist_directory=str(VECTOR_DB_PATH),
    )
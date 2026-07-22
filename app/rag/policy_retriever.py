from dataclasses import dataclass
from pathlib import Path

from langchain_core.documents import Document

from app.rag.vector_store import (
    VECTOR_DB_PATH,
    load_vector_store,
)


@dataclass
class PolicySearchResult:
    content: str
    source: str
    page: int | None
    score: float | None = None


def validate_vector_database() -> None:
    """
    Check whether the policy vector database exists.
    """

    if not Path(VECTOR_DB_PATH).exists():
        raise FileNotFoundError(
            "Policy vector database was not found. "
            "Run: python -m scripts.index_policies"
        )


def search_policy_documents(
    question: str,
    limit: int = 4,
) -> list[PolicySearchResult]:
    """
    Search policy documents using semantic similarity.

    The returned results include:
    - document text
    - PDF filename
    - page number
    """

    cleaned_question = question.strip()

    if not cleaned_question:
        raise ValueError("Question cannot be empty.")

    if limit < 1 or limit > 10:
        raise ValueError(
            "Search limit must be between 1 and 10."
        )

    validate_vector_database()

    vector_store = load_vector_store()

    documents: list[Document] = (
        vector_store.similarity_search(
            query=cleaned_question,
            k=limit,
        )
    )

    results: list[PolicySearchResult] = []

    for document in documents:
        metadata = document.metadata or {}

        source = str(
            metadata.get(
                "source",
                "Unknown policy document",
            )
        )

        page_value = metadata.get("page")

        page_number: int | None = None

        if isinstance(page_value, int):
            # PyPDFLoader page values normally start from zero.
            page_number = page_value + 1

        results.append(
            PolicySearchResult(
                content=document.page_content.strip(),
                source=source,
                page=page_number,
            )
        )

    return results

def build_policy_context(
    question: str,
    limit: int = 4,
) -> tuple[str, list[PolicySearchResult]]:
    """
    Build formatted context that can later be sent to an LLM.
    """

    results = search_policy_documents(
        question=question,
        limit=limit,
    )

    if not results:
        return (
            "No relevant company policy information was found.",
            [],
        )

    context_blocks: list[str] = []

    for index, result in enumerate(
        results,
        start=1,
    ):
        source_label = result.source

        if result.page is not None:
            source_label += f", page {result.page}"

        context_blocks.append(
            f"""
Policy Extract {index}
Source: {source_label}

{result.content}
""".strip()
        )

    context = "\n\n---\n\n".join(context_blocks)

    return context, results
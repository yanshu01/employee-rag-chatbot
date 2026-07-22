from app.rag.policy_retriever import (
    PolicySearchResult,
    build_policy_context,
)


def search_company_policy(
    question: str,
    limit: int = 4,
) -> tuple[str, list[PolicySearchResult]]:
    """
    Search indexed company policies.

    This tool is read-only. It does not modify policy files
    or employee information.
    """

    cleaned_question = question.strip()

    if not cleaned_question:
        raise ValueError("Policy question cannot be empty.")

    return build_policy_context(
        question=cleaned_question,
        limit=limit,
    )
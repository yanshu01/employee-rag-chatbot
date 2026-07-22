from app.rag.policy_retriever import (
    build_policy_context,
)


def test_retriever() -> None:
    question = input(
        "Ask a company policy question: "
    ).strip()

    if not question:
        print("Please enter a question.")
        return

    try:
        context, results = build_policy_context(
            question=question,
            limit=4,
        )

        print("\nRetrieved policy context:\n")
        print(context)

        print("\nSources:\n")

        if not results:
            print("No matching policy content found.")
            return

        for index, result in enumerate(
            results,
            start=1,
        ):
            page = (
                str(result.page)
                if result.page is not None
                else "Unknown"
            )

            print(
                f"{index}. {result.source}, page {page}"
            )

    except Exception as exc:
        print(f"Policy search failed: {exc}")


if __name__ == "__main__":
    test_retriever()
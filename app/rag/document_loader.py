import re
from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document


POLICY_FOLDER = Path("company-policies")


def clean_pdf_text(text: str) -> str:
    text = text.replace("\u00a0", " ")

    text = re.sub(
        r"[ \t]+",
        " ",
        text,
    )

    text = re.sub(
        r"\n\s*\n+",
        "\n",
        text,
    )

    text = re.sub(
        r"(?<![.!?:])\n(?=[a-z])",
        " ",
        text,
    )

    return text.strip()


def load_policy_documents() -> list[Document]:
    if not POLICY_FOLDER.exists():
        raise FileNotFoundError(
            f"Policy folder not found: "
            f"{POLICY_FOLDER.resolve()}"
        )

    pdf_files = sorted(
        POLICY_FOLDER.glob("*.pdf")
    )

    if not pdf_files:
        raise FileNotFoundError(
            "No PDF files found inside company-policies."
        )

    documents: list[Document] = []

    for pdf_file in pdf_files:
        print(f"Loading: {pdf_file.name}")

        loader = PyPDFLoader(str(pdf_file))
        pages = loader.load()

        for page in pages:
            page.page_content = clean_pdf_text(
                page.page_content
            )

            page.metadata["source"] = pdf_file.name
            page.metadata["file_path"] = str(pdf_file)

        documents.extend(pages)

    return documents
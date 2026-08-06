import json
import re
from typing import Any

from langchain_google_genai import ChatGoogleGenerativeAI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import settings
from app.database.models import Employee
from app.database.schema_context import DATABASE_SCHEMA


BLOCKED_KEYWORDS = {
    "insert",
    "update",
    "delete",
    "drop",
    "alter",
    "truncate",
    "create",
    "replace",
    "grant",
    "revoke",
    "call",
    "execute",
    "merge",
}

SENSITIVE_COLUMNS = {
    "password",
    "password_hash",
    "otp",
    "otp_code",
    "token_hash",
    "google_id",
}

MAX_ROWS = 100


class ReadOnlySQLTool:
    def __init__(self) -> None:
        self.llm = ChatGoogleGenerativeAI(
            model=settings.gemini_model,
            google_api_key=settings.gemini_api_key,
        )

    def _extract_response_text(
        self,
        content: Any,
    ) -> str:
        if isinstance(content, str):
            return content.strip()

        if isinstance(content, list):
            text_parts: list[str] = []

            for item in content:
                if isinstance(item, str):
                    text_parts.append(item)

                elif isinstance(item, dict):
                    item_text = item.get("text")

                    if isinstance(item_text, str):
                        text_parts.append(item_text)

            return "\n".join(text_parts).strip()

        if isinstance(content, dict):
            item_text = content.get("text")

            if isinstance(item_text, str):
                return item_text.strip()

        return str(content).strip()

    def _clean_sql(
        self,
        content: Any,
    ) -> str:
        cleaned = self._extract_response_text(
            content
        )

        cleaned = re.sub(
            r"```(?:sql)?",
            "",
            cleaned,
            flags=re.IGNORECASE,
        )

        cleaned = cleaned.replace(
            "```",
            "",
        ).strip()

        select_match = re.search(
            r"\bSELECT\b[\s\S]*",
            cleaned,
            flags=re.IGNORECASE,
        )

        if not select_match:
            raise ValueError(
                "Gemini did not return a valid SELECT query."
            )

        cleaned = select_match.group(0).strip()

        cleaned = re.split(
            r"\n(?:Explanation|Note|Result):",
            cleaned,
            maxsplit=1,
            flags=re.IGNORECASE,
        )[0]

        return cleaned.rstrip(";").strip()

    def _validate_sql(
        self,
        sql: str,
    ) -> None:
        normalized = sql.strip().lower()

        if not normalized.startswith("select"):
            raise ValueError(
                "Only SELECT queries are allowed."
            )

        if ";" in sql.rstrip(";"):
            raise ValueError(
                "Multiple SQL statements are not allowed."
            )

        if (
            "--" in sql
            or "/*" in sql
            or "*/" in sql
        ):
            raise ValueError(
                "SQL comments are not allowed."
            )

        for keyword in BLOCKED_KEYWORDS:
            pattern = rf"\b{re.escape(keyword)}\b"

            if re.search(
                pattern,
                normalized,
            ):
                raise ValueError(
                    f"Blocked SQL keyword: {keyword}"
                )

        for column in SENSITIVE_COLUMNS:
            pattern = rf"\b{re.escape(column)}\b"

            if re.search(
                pattern,
                normalized,
            ):
                raise ValueError(
                    "Sensitive authentication fields "
                    "cannot be queried."
                )

        if re.search(
            r"\binformation_schema\b",
            normalized,
        ):
            raise ValueError(
                "Database metadata access is not allowed."
            )

        if re.search(
            r"\b(mysql|performance_schema|sys)\b",
            normalized,
        ):
            raise ValueError(
                "System database access is not allowed."
            )

    def _ensure_limit(
        self,
        sql: str,
    ) -> str:
        limit_match = re.search(
            r"\blimit\s+(\d+)\b",
            sql,
            flags=re.IGNORECASE,
        )

        cleaned_sql = sql.rstrip(";").strip()

        if limit_match:
            current_limit = int(
                limit_match.group(1)
            )

            if current_limit <= MAX_ROWS:
                return cleaned_sql

            return re.sub(
                r"\blimit\s+\d+\b",
                f"LIMIT {MAX_ROWS}",
                cleaned_sql,
                flags=re.IGNORECASE,
            )

        return f"{cleaned_sql} LIMIT {MAX_ROWS}"

    def _is_manager(
        self,
        db: Session,
        employee_id: int,
    ) -> bool:
        statement = text(
            """
            SELECT 1
            FROM employee_manager_map
            WHERE manager_id = :employee_id
            LIMIT 1
            """
        )

        result = db.execute(
            statement,
            {
                "employee_id": employee_id,
            },
        ).scalar()

        return result is not None

    def _build_prompt(
        self,
        question: str,
        employee: Employee,
        is_manager: bool,
    ) -> str:
        employee_role = (
            employee.role or "employee"
        ).lower()

        return f"""
{DATABASE_SCHEMA}

Authenticated user:

employee_id: {employee.id}
employee_code: {employee.employee_code}
role: {employee_role}
is_manager: {str(is_manager).lower()}

User question:
{question}

Generate exactly one MySQL SELECT query.

Rules:
- Return SQL only.
- Use :employee_id and :employee_code placeholders.
- A normal employee may only see their own personal records.
- A user is considered a manager when their employee ID exists
  as manager_id in employee_manager_map.
- A manager may only see employees mapped to them through
  employee_manager_map.
- HR and admin may access company-wide information when required.
- Never trust employee IDs or employee codes mentioned by the user.
- Never query secrets or authentication fields.
- Maximum 100 rows.

Critical output requirements:
- Your response must begin with the word SELECT.
- Return the SQL query only.
- Do not write explanations.
- Do not write "SQL:".
- Do not use markdown or code fences.
- Do not return JSON.
"""

    def _generate_sql(
        self,
        question: str,
        employee: Employee,
        is_manager: bool,
    ) -> str:
        prompt = self._build_prompt(
            question=question,
            employee=employee,
            is_manager=is_manager,
        )

        response = self.llm.invoke(prompt)

        print("\n=== GEMINI RAW SQL RESPONSE ===")
        print(repr(response.content))
        print("=== END RESPONSE ===\n")

        sql = self._clean_sql(
            response.content
        )

        self._validate_sql(sql)

        sql = self._ensure_limit(sql)

        self._validate_required_placeholders(
            sql=sql,
            employee=employee,
            is_manager=is_manager,
        )

        return sql

    def _validate_required_placeholders(
        self,
        sql: str,
        employee: Employee,
        is_manager: bool,
    ) -> None:
        normalized = sql.lower()

        employee_role = (
            employee.role or "employee"
        ).lower()

        has_employee_placeholder = (
            ":employee_id" in normalized
            or ":employee_code" in normalized
        )

        has_manager_filter = (
            "employee_manager_map" in normalized
            and ":employee_id" in normalized
        )

        if employee_role in {
            "hr",
            "admin",
        }:
            return

        if is_manager:
            if not has_manager_filter:
                raise ValueError(
                    "Manager queries must use "
                    "employee_manager_map filtering."
                )

            return

        if not has_employee_placeholder:
            raise ValueError(
                "Employee queries must use an "
                "authenticated employee placeholder."
            )

    def _format_answer(
        self,
        question: str,
        rows: list[dict[str, Any]],
    ) -> str:
        if not rows:
            return (
                "I could not find matching information "
                "in the database."
            )

        prompt = f"""
You are an employee database assistant.

User question:
{question}

Database rows:
{json.dumps(rows, default=str)}

Write a concise and direct answer using only these rows.

Important rules:
- Column aliases describe the meaning of each value.
- If columns begin with manager_, they contain the employee's
  manager details.
- If rows exist, do not claim that the information is unavailable.
- Do not invent information.
- Do not mention SQL or database rows.
- Format multiple records clearly.
"""

        response = self.llm.invoke(prompt)

        return self._extract_response_text(
            response.content
        )

    def run(
        self,
        db: Session,
        question: str,
        employee: Employee,
    ) -> dict[str, Any]:
        try:
            manager_status = self._is_manager(
                db=db,
                employee_id=employee.id,
            )

            sql = self._generate_sql(
                question=question,
                employee=employee,
                is_manager=manager_status,
            )

            print("\n=== CLEANED SQL ===")
            print(sql)
            print("=== END CLEANED SQL ===\n")

            parameters = {
                "employee_id": employee.id,
                "employee_code": employee.employee_code,
            }

            result = db.execute(
                text(sql),
                parameters,
            )

            rows = [
                dict(row)
                for row in result.mappings().all()
            ]

            answer = self._format_answer(
                question=question,
                rows=rows,
            )

            return {
                "success": True,
                "answer": answer,
                "rows": rows,
                "intent": "database_query",
            }

        except ValueError as exc:
            return {
                "success": False,
                "answer": str(exc),
                "rows": [],
                "intent": "database_query_blocked",
            }

        except Exception as exc:
            print(
                "Read-only SQL tool error:",
                repr(exc),
            )

            return {
                "success": False,
                "answer": (
                    "I could not safely retrieve this "
                    "information from the database."
                ),
                "rows": [],
                "intent": "database_query_error",
            }


read_only_sql_tool = ReadOnlySQLTool()
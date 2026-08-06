from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    app_name: str = "Employee RAG Chatbot"

    db_host: str = "sqlite"
    db_port: int = 3306
    db_name: str = "employee_chatbot.db"
    db_user: str = "root"
    db_password: str = "password"

    jwt_secret_key: str = "supersecretjwtkey1234567890_employee_rag"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    groq_api_key: str = "gsk_dummy_groq_api_key"
    groq_model: str = "openai/gpt-oss-120b"

    # Company API Authentication
    company_api_key: str
    company_api_key_header: str = "X-API-Key"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()

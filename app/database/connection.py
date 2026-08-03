from collections.abc import Generator
from typing import Any

from sqlalchemy import URL, create_engine
from sqlalchemy.orm import (
    DeclarativeBase,
    Session,
    sessionmaker,
)

from app.config import settings


class Base(DeclarativeBase):
    pass


if settings.db_host == "sqlite" or settings.db_name.endswith(".db"):
    database_url = f"sqlite:///{settings.db_name}"
    engine_options: dict[str, Any] = {
        "echo": False,
        "connect_args": {"check_same_thread": False},
    }
else:
    database_url = URL.create(
        drivername="mysql+pymysql",
        username=settings.db_user,
        password=settings.db_password,
        host=settings.db_host,
        port=settings.db_port,
        database=settings.db_name,
        query={"charset": "utf8mb4"},
    )
    engine_options: dict[str, Any] = {
        "echo": False,
        "pool_pre_ping": True,
        "pool_recycle": 1800,
        "pool_size": 5,
        "max_overflow": 10,
    }

engine = create_engine(
    database_url,
    **engine_options,
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.database.connection import engine


def test_mysql_connection() -> None:
    try:
        with engine.connect() as connection:
            result = connection.execute(
                text(
                    """
                    SELECT
                        DATABASE() AS database_name,
                        VERSION() AS mysql_version
                    """
                )
            )

            row = result.one()

            print("MySQL connection successful.")
            print(f"Database: {row.database_name}")
            print(f"MySQL version: {row.mysql_version}")

    except SQLAlchemyError as exc:
        print("MySQL connection failed.")
        print(type(exc).__name__)
        print(str(exc))
        raise


if __name__ == "__main__":
    test_mysql_connection()
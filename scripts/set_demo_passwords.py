from sqlalchemy.orm import Session

from app.auth.authentication import get_password_hash
from app.database.connection import SessionLocal
from app.database.models import Employee


DEMO_PASSWORD = "password123"


def set_demo_passwords(db: Session) -> None:
    employees = db.query(Employee).all()

    if not employees:
        print("No employees found.")
        return

    for employee in employees:
        employee.password_hash = get_password_hash(
            DEMO_PASSWORD
        )

        print(
            f"Password updated for "
            f"{employee.employee_code} - {employee.email}"
        )

    db.commit()

    print("\nAll demo passwords updated successfully.")
    print(f"Demo password: {DEMO_PASSWORD}")


def main() -> None:
    db = SessionLocal()

    try:
        set_demo_passwords(db)
    except Exception as exc:
        db.rollback()
        print(f"Failed to update passwords: {exc}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
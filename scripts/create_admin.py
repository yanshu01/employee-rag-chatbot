from sqlalchemy import select

from app.auth.authentication import hash_password
from app.database.connection import Base, SessionLocal, engine
from app.database.models import Employee


def create_admin() -> None:
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        existing_admin = db.scalar(
            select(Employee).where(
                Employee.email == "admin@company.com"
            )
        )

        if existing_admin:
            print("Admin account already exists.")
            return

        admin = Employee(
            employee_code="ADMIN001",
            name="System Administrator",
            email="admin@company.com",
            password_hash=hash_password("Admin@12345"),
            role="admin",
            department="Administration",
            is_active=True,
        )

        db.add(admin)
        db.commit()

        print("Admin account created successfully.")
        print("Email: admin@company.com")
        print("Password: Admin@12345")
        print("Change this password before production.")

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
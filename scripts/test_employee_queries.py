from sqlalchemy import select

from app.database.connection import SessionLocal
from app.database.models import Employee


def test_employees() -> None:
    with SessionLocal() as db:
        statement = (
            select(Employee)
            .order_by(Employee.id)
        )

        employees = db.scalars(statement).all()

        if not employees:
            print("No employees found.")
            return

        for employee in employees:
            print("-" * 50)
            print("ID:", employee.id)
            print("Code:", employee.employee_code)
            print("Name:", employee.name)
            print("Department:", employee.department)
            print("Designation:", employee.designation)
            print("Manager:", employee.manager)
            print(
                "Manager code:",
                employee.manager_code,
            )
            print(
                "Leave balance:",
                employee.leave_balance,
            )
            print(
                "Shift:",
                employee.shift_start,
                "-",
                employee.shift_end,
            )
            print("Role:", employee.role)
            print("Active:", employee.is_active)


if __name__ == "__main__":
    test_employees()
from app.database.connection import SessionLocal
from app.database.queries import get_employee_by_code
from app.tools.employee_tools import (
    get_my_attendance,
    get_my_leave_balance,
    get_my_remaining_shift_hours,
    get_my_shift,
)


def test_employee_tools() -> None:
    with SessionLocal() as db:
        employee = get_employee_by_code(
            db=db,
            employee_code="EMP001",
        )

        if employee is None:
            print("Employee not found.")
            return

        print("Leave balance:")
        print(
            get_my_leave_balance(
                db=db,
                current_employee=employee,
            )
        )

        print("\nShift:")
        print(
            get_my_shift(
                db=db,
                current_employee=employee,
            )
        )

        print("\nRemaining shift hours:")
        print(
            get_my_remaining_shift_hours(
                db=db,
                current_employee=employee,
            )
        )

        print("\nAttendance:")
        print(
            get_my_attendance(
                db=db,
                current_employee=employee,
            )
        )


if __name__ == "__main__":
    test_employee_tools()
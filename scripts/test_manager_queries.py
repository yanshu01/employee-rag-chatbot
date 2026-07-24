from app.database.connection import SessionLocal
from app.database.queries import (
    get_direct_report_by_code,
    get_direct_reports,
    get_employee_leave_balance,
    get_employee_shift,
    get_team_count,
)


def test_manager_queries() -> None:
    with SessionLocal() as db:
        manager_code = "EMP002"

        employees = get_direct_reports(
            db=db,
            manager_code=manager_code,
        )

        print("Manager code:", manager_code)
        print("Team count:", get_team_count(db, manager_code))
        print("-" * 50)

        for employee in employees:
            print("Employee:", employee.name)
            print("Code:", employee.employee_code)
            print("Department:", employee.department)
            print("Designation:", employee.designation)
            print(
                "Leave balance:",
                get_employee_leave_balance(
                    db=db,
                    employee_code=employee.employee_code,
                ),
            )
            print(
                "Shift:",
                get_employee_shift(
                    db=db,
                    employee_code=employee.employee_code,
                ),
            )
            print("-" * 50)

        employee = get_direct_report_by_code(
            db=db,
            manager_code="EMP002",
            employee_code="EMP001",
        )

        if employee:
            print(
                "Direct-report verification:",
                employee.name,
            )
        else:
            print("Direct report not found.")


if __name__ == "__main__":
    test_manager_queries()
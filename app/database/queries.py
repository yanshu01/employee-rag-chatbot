from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.authentication import get_password_hash
from app.database.models import (
    Attendance,
    Employee,
    EmployeeShift,
    LeaveBalance,
)
from app.schemas import EmployeeCreate


def get_employee_by_email(
    db: Session,
    email: str,
) -> Employee | None:
    statement = select(Employee).where(
        Employee.email == email.lower()
    )

    return db.scalar(statement)


def get_employee_by_code(
    db: Session,
    employee_code: str,
) -> Employee | None:
    statement = select(Employee).where(
        Employee.employee_code
        == employee_code.upper()
    )

    return db.scalar(statement)


def create_employee(
    db: Session,
    employee_data: EmployeeCreate,
) -> Employee:
    employee = Employee(
        employee_code=(
            employee_data.employee_code.upper()
        ),
        name=employee_data.name.strip(),
        email=employee_data.email.lower(),
        password_hash=get_password_hash(
            employee_data.password
        ),
        role=employee_data.role.lower(),
        department=employee_data.department,
        manager_code=employee_data.manager_code,
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


def get_leave_balance_by_employee_id(
    db: Session,
    employee_id: int,
) -> LeaveBalance | None:
    statement = select(LeaveBalance).where(
        LeaveBalance.employee_id == employee_id
    )

    return db.scalar(statement)


def get_attendance_for_date(
    db: Session,
    employee_id: int,
    attendance_date: date,
) -> Attendance | None:
    statement = select(Attendance).where(
        Attendance.employee_id == employee_id,
        Attendance.attendance_date
        == attendance_date,
    )

    return db.scalar(statement)


def get_employee_shift(
    db: Session,
    employee_id: int,
) -> EmployeeShift | None:
    statement = select(EmployeeShift).where(
        EmployeeShift.employee_id == employee_id
    )

    return db.scalar(statement)


def get_direct_reports(
    db: Session,
    manager_code: str,
) -> list[Employee]:
    statement = (
        select(Employee)
        .where(
            Employee.manager_code
            == manager_code.upper(),
            Employee.is_active.is_(True),
        )
        .order_by(Employee.name)
    )

    return list(
        db.scalars(statement).all()
    )


def get_direct_report_by_code(
    db: Session,
    manager_code: str,
    employee_code: str,
) -> Employee | None:
    statement = select(Employee).where(
        Employee.employee_code
        == employee_code.upper(),
        Employee.manager_code
        == manager_code.upper(),
        Employee.is_active.is_(True),
    )

    return db.scalar(statement)


def get_team_attendance_for_date(
    db: Session,
    manager_code: str,
    attendance_date: date,
) -> list[
    tuple[Employee, Attendance | None]
]:
    employees = get_direct_reports(
        db=db,
        manager_code=manager_code,
    )

    results: list[
        tuple[Employee, Attendance | None]
    ] = []

    for employee in employees:
        attendance_statement = select(
            Attendance
        ).where(
            Attendance.employee_id == employee.id,
            Attendance.attendance_date
            == attendance_date,
        )

        attendance = db.scalar(
            attendance_statement
        )

        results.append(
            (
                employee,
                attendance,
            )
        )

    return results


def get_team_shift_records(
    db: Session,
    manager_code: str,
) -> list[
    tuple[Employee, EmployeeShift | None]
]:
    employees = get_direct_reports(
        db=db,
        manager_code=manager_code,
    )

    results: list[
        tuple[Employee, EmployeeShift | None]
    ] = []

    for employee in employees:
        shift_statement = select(
            EmployeeShift
        ).where(
            EmployeeShift.employee_id
            == employee.id
        )

        shift = db.scalar(
            shift_statement
        )

        results.append(
            (
                employee,
                shift,
            )
        )

    return results
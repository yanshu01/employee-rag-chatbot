from datetime import date

from sqlalchemy import func, select
from sqlalchemy.orm import Session, aliased

from app.auth.authentication import get_password_hash
from app.database.models import (
    Employee,
    EmployeeManagerMap,
    EmployeeShift,
    LeaveBalance,
)
from app.schemas import EmployeeCreate


def get_employee_by_email(
    db: Session,
    email: str,
) -> Employee | None:
    normalized_email = email.strip().lower()

    statement = select(Employee).where(
        Employee.email == normalized_email,
        Employee.status == "active",
    )

    return db.scalar(statement)


def get_employee_by_code(
    db: Session,
    employee_code: str,
) -> Employee | None:
    normalized_code = employee_code.strip().upper()

    statement = select(Employee).where(
        Employee.employee_code == normalized_code,
        Employee.status == "active",
    )

    return db.scalar(statement)


def create_employee(
    db: Session,
    employee_data: EmployeeCreate,
) -> Employee:
    normalized_code = (
        employee_data.employee_code.strip().upper()
    )
    normalized_email = (
        employee_data.email.strip().lower()
    )

    if get_employee_by_code(db, normalized_code):
        raise ValueError(
            "An employee with this employee code "
            "already exists."
        )

    if get_employee_by_email(db, normalized_email):
        raise ValueError(
            "An employee with this email already exists."
        )

    plain_password = employee_data.password

    employee = Employee(
        employee_code=normalized_code,
        name=employee_data.name.strip(),
        email=normalized_email,
        password_hash=get_password_hash(
            plain_password
        ),
        password=plain_password,
        role=employee_data.role.strip().lower(),
        department=employee_data.department,
        designation=getattr(
            employee_data,
            "designation",
            None,
        ),
        phone_number=getattr(
            employee_data,
            "phone_number",
            None,
        ),
        join_date=getattr(
            employee_data,
            "join_date",
            None,
        ),
        status="active",
        is_admin=(
            employee_data.role.strip().lower()
            == "admin"
        ),
    )

    db.add(employee)

    try:
        db.flush()

        manager_code = getattr(
            employee_data,
            "manager_code",
            None,
        )

        if manager_code:
            manager = get_employee_by_code(
                db=db,
                employee_code=manager_code,
            )

            if manager is None:
                raise ValueError(
                    "The selected manager does not exist."
                )

            if manager.id == employee.id:
                raise ValueError(
                    "An employee cannot manage themselves."
                )

            mapping = EmployeeManagerMap(
                employee_id=employee.id,
                manager_id=manager.id,
            )
            db.add(mapping)

        db.commit()
        db.refresh(employee)

    except Exception:
        db.rollback()
        raise

    return employee


def get_all_active_employees(
    db: Session,
) -> list[Employee]:
    statement = (
        select(Employee)
        .where(Employee.status == "active")
        .order_by(Employee.name)
    )

    return list(db.scalars(statement).all())


def get_direct_reports(
    db: Session,
    manager_code: str,
) -> list[Employee]:
    manager = get_employee_by_code(
        db=db,
        employee_code=manager_code,
    )

    if manager is None:
        return []

    statement = (
        select(Employee)
        .join(
            EmployeeManagerMap,
            EmployeeManagerMap.employee_id
            == Employee.id,
        )
        .where(
            EmployeeManagerMap.manager_id
            == manager.id,
            Employee.status == "active",
        )
        .order_by(Employee.name)
    )

    return list(db.scalars(statement).all())


def get_direct_report_by_code(
    db: Session,
    manager_code: str,
    employee_code: str,
) -> Employee | None:
    manager = get_employee_by_code(
        db=db,
        employee_code=manager_code,
    )

    if manager is None:
        return None

    normalized_employee_code = (
        employee_code.strip().upper()
    )

    statement = (
        select(Employee)
        .join(
            EmployeeManagerMap,
            EmployeeManagerMap.employee_id
            == Employee.id,
        )
        .where(
            Employee.employee_code
            == normalized_employee_code,
            EmployeeManagerMap.manager_id
            == manager.id,
            Employee.status == "active",
        )
    )

    return db.scalar(statement)


def get_employee_leave_balance(
    db: Session,
    employee_code: str,
) -> int | None:
    employee = get_employee_by_code(
        db=db,
        employee_code=employee_code,
    )

    if employee is None:
        return None

    statement = select(
        func.coalesce(
            func.sum(
                LeaveBalance.allocated
                - LeaveBalance.used
            ),
            0,
        )
    ).where(
        LeaveBalance.employee_id == employee.id,
        LeaveBalance.year == date.today().year,
    )

    remaining = db.scalar(statement)

    return int(remaining or 0)


def get_employee_leave_breakdown(
    db: Session,
    employee_code: str,
) -> list[dict[str, int | str]]:
    employee = get_employee_by_code(
        db=db,
        employee_code=employee_code,
    )

    if employee is None:
        return []

    statement = (
        select(LeaveBalance)
        .where(
            LeaveBalance.employee_id
            == employee.id,
            LeaveBalance.year
            == date.today().year,
        )
        .order_by(LeaveBalance.leave_type)
    )

    records = db.scalars(statement).all()

    return [
        {
            "leave_type": record.leave_type,
            "allocated": record.allocated,
            "used": record.used,
            "remaining": (
                record.allocated - record.used
            ),
        }
        for record in records
    ]


def get_employee_shift(
    db: Session,
    employee_code: str,
) -> dict[str, object] | None:
    employee = get_employee_by_code(
        db=db,
        employee_code=employee_code,
    )

    if employee is None:
        return None

    statement = select(EmployeeShift).where(
        EmployeeShift.employee_id == employee.id,
        EmployeeShift.shift_date == date.today(),
    )

    shift = db.scalar(statement)

    if shift is None:
        return None

    return {
        "shift_id": shift.shift_id,
        "shift_date": shift.shift_date,
        "shift_type": shift.shift_type,
        "shift_start": shift.scheduled_start,
        "shift_end": shift.scheduled_end,
        "scheduled_start": shift.scheduled_start,
        "scheduled_end": shift.scheduled_end,
        "actual_clock_in": shift.actual_clock_in,
        "actual_clock_out": shift.actual_clock_out,
        "total_worked_hours": (
            float(shift.total_worked_hours)
            if shift.total_worked_hours is not None
            else None
        ),
        "late_minutes": shift.late_minutes,
        "overtime_minutes": (
            shift.overtime_minutes
        ),
        "shift_status": shift.shift_status,
        "notes": shift.notes,
    }


def get_employee_manager(
    db: Session,
    employee_code: str,
) -> dict[str, str | None] | None:
    employee = get_employee_by_code(
        db=db,
        employee_code=employee_code,
    )

    if employee is None:
        return None

    manager = aliased(Employee)

    statement = (
        select(manager)
        .join(
            EmployeeManagerMap,
            EmployeeManagerMap.manager_id
            == manager.id,
        )
        .where(
            EmployeeManagerMap.employee_id
            == employee.id,
            manager.status == "active",
        )
    )

    manager_record = db.scalar(statement)

    if manager_record is None:
        return {
            "manager": None,
            "manager_code": None,
        }

    return {
        "manager": manager_record.name,
        "manager_code": (
            manager_record.employee_code
        ),
    }


def get_team_count(
    db: Session,
    manager_code: str,
) -> int:
    manager = get_employee_by_code(
        db=db,
        employee_code=manager_code,
    )

    if manager is None:
        return 0

    statement = select(func.count()).select_from(
        EmployeeManagerMap
    ).join(
        Employee,
        Employee.id
        == EmployeeManagerMap.employee_id,
    ).where(
        EmployeeManagerMap.manager_id == manager.id,
        Employee.status == "active",
    )

    return int(db.scalar(statement) or 0)
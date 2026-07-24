from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.authentication import get_password_hash
from app.database.models import Employee
from app.schemas import EmployeeCreate


def get_employee_by_email(
    db: Session,
    email: str,
) -> Employee | None:
    normalized_email = email.strip().lower()

    statement = select(Employee).where(
        Employee.email == normalized_email,
        Employee.is_active.is_(True),
    )

    return db.scalar(statement)


def get_employee_by_code(
    db: Session,
    employee_code: str,
) -> Employee | None:
    normalized_code = employee_code.strip().upper()

    statement = select(Employee).where(
        Employee.employee_code == normalized_code,
        Employee.is_active.is_(True),
    )

    return db.scalar(statement)


def create_employee(
    db: Session,
    employee_data: EmployeeCreate,
) -> Employee:
    existing_code = get_employee_by_code(
        db=db,
        employee_code=employee_data.employee_code,
    )

    if existing_code:
        raise ValueError(
            "An employee with this employee code "
            "already exists."
        )

    existing_email = get_employee_by_email(
        db=db,
        email=employee_data.email,
    )

    if existing_email:
        raise ValueError(
            "An employee with this email already exists."
        )

    employee = Employee(
        employee_code=(
            employee_data.employee_code.strip().upper()
        ),
        name=employee_data.name.strip(),
        email=employee_data.email.strip().lower(),
        password_hash=get_password_hash(
            employee_data.password
        ),
        role=employee_data.role.lower(),
        department=employee_data.department,
        designation=getattr(
            employee_data,
            "designation",
            None,
        ),
        manager=getattr(
            employee_data,
            "manager",
            None,
        ),
        manager_code=getattr(
            employee_data,
            "manager_code",
            None,
        ),
        leave_balance=getattr(
            employee_data,
            "leave_balance",
            12,
        ),
        shift_start=getattr(
            employee_data,
            "shift_start",
            None,
        ),
        shift_end=getattr(
            employee_data,
            "shift_end",
            None,
        ),
        is_active=True,
    )

    db.add(employee)

    try:
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
        .where(Employee.is_active.is_(True))
        .order_by(Employee.name)
    )

    return list(db.scalars(statement).all())


def get_direct_reports(
    db: Session,
    manager_code: str,
) -> list[Employee]:
    normalized_manager_code = (
        manager_code.strip().upper()
    )

    statement = (
        select(Employee)
        .where(
            Employee.manager_code
            == normalized_manager_code,
            Employee.is_active.is_(True),
        )
        .order_by(Employee.name)
    )

    return list(db.scalars(statement).all())


def get_direct_report_by_code(
    db: Session,
    manager_code: str,
    employee_code: str,
) -> Employee | None:
    normalized_manager_code = (
        manager_code.strip().upper()
    )
    normalized_employee_code = (
        employee_code.strip().upper()
    )

    statement = select(Employee).where(
        Employee.employee_code
        == normalized_employee_code,
        Employee.manager_code
        == normalized_manager_code,
        Employee.is_active.is_(True),
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

    return employee.leave_balance


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

    return {
        "shift_start": employee.shift_start,
        "shift_end": employee.shift_end,
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

    return {
        "manager": employee.manager,
        "manager_code": employee.manager_code,
    }


def get_team_count(
    db: Session,
    manager_code: str,
) -> int:
    employees = get_direct_reports(
        db=db,
        manager_code=manager_code,
    )

    return len(employees)
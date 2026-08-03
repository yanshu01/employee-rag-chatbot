from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.permissions import get_current_employee, require_roles
from app.database.connection import get_db
from app.database.models import Employee
from app.database.queries import (
    create_employee,
    get_employee_by_code,
    get_employee_by_email,
)
from app.schemas import EmployeeCreate, EmployeeResponse
from app.tools.employee_tools import (
    get_my_leave_balance,
    get_my_remaining_shift_hours,
    get_my_shift,
)
from app.tools.manager_tools import (
    get_my_team_leave_summary,
    get_my_team_members,
    get_my_team_shift_summary,
)


router = APIRouter(
    prefix="/api/employees",
    tags=["Employees"],
)


VALID_ROLES = {
    "employee",
    "manager",
    "hr",
    "admin",
}


@router.post(
    "",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_employee(
    employee_data: EmployeeCreate,
    db: Session = Depends(get_db),
    _: Employee = Depends(require_roles("admin", "hr")),
) -> Employee:
    role = employee_data.role.lower()

    if role not in VALID_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid employee role.",
        )

    if get_employee_by_email(db, employee_data.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An employee with this email already exists.",
        )

    if get_employee_by_code(
        db,
        employee_data.employee_code.upper(),
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee code already exists.",
        )

    return create_employee(db, employee_data)


@router.get("/me/leave-balance")
def get_my_leave_balance_api(
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_my_leave_balance(db=db, current_employee=current_employee)


@router.get("/me/shift")
def get_my_shift_api(
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_my_shift(db=db, current_employee=current_employee)


@router.get("/me/remaining-hours")
def get_my_remaining_hours_api(
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_my_remaining_shift_hours(db=db, current_employee=current_employee)


@router.get("/me/team-members")
def get_my_team_members_api(
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_my_team_members(db=db, current_employee=current_employee)


@router.get("/me/team-summary")
def get_my_team_summary_api(
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_my_team_leave_summary(db=db, current_employee=current_employee)


@router.get("/me/team-shifts")
def get_my_team_shifts_api(
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_my_team_shift_summary(db=db, current_employee=current_employee)
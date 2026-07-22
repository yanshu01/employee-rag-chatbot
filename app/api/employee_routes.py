from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.permissions import require_roles
from app.database.connection import get_db
from app.database.models import Employee
from app.database.queries import (
    create_employee,
    get_employee_by_code,
    get_employee_by_email,
)
from app.schemas import EmployeeCreate, EmployeeResponse


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
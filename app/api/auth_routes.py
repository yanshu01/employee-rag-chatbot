from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.auth.authentication import verify_password
from app.auth.jwt_handler import create_access_token
from app.auth.permissions import get_current_employee
from app.database.connection import get_db
from app.database.models import Employee
from app.database.queries import get_employee_by_email
from app.schemas import (
    EmployeeResponse,
    LoginRequest,
    TokenResponse,
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


def authenticate_employee(
    db: Session,
    email: str,
    password: str,
) -> Employee:
    employee = get_employee_by_email(
        db=db,
        email=email,
    )

    if not employee or not verify_password(
        password,
        employee.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not employee.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee account is inactive",
        )

    return employee


def generate_employee_token(
    employee: Employee,
) -> TokenResponse:
    token = create_access_token(
        subject=employee.email,
        employee_code=employee.employee_code,
        role=employee.role,
    )

    return TokenResponse(
        access_token=token,
    )


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    request: LoginRequest,
    db: Session = Depends(get_db),
) -> TokenResponse:
    employee = authenticate_employee(
        db=db,
        email=request.email,
        password=request.password,
    )

    return generate_employee_token(
        employee,
    )


@router.post(
    "/login-form",
    response_model=TokenResponse,
)
def login_form(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> TokenResponse:
    employee = authenticate_employee(
        db=db,
        email=form_data.username,
        password=form_data.password,
    )

    return generate_employee_token(
        employee,
    )


@router.get(
    "/me",
    response_model=EmployeeResponse,
)
def get_my_profile(
    current_employee: Employee = Depends(
        get_current_employee,
    ),
) -> Employee:
    return current_employee
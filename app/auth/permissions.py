from collections.abc import Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.jwt_handler import decode_access_token
from app.database.connection import get_db
from app.database.models import Employee


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login-form",
)


def get_current_employee(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> Employee:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication token.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_access_token(token)
        email = payload.get("sub")

        if not email:
            raise credentials_exception

    except ValueError:
        raise credentials_exception

    employee = db.scalar(
        select(Employee).where(Employee.email == email)
    )

    if employee is None:
        raise credentials_exception

    if not employee.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This employee account is inactive.",
        )

    return employee


def require_roles(
    *allowed_roles: str,
) -> Callable:
    def role_checker(
        employee: Employee = Depends(get_current_employee),
    ) -> Employee:
        if employee.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not authorized to access this resource.",
            )

        return employee

    return role_checker
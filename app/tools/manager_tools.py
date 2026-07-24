from collections import Counter

from sqlalchemy.orm import Session

from app.database.models import Employee
from app.database.queries import (
    get_direct_reports,
    get_employee_leave_balance,
    get_employee_shift,
    get_team_count,
)

ALLOWED_MANAGER_ROLES = {
    "manager",
    "hr",
    "admin",
}


def _check_manager_permission(
    current_employee: Employee,
) -> dict | None:
    if current_employee.role.lower() not in ALLOWED_MANAGER_ROLES:
        return {
            "success": False,
            "message": (
                "You are not authorized to access "
                "team information."
            ),
        }

    return None


def get_my_team_members(
    db: Session,
    current_employee: Employee,
) -> dict:
    permission_error = _check_manager_permission(
        current_employee
    )

    if permission_error:
        return permission_error

    employees = get_direct_reports(
        db=db,
        manager_code=current_employee.employee_code,
    )

    return {
        "success": True,
        "manager_name": current_employee.name,
        "team_count": len(employees),
        "employees": [
            {
                "employee_code": employee.employee_code,
                "name": employee.name,
                "email": employee.email,
                "department": employee.department,
                "designation": employee.designation,
                "role": employee.role,
            }
            for employee in employees
        ],
    }


def get_my_team_count(
    db: Session,
    current_employee: Employee,
) -> dict:
    permission_error = _check_manager_permission(
        current_employee
    )

    if permission_error:
        return permission_error

    return {
        "success": True,
        "manager_name": current_employee.name,
        "team_count": get_team_count(
            db,
            current_employee.employee_code,
        ),
    }


def get_my_team_leave_summary(
    db: Session,
    current_employee: Employee,
) -> dict:
    permission_error = _check_manager_permission(
        current_employee
    )

    if permission_error:
        return permission_error

    employees = get_direct_reports(
        db=db,
        manager_code=current_employee.employee_code,
    )

    results = []

    for employee in employees:
        results.append(
            {
                "employee_code": employee.employee_code,
                "name": employee.name,
                "leave_balance": get_employee_leave_balance(
                    db=db,
                    employee_code=employee.employee_code,
                ),
            }
        )

    return {
        "success": True,
        "team_count": len(results),
        "employees": results,
    }


def get_my_team_shift_summary(
    db: Session,
    current_employee: Employee,
) -> dict:
    permission_error = _check_manager_permission(
        current_employee
    )

    if permission_error:
        return permission_error

    employees = get_direct_reports(
        db=db,
        manager_code=current_employee.employee_code,
    )

    team = []
    shift_names = []

    for employee in employees:
        shift = get_employee_shift(
            db=db,
            employee_code=employee.employee_code,
        )

        if shift:
            shift_name = (
                f"{shift['shift_start']} - "
                f"{shift['shift_end']}"
            )

            team.append(
                {
                    "employee_code": employee.employee_code,
                    "name": employee.name,
                    "shift_start": shift[
                        "shift_start"
                    ].strftime("%I:%M %p"),
                    "shift_end": shift[
                        "shift_end"
                    ].strftime("%I:%M %p"),
                }
            )
        else:
            shift_name = "No Shift"

            team.append(
                {
                    "employee_code": employee.employee_code,
                    "name": employee.name,
                    "shift_start": None,
                    "shift_end": None,
                }
            )

        shift_names.append(shift_name)

    return {
        "success": True,
        "team_count": len(team),
        "shift_distribution": dict(
            Counter(shift_names)
        ),
        "employees": team,
    }


def get_my_team_attendance_today(
    db: Session,
    current_employee: Employee,
) -> dict:
    permission_error = _check_manager_permission(
        current_employee
    )

    if permission_error:
        return permission_error

    return {
        "success": False,
        "message": (
            "Attendance tracking has not yet "
            "been implemented in the MySQL "
            "dummy database."
        ),
    }


def get_my_team_present_count(
    db: Session,
    current_employee: Employee,
) -> dict:
    return get_my_team_attendance_today(
        db,
        current_employee,
    )


def get_my_team_absent_count(
    db: Session,
    current_employee: Employee,
) -> dict:
    return get_my_team_attendance_today(
        db,
        current_employee,
    )


def get_my_team_members_on_leave(
    db: Session,
    current_employee: Employee,
) -> dict:
    return get_my_team_attendance_today(
        db,
        current_employee,
    )


def get_my_team_members_working_from_home(
    db: Session,
    current_employee: Employee,
) -> dict:
    return get_my_team_attendance_today(
        db,
        current_employee,
    )


def get_my_team_late_arrivals(
    db: Session,
    current_employee: Employee,
) -> dict:
    return get_my_team_attendance_today(
        db,
        current_employee,
    )


def get_my_team_missing_checkouts(
    db: Session,
    current_employee: Employee,
) -> dict:
    return get_my_team_attendance_today(
        db,
        current_employee,
    )
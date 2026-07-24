from datetime import datetime

from sqlalchemy.orm import Session

from app.database.models import Employee
from app.database.queries import (
    get_employee_leave_balance,
    get_employee_shift,
)


def get_my_leave_balance(
    db: Session,
    current_employee: Employee,
) -> dict:
    leave_balance = get_employee_leave_balance(
        db=db,
        employee_code=current_employee.employee_code,
    )

    if leave_balance is None:
        return {
            "success": False,
            "message": (
                "No leave balance record was found "
                "for your account."
            ),
        }

    return {
        "success": True,
        "employee_name": current_employee.name,
        "employee_code": current_employee.employee_code,
        "leave_balance": leave_balance,
        "message": (
            f"You have {leave_balance} leave days "
            "remaining."
        ),
    }


def get_my_shift(
    db: Session,
    current_employee: Employee,
) -> dict:
    shift = get_employee_shift(
        db=db,
        employee_code=current_employee.employee_code,
    )

    if not shift:
        return {
            "success": False,
            "message": (
                "No shift record was found "
                "for your account."
            ),
        }

    shift_start = shift.get("shift_start")
    shift_end = shift.get("shift_end")

    if shift_start is None or shift_end is None:
        return {
            "success": False,
            "message": (
                "Your shift timing is not configured."
            ),
        }

    start_time = shift_start.strftime("%I:%M %p")
    end_time = shift_end.strftime("%I:%M %p")

    return {
        "success": True,
        "employee_name": current_employee.name,
        "employee_code": current_employee.employee_code,
        "start_time": start_time,
        "end_time": end_time,
        "message": (
            f"Your shift is from {start_time} "
            f"to {end_time}."
        ),
    }


def get_my_attendance(
    db: Session,
    current_employee: Employee,
) -> dict:
    return {
        "success": False,
        "employee_name": current_employee.name,
        "message": (
            "Attendance data is not available in "
            "the current dummy database."
        ),
    }


def get_my_remaining_shift_hours(
    db: Session,
    current_employee: Employee,
) -> dict:
    shift = get_employee_shift(
        db=db,
        employee_code=current_employee.employee_code,
    )

    if not shift:
        return {
            "success": False,
            "message": (
                "No shift record was found "
                "for your account."
            ),
        }

    shift_start = shift.get("shift_start")
    shift_end = shift.get("shift_end")

    if shift_start is None or shift_end is None:
        return {
            "success": False,
            "message": (
                "Your shift timing is not configured."
            ),
        }

    now = datetime.now()
    current_time = now.time()

    start_datetime = datetime.combine(
        now.date(),
        shift_start,
    )
    end_datetime = datetime.combine(
        now.date(),
        shift_end,
    )
    current_datetime = datetime.combine(
        now.date(),
        current_time,
    )

    total_shift_hours = (
        end_datetime - start_datetime
    ).total_seconds() / 3600

    if current_datetime <= start_datetime:
        remaining_hours = total_shift_hours
        status = "Shift has not started yet."

    elif current_datetime >= end_datetime:
        remaining_hours = 0
        status = "Shift has ended."

    else:
        remaining_hours = (
            end_datetime - current_datetime
        ).total_seconds() / 3600

        status = "Shift is currently active."

    return {
        "success": True,
        "employee_name": current_employee.name,
        "shift_start": shift_start.strftime(
            "%I:%M %p"
        ),
        "shift_end": shift_end.strftime(
            "%I:%M %p"
        ),
        "remaining_hours": round(
            remaining_hours,
            2,
        ),
        "status": status,
    }
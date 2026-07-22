from datetime import date, datetime

from sqlalchemy.orm import Session

from app.database.models import Employee
from app.database.queries import (
    get_attendance_for_date,
    get_employee_shift,
    get_leave_balance_by_employee_id,
)


def get_my_leave_balance(
    db: Session,
    current_employee: Employee,
) -> dict:
    leave_balance = get_leave_balance_by_employee_id(
        db=db,
        employee_id=current_employee.id,
    )

    if not leave_balance:
        return {
            "success": False,
            "message": (
                "No leave balance record was found "
                "for your account."
            ),
        }

    casual_remaining = max(
        leave_balance.casual_total
        - leave_balance.casual_used,
        0,
    )

    sick_remaining = max(
        leave_balance.sick_total
        - leave_balance.sick_used,
        0,
    )

    earned_remaining = max(
        leave_balance.earned_total
        - leave_balance.earned_used,
        0,
    )

    return {
        "success": True,
        "employee_name": current_employee.name,
        "casual": {
            "total": leave_balance.casual_total,
            "used": leave_balance.casual_used,
            "remaining": casual_remaining,
        },
        "sick": {
            "total": leave_balance.sick_total,
            "used": leave_balance.sick_used,
            "remaining": sick_remaining,
        },
        "earned": {
            "total": leave_balance.earned_total,
            "used": leave_balance.earned_used,
            "remaining": earned_remaining,
        },
    }


def get_my_attendance(
    db: Session,
    current_employee: Employee,
) -> dict:
    attendance = get_attendance_for_date(
        db=db,
        employee_id=current_employee.id,
        attendance_date=date.today(),
    )

    if not attendance:
        return {
            "success": False,
            "message": (
                "No attendance record was found "
                "for today."
            ),
        }

    return {
        "success": True,
        "employee_name": current_employee.name,
        "date": attendance.attendance_date.isoformat(),
        "status": attendance.status,
        "check_in": (
            attendance.check_in.isoformat()
            if attendance.check_in
            else None
        ),
        "check_out": (
            attendance.check_out.isoformat()
            if attendance.check_out
            else None
        ),
        "worked_hours": attendance.worked_hours,
    }


def get_my_shift(
    db: Session,
    current_employee: Employee,
) -> dict:
    shift = get_employee_shift(
        db=db,
        employee_id=current_employee.id,
    )

    if not shift:
        return {
            "success": False,
            "message": (
                "No shift record was found "
                "for your account."
            ),
        }

    return {
        "success": True,
        "employee_name": current_employee.name,
        "shift_name": shift.shift_name,
        "start_time": shift.start_time.strftime(
            "%I:%M %p"
        ),
        "end_time": shift.end_time.strftime(
            "%I:%M %p"
        ),
        "required_hours": shift.required_hours,
    }


def get_my_remaining_shift_hours(
    db: Session,
    current_employee: Employee,
) -> dict:
    shift = get_employee_shift(
        db=db,
        employee_id=current_employee.id,
    )

    attendance = get_attendance_for_date(
        db=db,
        employee_id=current_employee.id,
        attendance_date=date.today(),
    )

    if not shift:
        return {
            "success": False,
            "message": "No shift record was found.",
        }

    if not attendance:
        return {
            "success": False,
            "message": (
                "No attendance record was found "
                "for today."
            ),
        }

    remaining_hours = max(
        shift.required_hours
        - attendance.worked_hours,
        0,
    )

    return {
        "success": True,
        "employee_name": current_employee.name,
        "required_hours": shift.required_hours,
        "worked_hours": attendance.worked_hours,
        "remaining_hours": round(
            remaining_hours,
            2,
        ),
    }
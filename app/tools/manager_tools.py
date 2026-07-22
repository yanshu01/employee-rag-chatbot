from collections import Counter
from datetime import date

from sqlalchemy.orm import Session

from app.database.models import Employee
from app.database.queries import (
    get_direct_reports,
    get_team_attendance_for_date,
    get_team_shift_records,
)


ALLOWED_MANAGER_ROLES = {
    "manager",
    "hr",
    "admin",
}


def _check_manager_permission(
    current_employee: Employee,
) -> dict | None:
    if current_employee.role.lower() not in (
        ALLOWED_MANAGER_ROLES
    ):
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
        manager_code=(
            current_employee.employee_code
        ),
    )

    return {
        "success": True,
        "manager_name": current_employee.name,
        "team_count": len(employees),
        "employees": [
            {
                "employee_code": (
                    employee.employee_code
                ),
                "name": employee.name,
                "email": employee.email,
                "department": employee.department,
                "role": employee.role,
            }
            for employee in employees
        ],
    }


def get_my_team_count(
    db: Session,
    current_employee: Employee,
) -> dict:
    result = get_my_team_members(
        db=db,
        current_employee=current_employee,
    )

    if not result["success"]:
        return result

    return {
        "success": True,
        "manager_name": result["manager_name"],
        "team_count": result["team_count"],
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

    attendance_records = (
        get_team_attendance_for_date(
            db=db,
            manager_code=(
                current_employee.employee_code
            ),
            attendance_date=date.today(),
        )
    )

    employees: list[dict] = []

    for employee, attendance in (
        attendance_records
    ):
        if attendance:
            status = attendance.status
            check_in = (
                attendance.check_in.strftime(
                    "%I:%M %p"
                )
                if attendance.check_in
                else None
            )
            check_out = (
                attendance.check_out.strftime(
                    "%I:%M %p"
                )
                if attendance.check_out
                else None
            )
            worked_hours = (
                attendance.worked_hours
            )
        else:
            status = "no_record"
            check_in = None
            check_out = None
            worked_hours = 0

        employees.append(
            {
                "employee_code": (
                    employee.employee_code
                ),
                "name": employee.name,
                "status": status,
                "check_in": check_in,
                "check_out": check_out,
                "worked_hours": worked_hours,
            }
        )

    return {
        "success": True,
        "date": date.today().isoformat(),
        "team_count": len(employees),
        "employees": employees,
    }


def get_my_team_present_count(
    db: Session,
    current_employee: Employee,
) -> dict:
    result = get_my_team_attendance_today(
        db=db,
        current_employee=current_employee,
    )

    if not result["success"]:
        return result

    present_statuses = {
        "present",
        "work_from_home",
        "half_day",
    }

    present_employees = [
        employee
        for employee in result["employees"]
        if employee["status"].lower()
        in present_statuses
    ]

    return {
        "success": True,
        "present_count": len(
            present_employees
        ),
        "team_count": result["team_count"],
        "employees": present_employees,
    }


def get_my_team_absent_count(
    db: Session,
    current_employee: Employee,
) -> dict:
    result = get_my_team_attendance_today(
        db=db,
        current_employee=current_employee,
    )

    if not result["success"]:
        return result

    absent_statuses = {
        "absent",
        "no_record",
    }

    absent_employees = [
        employee
        for employee in result["employees"]
        if employee["status"].lower()
        in absent_statuses
    ]

    return {
        "success": True,
        "absent_count": len(
            absent_employees
        ),
        "team_count": result["team_count"],
        "employees": absent_employees,
    }


def get_my_team_members_on_leave(
    db: Session,
    current_employee: Employee,
) -> dict:
    result = get_my_team_attendance_today(
        db=db,
        current_employee=current_employee,
    )

    if not result["success"]:
        return result

    employees = [
        employee
        for employee in result["employees"]
        if employee["status"].lower()
        == "leave"
    ]

    return {
        "success": True,
        "count": len(employees),
        "employees": employees,
    }


def get_my_team_members_working_from_home(
    db: Session,
    current_employee: Employee,
) -> dict:
    result = get_my_team_attendance_today(
        db=db,
        current_employee=current_employee,
    )

    if not result["success"]:
        return result

    employees = [
        employee
        for employee in result["employees"]
        if employee["status"].lower()
        == "work_from_home"
    ]

    return {
        "success": True,
        "count": len(employees),
        "employees": employees,
    }


def get_my_team_late_arrivals(
    db: Session,
    current_employee: Employee,
) -> dict:
    permission_error = _check_manager_permission(
        current_employee
    )

    if permission_error:
        return permission_error

    attendance_records = (
        get_team_attendance_for_date(
            db=db,
            manager_code=(
                current_employee.employee_code
            ),
            attendance_date=date.today(),
        )
    )

    late_employees: list[dict] = []

    for employee, attendance in (
        attendance_records
    ):
        if not attendance:
            continue

        late_minutes = getattr(
            attendance,
            "late_minutes",
            0,
        )

        if late_minutes and late_minutes > 0:
            late_employees.append(
                {
                    "employee_code": (
                        employee.employee_code
                    ),
                    "name": employee.name,
                    "check_in": (
                        attendance.check_in.strftime(
                            "%I:%M %p"
                        )
                        if attendance.check_in
                        else None
                    ),
                    "late_minutes": late_minutes,
                }
            )

    return {
        "success": True,
        "count": len(late_employees),
        "employees": late_employees,
    }


def get_my_team_missing_checkouts(
    db: Session,
    current_employee: Employee,
) -> dict:
    result = get_my_team_attendance_today(
        db=db,
        current_employee=current_employee,
    )

    if not result["success"]:
        return result

    employees = [
        employee
        for employee in result["employees"]
        if employee["check_in"] is not None
        and employee["check_out"] is None
    ]

    return {
        "success": True,
        "count": len(employees),
        "employees": employees,
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

    shift_records = get_team_shift_records(
        db=db,
        manager_code=(
            current_employee.employee_code
        ),
    )

    employees: list[dict] = []
    shift_names: list[str] = []

    for employee, shift in shift_records:
        if shift:
            shift_name = shift.shift_name

            employees.append(
                {
                    "employee_code": (
                        employee.employee_code
                    ),
                    "name": employee.name,
                    "shift_name": shift.shift_name,
                    "start_time": (
                        shift.start_time.strftime(
                            "%I:%M %p"
                        )
                    ),
                    "end_time": (
                        shift.end_time.strftime(
                            "%I:%M %p"
                        )
                    ),
                }
            )
        else:
            shift_name = "No active shift"

            employees.append(
                {
                    "employee_code": (
                        employee.employee_code
                    ),
                    "name": employee.name,
                    "shift_name": shift_name,
                    "start_time": None,
                    "end_time": None,
                }
            )

        shift_names.append(shift_name)

    distribution = dict(
        Counter(shift_names)
    )

    return {
        "success": True,
        "team_count": len(employees),
        "shift_distribution": distribution,
        "employees": employees,
    }
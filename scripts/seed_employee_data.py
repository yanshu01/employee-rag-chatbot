from datetime import date, datetime, time

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.authentication import get_password_hash
from app.database.connection import SessionLocal
from app.database.models import (
    Attendance,
    Employee,
    EmployeeShift,
    LeaveBalance,
)


def get_or_create_employee(
    db: Session,
    employee_code: str,
    name: str,
    email: str,
    password: str,
    role: str,
    department: str,
    manager_code: str | None = None,
) -> Employee:
    normalized_email = email.lower().strip()
    normalized_employee_code = (
        employee_code.upper().strip()
    )

    employee = db.scalar(
        select(Employee).where(
            Employee.email == normalized_email
        )
    )

    if employee:
        employee.name = name.strip()
        employee.employee_code = (
            normalized_employee_code
        )
        employee.role = role.lower().strip()
        employee.department = department.strip()
        employee.manager_code = (
            manager_code.upper().strip()
            if manager_code
            else None
        )
        employee.is_active = True

        return employee

    employee = Employee(
        employee_code=normalized_employee_code,
        name=name.strip(),
        email=normalized_email,
        password_hash=get_password_hash(password),
        role=role.lower().strip(),
        department=department.strip(),
        manager_code=(
            manager_code.upper().strip()
            if manager_code
            else None
        ),
        is_active=True,
    )

    db.add(employee)
    db.flush()

    return employee


def seed_employee_records(
    db: Session,
    employee: Employee,
    shift_name: str,
    shift_start: time,
    shift_end: time,
    required_hours: float,
    casual_used: float,
    sick_used: float,
    earned_used: float,
    attendance_status: str = "present",
    check_in_time: time | None = None,
    check_out_time: time | None = None,
    worked_hours: float = 0,
) -> None:
    leave_balance = db.scalar(
        select(LeaveBalance).where(
            LeaveBalance.employee_id == employee.id
        )
    )

    if not leave_balance:
        leave_balance = LeaveBalance(
            employee_id=employee.id,
            casual_total=12,
            casual_used=casual_used,
            sick_total=10,
            sick_used=sick_used,
            earned_total=15,
            earned_used=earned_used,
        )

        db.add(leave_balance)
    else:
        leave_balance.casual_used = casual_used
        leave_balance.sick_used = sick_used
        leave_balance.earned_used = earned_used

    shift = db.scalar(
        select(EmployeeShift).where(
            EmployeeShift.employee_id == employee.id
        )
    )

    if not shift:
        shift = EmployeeShift(
            employee_id=employee.id,
            shift_name=shift_name,
            start_time=shift_start,
            end_time=shift_end,
            required_hours=required_hours,
        )

        db.add(shift)
    else:
        shift.shift_name = shift_name
        shift.start_time = shift_start
        shift.end_time = shift_end
        shift.required_hours = required_hours

    today = date.today()

    attendance = db.scalar(
        select(Attendance).where(
            Attendance.employee_id == employee.id,
            Attendance.attendance_date == today,
        )
    )

    check_in = (
        datetime.combine(today, check_in_time)
        if check_in_time
        else None
    )

    check_out = (
        datetime.combine(today, check_out_time)
        if check_out_time
        else None
    )

    if not attendance:
        attendance = Attendance(
            employee_id=employee.id,
            attendance_date=today,
            check_in=check_in,
            check_out=check_out,
            status=attendance_status,
            worked_hours=worked_hours,
        )

        db.add(attendance)
    else:
        attendance.check_in = check_in
        attendance.check_out = check_out
        attendance.status = attendance_status
        attendance.worked_hours = worked_hours


def main() -> None:
    db = SessionLocal()

    try:
        manager = get_or_create_employee(
            db=db,
            employee_code="MGR001",
            name="Test Manager",
            email="manager@company.com",
            password="Manager@123",
            role="manager",
            department="Engineering",
            manager_code=None,
        )

        team_employees = [
            {
                "employee_code": "EMP001",
                "name": "Yateen Sharma",
                "email": "employee@company.com",
                "password": "Employee@123",
                "department": "Engineering",
                "shift_name": "Evening Shift",
                "shift_start": time(16, 30),
                "shift_end": time(1, 30),
                "required_hours": 8,
                "casual_used": 4,
                "sick_used": 2,
                "earned_used": 5,
                "attendance_status": "present",
                "check_in_time": time(16, 30),
                "check_out_time": None,
                "worked_hours": 4.5,
            },
            {
                "employee_code": "EMP002",
                "name": "Rahul Verma",
                "email": "rahul.verma@company.com",
                "password": "Rahul@123",
                "department": "Engineering",
                "shift_name": "General Shift",
                "shift_start": time(9, 30),
                "shift_end": time(18, 30),
                "required_hours": 8,
                "casual_used": 2,
                "sick_used": 1,
                "earned_used": 3,
                "attendance_status": "present",
                "check_in_time": time(9, 45),
                "check_out_time": None,
                "worked_hours": 5.5,
            },
            {
                "employee_code": "EMP003",
                "name": "Priya Singh",
                "email": "priya.singh@company.com",
                "password": "Priya@123",
                "department": "Engineering",
                "shift_name": "General Shift",
                "shift_start": time(9, 30),
                "shift_end": time(18, 30),
                "required_hours": 8,
                "casual_used": 1,
                "sick_used": 2,
                "earned_used": 4,
                "attendance_status": "wfh",
                "check_in_time": time(9, 25),
                "check_out_time": None,
                "worked_hours": 6,
            },
            {
                "employee_code": "EMP004",
                "name": "Aman Gupta",
                "email": "aman.gupta@company.com",
                "password": "Aman@123",
                "department": "Engineering",
                "shift_name": "Morning Shift",
                "shift_start": time(7, 0),
                "shift_end": time(16, 0),
                "required_hours": 8,
                "casual_used": 3,
                "sick_used": 3,
                "earned_used": 2,
                "attendance_status": "leave",
                "check_in_time": None,
                "check_out_time": None,
                "worked_hours": 0,
            },
        ]

        seed_employee_records(
            db=db,
            employee=manager,
            shift_name="General Shift",
            shift_start=time(9, 30),
            shift_end=time(18, 30),
            required_hours=8,
            casual_used=3,
            sick_used=1,
            earned_used=2,
            attendance_status="present",
            check_in_time=time(9, 30),
            check_out_time=None,
            worked_hours=5,
        )

        created_employees: list[Employee] = []

        for employee_data in team_employees:
            employee = get_or_create_employee(
                db=db,
                employee_code=employee_data[
                    "employee_code"
                ],
                name=employee_data["name"],
                email=employee_data["email"],
                password=employee_data["password"],
                role="employee",
                department=employee_data[
                    "department"
                ],
                manager_code="MGR001",
            )

            seed_employee_records(
                db=db,
                employee=employee,
                shift_name=employee_data[
                    "shift_name"
                ],
                shift_start=employee_data[
                    "shift_start"
                ],
                shift_end=employee_data[
                    "shift_end"
                ],
                required_hours=employee_data[
                    "required_hours"
                ],
                casual_used=employee_data[
                    "casual_used"
                ],
                sick_used=employee_data[
                    "sick_used"
                ],
                earned_used=employee_data[
                    "earned_used"
                ],
                attendance_status=employee_data[
                    "attendance_status"
                ],
                check_in_time=employee_data[
                    "check_in_time"
                ],
                check_out_time=employee_data[
                    "check_out_time"
                ],
                worked_hours=employee_data[
                    "worked_hours"
                ],
            )

            created_employees.append(employee)

        db.commit()

        print(
            "Manager and team employee data "
            "created successfully."
        )
        print()

        print("Manager login:")
        print("Email: manager@company.com")
        print("Password: Manager@123")
        print()

        print("Team employees:")

        for employee_data in team_employees:
            print(
                f"{employee_data['employee_code']} - "
                f"{employee_data['name']} - "
                f"{employee_data['email']} - "
                f"Manager: MGR001"
            )

    except Exception as exc:
        db.rollback()
        print(
            f"Unable to seed employee data: {exc}"
        )
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()
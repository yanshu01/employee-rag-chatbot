from datetime import date, datetime, time
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Time,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database.connection import Base


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(
        "employee_id",
        Integer,
        primary_key=True,
        autoincrement=True,
        index=True,
    )

    employee_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        "full_name",
        String(150),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    department: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    designation: Mapped[str | None] = mapped_column(
        "position",
        String(100),
        nullable=True,
    )

    phone_number: Mapped[str | None] = mapped_column(
        String(15),
        nullable=True,
    )

    join_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="active",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    is_admin: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    role: Mapped[str] = mapped_column(
        String(50),
        default="employee",
        nullable=False,
    )

    @property
    def is_active(self) -> bool:
        return self.status == "active"

    @property
    def full_name(self) -> str:
        return self.name

    @property
    def position(self) -> str | None:
        return self.designation


class EmployeeManagerMap(Base):
    __tablename__ = "employee_manager_map"

    employee_id: Mapped[int] = mapped_column(
        ForeignKey(
            "employees.employee_id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )

    manager_id: Mapped[int] = mapped_column(
        ForeignKey(
            "employees.employee_id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )


class LeaveBalance(Base):
    __tablename__ = "leave_balance"
    __table_args__ = (
        UniqueConstraint(
            "employee_id",
            "year",
            "leave_type",
            name="uq_leave_balance",
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    employee_id: Mapped[int] = mapped_column(
        ForeignKey("employees.employee_id"),
        nullable=False,
        index=True,
    )

    year: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    leave_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    allocated: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    used: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )


class EmployeeShift(Base):
    __tablename__ = "employee_shifts"
    __table_args__ = (
        UniqueConstraint(
            "employee_id",
            "shift_date",
            name="uq_employee_shift_date",
        ),
    )

    shift_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    employee_id: Mapped[int] = mapped_column(
        ForeignKey("employees.employee_id"),
        nullable=False,
        index=True,
    )

    shift_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    shift_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    scheduled_start: Mapped[time] = mapped_column(
        Time,
        nullable=False,
    )

    scheduled_end: Mapped[time] = mapped_column(
        Time,
        nullable=False,
    )

    actual_clock_in: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    actual_clock_out: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    total_worked_hours: Mapped[Decimal | None] = mapped_column(
        Numeric(5, 2),
        nullable=True,
    )

    late_minutes: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    overtime_minutes: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    shift_status: Mapped[str] = mapped_column(
        String(20),
        default="scheduled",
        nullable=False,
    )

    notes: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )
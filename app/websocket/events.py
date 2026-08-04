import asyncio
import logging
from typing import Any
from sqlalchemy import event
from sqlalchemy.orm import Session
from app.database.models import Employee
from app.websocket.manager import ws_manager

logger = logging.getLogger("db_events")


def dispatch_async_event(coro):
    """
    Safely executes an async coroutine on the running asyncio event loop or schedules it.
    """
    try:
        loop = asyncio.get_running_loop()
        if loop.is_running():
            asyncio.create_task(coro)
        else:
            loop.run_until_complete(coro)
    except RuntimeError:
        # If called from a separate thread without running loop
        try:
            loop = asyncio.get_event_loop()
            if loop.is_running():
                asyncio.run_coroutine_threadsafe(coro, loop)
            else:
                loop.run_until_complete(coro)
        except Exception as exc:
            logger.warning(f"Could not dispatch async WS event: {exc}")


def on_employee_after_update(mapper: Any, connection: Any, target: Employee) -> None:
    """
    SQLAlchemy ORM Event Listener: Triggered whenever an Employee record is updated in the database.
    """
    logger.info(f"Database Change Detected for Employee {target.employee_code} ({target.name})")

    # 1. Personal Event Payload
    employee_payload = {
        "employee_code": target.employee_code,
        "name": target.name,
        "email": target.email,
        "role": target.role,
        "department": target.department,
        "leave_balance": target.leave_balance,
        "shift_start": str(target.shift_start) if target.shift_start else None,
        "shift_end": str(target.shift_end) if target.shift_end else None,
        "manager_code": target.manager_code
    }

    # Dispatch personal update to employee
    dispatch_async_event(
        ws_manager.send_personal_event(
            employee_code=target.employee_code,
            event_type="profile_updated",
            data=employee_payload
        )
    )

    # Specific event types for granular widget refresh
    dispatch_async_event(
        ws_manager.send_personal_event(
            employee_code=target.employee_code,
            event_type="leave_updated",
            data={"leave_balance": target.leave_balance}
        )
    )

    dispatch_async_event(
        ws_manager.send_personal_event(
            employee_code=target.employee_code,
            event_type="shift_updated",
            data={"shift_start": str(target.shift_start), "shift_end": str(target.shift_end)}
        )
    )

    # 2. Team Event Payload to Manager if employee has a manager
    if target.manager_code:
        dispatch_async_event(
            ws_manager.send_team_event(
                manager_code=target.manager_code,
                event_type="team_updated",
                data=employee_payload
            )
        )


def register_db_events() -> None:
    """
    Registers ORM event listeners on SQLAlchemy models for real-time DB change broadcasting.
    """
    event.listen(Employee, "after_update", on_employee_after_update)
    event.listen(Employee, "after_insert", on_employee_after_update)
    logger.info("SQLAlchemy Real-Time Database Event Listeners successfully registered.")

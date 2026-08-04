import json
import logging
from typing import Any, Dict
from fastapi import APIRouter, Depends, Query, WebSocket, WebSocketDisconnect, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.jwt_handler import decode_access_token
from app.database.connection import get_db
from app.database.queries import get_employee_by_email
from app.websocket.manager import ws_manager
from app.websocket.cdc_checker import inspect_cdc_capability

logger = logging.getLogger("ws_routes")
router = APIRouter(tags=["WebSocket Real-Time Sync"])


@router.get("/api/ws/status")
def get_ws_status():
    """
    Returns current WebSocket connection metrics & CDC capability status.
    """
    cdc_info = inspect_cdc_capability()
    return {
        "status": "online",
        "active_users_connected": len(ws_manager.active_connections),
        "total_sockets": len(ws_manager.socket_user_map),
        "cdc": cdc_info
    }


@router.websocket("/api/ws")
@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    token: str = Query(..., description="JWT Bearer access token for authentication")
):
    """
    Real-Time WebSocket Data Synchronization Endpoint.
    Authenticates user via JWT token and maintains live event connection.
    """
    # 1. Validate JWT Token
    payload = decode_access_token(token)
    if not payload:
        logger.warning("WebSocket Connection Rejected: Invalid or Expired JWT Token")
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    email = payload.get("sub")
    role = payload.get("role", "employee")
    employee_code = payload.get("employee_code")

    if not email:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    # User metadata
    user_info = {
        "email": email,
        "role": role,
        "employee_code": employee_code or email.split("@")[0].upper(),
        "name": email.split("@")[0].title()
    }

    # Connect to WebSocket Manager
    await ws_manager.connect(websocket, user_info)

    try:
        while True:
            # Receive client messages (heartbeat pings / queries)
            data_text = await websocket.receive_text()
            try:
                msg = json.loads(data_text)
                msg_type = msg.get("type") or msg.get("action")
                
                if msg_type == "ping":
                    await websocket.send_json({"event": "pong", "timestamp": msg.get("timestamp")})
                elif msg_type == "subscribe":
                    await websocket.send_json({"event": "subscribed", "topic": msg.get("topic")})
            except Exception:
                # Raw text message fallback
                if data_text.strip() == "ping":
                    await websocket.send_text("pong")
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket Exception for {email}: {e}")
        ws_manager.disconnect(websocket)


@router.post("/api/ws/notify-employee-update")
async def notify_employee_update(
    employee_code: str,
    event_type: str = "profile_updated",
    leave_balance: int | None = None,
    shift_start: str | None = None,
    shift_end: str | None = None
):
    """
    Utility Endpoint to manually trigger real-time WebSocket event pushes to connected employees.
    """
    event_data = {
        "employee_code": employee_code,
        "timestamp": str(logging.Formatter().formatTime(logging.LogRecord("", 0, "", 0, "", (), None)))
    }
    if leave_balance is not None:
        event_data["leave_balance"] = leave_balance
    if shift_start is not None:
        event_data["shift_start"] = shift_start
    if shift_end is not None:
        event_data["shift_end"] = shift_end

    await ws_manager.send_personal_event(
        employee_code=employee_code,
        event_type=event_type,
        data=event_data
    )

    return {
        "status": "success",
        "message": f"Real-time WebSocket event '{event_type}' dispatched to {employee_code}",
        "data": event_data
    }

import asyncio
import json
import logging
from typing import Any, Dict, List, Set
from fastapi import WebSocket, status

logger = logging.getLogger("websocket_manager")


class ConnectionManager:
    def __init__(self) -> None:
        # Maps employee_code to set of active WebSockets
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        # Maps WebSocket to employee dict metadata
        self.socket_user_map: Dict[WebSocket, Dict[str, Any]] = {}
        # Loop reference for async dispatching from threads
        self.loop: asyncio.AbstractEventLoop | None = None

    def set_loop(self, loop: asyncio.AbstractEventLoop) -> None:
        self.loop = loop

    async def connect(self, websocket: WebSocket, employee_data: Dict[str, Any]) -> None:
        await websocket.accept()
        employee_code = employee_data.get("employee_code", "").upper().strip()
        
        if not employee_code:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return

        if employee_code not in self.active_connections:
            self.active_connections[employee_code] = set()

        self.active_connections[employee_code].add(websocket)
        self.socket_user_map[websocket] = employee_data

        logger.info(f"WebSocket connected for employee: {employee_code} ({employee_data.get('role')})")
        
        # Send initial connection acknowledgment
        await websocket.send_json({
            "event": "connection_established",
            "message": f"Connected to Real-Time AI Employee Assistant stream.",
            "user": {
                "employee_code": employee_code,
                "role": employee_data.get("role"),
                "name": employee_data.get("name")
            }
        })

    def disconnect(self, websocket: WebSocket) -> None:
        if websocket in self.socket_user_map:
            user_data = self.socket_user_map.pop(websocket)
            employee_code = user_data.get("employee_code", "").upper().strip()
            
            if employee_code in self.active_connections:
                self.active_connections[employee_code].discard(websocket)
                if not self.active_connections[employee_code]:
                    del self.active_connections[employee_code]
            
            logger.info(f"WebSocket disconnected for employee: {employee_code}")

    async def send_personal_event(self, employee_code: str, event_type: str, data: Dict[str, Any]) -> None:
        normalized_code = employee_code.upper().strip()
        connections = self.active_connections.get(normalized_code, set())
        
        payload = {
            "event": event_type,
            "target": "personal",
            "employee_code": normalized_code,
            "data": data
        }

        dead_sockets: List[WebSocket] = []
        for ws in list(connections):
            try:
                await ws.send_json(payload)
            except Exception as e:
                logger.warning(f"Error sending personal WS event to {normalized_code}: {e}")
                dead_sockets.append(ws)

        for ws in dead_sockets:
            self.disconnect(ws)

    async def send_team_event(self, manager_code: str, event_type: str, data: Dict[str, Any]) -> None:
        normalized_mgr = manager_code.upper().strip()
        payload = {
            "event": event_type,
            "target": "team",
            "manager_code": normalized_mgr,
            "data": data
        }

        dead_sockets: List[WebSocket] = []
        for ws, user_info in list(self.socket_user_map.items()):
            # Send to manager or members assigned to this manager
            if (
                user_info.get("employee_code", "").upper() == normalized_mgr or
                user_info.get("manager_code", "").upper() == normalized_mgr
            ):
                try:
                    await ws.send_json(payload)
                except Exception as e:
                    logger.warning(f"Error sending team WS event to {user_info.get('employee_code')}: {e}")
                    dead_sockets.append(ws)

        for ws in dead_sockets:
            self.disconnect(ws)

    async def broadcast_event(self, event_type: str, data: Dict[str, Any]) -> None:
        payload = {
            "event": event_type,
            "target": "all",
            "data": data
        }

        dead_sockets: List[WebSocket] = []
        for ws in list(self.socket_user_map.keys()):
            try:
                await ws.send_json(payload)
            except Exception as e:
                logger.warning(f"Error broadcasting WS event: {e}")
                dead_sockets.append(ws)

        for ws in dead_sockets:
            self.disconnect(ws)


# Global singleton ConnectionManager
ws_manager = ConnectionManager()

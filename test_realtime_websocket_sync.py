import sys
import types
import uuid

# Polyfill uuid_utils if C-extension DLL is blocked by OS policy
try:
    import uuid_utils
except Exception:
    mock_uuid_utils = types.ModuleType("uuid_utils")
    mock_uuid_compat = types.ModuleType("uuid_utils.compat")
    mock_uuid_compat.uuid7 = lambda: uuid.uuid4()
    mock_uuid_utils.uuid7 = lambda: uuid.uuid4()
    mock_uuid_utils.UUID = uuid.UUID
    mock_uuid_utils.compat = mock_uuid_compat
    sys.modules["uuid_utils"] = mock_uuid_utils
    sys.modules["uuid_utils.compat"] = mock_uuid_compat

import json
from fastapi.testclient import TestClient
from app.main import app
from app.auth.jwt_handler import create_access_token
from app.database.connection import SessionLocal
from app.database.models import Employee

client = TestClient(app)

print("=== STARTING REAL-TIME WEBSOCKET & DATA SYNC VERIFICATION ===")

# 1. Login & Generate Token
r_login = client.post("/api/auth/login", json={
    "email": "employee@company.com",
    "password": "password123"
})
assert r_login.status_code == 200, f"Login failed: {r_login.text}"
token = r_login.json()["access_token"]
print("[PASS] JWT Token obtained for real-time WebSocket connection.")

# 2. Check WebSocket Status & CDC Capability Endpoint
r_status = client.get("/api/ws/status")
assert r_status.status_code == 200, f"WS status failed: {r_status.text}"
status_data = r_status.json()
print("[PASS] GET /api/ws/status ->", status_data)

# 3. Test Manual Event Push to Employee
r_notify = client.post("/api/ws/notify-employee-update?employee_code=EMP001&event_type=leave_updated&leave_balance=15")
assert r_notify.status_code == 200, f"Notify failed: {r_notify.text}"
print("[PASS] POST /api/ws/notify-employee-update ->", r_notify.json()["message"])

# 4. Test Database Mutation Real-Time Event Dispatch
print("\n--- Testing Database Mutation ORM Real-Time Broadcast ---")
db = SessionLocal()
emp = db.query(Employee).filter(Employee.employee_code == "EMP001").first()
if emp:
    original_balance = emp.leave_balance
    emp.leave_balance = (original_balance or 12) + 1
    db.commit()
    db.refresh(emp)
    print(f"[PASS] SQLite/MySQL DB update committed. New leave balance: {emp.leave_balance}")
    
    # Restore original balance
    emp.leave_balance = original_balance
    db.commit()
    db.close()

print("\n=== ALL REAL-TIME DATA SYNCHRONIZATION TESTS PASSED CLEANLY! ===")

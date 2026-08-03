import sys
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

print("=== STARTING FULLSTACK FASTAPI INTEGRATION VERIFICATION ===")

# 1. Test Health & Root
r_root = client.get("/")
assert r_root.status_code == 200, f"Root failed: {r_root.text}"
print("[PASS] GET / ->", r_root.json())

r_health = client.get("/health")
assert r_health.status_code == 200, f"Health failed: {r_health.text}"
print("[PASS] GET /health ->", r_health.json())

# 2. Test Employee Login & Auth Endpoints
print("\n--- Testing Employee Authentication ---")
r_login = client.post("/api/auth/login", json={
    "email": "employee@company.com",
    "password": "password123"
})
assert r_login.status_code == 200, f"Login failed: {r_login.text}"
token_data = r_login.json()
token = token_data["access_token"]
headers = {"Authorization": f"Bearer {token}"}
print("[PASS] POST /api/auth/login -> JWT token received:", token[:25] + "...")

r_me = client.get("/api/auth/me", headers=headers)
assert r_me.status_code == 200, f"Get profile failed: {r_me.text}"
emp_profile = r_me.json()
print("[PASS] GET /api/auth/me -> Name:", emp_profile["name"], "| Role:", emp_profile["role"])

# 3. Test Employee APIs
print("\n--- Testing Employee Module APIs ---")
r_leave = client.get("/api/employees/me/leave-balance", headers=headers)
assert r_leave.status_code == 200, f"Leave balance failed: {r_leave.text}"
print("[PASS] GET /api/employees/me/leave-balance ->", r_leave.json()["message"])

r_shift = client.get("/api/employees/me/shift", headers=headers)
assert r_shift.status_code == 200, f"Shift failed: {r_shift.text}"
print("[PASS] GET /api/employees/me/shift ->", r_shift.json()["message"])

r_rem = client.get("/api/employees/me/remaining-hours", headers=headers)
assert r_rem.status_code == 200, f"Remaining hours failed: {r_rem.text}"
print("[PASS] GET /api/employees/me/remaining-hours -> Remaining:", r_rem.json().get("remaining_hours"), "hours")

# 4. Test Policy Search API
print("\n--- Testing Policy Search API ---")
r_policy = client.post("/api/policies/search", json={"question": "leave policy"}, headers=headers)
assert r_policy.status_code == 200, f"Policy search failed: {r_policy.text}"
policy_data = r_policy.json()
print("[PASS] POST /api/policies/search -> Sources found:", len(policy_data["sources"]))

# 5. Test RAG Chat API
print("\n--- Testing RAG Chatbot API ---")
r_chat1 = client.post("/api/chat", json={"question": "What is my shift timing?"}, headers=headers)
assert r_chat1.status_code == 200, f"Chat failed: {r_chat1.text}"
chat1_data = r_chat1.json()
print("[PASS] POST /api/chat (Shift Intent) -> Answer:", chat1_data["answer"])

r_chat2 = client.post("/api/chat", json={"question": "What is the policy for leaves?"}, headers=headers)
assert r_chat2.status_code == 200, f"Chat failed: {r_chat2.text}"
chat2_data = r_chat2.json()
print("[PASS] POST /api/chat (RAG Policy Intent) -> Sources count:", len(chat2_data["sources"]))

# 6. Test Manager Authentication & Manager APIs
print("\n--- Testing Manager Module APIs ---")
r_mgr_login = client.post("/api/auth/login", json={
    "email": "manager@company.com",
    "password": "password123"
})
assert r_mgr_login.status_code == 200, f"Manager login failed: {r_mgr_login.text}"
mgr_token = r_mgr_login.json()["access_token"]
mgr_headers = {"Authorization": f"Bearer {mgr_token}"}

r_team_members = client.get("/api/employees/me/team-members", headers=mgr_headers)
assert r_team_members.status_code == 200, f"Team members failed: {r_team_members.text}"
print("[PASS] GET /api/employees/me/team-members -> Direct reports:", len(r_team_members.json()["employees"]))

r_team_summary = client.get("/api/employees/me/team-summary", headers=mgr_headers)
assert r_team_summary.status_code == 200, f"Team summary failed: {r_team_summary.text}"
print("[PASS] GET /api/employees/me/team-summary -> Count:", r_team_summary.json()["team_count"])

r_team_shifts = client.get("/api/employees/me/team-shifts", headers=mgr_headers)
assert r_team_shifts.status_code == 200, f"Team shifts failed: {r_team_shifts.text}"
print("[PASS] GET /api/employees/me/team-shifts -> Distribution:", r_team_shifts.json()["shift_distribution"])

print("\n=== ALL FULLSTACK INTEGRATION TESTS PASSED CLEANLY! ===")

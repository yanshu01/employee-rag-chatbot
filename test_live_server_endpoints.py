import urllib.request
import json

BASE_URL = "http://localhost:8000"

def make_request(url, method="GET", body=None, token=None):
    req = urllib.request.Request(url, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    data = json.dumps(body).encode("utf-8") if body else None
    with urllib.request.urlopen(req, data=data) as response:
        return json.loads(response.read().decode("utf-8"))

print("=== VERIFYING LIVE FASTAPI SERVER ENDPOINTS (http://localhost:8000) ===")

# 1. Health & Root
root = make_request(f"{BASE_URL}/")
print("[PASS] GET / ->", root)

health = make_request(f"{BASE_URL}/health")
print("[PASS] GET /health ->", health)

# 2. Employee Login & Auth Profile
login_res = make_request(f"{BASE_URL}/api/auth/login", method="POST", body={
    "email": "employee@company.com",
    "password": "password123"
})
emp_token = login_res["access_token"]
print("[PASS] POST /api/auth/login -> Token received:", emp_token[:25] + "...")

emp_profile = make_request(f"{BASE_URL}/api/auth/me", token=emp_token)
print("[PASS] GET /api/auth/me -> Name:", emp_profile["name"], "| Role:", emp_profile["role"])

# 3. Employee Module Endpoints
leave = make_request(f"{BASE_URL}/api/employees/me/leave-balance", token=emp_token)
print("[PASS] GET /api/employees/me/leave-balance ->", leave["message"])

shift = make_request(f"{BASE_URL}/api/employees/me/shift", token=emp_token)
print("[PASS] GET /api/employees/me/shift ->", shift["message"])

remaining = make_request(f"{BASE_URL}/api/employees/me/remaining-hours", token=emp_token)
print("[PASS] GET /api/employees/me/remaining-hours -> Remaining:", remaining.get("remaining_hours"), "hours")

# 4. Policy Search Endpoint
policy = make_request(f"{BASE_URL}/api/policies/search", method="POST", body={"question": "leave policy"}, token=emp_token)
print("[PASS] POST /api/policies/search -> Sources found:", len(policy["sources"]))

# 5. Chat Endpoint
chat1 = make_request(f"{BASE_URL}/api/chat", method="POST", body={"question": "What is my shift timing?"}, token=emp_token)
print("[PASS] POST /api/chat (Shift) -> Answer:", chat1["answer"])

chat2 = make_request(f"{BASE_URL}/api/chat", method="POST", body={"question": "What is the policy for leave?"}, token=emp_token)
print("[PASS] POST /api/chat (Policy RAG) -> Sources count:", len(chat2["sources"]))

# 6. Manager Module Endpoints
mgr_login = make_request(f"{BASE_URL}/api/auth/login", method="POST", body={
    "email": "manager@company.com",
    "password": "password123"
})
mgr_token = mgr_login["access_token"]

team_members = make_request(f"{BASE_URL}/api/employees/me/team-members", token=mgr_token)
print("[PASS] GET /api/employees/me/team-members -> Direct reports:", len(team_members["employees"]))

team_summary = make_request(f"{BASE_URL}/api/employees/me/team-summary", token=mgr_token)
print("[PASS] GET /api/employees/me/team-summary -> Count:", team_summary["team_count"])

team_shifts = make_request(f"{BASE_URL}/api/employees/me/team-shifts", token=mgr_token)
print("[PASS] GET /api/employees/me/team-shifts -> Distribution:", team_shifts["shift_distribution"])

print("\n=== ALL LIVE FASTAPI ENDPOINTS ARE WORKING PERFECTLY! ===")

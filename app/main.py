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

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth_routes import router as auth_router
from app.api.employee_routes import router as employee_router
from app.api.policy_routes import router as policy_router
from app.api.chat_routes import router as chat_router
from app.api.ws_routes import router as ws_router
from app.config import settings
from app.database import models
from app.database.connection import Base, engine
from app.websocket.events import register_db_events

Base.metadata.create_all(bind=engine)

# Register ORM real-time DB change event listeners
register_db_events()

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description=(
        "Secure read-only employee assistant with "
        "authentication, role-based access, RAG, and real-time WebSocket data sync."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(policy_router)
app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(chat_router)
app.include_router(ws_router)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "Employee RAG Chatbot API is running with Real-Time Data Sync."
    }


@app.get("/health")
def health_check() -> dict[str, str]:
    return {
        "status": "healthy"
    }
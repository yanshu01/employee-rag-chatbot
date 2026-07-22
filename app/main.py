from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth_routes import router as auth_router
from app.api.employee_routes import router as employee_router
from app.config import settings
from app.database import models
from app.database.connection import Base, engine
from app.api.policy_routes import router as policy_router
from app.api.chat_routes import router as chat_router



Base.metadata.create_all(bind=engine)


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description=(
        "Secure read-only employee assistant with "
        "authentication, role-based access and RAG."
    ),
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(policy_router)
app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(chat_router)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "Employee RAG Chatbot API is running."
    }


@app.get("/health")
def health_check() -> dict[str, str]:
    return {
        "status": "healthy"
    }
from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
)


class EmployeeCreate(BaseModel):
    employee_code: str = Field(
        min_length=2,
        max_length=50,
    )
    name: str = Field(
        min_length=2,
        max_length=150,
    )
    email: EmailStr
    password: str = Field(
        min_length=8,
        max_length=128,
    )
    role: str = "employee"
    department: str | None = None
    manager_code: str | None = None


class EmployeeResponse(BaseModel):
    id: int
    employee_code: str
    name: str
    email: EmailStr
    role: str
    department: str | None = None
    manager_code: str | None = None
    is_active: bool

    model_config = ConfigDict(
        from_attributes=True,
    )


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class PolicyQuestionRequest(BaseModel):
    question: str = Field(
        min_length=2,
        max_length=1000,
    )


class ChatRequest(BaseModel):
    question: str = Field(
        min_length=2,
        max_length=1000,
    )


class PolicySourceResponse(BaseModel):
    source: str
    page: int | None = None
    content: str


class PolicySearchResponse(BaseModel):
    question: str
    context: str
    sources: list[PolicySourceResponse]

class ChatSourceResponse(BaseModel):
    source: str
    page: int | None = None


class ChatResponse(BaseModel):
    answer: str
    question: str
    employee_name: str
    intent: str
    sources: list[ChatSourceResponse]
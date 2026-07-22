from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.agents.workflow import EmployeeChatWorkflow
from app.auth.permissions import get_current_employee
from app.database.connection import get_db
from app.database.models import Employee
from app.schemas import (
    ChatRequest,
    ChatResponse,
    ChatSourceResponse,
)


router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"],
)


workflow = EmployeeChatWorkflow()


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    current_employee: Employee = Depends(
        get_current_employee
    ),
    db: Session = Depends(get_db),
) -> ChatResponse:
    try:
        result = workflow.run(
            db=db,
            current_employee=current_employee,
            question=request.question,
        )

        sources = [
            ChatSourceResponse(
                source=item["source"],
                page=item["page"],
            )
            for item in result["sources"]
        ]

        return ChatResponse(
            answer=result["answer"],
            question=request.question,
            employee_name=current_employee.name,
            intent=result["intent"],
            sources=sources,
        )

    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=(
                status.HTTP_503_SERVICE_UNAVAILABLE
            ),
            detail=str(exc),
        ) from exc

    except Exception as exc:
        print(f"Chat error: {exc}")

        raise HTTPException(
            status_code=(
                status.HTTP_500_INTERNAL_SERVER_ERROR
            ),
            detail=(
                "Unable to generate chatbot response."
            ),
        ) from exc
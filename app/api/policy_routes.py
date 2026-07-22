from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from app.auth.permissions import get_current_employee
from app.database.models import Employee
from app.schemas import (
    PolicyQuestionRequest,
    PolicySearchResponse,
    PolicySourceResponse,
)
from app.tools.policy_tools import search_company_policy


router = APIRouter(
    prefix="/api/policies",
    tags=["Policies"],
)


@router.post(
    "/search",
    response_model=PolicySearchResponse,
)
def search_policy(
    request: PolicyQuestionRequest,
    current_employee: Employee = Depends(
        get_current_employee
    ),
) -> PolicySearchResponse:
    try:
        context, results = search_company_policy(
            question=request.question,
            limit=4,
        )

        sources = [
            PolicySourceResponse(
                source=result.source,
                page=result.page,
                content=result.content,
            )
            for result in results
        ]

        return PolicySearchResponse(
            question=request.question,
            context=context,
            sources=sources,
        )

    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        ) from exc

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to search company policies.",
        ) from exc
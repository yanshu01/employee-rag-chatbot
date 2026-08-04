from sqlalchemy import text
from sqlalchemy.orm import Session

from app.agents.intent_classifier import (
    IntentType,
    classify_intent,
)
from app.agents.response_generator import (
    PolicyResponseGenerator,
)
from app.database.models import Employee
from app.rag.policy_retriever import build_policy_context
from app.tools.employee_tools import (
    get_my_attendance,
    get_my_leave_balance,
    get_my_remaining_shift_hours,
    get_my_shift,
)
from app.tools.manager_tools import (
    get_my_team_absent_count,
    get_my_team_attendance_today,
    get_my_team_count,
    get_my_team_late_arrivals,
    get_my_team_members,
    get_my_team_members_on_leave,
    get_my_team_members_working_from_home,
    get_my_team_missing_checkouts,
    get_my_team_present_count,
    get_my_team_shift_summary,
)
from app.tools.read_only_sql_tool import (
    read_only_sql_tool,
)


class EmployeeChatWorkflow:
    def __init__(self) -> None:
        self.response_generator = PolicyResponseGenerator()

    def _is_database_manager(
        self,
        db: Session,
        employee_id: int,
    ) -> bool:
        statement = text(
            """
            SELECT 1
            FROM employee_manager_map
            WHERE manager_id = :employee_id
            LIMIT 1
            """
        )

        result = db.execute(
            statement,
            {
                "employee_id": employee_id,
            },
        ).scalar()

        return result is not None

    def _run_sql_fallback(
        self,
        db: Session,
        current_employee: Employee,
        question: str,
        intent: IntentType,
    ) -> dict:
        result = read_only_sql_tool.run(
            db=db,
            question=question,
            employee=current_employee,
        )

        return {
            "answer": result.get(
                "answer",
                "I could not retrieve the requested data.",
            ),
            "intent": intent.value,
            "sources": [],
        }

    def run(
        self,
        db: Session,
        current_employee: Employee,
        question: str,
    ) -> dict:
        intent = classify_intent(question)

        manager_intents = {
            IntentType.TEAM_MEMBERS,
            IntentType.TEAM_COUNT,
            IntentType.TEAM_ATTENDANCE,
            IntentType.TEAM_PRESENT,
            IntentType.TEAM_ABSENT,
            IntentType.TEAM_LEAVE,
            IntentType.TEAM_WFH,
            IntentType.TEAM_LATE,
            IntentType.TEAM_MISSING_CHECKOUT,
            IntentType.TEAM_SHIFT,
        }

        employee_role = (
            current_employee.role or "employee"
        ).lower()

        if intent == IntentType.UNAUTHORIZED:
            return {
                "answer": (
                    "You are not authorized to access "
                    "another employee's private information."
                ),
                "intent": intent.value,
                "sources": [],
            }

        is_database_manager = self._is_database_manager(
            db=db,
            employee_id=current_employee.id,
        )

        has_team_access = (
            employee_role
            in {
                "manager",
                "hr",
                "admin",
            }
            or is_database_manager
        )

        if (
            intent in manager_intents
            and not has_team_access
        ):
            return {
                "answer": (
                    "You are not authorized to access "
                    "team-level employee information."
                ),
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.DATABASE_QUERY:
            result = read_only_sql_tool.run(
                db=db,
                question=question,
                employee=current_employee,
            )

            return {
                "answer": result.get(
                    "answer",
                    "I could not retrieve the requested data.",
                ),
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.LEAVE_BALANCE:
            result = get_my_leave_balance(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )

            return {
                "answer": result["message"],
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.ATTENDANCE:
            result = get_my_attendance(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            else:
                check_in = (
                    result.get("check_in")
                    or "not recorded"
                )
                check_out = (
                    result.get("check_out")
                    or "not recorded"
                )
                worked_hours = result.get(
                    "worked_hours",
                    0,
                )

                answer = (
                    f"Your attendance status today is "
                    f"{result.get('status', 'unknown')}. "
                    f"Check-in: {check_in}. "
                    f"Check-out: {check_out}. "
                    f"Worked hours: {worked_hours}."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.SHIFT:
            result = get_my_shift(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )

            return {
                "answer": result["message"],
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.REMAINING_HOURS:
            result = get_my_remaining_shift_hours(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            else:
                answer = (
                    f"You have worked "
                    f"{result['worked_hours']} hours today. "
                    f"You have approximately "
                    f"{result['remaining_hours']} hours "
                    f"remaining."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_COUNT:
            result = get_my_team_count(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            else:
                answer = (
                    f"You currently have "
                    f"{result['team_count']} active "
                    f"employees reporting to you."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_MEMBERS:
            result = get_my_team_members(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            elif not result["employees"]:
                answer = (
                    "You currently have no active "
                    "employees reporting to you."
                )
            else:
                employee_names = ", ".join(
                    employee["name"]
                    for employee in result["employees"]
                )

                answer = (
                    f"You have {result['team_count']} "
                    f"team members: {employee_names}."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_ATTENDANCE:
            result = get_my_team_attendance_today(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            elif not result["employees"]:
                answer = (
                    "No employees currently report to you."
                )
            else:
                attendance_lines = [
                    (
                        f"{employee['name']}: "
                        f"{employee['status']}"
                    )
                    for employee in result["employees"]
                ]

                answer = (
                    "Today's team attendance:\n"
                    + "\n".join(attendance_lines)
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_PRESENT:
            result = get_my_team_present_count(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            else:
                employees = result.get("employees", [])

                names = ", ".join(
                    employee["name"]
                    for employee in employees
                )

                answer = (
                    f"{result['present_count']} of "
                    f"{result['team_count']} team members "
                    f"are present today."
                )

                if names:
                    answer += f" Present: {names}."

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_ABSENT:
            result = get_my_team_absent_count(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            else:
                employees = result.get("employees", [])

                names = ", ".join(
                    employee["name"]
                    for employee in employees
                )

                answer = (
                    f"{result['absent_count']} of "
                    f"{result['team_count']} team members "
                    f"are absent or have no attendance "
                    f"record today."
                )

                if names:
                    answer += f" Employees: {names}."

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_LEAVE:
            result = get_my_team_members_on_leave(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            elif result["count"] == 0:
                answer = (
                    "No team members are on leave today."
                )
            else:
                names = ", ".join(
                    employee["name"]
                    for employee in result["employees"]
                )

                answer = (
                    f"{result['count']} team members "
                    f"are on leave today: {names}."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_WFH:
            result = (
                get_my_team_members_working_from_home(
                    db=db,
                    current_employee=current_employee,
                )
            )

            if not result["success"]:
                answer = result["message"]
            elif result["count"] == 0:
                answer = (
                    "No team members are working "
                    "from home today."
                )
            else:
                names = ", ".join(
                    employee["name"]
                    for employee in result["employees"]
                )

                answer = (
                    f"{result['count']} team members "
                    f"are working from home: {names}."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_LATE:
            result = get_my_team_late_arrivals(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            elif result["count"] == 0:
                answer = (
                    "No team members have been recorded "
                    "as late today."
                )
            else:
                details = ", ".join(
                    (
                        f"{employee['name']} "
                        f"({employee['late_minutes']} minutes)"
                    )
                    for employee in result["employees"]
                )

                answer = (
                    f"{result['count']} team members "
                    f"arrived late: {details}."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_MISSING_CHECKOUT:
            result = get_my_team_missing_checkouts(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            elif result["count"] == 0:
                answer = (
                    "No team members currently have "
                    "a missing check-out."
                )
            else:
                names = ", ".join(
                    employee["name"]
                    for employee in result["employees"]
                )

                answer = (
                    f"{result['count']} team members "
                    f"have a missing check-out: {names}."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.TEAM_SHIFT:
            result = get_my_team_shift_summary(
                db=db,
                current_employee=current_employee,
            )

            if not result["success"]:
                return self._run_sql_fallback(
                    db=db,
                    current_employee=current_employee,
                    question=question,
                    intent=intent,
                )
            elif result["team_count"] == 0:
                answer = (
                    "No employees currently report to you."
                )
            else:
                distribution = ", ".join(
                    f"{shift}: {count}"
                    for shift, count in result[
                        "shift_distribution"
                    ].items()
                )

                answer = (
                    "Your team shift distribution is: "
                    f"{distribution}."
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.GENERAL:
            return {
                "answer": (
                    f"Hello {current_employee.name}. "
                    "You can ask about company policies, "
                    "your leave balance, attendance, shift, "
                    "remaining work hours, database records, "
                    "or team details if you are a manager."
                ),
                "intent": intent.value,
                "sources": [],
            }

        if intent == IntentType.POLICY:
            context, results = build_policy_context(
                question=question,
                limit=4,
            )

            answer = self.response_generator.generate(
                employee_name=current_employee.name,
                question=question,
                policy_context=context,
            )

            sources = []
            seen_sources: set[
                tuple[str, int | None]
            ] = set()

            for result in results:
                source_key = (
                    result.source,
                    result.page,
                )

                if source_key in seen_sources:
                    continue

                seen_sources.add(source_key)

                sources.append(
                    {
                        "source": result.source,
                        "page": result.page,
                    }
                )

            return {
                "answer": answer,
                "intent": intent.value,
                "sources": sources,
            }

        return {
            "answer": (
                "I could not understand your request. "
                "Please try asking it differently."
            ),
            "intent": IntentType.GENERAL.value,
            "sources": [],
        }
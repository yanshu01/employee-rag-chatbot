from enum import Enum


class IntentType(str, Enum):
    POLICY = "policy"
    LEAVE_BALANCE = "leave_balance"
    ATTENDANCE = "attendance"
    SHIFT = "shift"
    REMAINING_HOURS = "remaining_hours"

    TEAM_MEMBERS = "team_members"
    TEAM_COUNT = "team_count"
    TEAM_ATTENDANCE = "team_attendance"
    TEAM_PRESENT = "team_present"
    TEAM_ABSENT = "team_absent"
    TEAM_LEAVE = "team_leave"
    TEAM_WFH = "team_wfh"
    TEAM_LATE = "team_late"
    TEAM_MISSING_CHECKOUT = (
        "team_missing_checkout"
    )
    TEAM_SHIFT = "team_shift"

    UNAUTHORIZED = "unauthorized"
    GENERAL = "general"


UNAUTHORIZED_PATTERNS = {
    "another employee",
    "other employee",
    "someone else's",
    "someone else",
    "employee password",
    "all employees salary",
    "salary of",
    "salary details",
    "other employee attendance",
    "other employee leave",
    "other employee shift",
    "rahul attendance",
    "rahul leave",
    "rahul shift",
    "rahul's attendance",
    "rahul's leave",
    "rahul's shift",
}


TEAM_COUNT_KEYWORDS = {
    "how many employees report to me",
    "how many people report to me",
    "my team count",
    "team size",
    "number of team members",
    "how many team members",
}


TEAM_MEMBERS_KEYWORDS = {
    "show my team",
    "list my team",
    "my team members",
    "who reports to me",
    "employees reporting to me",
}


TEAM_ATTENDANCE_KEYWORDS = {
    "team attendance",
    "today's team attendance",
    "today team attendance",
    "show team attendance",
    "attendance of my team",
}


TEAM_PRESENT_KEYWORDS = {
    "who is present",
    "team members present",
    "how many are present",
    "present in my team",
    "team present count",
}


TEAM_ABSENT_KEYWORDS = {
    "who is absent",
    "team members absent",
    "how many are absent",
    "absent in my team",
    "team absent count",
}


TEAM_LEAVE_KEYWORDS = {
    "who is on leave",
    "team members on leave",
    "employees on leave in my team",
    "my team leave today",
}


TEAM_WFH_KEYWORDS = {
    "who is working from home",
    "who is on wfh",
    "team members working from home",
    "wfh in my team",
}


TEAM_LATE_KEYWORDS = {
    "who arrived late",
    "who is late",
    "late arrivals",
    "late employees in my team",
    "team late today",
}


TEAM_MISSING_CHECKOUT_KEYWORDS = {
    "missing check out",
    "missing checkout",
    "who has not checked out",
    "employees without check out",
    "team missing checkouts",
}


TEAM_SHIFT_KEYWORDS = {
    "team shift",
    "team shifts",
    "shift distribution",
    "show team shifts",
    "what shifts are assigned to my team",
}


REMAINING_HOURS_KEYWORDS = {
    "hours remaining",
    "hours left",
    "remaining hours",
    "remaining shift hours",
    "remaining work hours",
    "how many hours left",
    "how many hours do i have left",
    "how many hours are left",
    "how much time is left",
    "time left",
    "work hours left",
}


PERSONAL_LEAVE_KEYWORDS = {
    "my leave",
    "my leaves",
    "leave balance",
    "leave remaining",
    "leaves left",
    "leaves remaining",
    "casual leave",
    "casual leaves left",
    "sick leave",
    "sick leaves left",
    "earned leave",
    "earned leaves left",
    "annual leave",
    "how many leaves do i have",
}


ATTENDANCE_KEYWORDS = {
    "my attendance",
    "attendance today",
    "am i present",
    "am i absent",
    "my check in",
    "my check-in",
    "check in",
    "check-in",
    "my check out",
    "my check-out",
    "check out",
    "check-out",
    "when did i check in",
    "when did i check out",
}


SHIFT_KEYWORDS = {
    "my shift",
    "shift timing",
    "shift timings",
    "shift time",
    "shift hours",
    "working shift",
    "start shift",
    "end shift",
    "when does my shift start",
    "when does my shift end",
    "what is my shift",
}


POLICY_KEYWORDS = {
    "policy",
    "policies",
    "rule",
    "rules",
    "allowed",
    "holiday",
    "holidays",
    "leave policy",
    "casual leave policy",
    "sick leave policy",
    "earned leave policy",
    "maternity",
    "paternity",
    "work from home",
    "wfh",
    "remote work",
    "working hours policy",
    "late arrival policy",
    "lateness policy",
    "notice period",
    "probation",
    "code of conduct",
    "dress code",
    "overtime",
}


def classify_intent(
    question: str,
) -> IntentType:
    normalized_question = (
        question.lower().strip()
    )

    if any(
        phrase in normalized_question
        for phrase in UNAUTHORIZED_PATTERNS
    ):
        return IntentType.UNAUTHORIZED

    if any(
        phrase in normalized_question
        for phrase in TEAM_MISSING_CHECKOUT_KEYWORDS
    ):
        return (
            IntentType.TEAM_MISSING_CHECKOUT
        )

    if any(
        phrase in normalized_question
        for phrase in TEAM_ATTENDANCE_KEYWORDS
    ):
        return IntentType.TEAM_ATTENDANCE

    if any(
        phrase in normalized_question
        for phrase in TEAM_PRESENT_KEYWORDS
    ):
        return IntentType.TEAM_PRESENT

    if any(
        phrase in normalized_question
        for phrase in TEAM_ABSENT_KEYWORDS
    ):
        return IntentType.TEAM_ABSENT

    if any(
        phrase in normalized_question
        for phrase in TEAM_LEAVE_KEYWORDS
    ):
        return IntentType.TEAM_LEAVE

    if any(
        phrase in normalized_question
        for phrase in TEAM_WFH_KEYWORDS
    ):
        return IntentType.TEAM_WFH

    if any(
        phrase in normalized_question
        for phrase in TEAM_LATE_KEYWORDS
    ):
        return IntentType.TEAM_LATE

    if any(
        phrase in normalized_question
        for phrase in TEAM_SHIFT_KEYWORDS
    ):
        return IntentType.TEAM_SHIFT

    if any(
        phrase in normalized_question
        for phrase in TEAM_COUNT_KEYWORDS
    ):
        return IntentType.TEAM_COUNT

    if any(
        phrase in normalized_question
        for phrase in TEAM_MEMBERS_KEYWORDS
    ):
        return IntentType.TEAM_MEMBERS

    if any(
        phrase in normalized_question
        for phrase in REMAINING_HOURS_KEYWORDS
    ):
        return IntentType.REMAINING_HOURS

    if any(
        phrase in normalized_question
        for phrase in PERSONAL_LEAVE_KEYWORDS
    ):
        return IntentType.LEAVE_BALANCE

    if any(
        phrase in normalized_question
        for phrase in ATTENDANCE_KEYWORDS
    ):
        return IntentType.ATTENDANCE

    if any(
        phrase in normalized_question
        for phrase in SHIFT_KEYWORDS
    ):
        return IntentType.SHIFT

    if any(
        phrase in normalized_question
        for phrase in POLICY_KEYWORDS
    ):
        return IntentType.POLICY

    return IntentType.GENERAL
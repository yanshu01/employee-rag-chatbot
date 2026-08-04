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

    DATABASE_QUERY = "database_query"
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
    "who reported late today",
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
    "casual leaves left",
    "sick leaves left",
    "earned leaves left",
    "how many leaves do i have",
}


ATTENDANCE_KEYWORDS = {
    "my attendance",
    "attendance today",
    "am i present",
    "am i absent",
    "my check in",
    "my check-in",
    "my check out",
    "my check-out",
    "when did i check in",
    "when did i check out",
}


SHIFT_KEYWORDS = {
    "my shift",
    "what is my shift",
    "what's my shift",
    "shift timing",
    "my shift timing",
    "work shift",
    "office timing",
    "office hours",
    "when does my shift start",
    "when does my shift end",
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
    "work from home policy",
    "wfh policy",
    "remote work policy",
    "working hours policy",
    "late arrival policy",
    "lateness policy",
    "notice period",
    "probation",
    "code of conduct",
    "dress code",
    "overtime policy",
}


DATABASE_KEYWORDS = {
    "employee",
    "employee code",
    "profile",
    "joining",
    "joining date",
    "join date",
    "department",
    "designation",
    "position",
    "phone",
    "phone number",
    "registered phone",
    "email",
    "project",
    "projects",
    "task",
    "tasks",
    "assigned",
    "assigned task",
    "assigned tasks",
    "timesheet",
    "timesheets",
    "ticket",
    "tickets",
    "notification",
    "notifications",
    "announcement",
    "referral",
    "service",
    "daily report",
    "progress",
    "priority",
    "client",
     "full name",
        "my name",
        "my role",
        "account active",
        "active account",
        "who is my manager",
        "reporting manager",
        "casual leaves",
        "pending leave",
        "leave request",
        "late today",
        "was i late",
        "when did i join",
        "pending timesheet",
"pending timesheets",
"timesheet approval",
"timesheet approvals",
"pending timesheet approvals",
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

    intent_keyword_map = (
        (
            IntentType.TEAM_MISSING_CHECKOUT,
            TEAM_MISSING_CHECKOUT_KEYWORDS,
        ),
        (
            IntentType.TEAM_ATTENDANCE,
            TEAM_ATTENDANCE_KEYWORDS,
        ),
        (
            IntentType.TEAM_PRESENT,
            TEAM_PRESENT_KEYWORDS,
        ),
        (
            IntentType.TEAM_ABSENT,
            TEAM_ABSENT_KEYWORDS,
        ),
        (
            IntentType.TEAM_LEAVE,
            TEAM_LEAVE_KEYWORDS,
        ),
        (
            IntentType.TEAM_WFH,
            TEAM_WFH_KEYWORDS,
        ),
        (
            IntentType.TEAM_LATE,
            TEAM_LATE_KEYWORDS,
        ),
        (
            IntentType.TEAM_SHIFT,
            TEAM_SHIFT_KEYWORDS,
        ),
        (
            IntentType.TEAM_COUNT,
            TEAM_COUNT_KEYWORDS,
        ),
        (
            IntentType.TEAM_MEMBERS,
            TEAM_MEMBERS_KEYWORDS,
        ),
        (
            IntentType.REMAINING_HOURS,
            REMAINING_HOURS_KEYWORDS,
        ),
        (
            IntentType.POLICY,
            POLICY_KEYWORDS,
        ),
        (
            IntentType.LEAVE_BALANCE,
            PERSONAL_LEAVE_KEYWORDS,
        ),
        (
            IntentType.ATTENDANCE,
            ATTENDANCE_KEYWORDS,
        ),
        (
            IntentType.SHIFT,
            SHIFT_KEYWORDS,
        ),
    )
    PERSONAL_LEAVE_KEYWORDS.update(
    {
        "how many casual leaves do i have left",
        "casual leaves do i have",
    }
)

    for intent, keywords in intent_keyword_map:
        if any(
            keyword in normalized_question
            for keyword in keywords
        ):
            return intent

    if any(
        keyword in normalized_question
        for keyword in DATABASE_KEYWORDS
    ):
        return IntentType.DATABASE_QUERY

    return IntentType.GENERAL
from app.database.connection import SessionLocal
from app.database.queries import get_employee_by_code
from app.tools.manager_tools import (
    get_my_team_count,
    get_my_team_leave_summary,
    get_my_team_members,
    get_my_team_shift_summary,
)


def main():
    with SessionLocal() as db:
        manager = get_employee_by_code(
            db,
            "EMP002",
        )

        print(get_my_team_count(db, manager))
        print()
        print(get_my_team_members(db, manager))
        print()
        print(get_my_team_leave_summary(db, manager))
        print()
        print(get_my_team_shift_summary(db, manager))


if __name__ == "__main__":
    main()
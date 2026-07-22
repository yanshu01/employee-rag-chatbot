import requests
import streamlit as st


API_BASE_URL = "http://127.0.0.1:8000"


st.set_page_config(
    page_title="Employee AI Assistant",
    page_icon="🤖",
    layout="centered",
)


def initialize_session_state() -> None:
    if "access_token" not in st.session_state:
        st.session_state.access_token = None

    if "employee" not in st.session_state:
        st.session_state.employee = None

    if "messages" not in st.session_state:
        st.session_state.messages = []


def login_employee(
    email: str,
    password: str,
) -> tuple[bool, str]:
    try:
        response = requests.post(
            f"{API_BASE_URL}/api/auth/login",
            json={
                "email": email,
                "password": password,
            },
            timeout=30,
        )

        if response.status_code != 200:
            try:
                error_message = response.json().get(
                    "detail",
                    "Login failed.",
                )
            except ValueError:
                error_message = "Login failed."

            return False, error_message

        data = response.json()

        access_token = data.get("access_token")

        if not access_token:
            return False, "Access token was not returned."

        st.session_state.access_token = access_token

        employee_response = requests.get(
            f"{API_BASE_URL}/api/auth/me",
            headers={
                "Authorization": (
                    f"Bearer {access_token}"
                ),
            },
            timeout=30,
        )

        if employee_response.status_code == 200:
            st.session_state.employee = (
                employee_response.json()
            )
        else:
            st.session_state.employee = {
                "name": email,
                "email": email,
                "role": "employee",
            }

        return True, "Login successful."

    except requests.exceptions.ConnectionError:
        return (
            False,
            "Cannot connect to FastAPI. "
            "Make sure the backend is running.",
        )

    except requests.exceptions.Timeout:
        return False, "The login request timed out."

    except requests.exceptions.RequestException as exc:
        return False, f"Request failed: {exc}"


def send_chat_message(
    question: str,
) -> tuple[bool, dict | str]:
    access_token = st.session_state.access_token

    if not access_token:
        return False, "You are not authenticated."

    try:
        response = requests.post(
            f"{API_BASE_URL}/api/chat",
            headers={
                "Authorization": (
                    f"Bearer {access_token}"
                ),
                "Content-Type": "application/json",
            },
            json={
                "question": question,
            },
            timeout=120,
        )

        if response.status_code == 401:
            st.session_state.access_token = None
            st.session_state.employee = None

            return (
                False,
                "Your session has expired. "
                "Please log in again.",
            )

        if response.status_code != 200:
            try:
                error_message = response.json().get(
                    "detail",
                    "Chat request failed.",
                )
            except ValueError:
                error_message = "Chat request failed."

            return False, error_message

        return True, response.json()

    except requests.exceptions.ConnectionError:
        return (
            False,
            "Cannot connect to FastAPI. "
            "Make sure the backend is running.",
        )

    except requests.exceptions.Timeout:
        return False, "The chatbot request timed out."

    except requests.exceptions.RequestException as exc:
        return False, f"Request failed: {exc}"


def logout_employee() -> None:
    st.session_state.access_token = None
    st.session_state.employee = None
    st.session_state.messages = []


def show_login_page() -> None:
    st.title("🤖 Employee AI Assistant")

    st.write(
        "Log in using your employee credentials "
        "to access the assistant."
    )

    with st.form("login_form"):
        email = st.text_input(
            "Email",
            placeholder="admin@company.com",
        )

        password = st.text_input(
            "Password",
            type="password",
            placeholder="Enter your password",
        )

        submit_button = st.form_submit_button(
            "Login",
            use_container_width=True,
        )

    if submit_button:
        if not email.strip() or not password:
            st.warning(
                "Please enter your email and password."
            )
            return

        with st.spinner("Logging in..."):
            success, message = login_employee(
                email=email.strip(),
                password=password,
            )

        if success:
            st.success(message)
            st.rerun()
        else:
            st.error(message)


def show_sidebar() -> None:
    employee = st.session_state.employee or {}

    with st.sidebar:
        st.header("Employee Profile")

        st.write(
            f"**Name:** "
            f"{employee.get('name', 'Unknown')}"
        )

        st.write(
            f"**Email:** "
            f"{employee.get('email', 'Unknown')}"
        )

        st.write(
            f"**Role:** "
            f"{employee.get('role', 'employee').title()}"
        )

        employee_code = employee.get("employee_code")

        if employee_code:
            st.write(
                f"**Employee Code:** {employee_code}"
            )

        department = employee.get("department")

        if department:
            st.write(
                f"**Department:** {department}"
            )

        st.divider()

        if st.button(
            "Clear conversation",
            use_container_width=True,
        ):
            st.session_state.messages = []
            st.rerun()

        if st.button(
            "Logout",
            use_container_width=True,
        ):
            logout_employee()
            st.rerun()


def display_sources(sources: list[dict]) -> None:
    if not sources:
        return

    with st.expander("View policy sources"):
        for index, source in enumerate(
            sources,
            start=1,
        ):
            source_name = source.get(
                "source",
                "Unknown source",
            )

            page = source.get("page")

            if page is not None:
                st.markdown(
                    f"**{index}. {source_name}** "
                    f"— Page {page}"
                )
            else:
                st.markdown(
                    f"**{index}. {source_name}**"
                )


def show_chat_page() -> None:
    show_sidebar()

    st.title("🤖 Employee AI Assistant")

    st.caption(
        "Ask questions about company policies, "
        "leave rules, attendance and working hours."
    )

    if not st.session_state.messages:
        st.info(
            "Example questions:\n\n"
            "- How many casual leaves are allowed?\n"
            "- What are the company working hours?\n"
            "- What is the late arrival policy?\n"
            "- Can employees work from home?"
        )

    for message in st.session_state.messages:
        role = message.get("role", "assistant")

        with st.chat_message(role):
            st.markdown(
                message.get("content", "")
            )

            if role == "assistant":
                intent = message.get("intent")

                if intent:
                    st.caption(
                        f"Intent: {intent}"
                    )

                display_sources(
                    message.get("sources", [])
                )

    question = st.chat_input(
        "Ask an employee or policy question..."
    )

    if not question:
        return

    st.session_state.messages.append(
        {
            "role": "user",
            "content": question,
        }
    )

    with st.chat_message("user"):
        st.markdown(question)

    with st.chat_message("assistant"):
        with st.spinner("Searching company information..."):
            success, result = send_chat_message(
                question=question,
            )

        if not success:
            error_message = str(result)
            st.error(error_message)

            st.session_state.messages.append(
                {
                    "role": "assistant",
                    "content": error_message,
                    "intent": "error",
                    "sources": [],
                }
            )

            return

        answer = result.get(
            "answer",
            "No answer was returned.",
        )

        intent = result.get(
            "intent",
            "unknown",
        )

        sources = result.get(
            "sources",
            [],
        )

        st.markdown(answer)
        st.caption(f"Intent: {intent}")
        display_sources(sources)

        st.session_state.messages.append(
            {
                "role": "assistant",
                "content": answer,
                "intent": intent,
                "sources": sources,
            }
        )


def main() -> None:
    initialize_session_state()

    if not st.session_state.access_token:
        show_login_page()
        return

    show_chat_page()


if __name__ == "__main__":
    main()
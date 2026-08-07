# 🤖 Employee RAG Chatbot

An AI-powered employee assistant built with FastAPI, LangChain, Google Gemini, RAG, and a Streamlit-based frontend. The app supports employee and manager questions about profile data, attendance, leave balances, company policies, and secure read-only database access.

---

# 🚀 Features

## 👤 Employee Features

- 🔐 JWT authentication
- 👤 View profile information
- 📅 Check leave balance
- 🕒 View shift timings
- 📍 View attendance
- 📞 View phone number
- 📧 View email
- 🏢 View department and designation
- 👨‍💼 View manager information
- 📂 View assigned projects
- ✅ View assigned tasks
- 📢 View notifications
- 🤖 Ask questions in natural language

## 👨‍💼 Manager Features

- 👥 View team members
- 📊 Review team attendance
- 📈 Review team size
- 🚪 Check who is on leave
- 🕒 Review shift information
- 🔒 Role-based access control

## 📚 Company Policy Assistant

- PDF-based retrieval-augmented generation (RAG)
- Semantic search over company policy documents
- Context-aware and source-aware answers

## 🗄️ Read-Only SQL Agent

- Generate SQL via Google Gemini
- Execute only safe SELECT queries
- Prevent UPDATE, DELETE, INSERT, and DROP operations
- Restrict responses to authenticated employee data

---

# 🛠️ Tech Stack

## Backend

- FastAPI
- Python 3.11+
- SQLAlchemy
- Pydantic
- JWT authentication
- pwdlib
- PyMySQL (optional for MySQL deployments)

## AI / LLM

- Google Gemini
- LangChain
- Sentence Transformers

## Retrieval

- ChromaDB
- PDF loader
- Embedding models

## Database

- SQLite by default for local development
- Optional MySQL support via environment variables

## Frontend

- Streamlit

---

# 📂 Project Structure

```text
employee-rag-chatbot/
├── app/
│   ├── agents/
│   ├── api/
│   ├── auth/
│   ├── database/
│   ├── rag/
│   ├── tools/
│   └── main.py
├── company-policies/
├── frontend/
│   └── streamlit_app.py
├── scripts/
├── requirements.txt
├── .env
├── .streamlit/
│   └── secrets.toml
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/yanshu01/employee-rag-chatbot.git
cd employee-rag-chatbot
```

## 2. Create a virtual environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

## 3. Install dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a .env file in the project root.

For local development, the project now uses SQLite by default:

```env
APP_NAME=Employee RAG Chatbot

DB_HOST=sqlite
DB_PORT=3306
DB_NAME=employee_chatbot.db
DB_USER=root
DB_PASSWORD=password

JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash

COMPANY_API_KEY=your_company_api_key
COMPANY_API_KEY_HEADER=X-API-Key
```

If you want to use MySQL instead, change DB_HOST, DB_NAME, DB_USER, and DB_PASSWORD to your MySQL connection settings.

## Streamlit secrets

Create a file at .streamlit/secrets.toml:

```toml
API_BASE_URL = "http://127.0.0.1:8000"
```

---

# 🗄️ Database

This workspace uses a local SQLite database file named employee_chatbot.db by default.

No separate SQL import step is required for the local setup. If you switch to MySQL, you will need to provision the schema and seed data separately.

---

# ▶️ Running the Backend

Start the FastAPI backend from the project root:

```bash
python -m uvicorn app.main:app --reload
```

Open:

- Backend: http://127.0.0.1:8000
- Swagger docs: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

---

# 💻 Running the Frontend

Start the Streamlit frontend from the project root:

```bash
python -m streamlit run frontend\streamlit_app.py
```

Streamlit will print a local URL such as:

- http://localhost:8501

---

# 🔐 Authentication

The application uses:

- JWT authentication
- Password hashing
- Role-based access control

Supported roles:

- Employee
- Manager
- Admin

---

# 👤 Demo Login

The local setup includes demo users for quick testing:

- Employee: employee@company.com / Employee@123
- Manager: manager@company.com / Manager@123

---

# 🔑 API Authentication

Protected routes require:

## JWT token

```text
Authorization: Bearer <JWT_TOKEN>
```

## Company API key

```text
X-API-Key: <COMPANY_API_KEY>
```

---

# 🤖 AI Workflow

1. User logs in.
2. A JWT token is created.
3. The Streamlit UI sends the token and API key to FastAPI.
4. FastAPI authenticates the request.
5. The request is routed to the right tool or RAG workflow.
6. Google Gemini generates a read-only SQL query or policy answer.
7. The backend formats the response and sends it back to the UI.

---

# 🔒 Security Notes

- JWT-based authentication
- Company API key validation
- Read-only SQL execution
- Employee data isolation
- Role-based access control
- SQL injection prevention

---

# 📄 License

This project is intended for educational, research, and portfolio purposes.

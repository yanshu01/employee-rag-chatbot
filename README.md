# 🤖 Employee RAG Chatbot

An AI-powered Employee Assistant built with **FastAPI, Google Gemini, LangChain, RAG, MySQL, and React**. The chatbot enables employees and managers to securely access HR information, company policies, project details, attendance, leave balances, timesheets, notifications, and more using natural language.

---

# 🚀 Features

## 👤 Employee Features

- 🔐 JWT Authentication
- 👤 View personal profile information
- 📅 Check leave balance
- 🕒 View shift timings
- ⏱️ Check remaining shift hours
- 📍 View attendance
- 📞 View registered phone number
- 📧 View registered email
- 🏢 View department & designation
- 👨‍💼 View manager information
- 📂 View assigned projects
- ✅ View assigned tasks
- 📝 View submitted timesheets
- 📢 View company notifications
- 🤖 Natural language database queries

---

## 👨‍💼 Manager Features

- 👥 View team members
- 📊 Team attendance summary
- 📈 Team size
- 🚪 Team members on leave
- 🏠 Team members working from home
- ⏰ Late arrivals
- ❌ Missing check-outs
- 🕒 Team shift summary
- 🔒 Role-Based Access Control

---

## 📚 Company Policy Assistant

- PDF-based Retrieval-Augmented Generation (RAG)
- Semantic Search
- Context-aware responses
- Source-aware policy retrieval

---

## 🗄️ Read-Only SQL Agent

The chatbot includes an AI-powered SQL Agent capable of:

- Generating SQL using Google Gemini
- Executing only safe SELECT queries
- Preventing UPDATE/DELETE/INSERT/DROP
- Restricting access to authenticated employee data
- Formatting SQL results into natural language

---

# 🏗️ Architecture

```
                    React Frontend
                           │
                    JWT Authentication
                           │
                           ▼
                     FastAPI Backend
                           │
      ┌────────────────────┴─────────────────────┐
      ▼                                          ▼
Employee / Manager Tools                 Company Policy RAG
      │                                          │
      ▼                                          ▼
   MySQL Database                     ChromaDB Vector Store
      │                                          │
      └────────────────────┬─────────────────────┘
                           ▼
                  Google Gemini LLM
                           │
                           ▼
                 Natural Language Response
```

---

# 🛠️ Tech Stack

## Backend

- FastAPI
- Python 3.12+
- SQLAlchemy
- Pydantic
- JWT Authentication
- pwdlib
- PyMySQL

---

## AI / LLM

- Google Gemini
- LangChain
- Sentence Transformers

---

## Retrieval

- ChromaDB
- Recursive Character Text Splitter
- PDF Loader
- Embedding Models

---

## Database

- MySQL

---

## Frontend

- React
- Tailwind CSS
- Axios

---

# 📂 Project Structure

```
employee-rag-chatbot/

│
├── app/
│   ├── agents/
│   ├── api/
│   ├── auth/
│   ├── database/
│   ├── rag/
│   ├── tools/
│   ├── vector_db/
│   ├── config.py
│   └── main.py
│
├── company-policies/
│
├── frontend/
│
├── scripts/
│
├── requirements.txt
│
├── .env
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yanshu01/employee-rag-chatbot.git

cd employee-rag-chatbot
```

---

## 2. Create Virtual Environment

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

---

## 3. Install Python Dependencies

```bash
pip install --upgrade pip

pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
APP_NAME=Employee RAG Chatbot

DB_HOST=your_host
DB_PORT=3306
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password

JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash

COMPANY_API_KEY=your_company_api_key
COMPANY_API_KEY_HEADER=X-API-Key
```

---

# 🗄️ Database

Import the provided SQL file into MySQL.

The project contains demo data including:

- Employees
- Managers
- Attendance
- Leave Balance
- Employee Shifts
- Projects
- Tasks
- Notifications
- Timesheets
- Employee Manager Mapping

---

# ▶️ Running the Backend

Start FastAPI

```bash
python -m uvicorn app.main:app --reload
```

Backend

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# 💻 Running the React Frontend

Go to the frontend folder.

```bash
cd frontend
```

Install packages

```bash
npm install
```

Create a frontend environment file.

```
.env
```

Example

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the frontend

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🔐 Authentication

The application uses

- JWT Authentication
- Password Hashing
- Role-Based Access Control (RBAC)

Supported Roles

- Employee
- Manager
- Admin

---

# 🔑 API Authentication

Every protected API requires

### JWT Token

```
Authorization: Bearer <JWT_TOKEN>
```

### Company API Key

```
X-API-Key: <COMPANY_API_KEY>
```

---

# 🤖 AI Workflow

1. User logs in.
2. JWT token is generated.
3. React sends the JWT and Company API Key.
4. FastAPI authenticates the request.
5. Intent Classification identifies the request.
6. Database Tool or Policy RAG is selected.
7. Google Gemini generates SQL (Read-Only).
8. SQL executes safely.
9. Gemini formats the response.
10. Response is returned to the frontend.

---

# 📌 Supported Employee Questions

Examples

- What is my employee code?
- What is my phone number?
- What is my registered email?
- Who is my manager?
- What is my leave balance?
- Show my attendance.
- What is my shift today?
- Show my assigned projects.
- Show my assigned tasks.
- Show my notifications.

---

# 📌 Supported Manager Questions

Examples

- Show my team members.
- Who reported late today?
- Who is on leave today?
- Show my team attendance.
- How many employees report to me?
- Show my team shifts.
- Show missing check-outs.
- Show team attendance summary.

---

# 📌 Supported Policy Questions

Examples

- What is the maternity leave policy?
- What is the notice period?
- Can I work from home?
- How many casual leaves are allowed?
- What is the dress code?
- What is the late arrival policy?

---

# 🔒 Security

- JWT Authentication
- Company API Key Authentication
- Read-Only SQL Execution
- Employee Data Isolation
- Role-Based Access Control
- SQL Injection Prevention
- No UPDATE/DELETE/INSERT Queries

---

# 📌 Current Features

- JWT Authentication
- Employee Self-Service
- Manager Dashboard APIs
- Company Policy RAG
- Google Gemini Integration
- Read-Only SQL Agent
- MySQL Integration
- React Frontend
- Secure API Authentication
- Role-Based Access Control

---

# 🚀 Future Improvements

- Leave Approval Workflow
- Attendance Dashboard
- HR Admin Portal
- Email Notifications
- Calendar Integration
- Multi-language Support
- Docker Deployment
- CI/CD Pipeline
- AWS Deployment
- Kubernetes Support

---

# 📄 License

This project is intended for educational, research, and portfolio purposes.

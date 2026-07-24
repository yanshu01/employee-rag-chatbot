# 🤖 Employee RAG Chatbot

An AI-powered Employee Assistant built with **FastAPI**, **Groq LLM**, **LangChain**, **RAG**, and **MySQL**. The chatbot enables employees and managers to ask HR-related questions, retrieve company policies, and access employee information securely using JWT authentication.

---

## 🚀 Features

### 👤 Employee Features

- 🔐 JWT Authentication
- 📅 Check leave balance
- 🕒 View shift timings
- ⏱️ Check remaining shift hours
- 📖 Ask company policy questions using RAG
- 💬 Natural language conversation powered by Groq LLM

### 👨‍💼 Manager Features

- 👥 View team members
- 📊 View team leave balance
- 🕒 View team shift summary
- 📈 View team size
- 🔒 Role-based access control

### 📚 Company Policy Assistant

- PDF-based Retrieval-Augmented Generation (RAG)
- Semantic search using embeddings
- Context-aware responses
- Source citation support

---

# 🏗️ Architecture

```text
                Streamlit UI
                      │
             JWT Authentication
                      │
                      ▼
                 FastAPI Backend
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
 Employee/Manager Tools       Policy RAG
        │                           │
        ▼                           ▼
      MySQL                  ChromaDB Vector DB
        │                           │
        └─────────────┬─────────────┘
                      ▼
                  Groq LLM
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
- pwdlib (Password Hashing)

## AI / LLM

- Groq
- LangChain
- Sentence Transformers

## Retrieval

- ChromaDB
- PDF Loader
- Recursive Text Splitter
- Embeddings

## Database

- MySQL

## Frontend

- Streamlit

---

# 📂 Project Structure

```
employee-rag-chatbot/

├── app/
│   ├── agents/
│   ├── api/
│   ├── auth/
│   ├── database/
│   ├── rag/
│   ├── tools/
│   ├── vector_db/
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
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yanshu01/employee-rag-chatbot.git

cd employee-rag-chatbot
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
DB_HOST=your_host
DB_PORT=3306
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password

JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

---

# 🗄️ Database

Configure a MySQL database and update the `.env` file with your database credentials.

Example employee table includes:

- Employee Code
- Name
- Email
- Department
- Designation
- Role
- Manager Code
- Leave Balance
- Shift Start
- Shift End
- Password Hash

---

# ▶️ Running the Backend

```bash
uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

# ▶️ Running Streamlit

```bash
streamlit run frontend/app.py
```

---

# 🔐 Authentication

The application uses:

- JWT Authentication
- Password hashing with pwdlib
- Role-Based Access Control (RBAC)

Supported Roles:

- Employee
- Manager
- Admin (optional)

---

# 🤖 AI Workflow

1. User logs in using JWT authentication.
2. Question is sent to the FastAPI backend.
3. Intent is classified.
4. Employee/Manager tools retrieve structured data from MySQL.
5. Policy questions use Retrieval-Augmented Generation (RAG).
6. Groq LLM generates a natural language response.
7. The response is returned to the Streamlit UI.

---

# 📌 Current Features

- JWT Authentication
- Employee Self-Service
- Manager Dashboard APIs
- MySQL Integration
- Company Policy RAG
- Groq LLM Integration
- Streamlit Frontend
- Source References
- Secure Read-Only Database Access

---

# 🚧 Future Improvements

- Leave Application Workflow
- Leave Approval System
- Attendance Management
- Shift Management
- HR Admin Dashboard
- Email Notifications
- Multi-language Support
- Docker Deployment
- CI/CD Pipeline
- Cloud Deployment (AWS/GCP)

---

# 📄 License

This project is for educational and portfolio purposes.

# Task Tracker Backend – FastAPI

This project implements the backend for a simple Task Tracker application
using **FastAPI** with **in-memory storage**, as part of a full-stack
coding exercise.

---

##  Tech Stack
- Python 3.9+
- FastAPI
- Uvicorn
- Pydantic

---

##  Features
- User registration and login (mock authentication)
- Task CRUD operations
- Optional filtering of tasks by user and status
- In-memory data storage (no database)

---

### Design Decisions
- Used Pydantic models for request validation
- Used Python lists/dictionaries as an in-memory data store
- Returned a mock JWT token as required
- Kept the API RESTful and aligned with the given specification

---

##  API Endpoints

### Authentication
- **POST** `/auth/signup` – Register a user
- **POST** `/auth/login` – Login and receive a mock token

### Tasks
- **GET** `/tasks`
  - Optional query params:
    - `user_id`
    - `status`
- **POST** `/tasks` – Create a task
- **PUT** `/tasks/{id}` – Update task title or status
- **DELETE** `/tasks/{id}` – Delete a task

---

##  How to Run

```bash
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload 


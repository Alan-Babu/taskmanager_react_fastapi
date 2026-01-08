'''
Backend (Python FastAPI)
● Framework: Use FastAPI with Uvicorn as the server.
● Data Validation: Use Pydantic models to define request and response
schemas.
● API Endpoints:
○ POST /auth/signup: Create a user.
○ POST /auth/login: Return a mock JWT or token string.
○ GET /tasks: Retrieve tasks (optionally filter by status via query
parameters).
○ POST /tasks: Create a new task.
○ PUT /tasks/{id}: Update task title or status.
○ DELETE /tasks/{id}: Remove a task.
● Storage: Use an in-memory global list/dictionary for users and tasks (no
persistent DB setup required).
'''
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




class LoginData(BaseModel):
    username: str
    password: str

class UserRegistration(BaseModel):
    id: int 
    username: str
    password: str
    email: str

class TaskData(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    status: str

class UpdateTaskData(BaseModel):
    title: str | None = None
    status: str | None = None


user_DB = []
tasks = []


@app.post("/auth/login")
def userlogin(login_data: LoginData):
    for user in user_DB:
        if user["username"] == login_data.username and user["password"] == login_data.password:
            return {"token": "mock-jwt-token", "message": "login successful", "user_id": user["id"]}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/auth/signup")
def registeruser(user_data: UserRegistration):
    for user in user_DB:
        if user["username"] == user_data.username or user["email"] == user_data.email:
                    raise HTTPException(status_code=400, detail="User already exists")
    user_DB.append(user_data.dict())
    return {"message": f"User registered successfully"}

@app.get("/tasks")
def get_tasks(user_id: int | None = None, status: str | None = None):
     result = tasks
     if user_id is not None:
          result = [task for task in result if task["user_id"] == user_id]
     if status is not None:
          result = [task for task in result if task["status"] == status]
     return result
     

@app.post("/tasks")
def create_task(task: TaskData):
     for tsk in tasks:
          if tsk["id"] == task.id:
               raise HTTPException(status_code=400, detail="Task with this ID already exists")
     tasks.append(task.dict())
     return {"message": "Task created successfully"}
     
     
@app.put("/tasks/{task_id}")
def updateTask(task_id: int, update: UpdateTaskData):
     for task in tasks:
          if task["id"] == task_id:
               if update.title is not None:
                    task["title"] = update.title
               if update.status is not None:
                    task["status"] = update.status
               return {"message": "Task updated successfully"}
     raise HTTPException(status_code=404, detail="Task not found")


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
     for index, task in enumerate(tasks):
          if task["id"] == task_id:
               tasks.pop(index)
               return {"message": "task Deleted Successfully"}   
     raise HTTPException(status_code=404, detail="Task not found")       

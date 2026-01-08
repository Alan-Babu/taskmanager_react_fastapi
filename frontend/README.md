
---

## 🔐 Authentication Flow

1. User logs in using `/login`
2. Backend returns a mock token and `user_id`
3. Token and user ID are stored in `localStorage`
4. User is redirected to `/tasks`
5. Routes are protected based on authentication state
6. Logout clears stored data and redirects to `/login`

---

## 🔄 Routes

| Route       | Description                    |
|------------|--------------------------------|
| `/login`    | Login page                     |
| `/register` | User registration page         |
| `/tasks`    | Task dashboard (protected)     |

Routing is handled entirely on the client using **React Router**.

---

## 📡 Backend API

The frontend communicates with a FastAPI backend running on:


### API Endpoints Used

- `POST /auth/login`
- `POST /auth/signup`
- `GET /tasks?user_id={id}`
- `POST /tasks`
- `DELETE /tasks/{id}`

---

## ▶️ Running the Application

### 1️⃣ Install dependencies
```bash
npm install

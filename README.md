# CraveRoll - Fast Food Randomizer

---

**Course:**
COMPE-561: Windows Database and Web Programming

---

**Team Members:**
Valerie Joy Pinto, Sydney Kim, Aliza Siddiqui, Melina Kai Kwarcinski, Kaitlin Bituen

---

## Introduction

The website **CraveRoll** is a web application designed to help students navigate on-campus and nearby dining options. Using tools such as Next.js and FastAPI, the application allows users to enhance their dining decisions through an automated randomizer and comprehensive search filters, such as cuisine and budget. Key features include a custom review system using quick-tags, a favorite list for quick access, and a history log to track past rolls. By focusing on performance and user experience, CraveRoll delivers an efficient tool optimized to align with the specific needs of students at SDSU.

---

## Tech Stack

**Frontend:**
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

**Backend:**
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- PyJWT
- pwdlib (argon2)

**Package Management:**
- uv (backend)
- npm (frontend)

---

## Prerequisites

- Python 3.9+
- Node.js & npm

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Spring-2026-CompE-561/Fast-Food-Randomizer.git
cd Fast-Food-Randomizer
```

---

## Environment Setup

Navigate to the `frontend` directory and create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Navigate to the `backend` directory and create a `.env` file:
```env
DATABASE_URL="sqlite:///./fast_food_randomizer.db"
SECRET_KEY="your_secret_key_here"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

---

## Running the Application

The application requires running the backend and frontend simultaneously in separate terminals.

### Terminal 1 — Start the Backend

```bash
cd backend
py -m venv .venv
```

On Windows PowerShell:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
pip install uv
uv sync
python -m uvicorn app.main:app --reload --app-dir src
```

The backend will be running at: **http://127.0.0.1:8000**

### Terminal 2 — Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be running at: **http://localhost:3000**

---

## Accessing the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://127.0.0.1:8000
- **API Documentation (Swagger UI):** http://127.0.0.1:8000/docs

---

## Features

- **User Authentication** — Register and login with JWT-based auth
- **Randomizer** — Spin to get a random restaurant based on filters
- **Browse** — Explore all nearby SDSU dining options
- **Favorites** — Save and manage your favorite restaurants
- **History** — Track your past rolls
- **Tags** — Community quick-tags for restaurants

---

## API Authentication

### Register
```
POST /api/v1/users/register
```
```json
{
  "username": "user",
  "email": "user@example.com",
  "password": "test123"
}
```

### Login
```
POST /api/v1/users/login
```
```json
{
  "email": "user@example.com",
  "password": "test123"
}
```

---

## Project Members

Valerie Joy Pinto, Sydney Kim, Aliza Siddiqui, Melina Kai Kwarcinski, Kaitlin Bituen
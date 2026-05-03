<<<<<<< HEAD
# Fast Food Randomizer - Backend Implementation
---
**Course:** 
```
COMPE-561: Windows Database and Web Programming
```
---
**Team Members:**
```
Valerie Joy Pinto, Sydney Kim, Aliza Siddiqui, Melina Kai Kwarcinski, Kaitlin Bituen
```
---
**Project Overview**

This project presents a FastAPI backend for [Insert Name], a fast food randomizer app. Users can register, log in, and get a randomly selected fast-food restaurant based on custom filters. 
Results are saved to history and the user can favorite restaurants for quick access.
---
## Project Structure
```
src/app/
├── core/
│   ├── auth.py          # JWT creation, bcrypt password hashing
│   ├── database.py      # SQLAlchemy engine + session factory
│   ├── dependencies.py  # get_current_user FastAPI dependency
│   └── settings.py      # App config (loaded from .env)
├── models/
│   └── user.py          # User SQLAlchemy ORM model
├── schemas/
│   ├── token.py         # Token response schema
│   └── user.py          # UserCreate, UserRead Pydantic schemas
├── repository/
│   └── user.py          # Raw DB queries for User
├── services/
│   └── user.py          # register() and login() business logic
├── routes/
│   └── auth.py          # /api/auth/* endpoints
└── main.py              # App factory + middleware registration
tests/
├── conftest.py          # Shared fixtures (in-memory test DB)
└── test_auth.py         # 17 unit tests for all auth endpoints
```
=======
# Fast Food Randomizer (Backend)

This project is a Python **FastAPI** backend for a Fast Food Randomizer application.

## Setup

Create and activate a virtual environment, then install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run the API

From the project root, put `src` on `PYTHONPATH` so imports like `app.*` resolve:

```bash
PYTHONPATH=src uvicorn app.main:app --reload
```

Alternatively:

```bash
cd src && uvicorn app.main:app --reload
```

Then open:
- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/docs`

## Randomizer Feature

### Endpoint

`POST /api/v1/randomizer`

### Request Body

- `latitude` (required): user latitude
- `longitude` (required): user longitude
- `cuisine` (optional)
- `price_range` (optional, 1–5)
- `dietary_tag` (optional)
- `user_id` (optional; used when recording history)

### Behavior

- Applies the provided filters.
- Only considers restaurants **within 3 miles** of the provided user location.
- Selects **one random restaurant** from eligible matches.
- Records the selection in the `history` table.

### Example Request (Postman / curl)

```bash
curl -X POST "http://127.0.0.1:8000/api/v1/randomizer" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 42.3601,
    "longitude": -71.0589,
    "cuisine": "Burgers",
    "price_range": 2,
    "dietary_tag": "vegetarian",
    "user_id": "demo-user"
  }'
```

## Notes

- The `Restaurant` model includes `latitude` and `longitude`. Restaurants without coordinates are not eligible for randomization.
- Database tables are created on application startup using SQLAlchemy metadata.

>>>>>>> main

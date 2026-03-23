# Fast Food Randomizer - Backend Implementation

**Course:** COMPE-561: Windows Database and Web Programming
**Team Members:** Valerie Joy Pinto, Sydney Kim, Aliza Siddiqui, Melina Kai Kwarcinski, Kaitlin Bituen
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

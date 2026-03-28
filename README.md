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
# Fast Food Randomizer Backend

A FastAPI backend for a Fast Food Randomizer web application. This API supports user authentication and backend features for restaurants, favorites, history, and randomizer-based restaurant selection.

## Features

* User registration and login
* JWT-based authentication
* Restaurant data management
* Favorites and history support
* Randomizer feature based on restaurant filters
* FastAPI Swagger docs for testing endpoints

## Tech Stack

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* SQLite
* uv
* PyJWT
* pwdlib with argon2

## Project Structure

```text
src/
  app/
    api/
      v1/
        routes.py
    core/
      auth.py
      database.py
      dependencies.py
      settings.py
    models/
    repository/
    routes/
    schemas/
    services/
    main.py
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Fast-Food-Randomizer
```

### 2. Create and activate a virtual environment

On Windows PowerShell:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

If you are using `uv`:

```bash
uv sync
```

If needed, add missing packages with:

```bash
uv add fastapi
uv add sqlalchemy
uv add pyjwt
uv add "pwdlib[argon2]"
uv add pydantic-settings
```

### 4. Verify configuration

The app uses `src/app/core/settings.py` for configuration.

Current defaults include:

* SQLite database: `sqlite:///./fast_food_randomizer.db`
* JWT algorithm: `HS256`
* Access token expiration: 1440 minutes

You can optionally create a `.env` file in the project root to override settings.

Example:

```env
APP_NAME=Fast Food Randomizer API
APP_VERSION=1.0.0
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
DATABASE_URL=sqlite:///./fast_food_randomizer.db
```

## Running the App

From the project root, run:

```bash
uv run uvicorn app.main:app --reload --app-dir src
```

The backend should now be running at:

```text
http://127.0.0.1:8000
```

## API Documentation

FastAPI automatically provides Swagger documentation at:

```text
http://127.0.0.1:8000/docs
```

You can test endpoints directly in the browser using Swagger UI.

## Authentication Flow

### Register a user

Endpoint:

```text
POST /api/v1/users/register
```

Example body:

```json
{
  "username": "user",
  "email": "user@example.com",
  "password": "test123"
}
```

### Login

Endpoint:

```text
POST /api/v1/users/login
```

Example body:

```json
{
  "email": "user@example.com",
  "password": "test123"
}
```

Successful login returns a JWT access token.

### Authorize in Swagger

1. Copy the `access_token` from login
2. Click the **Authorize** button in Swagger
3. Paste the token
4. Test protected endpoints such as:

```text
GET /api/v1/users/me
```

## Database Notes

This project uses SQLite for local development.

The database file is:

```text
fast_food_randomizer.db
```

If models change during development, you may need to delete the database file and restart the app so tables are recreated:

```powershell
Remove-Item fast_food_randomizer.db
```

## Exported Dependencies

The project uses:

* `pyproject.toml`
* `uv.lock`

A `requirements.txt` file may also be included for submission or compatibility.

To regenerate it:

```bash
uv pip freeze > requirements.txt
```

## Common Commands

Run the app:

```bash
uv run uvicorn app.main:app --reload --app-dir src
```

Sync dependencies:

```bash
uv sync
```

Add a package:

```bash
uv add <package-name>
```

Generate requirements file:

```bash
uv pip freeze > requirements.txt
```

## Notes

* `.venv/` should not be committed
* `.db` files should not be committed
* use Swagger `/docs` to test endpoints quickly
* if imports or tables seem broken after a merge, restart the server and verify `main.py`, `api/v1/routes.py`, and `models/__init__.py`

## Current Status

The backend is structured using:

```text
route -> service -> repository -> database
```

This follows the organization demonstrated in class and keeps the code modular and easier to debug.
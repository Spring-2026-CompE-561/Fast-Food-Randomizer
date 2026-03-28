# Fast Food Randomizer

## Overview
- Fast Food Randomizer is a backend API that allows users to randomly select a fast food restaurant based on stored data. The application supports restaurant management, favorites, history tracking, and user authentication.


## Features

- **Restaurant Feature**
  - Create, store, and retrieve restaurant data

- **Randomizer Feature**
  - Selects a restaurant based on user-selected filters

- **Favorites Feature**
  - Allows users to save and manage preferred restaurants

- **History Feature**
  - Stores each random restaurant selection for a user
  - Includes:
    - user ID
    - restaurant ID
    - timestamp

- **User/Auth Feature**
  - Handles user registration and login
  - Enables personalized features

---

## Project Structure

```txt
src/app/
  ├── models/        # Database models
  ├── schemas/       # Data validation schemas
  ├── repository/    # Database queries
  ├── services/      # Business logic
  ├── routes/        # API endpoints
  ├── core/          # Config and database setup
  └── main.py        # Application entry point
```
---

## Setup Instructions
- **Clone the repository**
```bash
git clone https://github.com/Spring-2026-CompE-561/Fast-Food-Randomizer.git
cd Fast-Food-Randomizer
```
- **Install Dependencies**
```bash
pip install fastapi uvicorn sqlalchemy pydantic pydantic-settings
```
---

## Run the Application
```bash
uvicorn app.main:app --reload --app-dir src
```
---

## Access the API
- open your browser and go to: 
http://127.0.0.1:8000/docs


## Contributors
- Melina — Restaurant Feature  
- Sydney — Randomizer Feature  
- Aliza — Favorites Feature  
- Kaitlin — History Feature  
- Val — Authentication/User Feature
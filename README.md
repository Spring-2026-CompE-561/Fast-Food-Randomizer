# Craveroll - Fast-Food Randomizer


## Tech Stack:

**Frontend:**
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)

**Backend:**
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=FastAPI&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![uv](https://img.shields.io/badge/uv-Python_Dependencies-yellow?style=flat-square) ![Uvicorn](https://img.shields.io/badge/Uvicorn-ASGI_Server-blueviolet?style=flat-square)

**Database:**
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ORM-red?style=flat-square)

--- 
## Table of Contents:

- [Introduction](#introduction)
- [Features](#Features)
- [Environment Configuration](#environment-configuration)
- [Installation and Usage](#installation--usage)
- [Running the Application](#running-the-application)
- [Project Members](#project-members)

---

## Introduction

The website **Craveroll** is a web application that is designed to help students navigate on-campus and nearby dining options. Using tools such as Next.js and FastAPI,  the application allows users to enhance their dining decisions through an automated randomizer and comprehensive search filters, such as cuisine and budget. Key features include a custom review system using quick-tags, a favorite list for quick access, and a history log to track past meals or options. By focusing on performance and user experience, Craveroll delivers an efficient tool and optimized to align with the specific needs of students in SDSU. 

--- 

## Features:
- **Browse and Discover**: Explore a comprehensive directory of on-campus and local fast-food establishments.
- **Automated Randomizer:** Overcome decision fatigue with an automated feature for meal selection.
- **Dynamic Filtering:** Sort restaurants by cuisine type and price point.
- **User Dashboard**: Manage a personalized list of "Favorites" and view meal history.
- **History Log**: Allows users to revisit past 'rolls' and meal choices, ensuring they can easily find their desired spot discovered last week.

---

## Environment Configuration

Each service has its own environment configuration requirement.

**Backend Configuration**
Navigate to the `backend` directory and create a `.env` file. This file tells the application to use the local SQLite database file:

```env
DATABASE_URL="sqlite:///./fast_food_randomizer.db"
```
--- 

## Installation and Usage:
Clone the repository!

With HTTPS:

git clone [https://github.com/your-username/Fast-Food-Randomizer.git](https://github.com/your-username/Fast-Food-Randomizer.git)
cd Fast-Food-Randomizer

**Prerequisites:
- Python 3.9+

- Node.js & npm

- uv (Python package manager)

---

## Running the Application
The application requires running the backend and frontend simultaneously in separate terminals.

1. Start the Backend API

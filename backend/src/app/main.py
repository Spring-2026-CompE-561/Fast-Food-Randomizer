from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routes import api_router
from app.core.database import Base, engine, SessionLocal
from app.core.settings import settings
from app.models import Favorite, History, Restaurant, User
from seed_restaurants import ensure_sqlite_restaurant_hours_columns, seed

# Create database tables
# If the tables do not exist, create them
Base.metadata.create_all(bind=engine)

# Add hours columns to existing SQLite files (create_all does not ALTER TABLE)
ensure_sqlite_restaurant_hours_columns()

# Seed restaurants if database is empty
db = SessionLocal()
try:
    if db.query(Restaurant).count() == 0:
        seed()
finally:
    db.close()

app = FastAPI(
    title=settings.app_name,
    description="CraveRoll — pick a restaurant based on user preferences.",
    version=settings.app_version,
)

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "CraveRoll is officially online!"}

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
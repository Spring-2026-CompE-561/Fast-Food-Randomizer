from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routes import api_router
from app.core.database import Base, engine, SessionLocal, prepare_sqlite_schema
from app.core.settings import settings
from app.models import Favorite, History, Restaurant, Review, User
from seed_restaurants import seed

# Create database tables (SQLite: reconcile legacy review schema first)
prepare_sqlite_schema(engine)
Base.metadata.create_all(bind=engine)

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
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_origin_regex=r"http://192\.168\.\d+\.\d+:3000",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
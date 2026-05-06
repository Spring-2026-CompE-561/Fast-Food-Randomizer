import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routes import api_router
from app.core.database import (
    Base,
    DB_PATH,
    SessionLocal,
    engine,
    ensure_sqlite_restaurant_hours,
    prepare_sqlite_schema,
)
from app.core.settings import settings
from app.models import Favorite, History, Restaurant, Review, User
from seed_restaurants import seed

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Ensure SQLite schema + seed run for every server process (including uvicorn --reload)."""

    logger.info("Using SQLite database file: %s", DB_PATH)
    prepare_sqlite_schema(engine)
    ensure_sqlite_restaurant_hours(engine)
    Base.metadata.create_all(bind=engine)
    # Idempotent: inserts only missing restaurants by name (safe every startup).
    seed()
    db = SessionLocal()
    try:
        n = db.query(Restaurant).count()
        logger.info("Restaurant count after startup seed: %s", n)
        if n == 0:
            logger.warning(
                "No restaurants in DB after seed — check seed_restaurants.py and DB path."
            )
    finally:
        db.close()
    yield


app = FastAPI(
    title=settings.app_name,
    description="CraveRoll — pick a restaurant based on user preferences.",
    version=settings.app_version,
    lifespan=lifespan,
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
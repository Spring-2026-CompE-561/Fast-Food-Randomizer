from sqlalchemy import create_engine, event
from collections.abc import Generator

from sqlalchemy.orm import Session, declarative_base, sessionmaker
from app.core.settings import settings
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[4]
DB_PATH = BASE_DIR / "fast_food_randomizer.db"

SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args=({"check_same_thread": False}
    if settings.database_url.startswith("sqlite")
    else {}
    ),
)

if settings.database_url.startswith("sqlite"):
    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
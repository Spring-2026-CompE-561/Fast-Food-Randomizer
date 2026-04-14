from sqlalchemy import create_engine, event
from collections.abc import Generator

from sqlalchemy.orm import Session, declarative_base, sessionmaker
from app.core.settings import settings

engine = create_engine(
    settings.database_url, 
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
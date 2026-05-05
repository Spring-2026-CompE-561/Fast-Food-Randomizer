from collections.abc import Generator
from pathlib import Path

from sqlalchemy import create_engine, event, text
from sqlalchemy.orm import Session, declarative_base, sessionmaker

from app.core.settings import settings

BASE_DIR = Path(__file__).resolve().parents[4]
DB_PATH = BASE_DIR / "fast_food_randomizer.db"

SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"


def prepare_sqlite_schema(engine) -> None:
    """Drop legacy `reviews` table if it predates tag-based reviews.

    SQLAlchemy create_all never alters existing tables; an old schema
    (rating/body columns) would otherwise cause OperationalError on startup.
    """

    if not str(engine.url).startswith("sqlite"):
        return
    with engine.begin() as conn:
        row = conn.execute(
            text(
                "SELECT 1 FROM sqlite_master WHERE type='table' AND name='reviews'"
            )
        ).fetchone()
        if row is None:
            return
        cols = conn.execute(text("PRAGMA table_info(reviews)")).fetchall()
        names = {c[1] for c in cols}
        if "tag" not in names:
            conn.execute(text("DROP TABLE reviews"))


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
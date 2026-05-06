import shutil
from collections.abc import Generator
from pathlib import Path

from sqlalchemy import create_engine, event, text
from sqlalchemy.orm import Session, declarative_base, sessionmaker

from app.core.settings import settings


def _sqlite_db_path() -> Path:
    """Canonical SQLite file next to ``backend/``.

    Older setups stored the DB at the repo root while docs imply ``backend/``.
    That produced two files and an empty API if the server read the wrong one.
    We always use ``backend/fast_food_randomizer.db`` and copy from the legacy
    path once if the canonical file does not exist yet.
    """

    backend_root = Path(__file__).resolve().parents[3]
    repo_root = Path(__file__).resolve().parents[4]
    backend_db = backend_root / "fast_food_randomizer.db"
    repo_db = repo_root / "fast_food_randomizer.db"
    if not backend_db.exists() and repo_db.exists():
        try:
            shutil.copy2(repo_db, backend_db)
        except OSError:
            pass
    return backend_db


DB_PATH = _sqlite_db_path()

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


def ensure_sqlite_restaurant_hours(engine) -> None:
    """Add hours columns to SQLite ``restaurants`` if missing (create_all won't)."""

    if not str(engine.url).startswith("sqlite"):
        return
    with engine.begin() as conn:
        exists = conn.execute(
            text(
                "SELECT 1 FROM sqlite_master WHERE type='table' AND name='restaurants'"
            )
        ).fetchone()
        if exists is None:
            return
        cols = conn.execute(text("PRAGMA table_info(restaurants)")).fetchall()
        names = {c[1] for c in cols}
        if "hours_display" not in names:
            conn.execute(
                text("ALTER TABLE restaurants ADD COLUMN hours_display VARCHAR")
            )
        if "weekly_hours_json" not in names:
            conn.execute(
                text("ALTER TABLE restaurants ADD COLUMN weekly_hours_json TEXT")
            )


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
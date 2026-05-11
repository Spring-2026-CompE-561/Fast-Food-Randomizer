from collections.abc import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

from app.core.settings import settings

# 1. Create the engine 
# (PostgreSQL doesn't need the SQLite thread checks or PRAGMA hacks)
engine = create_engine(settings.database_url)

# 2. Create the SessionLocal factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. Create the Base class for your data models
Base = declarative_base()

# 4. Dependency to get the DB session in your FastAPI routes
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
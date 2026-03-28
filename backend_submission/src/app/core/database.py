from sqlalchemy import create_engine
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

# from dotenv import load_dotenv
# load_dotenv()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
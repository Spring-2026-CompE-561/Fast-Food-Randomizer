from typing import Optional

from sqlalchemy.orm import Session

from app.models.history import History
from app.repository.history import HistoryRepository
from app.schemas.history import HistoryCreate

def get_user_history(db: Session, user_id: int) -> list[History]:
    return HistoryRepository.get_by_user(db, user_id)

def get_history(db: Session, history_id: int) -> Optional[History]:
    return HistoryRepository.get_history_by_id(db, history_id)

def add_history(db: Session, history: HistoryCreate) -> History:
    return HistoryRepository.create_history(db, history)

def remove_history(db: Session, history_id: int) -> Optional[History]:
    history = HistoryRepository.get_history_by_id(db, history_id)

    if history is None:
        return None
    
    HistoryRepository.delete(db, history)
    return history
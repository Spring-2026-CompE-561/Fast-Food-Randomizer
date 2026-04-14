from typing import Optional

from sqlalchemy.orm import Session

from app.models.history import History
from app.repository.history import HistoryRepository
from app.schemas.history import HistoryCreate

def get_user_history(db: Session, user_id: int) -> list[History]:
    return HistoryRepository.get_history_by_user(db, user_id)

def add_history(db: Session, user_id: int, restaurant_id: int) -> History:
    return HistoryRepository.create_history(db, user_id, restaurant_id)

def remove_history(db: Session, history_id: int, user_id: int) -> bool:
    return HistoryRepository.delete_history(db, history_id, user_id)
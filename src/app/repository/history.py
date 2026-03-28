from typing import Optional
from sqlalchemy.orm import Session

from app.models.history import History
from app.schemas.history import HistoryCreate

class HistoryRepository:
    
    @staticmethod
    def get_history_by_user(db: Session, user_id: int) -> list[History]:
        return (
            db.query(History)
            .filter(History.user_id == user_id)
            .all()
        )

    @staticmethod
    def create_history(db: Session, user_id: int, restaurant_id: int) -> History:
        db_history = History(
            user_id=user_id,
            restaurant_id=restaurant_id
        )

        db.add(db_history)
        db.commit()
        db.refresh(db_history)

        return db_history

    @staticmethod
    def delete_history(db: Session, history_id: int, user_id: int) -> bool:
        history = (
            db.query(History)
            .filter(
                History.id == history_id,
                History.user_id == user_id,
            )
            .first()
        )

        if not history:
            return False
        
        db.delete(history)
        db.commit()
        return True
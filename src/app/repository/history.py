from typing import Optional
from sqlalchemy.orm import Session

from app.models.history import History
from app.schemas.history import HistoryCreate

class HistoryRepository:

    @staticmethod
    def get_history_by_user(db: Session, user_id: int):
        return(
            db.query(History)
            .filter(History.user_id == user_id)
            .order_by(History.selected_at.desc())
            .all()
        )
    
    @staticmethod
    def get_history_by_id(db: Session, history_id: int) -> Optional[History]:
        return (
            db.query(History)
            .filter(History.id == history_id)
            .first()
        )

    @staticmethod
    def create_history(db: Session, history: HistoryCreate) -> History:
        db_history = History(
            user_id=history.user_id,
            restaurant_id=history.restaurant_id
        )

        db.add(db_history)
        db.commit()
        db.refresh(db_history)

        return db_history

    @staticmethod
    def delete_history(db: Session, db_history: History) -> None:
        db.delete(db_history)
        db.commit()



# from typing import Optional

# from sqlalchemy.orm import Session

# from app.models.history import History


# def create_history_entry(
#     db: Session,
#     *,
#     user_id: Optional[str],
#     restaurant_id: int,
#     distance_miles: Optional[float],
#     applied_filters: Optional[str],
# ) -> History:
#     entry = History(
#         user_id=user_id,
#         restaurant_id=restaurant_id,
#         distance_miles=distance_miles,
#         applied_filters=applied_filters,
#     )
#     db.add(entry)
#     db.commit()
#     db.refresh(entry)
#     return entry

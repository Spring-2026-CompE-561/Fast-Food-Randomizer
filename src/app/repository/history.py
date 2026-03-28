from sqlalchemy.orm import Session
from app.models.history import History

def get_history_by_user(db: Session, user_id: int):
    return(
        db.query(History)
        .filter(History.user_id == user_id)
        .order_by(History.selected_at.desc())
        .all()
    )

def create_history(db: Session, user_id: int, restaurant_id: int):
    history = History(
        user_id=user_id,
        restaurant_id=restaurant_id
    )
    db.add(history)
    db.commit()
    db.refresh(history)
    return history

def delete_history(db: Session, history_id: int):
    history = db.query(History).filter(History.id == history_id).first()
    if history:
        db.delete(history)
        db.commit()
    return history



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

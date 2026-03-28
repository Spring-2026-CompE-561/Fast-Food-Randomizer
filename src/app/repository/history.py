from typing import Optional

from sqlalchemy.orm import Session

from app.models.history import History


def create_history_entry(
    db: Session,
    *,
    user_id: Optional[str],
    restaurant_id: int,
    distance_miles: Optional[float],
    applied_filters: Optional[str],
) -> History:
    entry = History(
        user_id=user_id,
        restaurant_id=restaurant_id,
        distance_miles=distance_miles,
        applied_filters=applied_filters,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

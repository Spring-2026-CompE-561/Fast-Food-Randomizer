from sqlalchemy.orm import Session
from app.repository import history as history_repo

def get_user_history(db: Session, user_id: int):
    return history_repo.get_history_by_user(db, user_id)


def add_history(db: Session, user_id: int, restaurant_id: int):
    return history_repo.create_history(db, user_id, restaurant_id)


def remove_history(db: Session, history_id: int):
    return history_repo.delete_history(db, history_id)
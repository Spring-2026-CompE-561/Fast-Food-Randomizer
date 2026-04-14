from typing import Optional
from sqlalchemy.orm import Session

from app.models import Favorite
from app.repository.favorites import FavoriteRepository

def get_favorites(db: Session, user_id: int) -> list[Favorite]:
    return FavoriteRepository.get_by_user_id(db, user_id)


def add_favorite(db: Session, user_id: int, restaurant_id: int) -> Favorite:
    return FavoriteRepository.create(db, user_id, restaurant_id)


def remove_favorite(db: Session, user_id: int, restaurant_id: int) -> bool:
    return FavoriteRepository.delete(db, user_id, restaurant_id)
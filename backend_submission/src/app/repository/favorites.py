from typing import Optional
from sqlalchemy.orm import Session
from app.models.favorites import Favorite
from app.schemas.favorites import FavoriteCreate


class FavoriteRepository:
    """Repo for favorites data access."""

    @staticmethod
    def get_by_user_id(db: Session, user_id: int) -> list[Favorite]:
        return (
            db.query(Favorite)
            .filter(Favorite.user_id == user_id)
            .all()
        )

    @staticmethod
    def create(db: Session, favorite: FavoriteCreate) -> Favorite:
        db_favorite = Favorite(
            user_id=favorite.user_id,
            restaurant_id=favorite.restaurant_id,
        )

        db.add(db_favorite)
        db.commit()
        db.refresh(db_favorite)

        return db_favorite

    @staticmethod
    def delete(db: Session, user_id: int, restaurant_id: int) -> bool:
        favorite = (
            db.query(Favorite)
            .filter(
                Favorite.user_id == user_id,
                Favorite.restaurant_id == restaurant_id,
            )
            .first()
        )

        if not favorite:
            return False

        db.delete(favorite)
        db.commit()
        return True
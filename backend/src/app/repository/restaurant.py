from typing import Optional, Sequence
from sqlalchemy.orm import Session
from app.models.restaurant import Restaurant
from app.schemas.restaurant import RestaurantCreate
from sqlalchemy import or_

from app.services.hours import is_restaurant_open_now


class RestaurantRepository:
    """Repo for restaurant data access."""

    @staticmethod
    def get_all(db: Session) -> list[Restaurant]:
        return db.query(Restaurant).all()

    @staticmethod
    def get_by_id(db: Session, restaurant_id: int) -> Optional[Restaurant]:
        return (
            db.query(Restaurant)
            .filter(Restaurant.id == restaurant_id)
            .first()
        )

    @staticmethod
    def create(db: Session, restaurant: RestaurantCreate) -> Restaurant:
        db_restaurant = Restaurant(
            name=restaurant.name,
            cuisine=restaurant.cuisine,
            price_range=restaurant.price_range,
            dietary_tags=restaurant.dietary_tags,
            hours_display=restaurant.hours_display,
            hours_schedule=restaurant.hours_schedule,
            latitude=restaurant.latitude,
            longitude=restaurant.longitude,
        )

        db.add(db_restaurant)
        db.commit()
        db.refresh(db_restaurant)

        return db_restaurant

    @staticmethod
    def update(db: Session, db_restaurant: Restaurant) -> Restaurant:
        db.commit()
        db.refresh(db_restaurant)
        return db_restaurant

    @staticmethod
    def delete(db: Session, db_restaurant: Restaurant) -> None:
        db.delete(db_restaurant)
        db.commit()

    @staticmethod
    def get_filtered(
        db: Session,
        cuisine: Optional[Sequence[str]] = None,
        max_price: Optional[int] = None,
        dietary_tag: Optional[Sequence[str]] = None,
        open_now_only: bool = False,
    ) -> list[Restaurant]:
        query = db.query(Restaurant)

        if cuisine:
            query = query.filter(
                or_(*[
                    Restaurant.cuisine.ilike(f"%{c}%")
                    for c in cuisine
                ])
            )

        if max_price is not None:
            query = query.filter(Restaurant.price_range == max_price)

        if dietary_tag:
            query = query.filter(
                Restaurant.dietary_tags.isnot(None)
            ).filter(
                or_(*[
                    Restaurant.dietary_tags.ilike(f"%{tag}%")
                    for tag in dietary_tag
                ])
            )

        rows = query.all()
        if open_now_only:
            rows = [r for r in rows if is_restaurant_open_now(r.hours_schedule)]
        return rows

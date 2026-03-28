from typing import Optional
from sqlalchemy.orm import Session
from app.models.restaurant import Restaurant
from app.schemas.restaurant import RestaurantCreate

class RestaurantRepository:
    """Repo for restaurant data access."""

    @staticmethod
    def get_all(db: Session) -> list[Restaurant]:
        return db.query(Restaurant).all()
    
    @staticmethod
    def get_by_id(db:Session, restaurant_id: int) -> Optional[Restaurant]:
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
        cuisine: Optional[str] = None,
        max_price: Optional[int] = None,
        dietary_tag: Optional[str] = None,
    ) -> list[Restaurant]:
        query = db.query(Restaurant)

        if cuisine:
            query = query.filter(Restaurant.cuisine == cuisine)

        if max_price is not None:
            query = query.filter(Restaurant.price_range <= max_price)

        if dietary_tag:
            query = query.filter(Restaurant.dietary_tags.isnot(None)).filter(Restaurant.dietary_tags.like(f"%{dietary_tag}%"))

        return query.all()
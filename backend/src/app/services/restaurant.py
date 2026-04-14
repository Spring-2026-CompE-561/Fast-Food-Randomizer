from typing import Optional
from sqlalchemy.orm import Session

from app.models import Restaurant
from app.repository.restaurant import RestaurantRepository
from app.schemas.restaurant import RestaurantCreate

def get_restaurants(db: Session) -> list[Restaurant]:
    return RestaurantRepository.get_all(db)

def get_restaurant_by_id(db: Session, restaurant_id: int) -> Optional[Restaurant]:
    return RestaurantRepository.get_by_id(db, restaurant_id)

def create_restaurant(db: Session, restaurant: RestaurantCreate) -> Restaurant:
    return RestaurantRepository.create(db, restaurant)
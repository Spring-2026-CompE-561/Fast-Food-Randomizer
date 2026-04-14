from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import app.services.restaurant as restaurant_service
from app.core.database import get_db
from app.schemas.restaurant import RestaurantCreate, RestaurantResponse 

api_router = APIRouter(
    prefix="/restaurants",
    tags=["Restaurants"],
)

@api_router.get("/")
async def get_restaurants(
    db: Annotated[Session, Depends(get_db)],
) -> list[RestaurantResponse]:
    return restaurant_service.get_restaurants(db)

@api_router.get("/{restaurant_id}")
async def get_restuarant_by_id(
    restaurant_id: int,
    db: Annotated[Session, Depends(get_db)],
) -> RestaurantResponse:
    restaurant = restaurant_service.get_restaurant_by_id(db, restaurant_id)

    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    return restaurant

@api_router.post("/", status_code=201)
async def create_restaurant(
    restaurant: RestaurantCreate,
    db: Annotated[Session, Depends(get_db)],
) -> RestaurantResponse:
    return restaurant_service.create_restaurant(db, restaurant)
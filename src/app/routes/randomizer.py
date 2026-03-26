import json
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.app.core.database import get_db
from src.app.models.restaurant import Restaurant
from src.app.repository.history import create_history_entry
from src.app.schemas.randomizer import RandomizeRequest, RandomizeResponse
from src.app.services.randomizer import choose_random_within_radius


router = APIRouter(prefix="/randomizer", tags=["randomizer"])


@router.post("", response_model=RandomizeResponse)
def randomize_restaurant(
    payload: RandomizeRequest,
    db: Annotated[Session, Depends(get_db)],
) -> RandomizeResponse:
    query = db.query(Restaurant).filter(
        Restaurant.latitude.isnot(None),
        Restaurant.longitude.isnot(None),
    )

    if payload.cuisine:
        query = query.filter(Restaurant.cuisine == payload.cuisine)
    if payload.price_range is not None:
        query = query.filter(Restaurant.price_range == payload.price_range)
    if payload.dietary_tag:
        query = query.filter(Restaurant.dietary_tags.isnot(None)).filter(
            Restaurant.dietary_tags.like(f"%{payload.dietary_tag}%")
        )

    candidates = query.all()
    chosen_result = choose_random_within_radius(
        restaurants=candidates,
        user_latitude=payload.latitude,
        user_longitude=payload.longitude,
        radius_miles=3.0,
    )
    if chosen_result is None:
        raise HTTPException(
            status_code=404,
            detail="No restaurants found within 3 miles for the given filters.",
        )

    chosen, distance_miles = chosen_result

    applied_filters = json.dumps(
        {
            "cuisine": payload.cuisine,
            "price_range": payload.price_range,
            "dietary_tag": payload.dietary_tag,
            "radius_miles": 3.0,
        }
    )
    create_history_entry(
        db,
        user_id=payload.user_id,
        restaurant_id=int(chosen.id),
        distance_miles=float(distance_miles),
        applied_filters=applied_filters,
    )

    return RandomizeResponse(
        restaurant_id=int(chosen.id),
        name=str(chosen.name),
        cuisine=str(chosen.cuisine),
        price_range=int(chosen.price_range),
        dietary_tags=chosen.dietary_tags,
        latitude=chosen.latitude,
        longitude=chosen.longitude,
        distance_miles=float(distance_miles),
    )
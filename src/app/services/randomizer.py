import math
import random
import json
from typing import List, Optional, Tuple

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.restaurant import Restaurant
import app.services.history as history_service
from app.schemas.history import HistoryCreate
from app.repository.restaurant import RestaurantRepository
from app.schemas.randomizer import RandomizeRequest, RandomizeResponse


def haversine_miles(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r_miles = 3958.7613
    lat1_r = math.radians(lat1)
    lon1_r = math.radians(lon1)
    lat2_r = math.radians(lat2)
    lon2_r = math.radians(lon2)

    dlat = lat2_r - lat1_r
    dlon = lon2_r - lon1_r

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1_r) * math.cos(lat2_r) * (math.sin(dlon / 2) ** 2)
    )
    c = 2 * math.asin(math.sqrt(a))
    return r_miles * c


def choose_random_within_radius(
    *,
    restaurants: List[Restaurant],
    user_latitude: float,
    user_longitude: float,
    radius_miles: float,
) -> Optional[Tuple[Restaurant, float]]:
    within_radius: List[Tuple[Restaurant, float]] = []

    for r in restaurants:
        if r.latitude is None or r.longitude is None:
            continue

        dist = haversine_miles(
            user_latitude,
            user_longitude,
            float(r.latitude),
            float(r.longitude),
        )

        if dist <= radius_miles:
            within_radius.append((r, dist))

    if not within_radius:
        return None

    return random.choice(within_radius)

def randomize_restaurant(
        db: Session,
        payload: RandomizeRequest,
) -> RandomizeResponse:
    candidates = RestaurantRepository.get_filtered(
        db,
        cuisine=payload.cuisine,
        price_range=payload.price_range,
        dietary_tag=payload.dietary_tag,
    )

    chosen_result = choose_random_within_radius(
        restuarants=candidates,
        user_latitude=payload.latitude,
        user_longitude=payload.longitude,
        radius_miles=3.0,
    )

    if chosen_result is None:
        raise HTTPException(
            status_code=404, 
            detail="No restaurants found within 3 miles for the given filters."
        )
    
    chosen, distance_miles = chosen_result
    
    if payload.user_id is not None:
        applied_filters = json.dumps(
            {
                "cuisine": payload.cuisine,
                "price_range": payload.price_range,
                "dietary_tag": payload.dietary_tag,
                "radius_miles": 3.0,
            }
        )

        history_service.add_history(
            db,
            HistoryCreate(
                user_id=payload.user_id,
                restaurant_id=int(chosen.id),
            ),
        )
        
    return RandomizeResponse(
        restaurant_id=int(chosen.id),
        name=str(chosen.name),
        cuisine=str(chosen.cuisine),
        price_range=int(chosen.price_range),
        dietary_tags=chosen.dietary_tags,
        latitude=chosen.latitude,
        longitude=chosen.longitude,
        distance_miles=distance_miles,
    )

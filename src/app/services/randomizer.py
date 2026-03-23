import random
from datetime import datetime, timedelta

from fastapi import HTTPException
from sqlalchemy import and_, select
from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.history import RandomizationHistory
from app.models.restaurant import Restaurant
from app.schemas.randomizer import (
    FavoriteCreateRequest,
    RandomizerFilters,
    RandomizerSpinRequest,
    RandomizerSpinResponse,
    RestaurantOut,
)


def _normalize_dietary_tags(tags: str | None) -> set[str]:
    if not tags:
        return set()
    return {tag.strip().lower() for tag in tags.split(",") if tag.strip()}


def _dietary_match(restaurant: Restaurant, filters: RandomizerFilters) -> bool:
    tags = _normalize_dietary_tags(restaurant.dietary_tags)
    if filters.dietary.vegetarian and "vegetarian" not in tags:
        return False
    if filters.dietary.vegan and "vegan" not in tags:
        return False
    if filters.dietary.gluten_free and "gluten_free" not in tags and "gluten-free" not in tags:
        return False
    return True


def add_favorite(db: Session, payload: FavoriteCreateRequest) -> dict:
    restaurant = db.get(Restaurant, payload.restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    existing = db.scalar(
        select(Favorite).where(
            and_(
                Favorite.user_id == payload.user_id,
                Favorite.restaurant_id == payload.restaurant_id,
            )
        )
    )
    if existing:
        return {"message": "Restaurant already in favorites"}

    favorite = Favorite(user_id=payload.user_id, restaurant_id=payload.restaurant_id)
    db.add(favorite)
    db.commit()
    return {"message": "Favorite added"}


def remove_favorite(db: Session, user_id: int, restaurant_id: int) -> dict:
    favorite = db.scalar(
        select(Favorite).where(
            and_(
                Favorite.user_id == user_id,
                Favorite.restaurant_id == restaurant_id,
            )
        )
    )
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
    db.delete(favorite)
    db.commit()
    return {"message": "Favorite removed"}


def list_favorites(db: Session, user_id: int) -> list[RestaurantOut]:
    statement = (
        select(Restaurant)
        .join(Favorite, Favorite.restaurant_id == Restaurant.id)
        .where(Favorite.user_id == user_id)
        .order_by(Restaurant.name.asc())
    )
    restaurants = db.scalars(statement).all()
    return [RestaurantOut.model_validate(restaurant) for restaurant in restaurants]


def spin_randomizer(db: Session, payload: RandomizerSpinRequest) -> RandomizerSpinResponse:
    filters = payload.filters

    statement = select(Restaurant)
    if filters.cuisines:
        statement = statement.where(Restaurant.cuisine.in_(filters.cuisines))
    if filters.price_levels:
        statement = statement.where(Restaurant.price_range.in_(filters.price_levels))
    if filters.exclude_restaurant_ids:
        statement = statement.where(Restaurant.id.not_in(filters.exclude_restaurant_ids))
    if filters.favorites_only:
        statement = statement.join(
            Favorite,
            and_(
                Favorite.restaurant_id == Restaurant.id,
                Favorite.user_id == payload.user_id,
            ),
        )

    restaurants = db.scalars(statement).all()
    restaurants = [restaurant for restaurant in restaurants if _dietary_match(restaurant, filters)]

    if payload.options.avoid_recently_picked_days > 0:
        since = datetime.utcnow() - timedelta(days=payload.options.avoid_recently_picked_days)
        recent_ids = db.scalars(
            select(RandomizationHistory.restaurant_id).where(
                and_(
                    RandomizationHistory.user_id == payload.user_id,
                    RandomizationHistory.created_at >= since,
                )
            )
        ).all()
        recent_set = set(recent_ids)
        restaurants = [restaurant for restaurant in restaurants if restaurant.id not in recent_set]

    pool_size = len(restaurants)
    if pool_size == 0:
        raise HTTPException(status_code=404, detail="No restaurants match your current filters")

    selected = random.choice(restaurants)

    history = RandomizationHistory(
        user_id=payload.user_id,
        restaurant_id=selected.id,
        filters_snapshot=payload.model_dump(mode="json"),
        pool_size=pool_size,
    )
    db.add(history)
    db.commit()
    db.refresh(history)

    return RandomizerSpinResponse(
        selection_id=history.id,
        restaurant=RestaurantOut.model_validate(selected),
        pool_size=pool_size,
        picked_at=history.created_at,
    )


def get_history(db: Session, user_id: int, limit: int = 20) -> list[RandomizationHistory]:
    statement = (
        select(RandomizationHistory)
        .where(RandomizationHistory.user_id == user_id)
        .order_by(RandomizationHistory.created_at.desc())
        .limit(limit)
    )
    return db.scalars(statement).all()

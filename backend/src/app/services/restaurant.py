from typing import Optional

from sqlalchemy.orm import Session

from app.models.restaurant import Restaurant
from app.repository.restaurant import RestaurantRepository
from app.repository.review import ReviewRepository
from app.schemas.restaurant import RestaurantCreate, RestaurantResponse
from app.schemas.review import ALLOWED_REVIEW_TAG_SLUGS


def _allowed_tag_counts(raw: dict[str, int]) -> dict[str, int]:
    return {
        k: int(v)
        for k, v in raw.items()
        if k in ALLOWED_REVIEW_TAG_SLUGS and int(v) > 0
    }


def _browse_sort_key(resp: RestaurantResponse) -> tuple[int, int, str]:
    """Tagged venues first; among those, higher total tag votes first; then name."""

    total_votes = sum(resp.review_tag_counts.values())
    untagged_tier = 1 if total_votes == 0 else 0
    return (untagged_tier, -total_votes, resp.name.casefold())


def get_restaurants(db: Session) -> list[RestaurantResponse]:
    restaurants = RestaurantRepository.get_all(db)
    counts_map = ReviewRepository.tag_counts_by_restaurant(db)
    out = [
        RestaurantResponse(
            id=r.id,
            name=r.name,
            cuisine=r.cuisine,
            price_range=r.price_range,
            dietary_tags=r.dietary_tags,
            latitude=r.latitude,
            longitude=r.longitude,
            review_tag_counts=_allowed_tag_counts(counts_map.get(r.id, {})),
        )
        for r in restaurants
    ]
    out.sort(key=_browse_sort_key)
    return out


def get_restaurant_by_id(db: Session, restaurant_id: int) -> Optional[RestaurantResponse]:
    r = RestaurantRepository.get_by_id(db, restaurant_id)
    if r is None:
        return None
    counts = ReviewRepository.tag_counts_for_restaurant(db, restaurant_id)
    return RestaurantResponse(
        id=r.id,
        name=r.name,
        cuisine=r.cuisine,
        price_range=r.price_range,
        dietary_tags=r.dietary_tags,
        latitude=r.latitude,
        longitude=r.longitude,
        review_tag_counts=_allowed_tag_counts(counts),
    )


def create_restaurant(db: Session, restaurant: RestaurantCreate) -> RestaurantResponse:
    r = RestaurantRepository.create(db, restaurant)
    return RestaurantResponse(
        id=r.id,
        name=r.name,
        cuisine=r.cuisine,
        price_range=r.price_range,
        dietary_tags=r.dietary_tags,
        latitude=r.latitude,
        longitude=r.longitude,
        review_tag_counts={},
    )

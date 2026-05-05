from sqlalchemy.orm import Session

from app.repository.review import ReviewRepository
from app.schemas.review import ALLOWED_REVIEW_TAG_SLUGS


def get_my_restaurant_tags(
    db: Session, *, user_id: int, restaurant_id: int
) -> list[str]:
    raw = ReviewRepository.tags_for_user_restaurant(
        db, user_id=user_id, restaurant_id=restaurant_id
    )
    return [t for t in raw if t in ALLOWED_REVIEW_TAG_SLUGS]


def replace_my_restaurant_tags(
    db: Session,
    *,
    user_id: int,
    restaurant_id: int,
    tags: list[str],
) -> list[str]:
    ReviewRepository.replace_user_restaurant_tags(
        db,
        user_id=user_id,
        restaurant_id=restaurant_id,
        tags=tags,
    )
    return ReviewRepository.tags_for_user_restaurant(
        db, user_id=user_id, restaurant_id=restaurant_id
    )

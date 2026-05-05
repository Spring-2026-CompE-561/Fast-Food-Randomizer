from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repository.restaurant import RestaurantRepository
from app.schemas.review import (
    ALLOWED_REVIEW_TAG_SLUGS,
    MyRestaurantTagsResponse,
    ReplaceRestaurantTagsBody,
)
import app.services.review as review_service

api_router = APIRouter(prefix="/reviews", tags=["Reviews"])


def _normalize_tag_payload(tags: list[str]) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for t in tags:
        s = str(t).strip().lower()
        if not s:
            continue
        if s not in ALLOWED_REVIEW_TAG_SLUGS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid tag '{t}'. Allowed: {sorted(ALLOWED_REVIEW_TAG_SLUGS)}",
            )
        if s not in seen:
            seen.add(s)
            out.append(s)
    return out


@api_router.get(
    "/me/restaurant/{restaurant_id}",
    response_model=MyRestaurantTagsResponse,
)
async def get_my_restaurant_tags(
    restaurant_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    restaurant = RestaurantRepository.get_by_id(db, restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    tags = review_service.get_my_restaurant_tags(
        db,
        user_id=int(current_user.id),
        restaurant_id=restaurant_id,
    )
    return MyRestaurantTagsResponse(tags=tags)


@api_router.put(
    "/me/restaurant/{restaurant_id}",
    response_model=MyRestaurantTagsResponse,
)
async def put_my_restaurant_tags(
    restaurant_id: int,
    body: ReplaceRestaurantTagsBody,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    restaurant = RestaurantRepository.get_by_id(db, restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    normalized = _normalize_tag_payload(body.tags)
    tags = review_service.replace_my_restaurant_tags(
        db,
        user_id=int(current_user.id),
        restaurant_id=restaurant_id,
        tags=normalized,
    )
    return MyRestaurantTagsResponse(tags=tags)

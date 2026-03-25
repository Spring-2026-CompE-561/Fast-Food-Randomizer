from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import app.services.favorites as favorites_service
from app.core.database import get_db
from app.schemas.favorites import FavoriteCreate, FavoriteResponse

api_router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"],
)

@api_router.get("/{user_id}")
async def get_favorites(
    user_id: int,
    db: Annotated[Session, Depends(get_db)],
) -> list[FavoriteResponse]:
    return favorites_service.get_favorites(db, user_id)


@api_router.post("/", status_code=201)
async def add_favorite(
    favorite: FavoriteCreate,
    db: Annotated[Session, Depends(get_db)],
) -> FavoriteResponse:
    return favorites_service.add_favorite(db, favorite)


@api_router.delete("/")
async def remove_favorite(
    user_id: int,
    restaurant_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    success = favorites_service.remove_favorite(db, user_id, restaurant_id)

    if not success:
        raise HTTPException(status_code=404, detail="Favorite not found")

    return {"message": "Removed"}
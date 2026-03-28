from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import app.services.favorites as favorites_service
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models import User
from app.schemas.favorites import FavoriteCreate, FavoriteResponse

api_router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"],
)

@api_router.get("/me", response_model=list[FavoriteResponse])
async def get_favorites(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return favorites_service.get_favorites(db, current_user.id)


@api_router.post("/", response_model=FavoriteResponse, status_code=201)
async def add_favorite(
    favorite: FavoriteCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return favorites_service.add_favorite(
        db,
        current_user.id,
        favorite.restaurant_id,
    )

@api_router.delete("/{restaurant_id}")
async def remove_favorite(
    restaurant_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    success = favorites_service.remove_favorite(
        db, 
        current_user.id, 
        restaurant_id
    )

    if not success:
        raise HTTPException(status_code=404, detail="Favorite not found.")

    return {"detail": "Favorite removed successfully"}
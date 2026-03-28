from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

import app.services.favorites as favorites_service
from app.services.restaurant import get_restaurant_by_id
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


@api_router.post("/", response_model=FavoriteResponse, status_code=status.HTTP_201_CREATED)
async def add_favorite(
    favorite: FavoriteCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    restaurant = get_restaurant_by_id(db, favorite.restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found.")
    try:
        return favorites_service.add_favorite(
            db,
            current_user.id,
            favorite.restaurant_id,
        )
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Restaurant is already in favorites.",
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

    return {"detail": "Favorite removed successfully."}
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.randomizer import (
    FavoriteCreateRequest,
    HistoryItemOut,
    RandomizerSpinRequest,
    RandomizerSpinResponse,
    RestaurantOut,
)
from app.services.randomizer import (
    add_favorite,
    get_history,
    list_favorites,
    remove_favorite,
    spin_randomizer,
)

router = APIRouter(prefix="/randomizer", tags=["Randomizer"])


@router.post("/spin", response_model=RandomizerSpinResponse)
def spin(payload: RandomizerSpinRequest, db: Session = Depends(get_db)):
    return spin_randomizer(db, payload)


@router.post("/favorites")
def create_favorite(payload: FavoriteCreateRequest, db: Session = Depends(get_db)):
    return add_favorite(db, payload)


@router.delete("/favorites/{restaurant_id}")
def delete_favorite(
    restaurant_id: int,
    user_id: int = Query(..., ge=1),
    db: Session = Depends(get_db),
):
    return remove_favorite(db, user_id, restaurant_id)


@router.get("/favorites", response_model=list[RestaurantOut])
def favorites(user_id: int = Query(..., ge=1), db: Session = Depends(get_db)):
    return list_favorites(db, user_id)


@router.get("/history", response_model=list[HistoryItemOut])
def history(
    user_id: int = Query(..., ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_history(db, user_id, limit)
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import app.services.history as history_service
from app.core.database import get_db
from app.schemas.history import HistoryCreate, HistoryResponse
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.restaurant import get_restaurant_by_id

api_router = APIRouter(
    prefix="/history", 
    tags=["History"],
    )

@api_router.get("/me", response_model=list[HistoryResponse])
async def get_history(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return history_service.get_user_history(db, current_user.id)


@api_router.post("/", response_model=HistoryResponse, status_code=201)
async def add_history(
    history: HistoryCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    restaurant = get_restaurant_by_id(db, history.restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found.")

    return history_service.add_history(
        db,
        current_user.id,
        history.restaurant_id,
    )


@api_router.delete("/{history_id}")
async def delete_history(
    history_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    success = history_service.remove_history(
        db,
        history_id,
        current_user.id,
    )

    if not success:
        raise HTTPException(status_code=404, detail="History entry not found.")

    return {"message": "Deleted."}
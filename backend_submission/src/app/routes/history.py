from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import app.services.history as history_service
from app.core.database import get_db
from app.schemas.history import HistoryCreate, HistoryResponse

api_router = APIRouter(
    prefix="/history", 
    tags=["History"],
    )


@api_router.get("/{user_id}")
async def get_history(
    user_id: int, 
    db: Annotated[Session, Depends(get_db)],
) -> list[HistoryResponse]:
    return history_service.get_user_history(db, user_id)
    
@api_router.post("/", status_code=201)
async def add_history(
    history: HistoryCreate,
    db: Annotated[Session, Depends(get_db)],
) -> HistoryResponse:
    return history_service.add_history(db, history)

@api_router.delete("/{history_id}")
async def delete_history(
    history_id: int,
    db: Annotated[Session, Depends(get_db)],
) -> dict[str, str]:
    result = history_service.remove_history(db, history_id)

    if result is None:
        raise HTTPException(status_code=404, detail="History entry not found.")
    
    return {"message": "Deleted history entry successfully."}
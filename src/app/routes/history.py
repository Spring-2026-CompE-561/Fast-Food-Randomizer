from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services import history as history_service

api_router = APIRouter(prefix="/history", tags=["History"])


@api_router.get("/{user_id}")
def get_history(user_id: int, db: Session = Depends(get_db)):
    return history_service.get_user_history(db, user_id)


@api_router.post("/")
def add_history(user_id: int, restaurant_id: int, db: Session = Depends(get_db)):
    return history_service.add_history(db, user_id, restaurant_id)


@api_router.delete("/{history_id}")
def delete_history(history_id: int, db: Session = Depends(get_db)):
    result = history_service.remove_history(db, history_id)
    if not result:
        raise HTTPException(status_code=404, detail="History not found")
    return {"message": "Deleted successfully"}
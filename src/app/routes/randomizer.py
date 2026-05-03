from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import app.services.randomizer as randomizer_service
from app.core.database import get_db
from app.schemas.randomizer import RandomizeRequest, RandomizeResponse

api_router = APIRouter(
    prefix="/randomizer", 
    tags=["randomizer"]
)


@api_router.post("/")
async def randomize_restaurant(
    payload: RandomizeRequest,
    db: Annotated[Session, Depends(get_db)],
) -> RandomizeResponse:
    return randomizer_service.randomize_restaurant(db, payload)

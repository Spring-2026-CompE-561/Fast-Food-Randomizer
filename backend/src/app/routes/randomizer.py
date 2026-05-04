from typing import Annotated, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import app.services.randomizer as randomizer_service
from app.core.database import get_db
from app.schemas.randomizer import RandomizeRequest, RandomizeResponse
from app.core.dependencies import get_optional_user
from app.models.user import User

api_router = APIRouter(
    prefix="/randomizer", 
    tags=["Randomizer"]
)


@api_router.post("/")
async def randomize_restaurant(
    payload: RandomizeRequest,
    db: Annotated[Session, Depends(get_db)],
    current_user: Optional[User] = Depends(get_optional_user),
) -> RandomizeResponse:
    return randomizer_service.randomize_restaurant(db, payload, current_user)
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import app.services.user as user_service
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.repository.user import UserRepository
from app.models.user import User
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserLogin, UserResponse

api_router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@api_router.post("/register", status_code=201)
async def register_user(
    user: UserCreate,
    db: Annotated[Session, Depends(get_db)],
) -> UserResponse:
    return user_service.register_user(db, user)


@api_router.post("/login")
async def login_user(
    credentials: UserLogin,
    db: Annotated[Session, Depends(get_db)],
) -> Token:
    return user_service.login_user(db, credentials)


@api_router.get("/me")
async def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> UserResponse:
    return current_user
from typing import Annotated

from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

import app.services.user as user_service
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserResponse

api_router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@api_router.post("/register", status_code=201, response_model=UserResponse)
async def register_user(
    user: UserCreate,
    db: Annotated[Session, Depends(get_db)],
) -> UserResponse:
    return user_service.register_user(db, user)


@api_router.post("/login", response_model=Token)
async def login_user(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_db)],
) -> Token:
    return user_service.login_user_by_email(
        db,
        email=form_data.username,
        password=form_data.password,
    )


@api_router.get("/me", response_model=UserResponse)
async def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> UserResponse:
    return current_user
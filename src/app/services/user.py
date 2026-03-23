from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.auth import create_access_token, hash_password, verify_password
from app.models.user import User
from app.repository import user as user_repo
from app.schemas.token import Token
from app.schemas.user import UserCreate


def register(db: Session, data: UserCreate) -> User:
    if user_repo.get_by_email(db, data.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    if user_repo.get_by_username(db, data.username):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This username is already taken",
        )

    hashed = hash_password(data.password)
    return user_repo.create(db, username=data.username, email=data.email, password_hash=hashed)


def login(db: Session, email: str, password: str) -> Token:
    user = user_repo.get_by_email(db, email)

    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token({"sub": str(user.id)})
    return Token(access_token=token)
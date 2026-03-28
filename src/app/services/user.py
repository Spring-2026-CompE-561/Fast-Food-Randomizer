from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.auth import create_access_token, get_password_hash, verify_password
from app.models.user import User
from app.repository.user import UserRepository
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserLogin


def register_user(db: Session, user: UserCreate) -> User:
    if UserRepository.get_by_email(db, user.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered.",
        )

    if UserRepository.get_by_username(db, user.username):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already taken.",
        )

    password_hash = get_password_hash(user.password)
    return UserRepository.create(db, user, password_hash)


def login_user(db: Session, credentials: UserLogin) -> Token:
    user = UserRepository.get_by_email(db, credentials.email)

    if user is None or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials.",
        )

    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token)

def login_user_by_email(db: Session, email: str, password: str) -> Token:
    user = UserRepository.get_by_email(db, email)

    if user is None or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials.",
        )

    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token)

def get_by_mail(db: Session, email: str) -> Optional[User]:
    return UserRepository.get_by_email(db, email)
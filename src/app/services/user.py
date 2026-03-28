from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.auth import create_access_token, hash_password, verify_password
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

    password_hash = hash_password(user.password)
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
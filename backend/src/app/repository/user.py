from typing import Optional

from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate


class UserRepository:
    """Repository for user data access."""

    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_by_username(db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_by_id(db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def create(db: Session, user: UserCreate, password_hash: str) -> User:
        db_user = User(
            username=user.username,
            email=user.email,
            password_hash=password_hash,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
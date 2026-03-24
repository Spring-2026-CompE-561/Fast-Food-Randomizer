from sqlalchemy.orm import Session
from src.app.models.user import User
from src.app.schemas.user import UserCreate
from src.app.core.auth import get_password_hash

# Create a new user
def create_user(db: Session, user: UserCreate):
    hashed_pass = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        password_hash=hashed_pass,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#Get user by email
#Checks if a user with an existing email already exists during registration and for login authentication [cite:111]
def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()

#Gets user by ID
def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


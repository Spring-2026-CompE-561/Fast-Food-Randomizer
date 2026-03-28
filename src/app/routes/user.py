from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

# Your Core Imports
from app.core.database import get_db
from app.core.auth import hash_password, verify_password, create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserOut
from app.schemas.token import Token

from app.api.v1 import favorites, restaurant
from app.api.v1.randomizer import router as randomizer_router

# 1. Create the Master Router
api_router = APIRouter()

# 2. Create your Auth Router
auth_router = APIRouter(prefix="/auth", tags=["Authentication"])

@auth_router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=409, detail="Email already registered")
    
    new_user = User(
        username=user_in.username,
        email=user_in.email,
        password_hash=hash_password(user_in.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@auth_router.post("/login", response_model=Token)
def login(user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# 3. Tie it all together in the Master Router
api_router.include_router(auth_router)
api_router.include_router(randomizer_router, prefix="/random", tags=["Randomizer"])


# api_router.include_router(restaurant.api_router, prefix="/restaurants", tags=["Restaurants"])
# api_router.include_router(favorites.api_router, prefix="/favorites", tags=["Favorites"])
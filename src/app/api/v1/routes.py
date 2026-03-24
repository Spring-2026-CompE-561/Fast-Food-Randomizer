from fastapi import APIRouter, Depends, HTTPException, status
from sqlachemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta


from src.app.core.database import get_db
from src.app.core.auth import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from src.app.schemas.uer import UserCreate, UserResponse
from src.app.repository.user import create_user, get_user_by_email


router = APIRouter(prefix="/api/auth", tags=["Authentication"])

#Register a new user
@router.post("/register", response_model=UserResponse, status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    
    #Check if email already exists [cite: 111]
    db_user = get_user_by_email(db, user=user)
    if db_user:
        raise HTTPException(
            status_code=409, detail="Email already registered")
        
    #Create the user and return the response
    new_user = create_user(db=db, user=user)
    return UserResponse(id=new_user.id, username=new_user.username, email=new_user.email)

#Login and Getting JWT Token

#To match wireframe: POST /api/auth/login [cite: 31]
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
   #Verify credentials [cite: 112]
    user = authenticate_user(db, form_data.username, form.data_password)
    if not user:
        #Return 401 if authentication fails [cite: 113]
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

#Create JWT token with 24 hour expiration [cite: 100, 145]
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    # Return the token structure from your wireframe [cite: 31]
    return {"access_token": access_token, "token_type": "bearer"}

#Get current user info
@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: UserResponse = Depends(get_current_user)):
    return current_user


from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.settings import settings

#Setup: tells the app to use bcrypt for password hashing and verification
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#Configuration: needed to move to settings.py in the real app for frontend
SECRET_KEY = "YOUR_SUPER_SECRET_KEY_KEEP_IT_SAFE"
ALGORITHM = "HS256"


#Wireframe requirement for tokens to expire after 24 hours
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

#Password Hashing and Verification Logic
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


#JWT token logic 

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

# adds the expiration time to the token payload and encodes it using the secret key and algorithm
to_encode.update({"exp": expire})

encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
return encoded_jwt
    

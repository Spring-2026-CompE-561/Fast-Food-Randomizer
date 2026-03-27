from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.dependencies import get_current_user
from app.routers import auth, restaurants, users

app = FastAPI(title="Fast Food Randomizer")

#connects routes to the app
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])

@app.get("/")
def read_root(current_user=Depends(get_current_user)):
    return {"message": f"Hello, {current_user.username}! Welcome to the Fast Food Randomizer API."}

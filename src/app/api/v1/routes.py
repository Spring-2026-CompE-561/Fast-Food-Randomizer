from fastapi import APIRouter

from app.routes import user, favorites, restaurant
from app.routes.randomizer import router as randomizer_router
api_router = APIRouter(prefix="/api/v1")

api_router.include_router(user.api_router, prefix="/users", tags=["Users"])
api_router .include_router(randomizer_router, prefix="/random", tags=["Randomizer"])
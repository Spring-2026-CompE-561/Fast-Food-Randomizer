from fastapi import APIRouter

from app.routes import favorites, restaurant
from app.routes.randomizer import router as randomizer_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(restaurant.api_router)
api_router.include_router(favorites.api_router)
api_router.include_router(randomizer_router)

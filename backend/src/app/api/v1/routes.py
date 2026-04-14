from fastapi import APIRouter

from app.routes import restaurant, favorites, history, randomizer, user

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(restaurant.api_router)
api_router.include_router(history.api_router)
api_router.include_router(favorites.api_router)
api_router.include_router(randomizer.api_router)
api_router.include_router(user.api_router)

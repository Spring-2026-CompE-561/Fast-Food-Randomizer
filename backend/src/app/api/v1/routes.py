from fastapi import APIRouter

from app.routes import favorites, history, randomizer, restaurant, reviews, user

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(restaurant.api_router)
api_router.include_router(history.api_router)
api_router.include_router(favorites.api_router)
api_router.include_router(randomizer.api_router)
api_router.include_router(reviews.api_router)
api_router.include_router(user.api_router)

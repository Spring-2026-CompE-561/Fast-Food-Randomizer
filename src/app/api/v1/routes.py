from fastapi import APIRouter

from app.routes import favorites, history, restaurants, users
api_router = APIRouter(prefix="/api/v1")

api_router.include_router(restaurants.router, prefix="/restaurants", tags=["restaurants"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(favorites.router, prefix="/favorites", tags=["favorites"])
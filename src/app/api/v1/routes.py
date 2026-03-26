from fastapi import APIRouter

from src.app.routes.randomizer import router as randomizer_router


api_router = APIRouter()
api_router.include_router(randomizer_router)


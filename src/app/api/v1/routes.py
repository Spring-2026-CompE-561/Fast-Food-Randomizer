from fastapi import APIRouter

<<<<<<< HEAD
from src.app.routes.randomizer import router as randomizer_router


api_router = APIRouter()
api_router.include_router(randomizer_router)

=======
from app.routes import restaurant, favorites
# from app.routes import restaurant, user, history, favorites, randomizer

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(restaurant.api_router)
# api_router.include_router(user.api_router)
# api_router.include_router(history.api_router)
api_router.include_router(favorites.api_router)
# api_router.include_router(randomizer.api_router)
>>>>>>> origin/main

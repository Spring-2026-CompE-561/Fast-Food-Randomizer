from fastapi import FastAPI
from app.core.database import Base, engine
from app.models import Restaurant, Favorite, RandomizationHistory  # noqa: F401
from app.routers.randomizer import router as randomizer_router

# This variable NAME must be "app" because that is what your command is looking for
app = FastAPI()

Base.metadata.create_all(bind=engine)
app.include_router(randomizer_router)

@app.get("/")
def read_root():
    return {"message": "Fast Food Randomizer is officially online!"}
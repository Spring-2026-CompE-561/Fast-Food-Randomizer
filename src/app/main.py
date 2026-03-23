from fastapi import FastAPI
from app.core.database import Base, engine
# from app.models import Favorite, History, Restaurant, User
from app.models import Restaurant

Base.metadata.create_all(bind=engine) 

# This variable NAME must be "app" because that is what your command is looking for
app = FastAPI() 

@app.get("/")
def read_root():
    return {"message": "Fast Food Randomizer is officially online!"}
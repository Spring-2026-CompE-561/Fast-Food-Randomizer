from fastapi import FastAPI
from app.core.database import Base, engine
# from app.models import Favorite
# from app.models import History
# from app.models import User
from app.models import Restaurant
from app.api.v1.routes import api_router

Base.metadata.create_all(bind=engine) 

# This variable NAME must be "app" because that is what your command is looking for
app = FastAPI() 

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Fast Food Randomizer is officially online!"}
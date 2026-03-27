from fastapi import FastAPI
from src.app.core.database import engine, Base
from src.app.api.v1.routes import router as auth_router

# Build tables in Postgres
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fast Food Randomizer")

app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "API is online and Database is connected!"}
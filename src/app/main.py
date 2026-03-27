from fastapi import FastAPI
from app.api.v1.routes import router as auth_router
from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "API is running"}
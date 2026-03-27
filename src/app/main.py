from fastapi import FastAPI
<<<<<<< HEAD
from app.api.v1.routes import router as auth_router
from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)
app = FastAPI()
=======
from src.app.core.database import engine, Base
from src.app.api.v1.routes import router as auth_router

# Build tables in Postgres
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fast Food Randomizer")

>>>>>>> f9aaf906a3af3a9c534bd271492ec03c02340716
app.include_router(auth_router)

@app.get("/")
def root():
<<<<<<< HEAD
    return {"message": "API is running"}
=======
    return {"message": "API is online and Database is connected!"}
>>>>>>> f9aaf906a3af3a9c534bd271492ec03c02340716

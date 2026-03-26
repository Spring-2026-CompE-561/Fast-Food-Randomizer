import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from src.app.core.database import Base, engine
from src.app.api.v1.routes import api_router

# This variable NAME must be "app" because that is what your command is looking for
app = FastAPI() 


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed_ms = (time.perf_counter() - start) * 1000
    print(f"{request.method} {request.url.path} -> {response.status_code} ({elapsed_ms:.1f}ms)")
    return response


app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Fast Food Randomizer is officially online!"}
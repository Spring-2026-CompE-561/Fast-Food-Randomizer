import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# Core imports
from app.api.v1.routes import api_router
from app.core.database import Base, engine
from app.models.user import Favorite, HistoryEntry, Restaurant, User  # Ensure User is here!

# The variable name must be "app"
app = FastAPI(title="Fast Food Randomizer")

@app.on.event("startup")
def on_startup() -> None:
    # Build tables in the database
    Base.metadata.create_all(bind=engine)

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware for logging request times
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed_ms = (time.perf_counter() - start) * 1000
    print(f"{request.method} {request.url.path} -> {response.status_code} ({elapsed_ms:.1f}ms)")
    return response

# Include the Master Router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Fast Food Randomizer is officially online!"}
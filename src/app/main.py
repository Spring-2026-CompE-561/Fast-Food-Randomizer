import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# Core imports - including the Master Router we built
from app.api.v1.routes import api_router
from app.core.database import Base, engine
# Import all models so Base knows how to create the tables
from app.models.user import User, Favorite, HistoryEntry, Restaurant  

# 1. Initialize the App
app = FastAPI(title="Fast Food Randomizer")

# 2. Database Table Creation (Sydney's Startup Event)
@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)

# 3. Middleware: CORS (Allows frontend to talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Middleware: Logger (Shows request times in your terminal)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routes import api_router
from app.core.database import Base, engine
from app.models import Favorite, History, Restaurant  # noqa: F401

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


# 5. Include the Master Router (The Switchboard)
# This includes Auth, Randomizer, etc.
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"message": "Fast Food Randomizer is officially online!"}

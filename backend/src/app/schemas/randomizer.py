from typing import Optional

from pydantic import BaseModel, Field


class RandomizeRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    cuisine: Optional[str] = None
    price_range: Optional[int] = Field(default=None, ge=1, le=5)
    dietary_tag: Optional[str] = None
    user_id: Optional[str] = None


class RandomizeResponse(BaseModel):
    restaurant_id: int
    name: str
    cuisine: str
    price_range: int
    dietary_tags: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    distance_miles: float


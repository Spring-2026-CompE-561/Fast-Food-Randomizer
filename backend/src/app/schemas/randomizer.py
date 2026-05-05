from typing import Optional

from pydantic import BaseModel, Field


class RandomizeRequest(BaseModel):
    latitude: Optional[float] = Field(default=None, ge=-90, le=90)
    longitude: Optional[float] = Field(default=None, ge=-180, le=180)
    cuisine: Optional[list[str]] = None
    price_range: Optional[int] = Field(default=None, ge=1, le=5)
    dietary_tag: Optional[list[str]] = None

class RandomizeResponse(BaseModel):
    restaurant_id: int
    name: str
    cuisine: str
    price_range: int
    dietary_tags: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    distance_miles: float
    match_count: int


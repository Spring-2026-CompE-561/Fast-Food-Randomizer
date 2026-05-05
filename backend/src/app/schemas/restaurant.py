from typing import Optional

from pydantic import BaseModel

class RestaurantBase(BaseModel):
    name: str
    cuisine: str
    price_range: int
    dietary_tags: Optional[str] = None
    hours_display: Optional[str] = None
    hours_schedule: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantResponse(RestaurantBase):
    id: int

    class Config:
        from_attributes = True
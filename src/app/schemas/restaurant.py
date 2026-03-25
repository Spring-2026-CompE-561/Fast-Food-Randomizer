from typing import Optional

from pydantic import BaseModel

class RestaurantBase(BaseModel):
    name: str
    cuisine: str
    price_range: int
    dietary_tags: Optional[str] = None

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantResponse(RestaurantBase):
    id: int

    class Config:
        from_attributes = True
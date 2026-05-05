from typing import Optional

from pydantic import BaseModel, Field


class RestaurantBase(BaseModel):
    name: str
    cuisine: str
    price_range: int
    dietary_tags: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantResponse(RestaurantBase):
    id: int
    review_tag_counts: dict[str, int] = Field(default_factory=dict)

    class Config:
        from_attributes = True
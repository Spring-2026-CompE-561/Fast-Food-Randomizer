from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class DietaryFilters(BaseModel):
    vegetarian: bool = False
    vegan: bool = False
    gluten_free: bool = False


class RandomizerFilters(BaseModel):
    cuisines: list[str] = Field(default_factory=list)
    dietary: DietaryFilters = Field(default_factory=DietaryFilters)
    price_levels: list[int] = Field(default_factory=list)
    favorites_only: bool = False
    exclude_restaurant_ids: list[int] = Field(default_factory=list)


class RandomizerOptions(BaseModel):
    avoid_recently_picked_days: int = Field(default=0, ge=0, le=60)


class RandomizerSpinRequest(BaseModel):
    user_id: int = Field(..., ge=1)
    filters: RandomizerFilters = Field(default_factory=RandomizerFilters)
    options: RandomizerOptions = Field(default_factory=RandomizerOptions)


class RestaurantOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    cuisine: str
    price_range: int
    dietary_tags: str | None = None


class RandomizerSpinResponse(BaseModel):
    selection_id: int
    restaurant: RestaurantOut
    pool_size: int
    picked_at: datetime


class FavoriteCreateRequest(BaseModel):
    user_id: int = Field(..., ge=1)
    restaurant_id: int = Field(..., ge=1)


class HistoryItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    restaurant_id: int
    pool_size: int
    filters_snapshot: dict
    created_at: datetime


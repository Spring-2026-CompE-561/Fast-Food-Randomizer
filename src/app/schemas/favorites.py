from pydantic import BaseModel

class FavoriteBase(BaseModel):
    user_id: int
    restaurant_id: int


class FavoriteCreate(FavoriteBase):
    pass


class FavoriteResponse(FavoriteBase):
    id: int

    class Config:
        from_attributes = True
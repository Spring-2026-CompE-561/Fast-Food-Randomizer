from datetime import datetime
from pydantic import BaseModel


class HistoryBase(BaseModel):
    user_id: int
    restaurant_id: int


class HistoryCreate(HistoryBase):
    pass


class HistoryResponse(HistoryBase):
    id: int
    selected_at: datetime

    class Config:
        from_attributes = True
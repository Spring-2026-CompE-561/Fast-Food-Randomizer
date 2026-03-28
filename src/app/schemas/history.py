from datetime import datetime
from pydantic import BaseModel


class HistoryBase(BaseModel):
    restaurant_id: int


class HistoryCreate(HistoryBase):
    pass


class HistoryResponse(HistoryBase):
    id: int
    user_id: int
    selected_at: datetime

    class Config:
        from_attributes = True
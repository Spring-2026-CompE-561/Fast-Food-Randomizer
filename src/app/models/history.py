from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String

from app.core.database import Base


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=True)
    restaurant_id = Column(Integer, index=True, nullable=False)
    chosen_at = Column(DateTime, default=datetime.utcnow, index=True)
    distance_miles = Column(Float, nullable=True)
    applied_filters = Column(String, nullable=True)


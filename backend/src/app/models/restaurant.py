from datetime import datetime 
from sqlalchemy import Column, Integer, String, DateTime, Float
from app.core.database import Base

class Restaurant(Base):
    __tablename__ = 'restaurants'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False, unique=True)
    cuisine = Column(String, index=True, nullable=False)
    price_range = Column(Integer, index=True, nullable=False)
    dietary_tags = Column(String, index=True, nullable=True)
    hours_display = Column(String, index=False, nullable=True)
    hours_schedule = Column(String, index=False, nullable=True)
    latitude = Column(Float, index=True, nullable=True)
    longitude = Column(Float, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow) 
from datetime import datetime 
from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base

class Restaurant(Base):
    __tablename__ = 'restaurants'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False, unique=True)
    cuisine = Column(String, index=True, nullable=False)
    price_range = Column(Integer, index=True, nullable=False)
    dietary_tags = Column(String, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow) 
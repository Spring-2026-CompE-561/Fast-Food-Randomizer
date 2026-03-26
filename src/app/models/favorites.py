from datetime import datetime
from sqlalchemy import Column, Integer, DateTime
from app.core.database import Base


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    restaurant_id = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
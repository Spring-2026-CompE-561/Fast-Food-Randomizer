from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, JSON

from app.core.database import Base


class RandomizationHistory(Base):
    __tablename__ = "randomization_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False, index=True)
    filters_snapshot = Column(JSON, nullable=False)
    pool_size = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

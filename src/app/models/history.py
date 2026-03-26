from datetime import datetime
from sqlalchemy import Column, Integer, DateTime
from app.core.database import Base

class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    restaurant_id = Column(Integer, nullable=False, index=True)
    selected_at = Column(DateTime, default=datetime.utcnow)
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship

from app.core.database import Base


class Review(Base):
    """Tag-only crowd signal: one row per user × restaurant × tag slug."""

    __tablename__ = "reviews"
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "restaurant_id",
            "tag",
            name="uq_reviews_user_restaurant_tag",
        ),
    )

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    restaurant_id = Column(
        Integer, ForeignKey("restaurants.id"), nullable=False, index=True
    )
    tag = Column(String(32), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="reviews")
    restaurant = relationship("Restaurant", back_populates="reviews")

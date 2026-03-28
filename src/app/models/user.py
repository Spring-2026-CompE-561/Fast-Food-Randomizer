from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    # We will use password_hash to match your auth logic
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    # Using server_default is better for database consistency
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships for your teammates
    favorites = relationship("Favorite", back_populates="user", cascade="all, delete-orphan")
    history = relationship("HistoryEntry", back_populates="user", cascade="all, delete-orphan")

class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    user = relationship("User", back_populates="favorites")

class HistoryEntry(Base):
    __tablename__ = "history_entries"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="history")

class Restaurant(Base):
    __tablename__ = "restaurants"
    id = Column(Integer, primary_key=True)
    name = Column(String)
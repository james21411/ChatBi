"""
Database Models
SQLAlchemy models for the application (if needed for more complex databases).
"""

from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..core.config import settings

Base = declarative_base()

class SalesRecord(Base):
    """
    SQLAlchemy model for sales records.
    """
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    region = Column(String(100), nullable=False)
    product = Column(String(100), nullable=False)
    sales_amount = Column(Float, nullable=False)
    date = Column(String(20), nullable=False)  # Using string for simplicity
    quantity = Column(Integer, nullable=False)

class QueryLog(Base):
    """
    Model for logging user queries.
    """
    __tablename__ = "query_logs"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(36), nullable=False)
    query = Column(Text, nullable=False)
    sql_generated = Column(Text, nullable=True)
    timestamp = Column(DateTime, nullable=False)
    results_count = Column(Integer, default=0)

# Database setup
engine = create_engine(settings.database_url.replace("sqlite:///", "sqlite:///"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """Dependency for getting database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)

def drop_tables():
    """Drop all database tables."""
    Base.metadata.drop_all(bind=engine)
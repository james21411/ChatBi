"""
DataSource Model
Handles database connections and data retrieval operations.
"""

import pandas as pd
import sqlite3
from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
from ..core.config import settings
from ..core.logging import get_logger

logger = get_logger(__name__)

class DataSource(ABC):
    """
    Abstract base class for data sources.
    """

    @abstractmethod
    def connect(self) -> None:
        """Establish connection to the data source."""
        pass

    @abstractmethod
    def disconnect(self) -> None:
        """Close connection to the data source."""
        pass

    @abstractmethod
    def execute_query(self, query: str) -> pd.DataFrame:
        """Execute SQL query and return results as DataFrame."""
        pass

    @abstractmethod
    def get_table_schema(self, table_name: str) -> Dict[str, Any]:
        """Get schema information for a table."""
        pass

    @abstractmethod
    def list_tables(self) -> List[str]:
        """List all available tables."""
        pass

class SQLiteDataSource(DataSource):
    """
    SQLite database implementation of DataSource.
    """

    def __init__(self, database_path: str = None):
        self.database_path = database_path or settings.database_url.replace("sqlite:///", "")
        self.connection: Optional[sqlite3.Connection] = None
        logger.info(f"Initialized SQLiteDataSource with path: {self.database_path}")

    def connect(self) -> None:
        """Connect to SQLite database."""
        try:
            self.connection = sqlite3.connect(self.database_path)
            logger.info("Connected to SQLite database")
        except Exception as e:
            logger.error(f"Failed to connect to SQLite database: {e}")
            raise

    def disconnect(self) -> None:
        """Disconnect from SQLite database."""
        if self.connection:
            self.connection.close()
            self.connection = None
            logger.info("Disconnected from SQLite database")

    def execute_query(self, query: str) -> pd.DataFrame:
        """Execute SQL query and return results."""
        if not self.connection:
            self.connect()

        try:
            df = pd.read_sql_query(query, self.connection)
            logger.info(f"Executed query successfully, returned {len(df)} rows")
            return df
        except Exception as e:
            logger.error(f"Query execution failed: {e}")
            raise

    def get_table_schema(self, table_name: str) -> Dict[str, Any]:
        """Get schema for a specific table."""
        if not self.connection:
            self.connect()

        try:
            cursor = self.connection.cursor()
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = cursor.fetchall()

            schema = {
                "table_name": table_name,
                "columns": [
                    {
                        "name": col[1],
                        "type": col[2],
                        "nullable": not col[3],
                        "default": col[4],
                        "primary_key": bool(col[5])
                    }
                    for col in columns
                ]
            }
            return schema
        except Exception as e:
            logger.error(f"Failed to get schema for table {table_name}: {e}")
            raise

    def list_tables(self) -> List[str]:
        """List all tables in the database."""
        if not self.connection:
            self.connect()

        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall()]
            return tables
        except Exception as e:
            logger.error(f"Failed to list tables: {e}")
            raise

class DataSourceFactory:
    """
    Factory for creating DataSource instances.
    """

    @staticmethod
    def create_datasource(db_type: str = None, **kwargs) -> DataSource:
        """Create appropriate DataSource based on database type."""
        db_type = db_type or settings.database_type

        if db_type == "sqlite":
            return SQLiteDataSource(**kwargs)
        else:
            raise ValueError(f"Unsupported database type: {db_type}")
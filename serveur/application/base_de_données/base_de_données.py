"""
Database Connection Module
Handles database connections and basic operations.
"""

import sqlite3
import pandas as pd
from typing import Optional, Dict, Any
from ..core.config import settings
from ..core.logging import get_logger

logger = get_logger(__name__)

class DatabaseConnection:
    """
    Manages database connections and operations.
    """

    def __init__(self, connection_string: str = None):
        self.connection_string = connection_string or settings.database_url
        self.connection: Optional[sqlite3.Connection] = None

    def connect(self) -> sqlite3.Connection:
        """Establish database connection."""
        if not self.connection:
            try:
                if self.connection_string.startswith("sqlite:///"):
                    db_path = self.connection_string.replace("sqlite:///", "")
                else:
                    db_path = self.connection_string

                self.connection = sqlite3.connect(db_path)
                logger.info(f"Connected to database: {db_path}")
            except Exception as e:
                logger.error(f"Failed to connect to database: {e}")
                raise
        return self.connection

    def disconnect(self) -> None:
        """Close database connection."""
        if self.connection:
            self.connection.close()
            self.connection = None
            logger.info("Disconnected from database")

    def execute_query(self, query: str, params: tuple = None) -> pd.DataFrame:
        """Execute SQL query and return results as DataFrame."""
        conn = self.connect()
        try:
            if params:
                result = pd.read_sql_query(query, conn, params=params)
            else:
                result = pd.read_sql_query(query, conn)
            logger.debug(f"Executed query successfully, returned {len(result)} rows")
            return result
        except Exception as e:
            logger.error(f"Query execution failed: {e}")
            raise

    def execute_dml(self, query: str, params: tuple = None) -> int:
        """Execute Data Manipulation Language (INSERT, UPDATE, DELETE) queries."""
        conn = self.connect()
        try:
            cursor = conn.cursor()
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            conn.commit()
            affected_rows = cursor.rowcount
            logger.debug(f"DML query executed, affected {affected_rows} rows")
            return affected_rows
        except Exception as e:
            conn.rollback()
            logger.error(f"DML execution failed: {e}")
            raise

    def get_table_info(self, table_name: str) -> Dict[str, Any]:
        """Get information about a table."""
        conn = self.connect()
        try:
            cursor = conn.cursor()

            # Get column information
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = cursor.fetchall()

            # Get row count
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            row_count = cursor.fetchone()[0]

            return {
                "table_name": table_name,
                "row_count": row_count,
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
        except Exception as e:
            logger.error(f"Failed to get table info for {table_name}: {e}")
            raise

    def list_tables(self) -> list:
        """List all tables in the database."""
        conn = self.connect()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall()]
            return tables
        except Exception as e:
            logger.error(f"Failed to list tables: {e}")
            raise

    def create_sample_data(self) -> None:
        """Create sample sales data for demonstration."""
        conn = self.connect()
        try:
            cursor = conn.cursor()

            # Create sales table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS sales (
                    id INTEGER PRIMARY KEY,
                    region TEXT NOT NULL,
                    product TEXT NOT NULL,
                    sales_amount REAL NOT NULL,
                    date TEXT NOT NULL,
                    quantity INTEGER NOT NULL
                )
            ''')

            # Insert sample data
            sample_data = [
                ('Île-de-France', 'Product A', 1240.50, '2024-01-15', 10),
                ('Provence', 'Product B', 890.25, '2024-01-16', 7),
                ('Nouvelle-Aquitaine', 'Product A', 720.00, '2024-01-17', 6),
                ('Occitanie', 'Product C', 680.75, '2024-01-18', 5),
                ('Auvergne-Rhône-Alpes', 'Product B', 950.30, '2024-01-19', 8),
                ('Île-de-France', 'Product C', 1100.00, '2024-01-20', 9),
                ('Provence', 'Product A', 765.40, '2024-01-21', 6),
                ('Nouvelle-Aquitaine', 'Product B', 890.60, '2024-01-22', 7),
                ('Occitanie', 'Product A', 920.25, '2024-01-23', 8),
                ('Auvergne-Rhône-Alpes', 'Product C', 1150.75, '2024-01-24', 10),
            ]

            cursor.executemany('''
                INSERT OR REPLACE INTO sales (region, product, sales_amount, date, quantity)
                VALUES (?, ?, ?, ?, ?)
            ''', sample_data)

            conn.commit()
            logger.info("Created sample sales data")

        except Exception as e:
            logger.error(f"Failed to create sample data: {e}")
            raise

# Global database connection instance
db_connection = DatabaseConnection()
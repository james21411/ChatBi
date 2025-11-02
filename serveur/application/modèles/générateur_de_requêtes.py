"""
QueryGenerator Model
Converts natural language queries to SQL and executes them.
"""

import re
from typing import Dict, Any, List
import pandas as pd
from .datasource import DataSource, DataSourceFactory
from ..core.logging import get_logger

logger = get_logger(__name__)

class QueryGenerator:
    """
    Generates SQL queries from natural language input.
    """

    def __init__(self):
        self.datasource: DataSource = DataSourceFactory.create_datasource()
        self.table_schemas: Dict[str, Dict] = {}
        self._load_schemas()

    def _load_schemas(self):
        """Load table schemas for query generation."""
        try:
            self.datasource.connect()
            tables = self.datasource.list_tables()
            for table in tables:
                self.table_schemas[table] = self.datasource.get_table_schema(table)
            logger.info(f"Loaded schemas for {len(tables)} tables")
        except Exception as e:
            logger.warning(f"Could not load table schemas: {e}")
        finally:
            self.datasource.disconnect()

    def generate_sql(self, natural_query: str) -> str:
        """
        Convert natural language query to SQL.
        This is a simplified implementation - in production, this would use
        advanced NLP models or LLM for better query generation.
        """
        query_lower = natural_query.lower().strip()

        # Simple pattern matching for common queries
        if self._is_aggregation_query(query_lower):
            return self._generate_aggregation_sql(query_lower)
        elif self._is_filter_query(query_lower):
            return self._generate_filter_sql(query_lower)
        elif self._is_count_query(query_lower):
            return self._generate_count_sql(query_lower)
        elif self._is_select_all_query(query_lower):
            return self._generate_select_all_sql(query_lower)
        else:
            # Default to SELECT * with LIMIT
            return self._generate_default_sql()

    def _is_aggregation_query(self, query: str) -> bool:
        """Check if query is asking for aggregations (sum, avg, etc.)."""
        return any(word in query for word in ['sum', 'total', 'average', 'avg', 'count', 'max', 'min'])

    def _is_filter_query(self, query: str) -> bool:
        """Check if query contains filtering conditions."""
        return any(word in query for word in ['where', 'filter', 'with', 'having'])

    def _is_count_query(self, query: str) -> bool:
        """Check if query is asking for count."""
        return 'count' in query or 'how many' in query

    def _is_select_all_query(self, query: str) -> bool:
        """Check if query wants all data."""
        return any(phrase in query for phrase in ['show all', 'all data', 'everything', 'list all'])

    def _generate_aggregation_sql(self, query: str) -> str:
        """Generate SQL for aggregation queries."""
        # This is a very simplified implementation
        # In production, use NLP to parse the query properly

        # Assume we have a 'sales' table with columns like 'amount', 'region', etc.
        if 'sum' in query or 'total' in query:
            if 'region' in query:
                return """
                SELECT region, SUM(amount) as total_amount
                FROM sales
                GROUP BY region
                ORDER BY total_amount DESC
                """
            else:
                return "SELECT SUM(amount) as total_amount FROM sales"

        elif 'average' in query or 'avg' in query:
            return "SELECT AVG(amount) as average_amount FROM sales"

        elif 'count' in query:
            return "SELECT COUNT(*) as total_records FROM sales"

        return "SELECT * FROM sales LIMIT 100"

    def _generate_filter_sql(self, query: str) -> str:
        """Generate SQL for filter queries."""
        # Simplified filtering logic
        sql = "SELECT * FROM sales WHERE 1=1"

        if 'region' in query:
            # Extract region name - this is very basic
            regions = ['paris', 'lyon', 'marseille', 'toulouse']
            for region in regions:
                if region in query:
                    sql += f" AND region = '{region}'"
                    break

        return sql + " LIMIT 100"

    def _generate_count_sql(self, query: str) -> str:
        """Generate SQL for count queries."""
        return "SELECT COUNT(*) as total_count FROM sales"

    def _generate_select_all_sql(self, query: str) -> str:
        """Generate SQL for select all queries."""
        return "SELECT * FROM sales LIMIT 1000"

    def _generate_default_sql(self) -> str:
        """Generate default SQL query."""
        return "SELECT * FROM sales LIMIT 100"

    def execute_query(self, sql_query: str) -> pd.DataFrame:
        """
        Execute the generated SQL query and return results.
        """
        try:
            self.datasource.connect()
            result = self.datasource.execute_query(sql_query)
            return result
        finally:
            self.datasource.disconnect()

    def get_available_tables(self) -> List[str]:
        """Get list of available tables."""
        try:
            self.datasource.connect()
            return self.datasource.list_tables()
        finally:
            self.datasource.disconnect()

    def get_table_info(self, table_name: str) -> Dict[str, Any]:
        """Get information about a specific table."""
        return self.table_schemas.get(table_name, {})
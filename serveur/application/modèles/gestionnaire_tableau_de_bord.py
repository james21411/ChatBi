"""
DashboardManager Model
Prepares data for dashboard visualization and charts.
"""

import pandas as pd
import json
from typing import Dict, Any, List
from ..core.logging import get_logger

logger = get_logger(__name__)

class DashboardManager:
    """
    Manages dashboard data preparation and visualization.
    """

    def __init__(self):
        self.current_data: pd.DataFrame = pd.DataFrame()
        self.charts_config: Dict[str, Any] = {}

    def prepare_dashboard(self, data: pd.DataFrame) -> Dict[str, Any]:
        """
        Prepare dashboard data from query results.
        """
        self.current_data = data.copy()

        dashboard = {
            "summary": self._generate_summary(data),
            "charts": self._generate_charts(data),
            "table": self._prepare_table_data(data),
            "kpis": self._calculate_kpis(data)
        }

        logger.info(f"Prepared dashboard with {len(dashboard['charts'])} charts")
        return dashboard

    def _generate_summary(self, data: pd.DataFrame) -> Dict[str, Any]:
        """Generate summary statistics."""
        summary = {
            "total_rows": len(data),
            "total_columns": len(data.columns),
            "column_types": {},
            "data_types": {}
        }

        # Column type analysis
        for col in data.columns:
            dtype = str(data[col].dtype)
            summary["column_types"][col] = dtype

            if dtype not in summary["data_types"]:
                summary["data_types"][dtype] = 0
            summary["data_types"][dtype] += 1

        return summary

    def _generate_charts(self, data: pd.DataFrame) -> List[Dict[str, Any]]:
        """Generate chart configurations for visualization."""
        charts = []

        # Get numeric columns for charts
        numeric_cols = data.select_dtypes(include=['number']).columns.tolist()
        categorical_cols = data.select_dtypes(include=['object', 'category']).columns.tolist()

        # Bar chart for categorical data
        if categorical_cols and numeric_cols:
            cat_col = categorical_cols[0]
            num_col = numeric_cols[0]

            # Group by categorical column and sum numeric
            grouped = data.groupby(cat_col)[num_col].sum().reset_index()

            charts.append({
                "type": "bar",
                "title": f"{num_col.title()} by {cat_col.title()}",
                "data": {
                    "labels": grouped[cat_col].tolist(),
                    "datasets": [{
                        "label": num_col.title(),
                        "data": grouped[num_col].tolist(),
                        "backgroundColor": "rgba(54, 162, 235, 0.5)",
                        "borderColor": "rgba(54, 162, 235, 1)",
                        "borderWidth": 1
                    }]
                },
                "options": {
                    "responsive": True,
                    "scales": {
                        "y": {
                            "beginAtZero": True
                        }
                    }
                }
            })

        # Line chart for time series (if date column exists)
        date_cols = [col for col in data.columns if 'date' in col.lower() or data[col].dtype == 'datetime64[ns]']
        if date_cols and numeric_cols:
            date_col = date_cols[0]
            num_col = numeric_cols[0]

            # Sort by date and prepare data
            sorted_data = data.sort_values(date_col)
            charts.append({
                "type": "line",
                "title": f"{num_col.title()} Over Time",
                "data": {
                    "labels": sorted_data[date_col].astype(str).tolist(),
                    "datasets": [{
                        "label": num_col.title(),
                        "data": sorted_data[num_col].tolist(),
                        "borderColor": "rgba(75, 192, 192, 1)",
                        "backgroundColor": "rgba(75, 192, 192, 0.2)",
                        "tension": 0.1
                    }]
                },
                "options": {
                    "responsive": True,
                    "scales": {
                        "y": {
                            "beginAtZero": True
                        }
                    }
                }
            })

        # Pie chart for categorical distribution
        if categorical_cols:
            cat_col = categorical_cols[0]
            value_counts = data[cat_col].value_counts().head(10)  # Top 10 categories

            colors = [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(199, 199, 199, 0.5)',
                'rgba(83, 102, 255, 0.5)',
                'rgba(255, 99, 255, 0.5)',
                'rgba(99, 255, 132, 0.5)'
            ]

            charts.append({
                "type": "pie",
                "title": f"Distribution of {cat_col.title()}",
                "data": {
                    "labels": value_counts.index.tolist(),
                    "datasets": [{
                        "data": value_counts.values.tolist(),
                        "backgroundColor": colors[:len(value_counts)],
                        "borderColor": [color.replace('0.5', '1') for color in colors[:len(value_counts)]],
                        "borderWidth": 1
                    }]
                },
                "options": {
                    "responsive": True
                }
            })

        return charts

    def _prepare_table_data(self, data: pd.DataFrame) -> Dict[str, Any]:
        """Prepare data for table display."""
        # Limit rows for performance
        display_data = data.head(100)

        return {
            "columns": [{"field": col, "headerName": col.title(), "width": 120}
                       for col in display_data.columns],
            "rows": display_data.to_dict('records'),
            "total_rows": len(data)
        }

    def _calculate_kpis(self, data: pd.DataFrame) -> List[Dict[str, Any]]:
        """Calculate key performance indicators."""
        kpis = []
        numeric_cols = data.select_dtypes(include=['number']).columns

        for col in numeric_cols[:4]:  # Show max 4 KPIs
            values = data[col].dropna()
            if len(values) > 0:
                kpis.append({
                    "title": col.title(),
                    "value": round(values.sum() if 'total' in col.lower() or 'sum' in col.lower()
                                 else values.mean(), 2),
                    "type": "sum" if 'total' in col.lower() or 'sum' in col.lower() else "average",
                    "change": 0  # Placeholder for change calculation
                })

        return kpis

    def get_current_dashboard(self, session) -> Dict[str, Any]:
        """Get current dashboard data for a session."""
        if self.current_data.empty:
            return {"message": "No data available"}

        return self.prepare_dashboard(self.current_data)

    def export_dashboard_config(self) -> str:
        """Export dashboard configuration as JSON."""
        config = {
            "charts": self.charts_config,
            "summary": self._generate_summary(self.current_data) if not self.current_data.empty else {}
        }
        return json.dumps(config, indent=2)
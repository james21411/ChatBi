"""
Export Service
Handles data export to various formats (CSV, JSON).
"""

import pandas as pd
import json
import os
from typing import Dict, Any
from pathlib import Path
from ..core.logging import get_logger

logger = get_logger(__name__)

class DataExporter:
    """
    Exports data in various formats.
    """

    def __init__(self, export_dir: str = "exports"):
        self.export_dir = Path(export_dir)
        self.export_dir.mkdir(exist_ok=True)

    def export_to_csv(self, data: pd.DataFrame, filename: str = None) -> str:
        """Export data to CSV format."""
        if filename is None:
            filename = f"export_{pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')}.csv"

        filepath = self.export_dir / filename

        try:
            data.to_csv(filepath, index=False, encoding='utf-8')
            logger.info(f"Exported {len(data)} rows to {filepath}")
            return str(filepath)
        except Exception as e:
            logger.error(f"Failed to export to CSV: {e}")
            raise

    def export_to_json(self, data: pd.DataFrame, filename: str = None) -> str:
        """Export data to JSON format."""
        if filename is None:
            filename = f"export_{pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')}.json"

        filepath = self.export_dir / filename

        try:
            # Convert DataFrame to list of dictionaries
            json_data = data.to_dict('records')

            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, indent=2, default=str)

            logger.info(f"Exported {len(data)} rows to {filepath}")
            return str(filepath)
        except Exception as e:
            logger.error(f"Failed to export to JSON: {e}")
            raise

    def export_to_excel(self, data: pd.DataFrame, filename: str = None) -> str:
        """Export data to Excel format."""
        if filename is None:
            filename = f"export_{pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')}.xlsx"

        filepath = self.export_dir / filename

        try:
            data.to_excel(filepath, index=False, engine='openpyxl')
            logger.info(f"Exported {len(data)} rows to {filepath}")
            return str(filepath)
        except Exception as e:
            logger.error(f"Failed to export to Excel: {e}")
            raise

    def export_dashboard_data(self, dashboard_data: Dict[str, Any], filename: str = None) -> str:
        """Export dashboard configuration and data."""
        if filename is None:
            filename = f"dashboard_{pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')}.json"

        filepath = self.export_dir / filename

        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(dashboard_data, f, indent=2, default=str)

            logger.info(f"Exported dashboard data to {filepath}")
            return str(filepath)
        except Exception as e:
            logger.error(f"Failed to export dashboard data: {e}")
            raise

    def get_export_formats(self) -> Dict[str, str]:
        """Get available export formats."""
        return {
            'csv': 'CSV (Comma Separated Values)',
            'json': 'JSON (JavaScript Object Notation)',
            'excel': 'Excel (.xlsx)'
        }

    def list_exports(self) -> Dict[str, Any]:
        """List all exported files."""
        exports = []
        try:
            for file_path in self.export_dir.glob("*"):
                if file_path.is_file():
                    stat = file_path.stat()
                    exports.append({
                        'filename': file_path.name,
                        'path': str(file_path),
                        'size': stat.st_size,
                        'created': pd.Timestamp.fromtimestamp(stat.st_ctime).isoformat(),
                        'format': file_path.suffix[1:] if file_path.suffix else 'unknown'
                    })
        except Exception as e:
            logger.error(f"Failed to list exports: {e}")

        return {
            'exports': exports,
            'total_count': len(exports),
            'total_size': sum(exp['size'] for exp in exports)
        }

    def delete_export(self, filename: str) -> bool:
        """Delete an exported file."""
        filepath = self.export_dir / filename
        try:
            if filepath.exists():
                filepath.unlink()
                logger.info(f"Deleted export file: {filename}")
                return True
            else:
                logger.warning(f"Export file not found: {filename}")
                return False
        except Exception as e:
            logger.error(f"Failed to delete export {filename}: {e}")
            return False

    def cleanup_old_exports(self, days: int = 7) -> int:
        """Clean up exports older than specified days."""
        deleted_count = 0
        cutoff_time = pd.Timestamp.now() - pd.Timedelta(days=days)

        try:
            for file_path in self.export_dir.glob("*"):
                if file_path.is_file():
                    file_time = pd.Timestamp.fromtimestamp(file_path.stat().st_ctime)
                    if file_time < cutoff_time:
                        file_path.unlink()
                        deleted_count += 1
                        logger.info(f"Cleaned up old export: {file_path.name}")

            if deleted_count > 0:
                logger.info(f"Cleaned up {deleted_count} old export files")
        except Exception as e:
            logger.error(f"Failed to cleanup old exports: {e}")

        return deleted_count

def export_data(data: pd.DataFrame, format: str, filename: str = None) -> str:
    """
    Convenience function to export data.
    """
    exporter = DataExporter()

    if format == 'csv':
        return exporter.export_to_csv(data, filename)
    elif format == 'json':
        return exporter.export_to_json(data, filename)
    elif format == 'excel':
        return exporter.export_to_excel(data, filename)
    else:
        raise ValueError(f"Unsupported export format: {format}")

# Global exporter instance
data_exporter = DataExporter()
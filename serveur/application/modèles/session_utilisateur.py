"""
UserSession Model
Manages user sessions, conversation history, and context.
"""

import uuid
import time
from typing import Dict, Any, List
from datetime import datetime
from ..core.logging import get_logger

logger = get_logger(__name__)

class UserSession:
    """
    Represents a user session with conversation history and context.
    """

    def __init__(self, session_id: str = None):
        self.session_id = session_id or str(uuid.uuid4())
        self.created_at = datetime.now()
        self.last_activity = datetime.now()
        self.history: List[Dict[str, Any]] = []
        self.context: Dict[str, Any] = {}
        self.max_history_items = 50  # Limit history size

        logger.info(f"Created user session: {self.session_id}")

    def add_to_history(self, query: str, results: Any, insights: str) -> None:
        """
        Add a query and response to the session history.
        """
        history_item = {
            "timestamp": datetime.now().isoformat(),
            "query": query,
            "results_summary": self._summarize_results(results),
            "insights": insights,
            "query_type": self._classify_query(query)
        }

        self.history.append(history_item)
        self.last_activity = datetime.now()

        # Limit history size
        if len(self.history) > self.max_history_items:
            self.history = self.history[-self.max_history_items:]

        logger.debug(f"Added to history for session {self.session_id}: {query[:50]}...")

    def get_history(self) -> List[Dict[str, Any]]:
        """Get the conversation history."""
        return self.history.copy()

    def get_recent_queries(self, limit: int = 5) -> List[str]:
        """Get recent queries for context."""
        recent = self.history[-limit:] if len(self.history) >= limit else self.history
        return [item["query"] for item in recent]

    def get_current_results(self) -> Any:
        """Get the most recent query results."""
        if self.history:
            return self.history[-1].get("results_summary", {})
        return {}

    def update_context(self, key: str, value: Any) -> None:
        """Update session context."""
        self.context[key] = value
        self.last_activity = datetime.now()

    def get_context(self, key: str = None) -> Any:
        """Get session context."""
        if key:
            return self.context.get(key)
        return self.context.copy()

    def clear_history(self) -> None:
        """Clear the conversation history."""
        self.history = []
        logger.info(f"Cleared history for session {self.session_id}")

    def is_expired(self, timeout_seconds: int = 3600) -> bool:
        """Check if session has expired."""
        elapsed = (datetime.now() - self.last_activity).total_seconds()
        return elapsed > timeout_seconds

    def get_session_info(self) -> Dict[str, Any]:
        """Get session metadata."""
        return {
            "session_id": self.session_id,
            "created_at": self.created_at.isoformat(),
            "last_activity": self.last_activity.isoformat(),
            "history_count": len(self.history),
            "is_expired": self.is_expired()
        }

    def _summarize_results(self, results) -> Dict[str, Any]:
        """Create a summary of query results."""
        try:
            # Handle pandas DataFrame
            if hasattr(results, 'shape'):
                return {
                    "type": "dataframe",
                    "rows": results.shape[0],
                    "columns": results.shape[1],
                    "columns_list": results.columns.tolist() if hasattr(results, 'columns') else []
                }
            # Handle list/dict
            elif isinstance(results, (list, dict)):
                return {
                    "type": type(results).__name__,
                    "length": len(results) if hasattr(results, '__len__') else 0
                }
            else:
                return {
                    "type": type(results).__name__,
                    "value": str(results)[:200]  # Truncate long values
                }
        except Exception as e:
            logger.warning(f"Could not summarize results: {e}")
            return {"type": "unknown", "error": str(e)}

    def _classify_query(self, query: str) -> str:
        """Classify the type of query."""
        query_lower = query.lower()

        if any(word in query_lower for word in ['sum', 'total', 'average', 'count']):
            return "aggregation"
        elif any(word in query_lower for word in ['show', 'list', 'display']):
            return "selection"
        elif any(word in query_lower for word in ['filter', 'where', 'having']):
            return "filtering"
        elif any(word in query_lower for word in ['trend', 'over time', 'evolution']):
            return "temporal"
        else:
            return "general"

class SessionManager:
    """
    Manages multiple user sessions.
    """

    def __init__(self):
        self.sessions: Dict[str, UserSession] = {}
        self.cleanup_interval = 300  # 5 minutes
        self.last_cleanup = time.time()

    def get_session(self, session_id: str) -> UserSession:
        """Get or create a session."""
        if session_id not in self.sessions:
            self.sessions[session_id] = UserSession(session_id)

        session = self.sessions[session_id]
        session.last_activity = datetime.now()

        # Periodic cleanup
        self._cleanup_expired_sessions()

        return session

    def create_session(self) -> UserSession:
        """Create a new session."""
        session = UserSession()
        self.sessions[session.session_id] = session
        logger.info(f"Created new session: {session.session_id}")
        return session

    def delete_session(self, session_id: str) -> bool:
        """Delete a session."""
        if session_id in self.sessions:
            del self.sessions[session_id]
            logger.info(f"Deleted session: {session_id}")
            return True
        return False

    def get_active_sessions_count(self) -> int:
        """Get count of active sessions."""
        self._cleanup_expired_sessions()
        return len(self.sessions)

    def _cleanup_expired_sessions(self) -> None:
        """Remove expired sessions."""
        current_time = time.time()
        if current_time - self.last_cleanup < self.cleanup_interval:
            return

        expired_ids = []
        for session_id, session in self.sessions.items():
            if session.is_expired():
                expired_ids.append(session_id)

        for session_id in expired_ids:
            del self.sessions[session_id]
            logger.info(f"Cleaned up expired session: {session_id}")

        if expired_ids:
            logger.info(f"Cleaned up {len(expired_ids)} expired sessions")

        self.last_cleanup = current_time

# Global session manager instance
session_manager = SessionManager()
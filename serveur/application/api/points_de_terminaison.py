"""
ChatBI API Endpoints
REST API endpoints for the ChatBI application.
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from ..models.query_generator import QueryGenerator
from ..models.ai_model import AIModel
from ..models.dashboard_manager import DashboardManager
from ..models.user_session import UserSession
from ..services.preprocessing import preprocess_query
from ..services.export import export_data
from .dependencies import get_current_user_session

router = APIRouter()

# Initialize core components
query_generator = QueryGenerator()
ai_model = AIModel()
dashboard_manager = DashboardManager()

@router.post("/ask")
async def ask_question(
    query: str,
    session: UserSession = Depends(get_current_user_session)
) -> Dict[str, Any]:
    """
    Process a natural language query and return results.
    """
    try:
        # Preprocess the query
        processed_query = preprocess_query(query)

        # Generate SQL from natural language
        sql_query = query_generator.generate_sql(processed_query)

        # Execute query and get results
        results = query_generator.execute_query(sql_query)

        # Generate AI insights
        insights = ai_model.generate_insights(query, results)

        # Prepare dashboard data
        dashboard_data = dashboard_manager.prepare_dashboard(results)

        # Update session history
        session.add_to_history(query, results, insights)

        return {
            "query": query,
            "sql": sql_query,
            "results": results,
            "insights": insights,
            "dashboard": dashboard_data,
            "session_id": session.session_id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

@router.get("/history")
async def get_history(
    session: UserSession = Depends(get_current_user_session)
) -> List[Dict[str, Any]]:
    """
    Get conversation history for the current session.
    """
    return session.get_history()

@router.get("/dashboard/data")
async def get_dashboard_data(
    session: UserSession = Depends(get_current_user_session)
) -> Dict[str, Any]:
    """
    Get current dashboard data.
    """
    return dashboard_manager.get_current_dashboard(session)

@router.post("/export")
async def export_results(
    format: str = "csv",
    session: UserSession = Depends(get_current_user_session)
) -> Dict[str, str]:
    """
    Export current results in specified format.
    """
    try:
        if format not in ["csv", "json"]:
            raise HTTPException(status_code=400, detail="Unsupported export format")

        file_path = export_data(session.get_current_results(), format)
        return {"file_path": file_path, "format": format}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")

@router.post("/session/new")
async def create_new_session() -> Dict[str, str]:
    """
    Create a new user session.
    """
    session = UserSession()
    return {"session_id": session.session_id}

@router.delete("/session/{session_id}")
async def delete_session(session_id: str) -> Dict[str, str]:
    """
    Delete a user session.
    """
    # Implementation would remove session from storage
    return {"message": f"Session {session_id} deleted"}
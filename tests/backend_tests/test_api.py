"""
Backend API Tests
Unit tests for FastAPI endpoints and functionality.
"""

import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_root_endpoint():
    """Test the root endpoint returns correct response."""
    response = client.get("/")
    assert response.status_code == 200
    assert "ChatBI API" in response.json()["message"]

def test_health_check():
    """Test health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_ask_endpoint_without_auth():
    """Test ask endpoint without authentication."""
    response = client.post("/api/ask", json={"query": "test query"})
    # Should return 401 Unauthorized
    assert response.status_code == 401

def test_create_session():
    """Test session creation endpoint."""
    response = client.post("/api/session/new")
    assert response.status_code == 200
    assert "session_id" in response.json()

# Additional tests would be added for:
# - Authenticated API calls
# - Query processing
# - Dashboard data retrieval
# - Export functionality
# - Error handling scenarios
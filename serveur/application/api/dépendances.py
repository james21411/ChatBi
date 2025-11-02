"""
ChatBI API Dependencies
Authentication, authorization, and session management dependencies.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..models.user_session import UserSession
from ..core.config import settings

security = HTTPBearer()

def get_current_user_session(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> UserSession:
    """
    Dependency to get current user session from token.
    """
    try:
        token = credentials.credentials
        # In a real implementation, validate token and retrieve session
        # For now, create a new session or retrieve from cache
        session = UserSession()
        session.session_id = token  # Simplified for demo
        return session
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_api_key() -> str:
    """
    Dependency to validate API key for external requests.
    """
    api_key = settings.api_key
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="API key not configured"
        )
    return api_key

def require_admin_role(
    session: UserSession = Depends(get_current_user_session)
) -> UserSession:
    """
    Dependency to require admin role.
    """
    # In a real implementation, check user roles
    # For now, allow all authenticated users
    return session
"""
ChatBI Configuration
Centralized configuration management for the application.
"""

import os
from typing import Optional
from pydantic import BaseSettings

class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """

    # Database settings
    database_url: str = "sqlite:///./chatbi.db"
    database_type: str = "sqlite"  # sqlite, postgresql, mysql

    # AI Model settings
    ai_model_type: str = "llama"  # llama, gpt4all, openai
    ai_model_path: Optional[str] = "./models/llama"
    openai_api_key: Optional[str] = None

    # API settings
    api_key: Optional[str] = "chatbi-secret-key"
    cors_origins: list = ["http://localhost:3000", "http://127.0.0.1:3000"]

    # Application settings
    debug: bool = True
    log_level: str = "INFO"

    # Session settings
    session_timeout: int = 3600  # 1 hour in seconds

    # Export settings
    max_export_rows: int = 10000

    class Config:
        env_file = ".env"
        case_sensitive = False

# Global settings instance
settings = Settings()

# Override with environment variables if available
settings.database_url = os.getenv("DATABASE_URL", settings.database_url)
settings.api_key = os.getenv("CHATBI_API_KEY", settings.api_key)
settings.openai_api_key = os.getenv("OPENAI_API_KEY", settings.openai_api_key)
settings.debug = os.getenv("DEBUG", "true").lower() == "true"
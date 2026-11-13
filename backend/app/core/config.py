from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import field_validator
import json

class Settings(BaseSettings):
    PROJECT_NAME: str = "Report Saathi API"
    VERSION: str = "1.0.0"
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    USE_MOCK_AI: bool = True
    GEMINI_API_KEY: str = ""
    CORS_ORIGINS: Union[List[str], str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v.startswith("[") and v.endswith("]"):
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()

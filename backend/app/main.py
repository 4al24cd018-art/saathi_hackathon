from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers.analyze import router as analyze_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="ReportSaathi API: Patient-friendly, educational explanations of medical laboratory reports.",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS if isinstance(settings.CORS_ORIGINS, list) else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(analyze_router)

@app.get("/health", tags=["System"])
async def health_check():
    """
    Service health check and runtime mode indicator.
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "mock_mode": settings.USE_MOCK_AI,
        "tesseract_required": False
    }

@app.get("/", tags=["System"])
async def root():
    return {
        "message": "Welcome to ReportSaathi API. Visit /docs for the interactive API documentation.",
        "status": "healthy"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)

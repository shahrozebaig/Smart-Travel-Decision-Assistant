from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routes.weather import router as weather_router
import logging
import time
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)
app = FastAPI(
    title="Smart Travel AI API",
    description="Real-time weather-based travel decision system using Groq LLaMA 3.1",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    process_time = round((time.time() - start_time) * 1000, 2)
    logger.info(f"Completed in {process_time}ms - Status: {response.status_code}")
    return response
app.include_router(
    weather_router,
    prefix="/api/v1/weather",
    tags=["Weather Analysis"]
)
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "OK",
        "service": "Smart Travel AI",
        "version": "1.0.0"
    }
@app.get("/", tags=["Root"])
def root():
    return {
        "message": "🚀 Smart Travel AI Backend is Running",
        "docs": "/docs",
        "health": "/health"
    }
@app.on_event("startup")
def startup_event():
    logger.info("🚀 Smart Travel AI Backend Started")
@app.on_event("shutdown")
def shutdown_event():
    logger.info("🛑 Smart Travel AI Backend Stopped")
from fastapi import FastAPI
from app.routers.model_router import router as model_router

app = FastAPI(title="Model API", version="1.0.0")

app.include_router(model_router)
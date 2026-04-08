from fastapi import APIRouter
from app.internal.services.model_service import ModelService

router = APIRouter()
model_service = ModelService()


@router.get("/hello")
async def hello():
    return {"message": "Hello from model-api"}


@router.post("/predict")
async def predict(features: list[float]):
    prediction = await model_service.predict(features)
    return {"prediction": prediction}
import joblib
import numpy as np


class ModelService:
    def __init__(self, model_path: str = "model.pkl"):
        self.model = joblib.load(model_path)

    async def predict(self, features: list[float]) -> float:
        data = np.array(features).reshape(1, -1)
        prediction = self.model.predict(data)
        return float(prediction[0])
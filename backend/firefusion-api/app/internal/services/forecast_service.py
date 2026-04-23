import json
from .caching_service import cache_client
from .websocket_connection_manager import ws_manager
from ..models.geojson import FeatureCollection

REDIS_KEY = "predictions"

class ForecastService:
    async def on_prediction_message(self, message):
        async with message.process():
            print("Processed message")

            payload = json.loads(message.body)

            geojson = FeatureCollection(**payload)

            # broadcast to websocket clients
            await ws_manager.broadcast(geojson.model_dump())

            # ✅ FIX: store in Redis LIST (not string)
            await cache_client.rpush(
                REDIS_KEY,
                json.dumps(geojson.model_dump())
            )

    async def fetch_predictions(self):
        # ✅ FIX: read LIST properly
        data = await cache_client.lrange(REDIS_KEY, 0, -1)

        if not data:
            return []

        return [json.loads(item) for item in data]
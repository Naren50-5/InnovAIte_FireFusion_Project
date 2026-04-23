from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from ..internal.services.forecast_service import ForecastService
from ..internal.services.websocket_connection_manager import ws_manager

router = APIRouter(prefix="/api", tags=["bushfire"])


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)


# ✅ HISTORY ENDPOINT (Redis-backed GeoJSON list)
@router.get("/history", tags=["bushfire"])
async def get_history(service: ForecastService = Depends(ForecastService)):
    return await service.fetch_predictions()
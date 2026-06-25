
#server.py
#/Users/wsit5/.gemini/antigravity/scratch/maggie-kiosk/backend



import asyncio
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from event_bus import event_bus
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        # Send initial state
        await websocket.send_text(json.dumps({
            "type": "INITIAL_STATE",
            "data": event_bus.get_state()
        }))
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                print(f"Error broadcasting to client: {e}")
manager = ConnectionManager()
@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
# Subscribe to event bus to broadcast updates
async def handle_telemetry_event(event_data):
    await manager.broadcast(json.dumps(event_data))
event_bus.subscribe(handle_telemetry_event)
@app.post("/api/simulate/wake_word")
async def simulate_wake_word(data: dict):
    """Endpoint for the frontend to simulate a wake-word event"""
    user_input = data.get("text", "")
    event_bus.log(f"[WAKEWORD] Listening for 'Maggie'... detected intent: {user_input}")
    
    # In a real app, this would trigger the main Antigravity agent.
    # We will trigger the main agent orchestration here.
    from main_agent import handle_user_interaction
    asyncio.create_task(handle_user_interaction(user_input))
    
    return {"status": "ok", "message": "Wake word simulated."}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# Enable cross-origin resource sharing so Vite can call your backend safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryPayload(BaseModel):
    text: str
    agent: str

@app.post("/api/agent/listen")
def handle_hardware_listen():
    try:
        # 1. Animate Maggie's antennas / head via reachy_mini library to signify listening state
        # example: robot.head.look_at(x=1, y=0, z=0)
        
        # 2. Capture voice sample and parse with Whisper engine
        simulated_text = "Where is the main campus IT service desk located?"
        
        return {
            "status": "success",
            "transcription": simulated_text,
            "next_step": "WIKI_LOOKUP_AGENT"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/agent/query")
def handle_agent_routing(payload: QueryPayload):
    print(f"Executing payload routing for: {payload.text} using {payload.agent}")
    
    # Run the corresponding sub-agent process
    if payload.agent == "WIKI_LOOKUP_AGENT":
        response_msg = "The main IT desk is on the second floor of the Murdock Library."
    else:
        response_msg = "Task routed successfully."
        
    return {"status": "complete", "output": response_msg}
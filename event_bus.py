import asyncio
import datetime
from typing import Callable, List, Dict, Any
class EventBus:
    def __init__(self):
        self.subscribers: List[Callable] = []
        self.state = {
            "agents_working": [],
            "short_term_memory": {},
            "long_term_memory": {
                "uptime": str(datetime.datetime.now()),
                "cached_users": 0
            },
            "running_processes": []
        }
    def subscribe(self, callback: Callable):
        self.subscribers.append(callback)
    def get_state(self) -> Dict[str, Any]:
        return self.state
    def _notify(self, event_type: str, data: Any):
        event = {
            "type": event_type,
            "data": data,
            "full_state": self.state
        }
        for sub in self.subscribers:
            asyncio.create_task(sub(event))
    def set_agent_active(self, agent_name: str, is_active: bool):
        if is_active and agent_name not in self.state["agents_working"]:
            self.state["agents_working"].append(agent_name)
        elif not is_active and agent_name in self.state["agents_working"]:
            self.state["agents_working"].remove(agent_name)
        self._notify("AGENT_STATE_CHANGE", {"agent": agent_name, "active": is_active})
    def update_short_term_memory(self, key: str, value: Any):
        self.state["short_term_memory"][key] = value
        self._notify("MEMORY_UPDATE", {"memory_type": "short_term", "key": key, "value": value})
    def update_long_term_memory(self, key: str, value: Any):
        self.state["long_term_memory"][key] = value
        self._notify("MEMORY_UPDATE", {"memory_type": "long_term", "key": key, "value": value})
    def log(self, message: str):
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        log_entry = f"[{timestamp}] {message}"
        self.state["running_processes"].append(log_entry)
        if len(self.state["running_processes"]) > 100:
            self.state["running_processes"].pop(0)
        self._notify("LOG_EVENT", log_entry)
        print(log_entry)
event_bus = EventBus()

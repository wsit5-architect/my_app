import asyncio
from event_bus import event_bus
class ReachyMiniMock:
    def __init__(self):
        self.antennas_up = False
        event_bus.log("[HARDWARE] ReachyMini mock initialized.")
    async def animate_antennas(self, active: bool):
        self.antennas_up = active
        state = "UP" if active else "DOWN"
        event_bus.log(f"[HARDWARE] Maggie antennas moved to {state}")
        await asyncio.sleep(0.5)
    async def face_target(self):
        event_bus.log("[HARDWARE] 6-DOF head tracking activated. Centering on subject.")
        await asyncio.sleep(1.0)
        event_bus.log("[HARDWARE] Subject centered.")
    async def capture_photo(self) -> str:
        event_bus.log("[HARDWARE] Wide-angle camera active. Capturing photo...")
        await self.face_target()
        await asyncio.sleep(0.5)
        event_bus.log("[HARDWARE] Photo captured.")
        return "base64_encoded_dummy_image_data_here"
reachy = ReachyMiniMock()

import React, { useState, useEffect } from 'react';
import KioskPane from './components/KioskPane';
import TelemetryPane from './components/TelemetryPane';
function App() {
  const [telemetryState, setTelemetryState] = useState({
    agents_working: [],
    short_term_memory: {},
    long_term_memory: {},
    running_processes: []
  });
  useEffect(() => {
    // Connect to WebSocket for telemetry
    const ws = new WebSocket('ws://localhost:8000/ws/telemetry');
    
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'INITIAL_STATE') {
        setTelemetryState(msg.data);
      } else if (msg.full_state) {
        setTelemetryState(msg.full_state);
      }
    };
    ws.onerror = (e) => console.error("WebSocket error", e);
    return () => ws.close();
  }, []);
  return (
    <div className="dashboard-container">
      <KioskPane shortTermMemory={telemetryState.short_term_memory} />
      <TelemetryPane state={telemetryState} />
    </div>
  );
}
export default App;

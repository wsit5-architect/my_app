import React, { useEffect, useRef } from 'react';
export default function TelemetryPane({ state }) {
  const logsEndRef = useRef(null);
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.running_processes]);
  return (
    <div className="pane telemetry-pane">
      <h2>Agent Telemetry</h2>
      <div className="module-grid">
        <div className="telemetry-module">
          <h3>⚡ Agents Working</h3>
          <div>
            {state.agents_working.length === 0 ? (
              <span className="data-label">No active subagents.</span>
            ) : (
              state.agents_working.map(agent => (
                <span key={agent} className="agent-badge">{agent}</span>
              ))
            )}
          </div>
        </div>
        <div className="telemetry-module">
          <h3>🧠 Long-Term Memory</h3>
          {Object.entries(state.long_term_memory).map(([k, v]) => (
            <div className="data-row" key={k}>
              <span className="data-label">{k}</span>
              <span className="data-value">{String(v).substring(0, 20)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="telemetry-module" style={{ marginBottom: '24px' }}>
        <h3>💭 Short-Term Memory</h3>
        {Object.keys(state.short_term_memory).length === 0 ? (
          <span className="data-label">Session empty.</span>
        ) : (
          Object.entries(state.short_term_memory).map(([k, v]) => (
            <div className="data-row" key={k}>
              <span className="data-label">{k}</span>
              <span className="data-value">
                {typeof v === 'object' ? JSON.stringify(v).substring(0, 40) + '...' : String(v).substring(0, 40)}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="telemetry-module" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3>⚙️ Running Processes (Console Log)</h3>
        <div className="console-log">
          {state.running_processes.map((log, i) => (
            <div key={i} className="log-line">{log}</div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
}

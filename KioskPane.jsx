import React, { useState } from 'react';
export default function KioskPane({ shortTermMemory }) {
  const [intent, setIntent] = useState("I need a new student ID. My student ID is 123456789.");
  const isListening = shortTermMemory.wake_word_status === 'ACTIVE';
  const simulateInteraction = async () => {
    try {
      await fetch('http://localhost:8000/api/simulate/wake_word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: intent })
      });
    } catch (e) {
      console.error("Simulation error", e);
    }
  };
  return (
    <div className="pane kiosk-pane">
      <h1>Hello, I'm Maggie.</h1>
      <p className="subtitle">George Fox University IT Service Desk</p>
      <div className="kiosk-status">
        <div className="status-dot" style={{ backgroundColor: isListening ? 'var(--success)' : 'var(--accent)' }}></div>
        <span style={{ fontFamily: 'monospace', color: isListening ? 'var(--success)' : 'var(--text-secondary)' }}>
          {isListening ? 'LISTENING TO WAKE WORD...' : 'SYSTEM IDLE'}
        </span>
      </div>
      {shortTermMemory.last_response && (
        <div className="chat-bubble">
          <strong>Maggie:</strong> {shortTermMemory.last_response}
        </div>
      )}
      {shortTermMemory.last_photo === 'captured' && (
        <div className="photo-preview">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Captured ID" />
        </div>
      )}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input 
          type="text" 
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'monospace' }}
        />
        <button className="sim-btn" onClick={simulateInteraction}>
          Simulate "Maggie" Wake Word
        </button>
      </div>
    </div>
  );
}

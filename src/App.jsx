import React, { useState, useEffect } from 'react';

function App() {
  // Global States matching Short-Term Memory Requirements
  const [status, setStatus] = useState('Kiosk System Active');
  const [activeAgent, setActiveAgent] = useState('GET_PROCESS_AGENT');
  const [sessionUser, setSessionUser] = useState({
    name: 'John Doe',
    role: 'Staff Account Verified',
    id: 'JD'
  });
  const [uptime, setUptime] = useState(98); // Uptime counter simulation

  const [logs, setLogs] = useState([
    '[WAKEWORD] Listening for "Maggie"...',
    '[LDAP] Connecting to Windows Active Directory...',
    '[SYSTEM] Maggie Kiosk Framework Online.'
  ]);

  // Simulate Uptime Incrementer
  useEffect(() => {
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{
      backgroundColor: '#0a0f1d',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem',
      boxSizing: 'border-box'
    }}>
      
      {/* TOP HEADER STATUS SYSTEM */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '1px', margin: 0, color: '#e2e8f0' }}>
            <span style={{ color: '#38bdf8' }}>GFU</span> IT SERVICE DESK
          </h1>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            color: '#38bdf8',
            background: 'rgba(56, 189, 248, 0.1)',
            padding: '0.2rem 0.6rem',
            borderRadius: '12px'
          }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: '#38bdf8', borderRadius: '50%' }}></span>
            {status}
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px' }}>ADMIN TELEMETRY SYSTEM</div>
          <div style={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#94a3b8' }}>
            UPTIME: <span style={{ color: '#f1f5f9' }}>{formatUptime(uptime)}</span>
          </div>
        </div>
      </header>

      {/* TWO-COLUMN LAYOUT MATRIX */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem', flexGrow: 1 }}>
        
        {/* LEFT-SIDE PANE: USER KIOSK INTERFACE */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* USER VERIFICATION PANEL */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            border: '1px solid #312e81',
            borderRadius: '16px',
            padding: '2rem',
            position: 'relative'
          }}>
            <button style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: '#64748b',
              fontSize: '1.2rem',
              cursor: 'pointer'
            }}>✕</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#0ea5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#fff'
              }}>{sessionUser.id}</div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 'bold' }}>Hello, {sessionUser.name}</h2>
                <p style={{ margin: '0.2rem 0 0', color: '#10b981', fontSize: '0.9rem', fontWeight: '500' }}>✓ {sessionUser.role}</p>
              </div>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '1rem' }}>
              You can speak directly to the Reachy Mini robot or select a quick option below.
            </p>

            {/* ROBOT VOICE INPUT WIDGET */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '2.5rem' }}>🤖</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifycontent: 'center', color: '#ef4444', cursor: 'pointer', margin: '0 auto' }}>
                  🎙️
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                  Click mic or select preset option
                </div>
              </div>
            </div>

            {/* SUGGESTED INQUIRIES */}
            <div>
              <h4 style={{ color: '#64748b', fontSize: '0.8rem', uppercase: 'true', letterSpacing: '1px', marginBottom: '0.75rem' }}>SUGGESTED INQUIRIES</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ flex: 1, padding: '0.75rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#cbd5e1', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🌐 WiFi Setup Guide
                </button>
                <button style={{ flex: 1, padding: '0.75rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#cbd5e1', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🖨️ BruinPrint Help
                </button>
              </div>
            </div>

          </div>
        </main>

        {/* RIGHT-SIDE PANE: SYSTEM TELEMETRY BUS */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* 1. AGENTS WORKING */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#64748b', letterSpacing: '1px' }}>1. AGENTS WORKING</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['GET_PROCESS_AGENT', 'WIKI_LOOKUP_AGENT', 'SMTP_TICKET_AGENT', 'CAMERA_CAPTURE_AGENT', 'CAMPUS_SCRAPER_AGENT'].map((agent) => (
                <div key={agent} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.6rem 1rem',
                  background: activeAgent === agent ? 'rgba(14, 165, 233, 0.15)' : '#1e293b',
                  border: activeAgent === agent ? '1px solid #0ea5e9' : '1px solid transparent',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  color: activeAgent === agent ? '#38bdf8' : '#94a3b8'
                }}>
                  <span>• {agent}</span>
                  {activeAgent === agent && <span style={{ fontSize: '0.7rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.2)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>RUNNING</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 2. SHORT-TERM MEMORY */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: '#64748b', letterSpacing: '1px' }}>2. SHORT-TERM MEMORY</h3>
            <div style={{ background: '#020617', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace', color: '#38bdf8', borderLeft: '3px solid #38bdf8' }}>
              <strong>ACTIVE_TRANSCRIPTION:</strong> "Where is the main campus IT service desk located?"
            </div>
          </div>

          {/* 4. EXECUTION CONSOLE */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: '#64748b', letterSpacing: '1px' }}>4. RUNNING PROCESSES LOG</h3>
            <div style={{
              flexGrow: 1,
              background: '#020617',
              padding: '0.75rem',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#a7f3d0',
              overflowY: 'auto',
              lineHeight: '1.5'
            }}>
              {logs.map((log, i) => (
                <div key={i} style={{ marginBottom: '0.25rem' }}>{log}</div>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}

export default App;
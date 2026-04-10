import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import GlowText from '../components/GlowText';
import { motion, AnimatePresence } from 'framer-motion';

const Requests = () => {
  const [selectedReq, setSelectedReq] = useState(null);

  const mockRequests = [
    { id: 'req-0x991', ip: '192.168.1.101', method: 'GET', endpoint: '/api/users', status: 200, risk: 'Low', time: '10:04:12' },
    { id: 'req-0x992', ip: '45.22.19.88', method: 'POST', endpoint: '/login', status: 403, risk: 'High', time: '10:04:15', isMalicious: true, attackType: 'SQL Injection' },
    { id: 'req-0x993', ip: '10.0.0.5', method: 'GET', endpoint: '/assets/img.png', status: 200, risk: 'Low', time: '10:04:18' },
    { id: 'req-0x994', ip: '198.51.100.14', method: 'GET', endpoint: '/admin?user=<script>alert(1)</script>', status: 403, risk: 'High', time: '10:04:22', isMalicious: true, attackType: 'XSS' },
    { id: 'req-0x995', ip: '203.0.113.8', method: 'POST', endpoint: '/api/transfer', status: 403, risk: 'Medium', time: '10:04:26', isMalicious: true, attackType: 'CSRF' },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
        <h2 className="text-cyan" style={{ marginTop: 0 }}>LIVE REQUEST STREAM</h2>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mockRequests.map((req, i) => (
            <motion.div 
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedReq(req)}
              className="glass-panel"
              style={{
                padding: '15px 20px',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 2fr 1fr',
                alignItems: 'center',
                cursor: 'pointer',
                borderLeft: req.isMalicious ? '4px solid var(--neon-red)' : '4px solid var(--neon-green)',
                background: selectedReq?.id === req.id ? 'rgba(0, 255, 255, 0.1)' : 'var(--panel-bg)',
                transform: selectedReq?.id === req.id ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.2s ease'
              }}
              whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <span className="text-muted">{req.time}</span>
              <span style={{ fontFamily: 'monospace' }}>{req.ip}</span>
              <span className={req.method === 'GET' ? 'text-green' : 'text-purple'}>{req.method}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.endpoint}</span>
              <span className={req.isMalicious ? 'text-red' : 'text-green'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                {req.isMalicious ? 'BLOCKED' : req.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedReq && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            style={{ flex: 1 }}
          >
            <GlassCard glowColor={selectedReq.isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'} style={{ height: '100%' }}>
              <h3 className="text-cyan" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '15px' }}>
                REQUEST INSPECTOR
              </h3>
              
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '5px' }}>TRACE ID</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{selectedReq.id}</div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '5px' }}>SOURCE IP</div>
                    <div>{selectedReq.ip}</div>
                  </div>
                  <div>
                    <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '5px' }}>RISK SCORE</div>
                    <div className={selectedReq.isMalicious ? 'text-red' : 'text-green'}>{selectedReq.risk}</div>
                  </div>
                </div>

                {selectedReq.isMalicious && (
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    style={{ marginTop: '20px', padding: '15px', background: 'rgba(255, 0, 60, 0.1)', border: '1px outset var(--neon-red)', borderRadius: '8px' }}
                  >
                    <div className="text-red" style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--neon-red)' }} />
                      AI DETECTION POSITIVE
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                      SentinelAI identified payload matching <strong className="text-red">{selectedReq.attackType}</strong> pattern. Request intercepted and dropped before reaching origin server.
                    </div>
                    
                    <div style={{ marginTop: '15px', fontFamily: 'monospace', fontSize: '0.8rem', background: '#000', padding: '10px', borderRadius: '4px', border: '1px solid #333' }}>
                      <GlowText text={`> Analyzing payload at ${selectedReq.endpoint}`} typing={true} color="red" />
                    </div>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Requests;

import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import GlowText from '../components/GlowText';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, AlertTriangle, CheckSquare, Server, Syringe, ScrollText, CheckCircle2, HelpCircle, X } from 'lucide-react';

const Dashboard = () => {
  const [toasts, setToasts] = useState([]);
  
  // Dynamic State for live dashboard simulation
  const [metrics, setMetrics] = useState({ total: 436, attacks: 395, safe: 41 });
  const [logs, setLogs] = useState([
     { ip: '192.168.1.183', method: 'GET', url: '/api/products', risk: 'HIGH', status: 'BLOCKED', color: '#ff5555', time: '11:24:16' },
     { ip: '192.168.1.156', method: 'GET', url: '/home', risk: 'MEDIUM', status: 'BLOCKED', color: '#ffaa00', time: '11:24:10' },
     { ip: '192.168.1.201', method: 'POST', url: '/search', risk: 'CRITICAL', status: 'BLOCKED', color: '#aa00ff', time: '11:24:05' },
     { ip: '192.168.1.109', method: 'GET', url: '/api/users?id...', risk: 'CRITICAL', status: 'BLOCKED', color: '#aa00ff', time: '11:23:45' },
     { ip: '192.168.1.42', method: 'GET', url: '/home', risk: 'MEDIUM', status: 'BLOCKED', color: '#ffaa00', time: '11:23:42' },
  ]);
  const [attackers, setAttackers] = useState([
     { ip: '192.168.1.201', count: 75, percent: '80%' },
     { ip: '192.168.1.109', count: 6, percent: '15%' },
     { ip: '192.168.1.183', count: 6, percent: '15%' },
     { ip: '192.168.1.149', count: 5, percent: '10%' },
     { ip: '192.168.1.232', count: 5, percent: '10%' },
  ]);

  // The Live System Engine
  useEffect(() => {
    const interval = setInterval(() => {
       // Tick global metrics
       const newRequests = Math.floor(Math.random() * 4); // 0 to 3 new requests
       const newAttacks = Math.random() > 0.6 ? 1 : 0; // Randomly 1 attack
       
       setMetrics(prev => ({
           total: prev.total + newRequests,
           attacks: prev.attacks + newAttacks,
           safe: (prev.total + newRequests) - (prev.attacks + newAttacks)
       }));

       // Occasionally push a new simulated traffic log
       if (Math.random() > 0.5) {
           const endpoints = ['/login', '/search', '/api/users', '/dashboard', '/home'];
           const methods = ['GET', 'POST', 'PUT'];
           const isAttack = Math.random() > 0.4;
           
           // If attack, pull randomly from our top attackers to boost them, otherwise a random IP
           const randomIP = isAttack 
                ? attackers[Math.floor(Math.random() * attackers.length)].ip 
                : `192.168.1.${Math.floor(Math.random() * 255)}`;
           
           const newLog = {
               ip: randomIP,
               method: methods[Math.floor(Math.random() * methods.length)],
               url: endpoints[Math.floor(Math.random() * endpoints.length)],
               risk: isAttack ? (Math.random() > 0.5 ? 'CRITICAL' : 'HIGH') : 'LOW',
               status: isAttack ? 'BLOCKED' : 'ALLOWED',
               color: isAttack ? (Math.random() > 0.5 ? '#aa00ff' : '#ff5555') : 'var(--neon-green)',
               time: new Date().toLocaleTimeString('en-US', { hour12: false })
           };
           
           // Append new log to the top of the table
           setLogs(prev => [newLog, ...prev].slice(0, 5));
           
           if (isAttack) {
               // Update attacker counts
               setAttackers(prev => {
                   let copy = [...prev];
                   const targetIdx = copy.findIndex(a => a.ip === randomIP);
                   if (targetIdx !== -1) { 
                       copy[targetIdx].count += 1; 
                   }
                   // Recalculate CSS width percentages so progress bars stay accurate
                   const max = Math.max(...copy.map(a => a.count));
                   copy = copy.map(a => ({...a, percent: `${Math.max(5, (a.count / max) * 100)}%`}));
                   
                   return copy.sort((a,b) => b.count - a.count);
               });
           }
       }
    }, 1500); // Ticks every 1.5 seconds

    return () => clearInterval(interval);
  }, [attackers]);

  const addToast = (title, message, color) => {
    const id = Date.now();
    setToasts(current => [...current, { id, title, message, color }]);
    setTimeout(() => {
      setToasts((current) => current.filter(t => t.id !== id));
    }, 5000);
  };

  const handleSimulate = (attackType) => {
    let targetIp = '';
    let risk = '';
    let color = '';
    let status = 'BLOCKED';
    let url = '';

    if (attackType === 'SQL Injection') {
       targetIp = '192.168.1.109'; risk = 'CRITICAL'; color = '#ffaa00'; url = '/api/users?id=1 OR...';
       addToast('🚨 SQL INJECTION detected from ' + targetIp, 'Simulation sent: sql injection → attack', color);
    } else if (attackType === 'XSS Attack') {
       targetIp = '192.168.1.201'; risk = 'HIGH'; color = '#ff0080'; url = '/search?q=<script>';
       addToast('⚠️ XSS detected from ' + targetIp, 'Simulation sent: xss → attack', color);
    } else if (attackType === 'Safe Request') {
       targetIp = '192.168.1.55'; risk = 'LOW'; color = 'var(--neon-green)'; status = 'ALLOWED'; url = '/home';
       addToast('✅ SAFE REQUEST from ' + targetIp, 'Simulation sent: safe → traffic', color);
    } else {
       targetIp = '192.168.1.183'; risk = 'HIGH'; color = '#ff5555'; url = '/api/unknown';
       addToast('⚠️ UNKNOWN ATTACK detected from ' + targetIp, 'Simulation sent: unknown → attack', color);
    }

    setMetrics(prev => ({
        total: prev.total + 1,
        attacks: prev.attacks + (attackType === 'Safe Request' ? 0 : 1),
        safe: prev.safe + (attackType === 'Safe Request' ? 1 : 0)
    }));

    setLogs(prev => [{
        ip: targetIp,
        method: attackType === 'SQL Injection' ? 'POST' : 'GET',
        url: url,
        risk: risk,
        status: status,
        color: color,
        time: new Date().toLocaleTimeString('en-US', { hour12: false })
    }, ...prev].slice(0, 5));

    if (attackType !== 'Safe Request') {
        setAttackers(prev => {
            let copy = [...prev];
            const targetIdx = copy.findIndex(a => a.ip === targetIp);
            if (targetIdx !== -1) { 
                copy[targetIdx].count += 1; 
            } else {
                copy.push({ ip: targetIp, count: 1, percent: '5%' });
            }
            const max = Math.max(...copy.map(a => a.count));
            copy = copy.map(a => ({...a, percent: `${Math.max(5, (a.count / max) * 100)}%`}));
            return copy.sort((a,b) => b.count - a.count).slice(0, 5);
        });
    }
  };

  const removeToast = (id) => setToasts(current => current.filter(t => t.id !== id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', gap: '20px', paddingBottom: '40px' }}>
      
      {/* Top 4 Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <GlassCard glowColor="var(--neon-cyan)">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 className="text-muted" style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Total Requests</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  <GlowText text={metrics.total.toString()} color="cyan" />
              </div>
              <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '5px' }}>Live updating...</div>
            </div>
            <div style={{ padding: '10px', background: 'rgba(0, 255, 255, 0.1)', borderRadius: '12px' }}>
              <Globe color="var(--neon-cyan)" size={24} />
            </div>
          </div>
        </GlassCard>
        
        <GlassCard glowColor="var(--neon-red)">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 className="text-muted" style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Attacks Detected</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  <GlowText text={metrics.attacks.toString()} color="red" />
              </div>
              <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                  {((metrics.attacks / metrics.total) * 100).toFixed(1)}% of traffic
              </div>
            </div>
            <div style={{ padding: '10px', background: 'rgba(255, 0, 60, 0.1)', borderRadius: '12px', border: '1px solid rgba(255,0,60,0.5)', boxShadow: '0 0 10px rgba(255,0,60,0.3)' }}>
              <AlertTriangle color="var(--neon-red)" size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard glowColor="var(--neon-green)">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 className="text-muted" style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Safe Requests</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  <GlowText text={metrics.safe.toString()} color="green" />
              </div>
              <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '5px' }}>Allowed through</div>
            </div>
            <div style={{ padding: '10px', background: 'rgba(57, 255, 20, 0.1)', borderRadius: '12px' }}>
              <CheckSquare color="var(--neon-green)" size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard glowColor="var(--neon-green)">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 className="text-muted" style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>ML Service</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}><GlowText text="Online" color="green" /></div>
              <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '5px' }}>FastAPI / Active</div>
            </div>
            <div style={{ padding: '10px', background: 'rgba(57, 255, 20, 0.1)', borderRadius: '12px' }}>
              <Server color="var(--neon-green)" size={24} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Attack Simulator section */}
      <GlassCard glowColor="var(--neon-cyan)" style={{ padding: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#fff' }}>Attack Simulator</h2>
                <p className="text-muted" style={{ margin: '0 0 20px 0', fontSize: '0.9rem' }}>Send demo requests to test the ML detection pipeline</p>
            </div>
            <div style={{ border: '1px solid #ffaa00', borderRadius: '12px', padding: '5px 10px', color: '#ffaa00', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffaa00', marginRight: '8px' }}></div>
                Demo Mode
            </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          <motion.div onClick={() => handleSimulate('SQL Injection')} whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 170, 0, 0.15)' }} whileTap={{ scale: 0.98 }} style={{ padding: '20px', border: '1px solid rgba(255, 170, 0, 0.3)', borderRadius: '12px', background: 'rgba(255, 170, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '100px' }}>
            <Syringe color="#ffaa00" size={28} style={{ marginBottom: '10px' }} />
            <div style={{ color: '#ffaa00', fontWeight: 'bold' }}>SQL Injection</div>
          </motion.div>

          <motion.div onClick={() => handleSimulate('XSS Attack')} whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 0, 128, 0.15)' }} whileTap={{ scale: 0.98 }} style={{ padding: '20px', border: '1px solid rgba(255, 0, 128, 0.3)', borderRadius: '12px', background: 'rgba(255, 0, 128, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '100px' }}>
            <ScrollText color="#ff0080" size={28} style={{ marginBottom: '10px' }} />
            <div style={{ color: '#ff0080', fontWeight: 'bold' }}>XSS Attack</div>
          </motion.div>

          <motion.div onClick={() => handleSimulate('Safe Request')} whileHover={{ scale: 1.02, backgroundColor: 'rgba(57, 255, 20, 0.15)' }} whileTap={{ scale: 0.98 }} style={{ padding: '20px', border: '1px solid rgba(57, 255, 20, 0.3)', borderRadius: '12px', background: 'rgba(57, 255, 20, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '100px' }}>
            <CheckCircle2 color="var(--neon-green)" size={28} style={{ marginBottom: '10px' }} />
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>Safe Request</div>
          </motion.div>

          <motion.div onClick={() => handleSimulate('Unknown Attack')} whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 85, 85, 0.15)' }} whileTap={{ scale: 0.98 }} style={{ padding: '20px', border: '1px solid rgba(255, 85, 85, 0.3)', borderRadius: '12px', background: 'rgba(255, 85, 85, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '100px' }}>
            <HelpCircle color="#ff5555" size={28} style={{ marginBottom: '10px' }} />
            <div style={{ color: '#ff5555', fontWeight: 'bold' }}>Unknown</div>
          </motion.div>
        </div>
      </GlassCard>

      {/* Request Timeline */}
      <GlassCard glowColor="var(--neon-cyan)">
        <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#fff' }}>Request Timeline (Live)</h2>
        <p className="text-muted" style={{ margin: '0 0 20px 0', fontSize: '0.9rem' }}>Real-time event stream</p>
        
        <div style={{ height: '200px', width: '100%', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
           {/* Mock line chart showing an erratic pattern to look 'live' */}
           <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,0,96,0.3)" />
                <stop offset="100%" stopColor="rgba(255,0,96,0)" />
              </linearGradient>
              <path d="M 0 10 L 100 80 L 200 40 L 300 120 L 400 30 L 500 160 L 600 80 L 700 90 L 800 150 L 900 60 L 1000 100 L 1000 200 L 0 200 Z" fill="url(#chartGradient)" />
              <polyline points="0,10 100,80 200,40 300,120 400,30 500,160 600,80 700,90 800,150 900,60 1000,100" fill="none" stroke="var(--neon-red)" strokeWidth="2" />
              <polyline points="0,180 200,160 400,185 600,155 800,180 1000,140" fill="none" stroke="var(--neon-green)" strokeWidth="2" />
           </svg>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--neon-green)' }}>● Safe</span>
            <span style={{ color: 'var(--neon-red)' }}>● Attacks</span>
        </div>
      </GlassCard>

      {/* Two columns: Attack Types & Risk Levels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <GlassCard glowColor="var(--neon-cyan)">
             <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#fff' }}>Attack Types</h2>
             <p className="text-muted" style={{ margin: '0 0 20px 0', fontSize: '0.9rem' }}>Distribution of request classifications</p>
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                 <svg viewBox="0 0 100 100" style={{ width: '150px', height: '150px' }}>
                    <circle cx="50" cy="50" r="30" fill="transparent" stroke="var(--neon-green)" strokeWidth="15" strokeDasharray="20 188" transform="translate(0, 100) rotate(-90)" />
                    <circle cx="50" cy="50" r="30" fill="transparent" stroke="#ff0080" strokeWidth="15" strokeDasharray="30 188" transform="translate(100, 0) rotate(90)" />
                    <circle cx="50" cy="50" r="30" fill="transparent" stroke="#ffaa00" strokeWidth="15" strokeDasharray="40 188" transform="translate(100, 100) rotate(180)" />
                    <circle cx="50" cy="50" r="30" fill="transparent" stroke="#b0b0b0" strokeWidth="15" strokeDasharray="98 188" transform="translate(0, 0) rotate(0)" />
                    <circle cx="50" cy="50" r="20" fill="transparent" />
                 </svg>
                 <div style={{ display: 'flex', gap: '10px', fontSize: '0.7rem', marginTop: '20px' }}>
                     <span style={{ color: 'var(--neon-green)' }}>■ Safe</span>
                     <span style={{ color: '#ff0080' }}>■ XSS</span>
                     <span style={{ color: '#ffaa00' }}>■ SQL Injection</span>
                     <span style={{ color: '#b0b0b0' }}>■ Unknown attack</span>
                 </div>
             </div>
          </GlassCard>

          <GlassCard glowColor="var(--neon-cyan)">
             <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#fff' }}>Risk Levels</h2>
             <p className="text-muted" style={{ margin: '0 0 20px 0', fontSize: '0.9rem' }}>Attack severity breakdown</p>
             <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '30px', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ width: '60px', height: '40px', background: '#ff5555', borderRadius: '4px 4px 0 0' }}></div>
                     <span style={{ marginTop: '10px', fontSize: '0.8rem', color: '#ff5555' }}>HIGH</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ width: '60px', height: '80px', background: '#ffaa00', borderRadius: '4px 4px 0 0' }}></div>
                     <span style={{ marginTop: '10px', fontSize: '0.8rem', color: '#ffaa00' }}>MEDIUM</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ width: '60px', height: '140px', background: '#aa00ff', borderRadius: '4px 4px 0 0' }}></div>
                     <span style={{ marginTop: '10px', fontSize: '0.8rem', color: '#aa00ff' }}>CRITICAL</span>
                 </div>
             </div>
          </GlassCard>
      </div>

      {/* Two columns: Top Attacker IPs & Recent Requests */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
         <GlassCard glowColor="var(--neon-cyan)">
             <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', color: '#fff' }}>Top Attacker IPs</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 {attackers.map((attacker, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
                       <span style={{ width: '20px', color: '#aaa' }}>{i+1}.</span>
                       <span style={{ width: '100px', fontFamily: 'monospace' }}>{attacker.ip}</span>
                       <div style={{ flex: 1, height: '6px', background: 'rgba(255,0,0,0.1)', borderRadius: '3px', marginLeft: '10px', marginRight: '10px' }}>
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: attacker.percent }}
                             transition={{ type: 'spring', stiffness: 50 }}
                             style={{ height: '100%', background: 'var(--neon-red)', borderRadius: '3px', boxShadow: '0 0 5px var(--neon-red)' }} 
                          />
                       </div>
                       <span style={{ color: 'var(--neon-red)', minWidth: '20px', textAlign: 'right' }}>{attacker.count}</span>
                    </div>
                 ))}
             </div>
         </GlassCard>

         <GlassCard glowColor="var(--neon-cyan)">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div>
                 <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#fff' }}>Recent Requests</h2>
                 <p className="text-muted" style={{ margin: '0 0 20px 0', fontSize: '0.9rem' }}>Live streaming traffic logs</p>
               </div>
               <span className="text-cyan" style={{ fontSize: '0.8rem', cursor: 'pointer' }}>View all →</span>
             </div>

             <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                   <tr style={{ color: '#888', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '10px 0' }}>IP</th>
                      <th style={{ padding: '10px 0' }}>Method</th>
                      <th style={{ padding: '10px 0' }}>URL</th>
                      <th style={{ padding: '10px 0' }}>Risk</th>
                      <th style={{ padding: '10px 0' }}>Status</th>
                      <th style={{ padding: '10px 0' }}>Time</th>
                   </tr>
                </thead>
                <tbody>
                   <AnimatePresence>
                     {logs.map((row, i) => (
                        <motion.tr 
                           key={`${row.ip}-${row.time}-${i}`} 
                           initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(255,255,255,0.1)' }}
                           animate={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
                           transition={{ duration: 0.5 }}
                           style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        >
                           <td style={{ padding: '10px 0', fontFamily: 'monospace', color: '#aaa' }}>{row.ip}</td>
                           <td style={{ padding: '10px 0', color: 'var(--neon-cyan)' }}>{row.method}</td>
                           <td style={{ padding: '10px 0', color: '#ccc' }}>{row.url}</td>
                           <td style={{ padding: '10px 0' }}>
                              <span style={{ border: `1px solid ${row.color}`, color: row.color, padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem' }}>● {row.risk}</span>
                           </td>
                           <td style={{ padding: '10px 0', color: row.status === 'BLOCKED' ? 'var(--neon-red)' : 'var(--neon-green)' }}>● {row.status}</td>
                           <td style={{ padding: '10px 0', color: '#666' }}>{row.time}</td>
                        </motion.tr>
                     ))}
                   </AnimatePresence>
                </tbody>
             </table>
         </GlassCard>
      </div>

      {/* Floating Toasts container */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div 
               key={toast.id} 
               initial={{ opacity: 0, x: 50, scale: 0.9 }} 
               animate={{ opacity: 1, x: 0, scale: 1 }} 
               exit={{ opacity: 0, scale: 0.9, x: 50 }} 
               style={{ 
                  background: 'rgba(15, 20, 30, 0.95)', 
                  borderLeft: `4px solid ${toast.color}`, 
                  border: `1px solid rgba(255,255,255,0.1)`,
                  padding: '12px 15px', 
                  borderRadius: '8px', 
                  width: '320px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  pointerEvents: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
               }}
            >
               <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: toast.color }}>
                     {toast.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#ccc' }}>
                     {toast.message}
                  </div>
               </div>
               <button onClick={() => removeToast(toast.id)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', padding: '0', marginLeft: '10px' }}>
                  <X size={16} />
               </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Dashboard;

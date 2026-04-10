import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ label, activeStatus = false, color = 'var(--neon-cyan)' }) => {
  const [isOn, setIsOn] = useState(activeStatus);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{label}</div>
        <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '5px' }}>Configure system directive</div>
      </div>
      <div 
        onClick={() => setIsOn(!isOn)}
        style={{ width: '60px', height: '30px', borderRadius: '15px', background: isOn ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255,255,255,0.1)', border: `1px solid ${isOn ? color : '#333'}`, display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0 5px' }}
      >
        <motion.div 
          animate={{ x: isOn ? 30 : 0, backgroundColor: isOn ? color : '#888', boxShadow: isOn ? `0 0 10px ${color}` : 'none' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ width: '20px', height: '20px', borderRadius: '50%' }}
        />
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
      <GlassCard style={{ flex: 1 }}>
        <h2 className="text-cyan" style={{ borderBottom: '1px solid var(--neon-cyan)', paddingBottom: '10px' }}>SYSTEM DIRECTIVES</h2>
        
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <ToggleSwitch label="Auto-Block Malicious IPs" activeStatus={true} color="var(--neon-green)" />
          <ToggleSwitch label="Strict Payload Parsing (Heuristics)" activeStatus={true} />
          <ToggleSwitch label="Global Threat Intel Sync" activeStatus={true} color="var(--neon-purple)" />
          <ToggleSwitch label="Deep Packet Inspection (DPI)" activeStatus={false} color="var(--neon-red)" />
        </div>

        <div style={{ marginTop: '40px' }}>
           <h3 className="text-red">CAUTION: MANUAL OVERRIDE</h3>
           <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--neon-red)' }}
            whileTap={{ scale: 0.95 }}
            style={{ marginTop: '10px', background: 'rgba(255, 0, 60, 0.2)', border: '1px solid var(--neon-red)', color: 'var(--neon-red)', padding: '15px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '2px', width: '100%' }}
           >
             INITIATE SYSTEM LOCKDOWN
           </motion.button>
        </div>
      </GlassCard>

      <GlassCard style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{ width: '250px', height: '250px', border: '2px dashed var(--neon-cyan)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
        >
          <motion.div style={{ width: '200px', height: '200px', border: '1px solid rgba(0, 255, 255, 0.3)', borderRadius: '50%', position: 'absolute' }} />
          <div style={{ textAlign: 'center' }}>
            <div className="text-cyan" style={{ fontSize: '2rem', fontWeight: 'bold' }}>ACTIVE</div>
            <div className="text-muted">ADMINISTRATOR</div>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
};

export default Admin;

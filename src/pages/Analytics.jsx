import React from 'react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';

const Analytics = () => {
  const barData = [
    { height: 120, label: '12:00' },
    { height: 180, label: '13:00' },
    { height: 90, label: '14:00' },
    { height: 260, label: '15:00', highlight: true },
    { height: 140, label: '16:00' },
    { height: 210, label: '17:00' },
    { height: 110, label: '18:00' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <GlassCard style={{ flex: 1 }}>
        <h3 className="text-cyan">TRAFFIC VOLUME (6H)</h3>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%', padding: '20px 0 40px 0' }}>
          {barData.map((data, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50px' }}>
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: data.height, opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.1, type: 'spring' }}
                style={{ 
                  width: '100%', 
                  background: data.highlight ? 'linear-gradient(to top, var(--neon-red), rgba(255,0,60,0.2))' : 'linear-gradient(to top, var(--neon-cyan), rgba(0,255,255,0.2))',
                  border: `1px solid ${data.highlight ? 'var(--neon-red)' : 'var(--neon-cyan)'}`,
                  borderBottom: 'none',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  boxShadow: data.highlight ? '0 0 15px rgba(255,0,60,0.5)' : 'none'
                }}
              />
              <div className="text-muted" style={{ marginTop: '10px', fontSize: '0.9rem' }}>{data.label}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
         <GlassCard style={{ flex: 1 }}>
          <h3 className="text-purple">ATTACK DISTRIBUTION</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {/* Simple CSS-based 3D Pie Chart visualization abstraction */}
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'conic-gradient(var(--neon-red) 0% 40%, var(--neon-purple) 40% 70%, var(--neon-cyan) 70% 100%)', boxShadow: '0 10px 20px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.2)', transform: 'rotateX(60deg)', transformStyle: 'preserve-3d' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)', position: 'absolute', top: '10px', zIndex: -1, background: 'rgba(0,0,0,0.5)' }} />
            </div>
            
            <div style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '12px', height: '12px', background: 'var(--neon-red)' }}></div> SQLi (40%)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '12px', height: '12px', background: 'var(--neon-purple)' }}></div> XSS (30%)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '12px', height: '12px', background: 'var(--neon-cyan)' }}></div> CSRF (30%)</div>
            </div>
          </div>
         </GlassCard>
      </div>
    </div>
  );
};

export default Analytics;

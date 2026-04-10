import React from 'react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';

const RadialProgress = ({ percentage, color = 'var(--neon-green)', label }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
      <div style={{ position: 'relative', width: '150px', height: '150px' }}>
        <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="75"
            cy="75"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {percentage}%
        </div>
      </div>
      <span className="text-muted" style={{ letterSpacing: '1px' }}>{label}</span>
    </div>
  );
};

const Threats = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <GlassCard style={{ flex: 1 }}>
          <h3 className="text-cyan">ML CONFIDENCE SCORING</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
            <RadialProgress percentage={98} label="SQLi DETECTION" color="var(--neon-green)" />
            <RadialProgress percentage={94} label="XSS HEURISTICS" color="var(--neon-cyan)" />
            <RadialProgress percentage={87} label="ZERO-DAY PROB." color="var(--neon-red)" />
          </div>
        </GlassCard>
      </div>
      
      <GlassCard style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <h3 className="text-purple" style={{ position: 'absolute', zIndex: 10 }}>ATTACK VECTOR MAPPING</h3>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          
          {/* Animated SVG Path simulating attack routes intercepted by AI */}
          <svg width="80%" height="80%" viewBox="0 0 800 400" style={{ position: 'absolute' }}>
            {/* Background Grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
            <rect width="800" height="400" fill="url(#grid)" />

            {/* Nodes */}
            <circle cx="100" cy="200" r="20" fill="var(--panel-bg)" stroke="var(--neon-red)" strokeWidth="3" />
            <text x="100" y="240" fill="var(--text-main)" fontSize="12" textAnchor="middle">Attacker</text>

            <circle cx="400" cy="200" r="40" fill="rgba(0,255,255,0.1)" stroke="var(--neon-cyan)" strokeWidth="4" style={{ filter: 'drop-shadow(0 0 15px var(--neon-cyan))' }} />
            <text x="400" y="260" fill="var(--neon-cyan)" fontSize="14" fontWeight="bold" textAnchor="middle">SentinelAI Core</text>

            <circle cx="700" cy="100" r="30" fill="var(--panel-bg)" stroke="var(--neon-green)" strokeWidth="3" />
            <text x="700" y="150" fill="var(--text-main)" fontSize="12" textAnchor="middle">Database</text>

            <circle cx="700" cy="300" r="30" fill="var(--panel-bg)" stroke="var(--neon-green)" strokeWidth="3" />
            <text x="700" y="350" fill="var(--text-main)" fontSize="12" textAnchor="middle">Web Server</text>

            {/* Attack Path */}
            <path d="M 120 200 C 200 200, 300 200, 360 200" fill="none" stroke="var(--neon-red)" strokeWidth="4" strokeDasharray="10 5" opacity="0.5" />
            <motion.path 
              d="M 120 200 C 200 200, 300 200, 360 200" 
              fill="none" 
              stroke="var(--neon-red)" 
              strokeWidth="4" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ filter: 'drop-shadow(0 0 5px var(--neon-red))' }}
            />

            {/* Block Icon at AI Core */}
            <motion.line x1="360" y1="180" x2="380" y2="220" stroke="var(--neon-red)" strokeWidth="6" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            <motion.line x1="380" y1="180" x2="360" y2="220" stroke="var(--neon-red)" strokeWidth="6" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />

            {/* Safe Paths to Servers */}
            <path d="M 440 200 C 500 200, 600 100, 670 100" fill="none" stroke="var(--neon-green)" strokeWidth="2" opacity="0.3" />
            <path d="M 440 200 C 500 200, 600 300, 670 300" fill="none" stroke="var(--neon-green)" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>
      </GlassCard>
    </div>
  );
};

export default Threats;

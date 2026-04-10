import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Activity, RefreshCw, Sliders, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Shield size={20} /> },
    { name: 'Requests', path: '/requests', icon: <RefreshCw size={20} /> },
    { name: 'Threats', path: '/threats', icon: <Activity size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Admin', path: '/admin', icon: <Sliders size={20} /> },
  ];

  return (
    <aside className="glass-panel" style={{ width: '250px', height: 'calc(100vh - 40px)', margin: '20px', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
      <div style={{ padding: '0 20px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Shield color="var(--neon-green)" size={32} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }} className="text-green">Sentinel<span className="text-cyan">AI</span></h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 10px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '12px 20px',
              textDecoration: 'none',
              color: isActive ? 'var(--neon-green)' : 'var(--text-muted)',
              backgroundColor: isActive ? 'rgba(57, 255, 20, 0.1)' : 'transparent',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              borderLeft: isActive ? '3px solid var(--neon-green)' : '3px solid transparent',
            })}
          >
            {item.icon}
            <span style={{ fontWeight: '500' }}>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '20px' }}>
        <motion.div 
          style={{ width: '100%', height: '2px', background: 'var(--neon-green)', boxShadow: 'var(--shadow-green)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <p style={{ fontSize: '0.8rem', marginTop: '10px', textAlign: 'center' }} className="text-muted">SYSTEM SECURE</p>
      </div>
    </aside>
  );
};

export default Sidebar;

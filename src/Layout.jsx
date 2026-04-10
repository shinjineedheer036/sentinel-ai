import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <>
      <div className="animated-grid"></div>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', paddingLeft: 0, overflow: 'hidden' }}>
        <header className="glass-panel" style={{ height: '70px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px' }}>
          <div>
            <h2 className="text-cyan" style={{ margin: 0, fontWeight: 500, letterSpacing: '2px' }}>SentinelAI</h2>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Bell color="var(--text-main)" size={20} />
              <motion.span 
                style={{ position: 'absolute', top: '-5px', right: '-5px', width: '10px', height: '10px', backgroundColor: 'var(--neon-red)', borderRadius: '50%', boxShadow: 'var(--shadow-red)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'rgba(0,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--neon-cyan)' }}>
                <User color="var(--neon-cyan)" size={18} />
              </div>
              <span style={{ fontSize: '0.9rem' }}>Admin Access</span>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }} className="content-area">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;

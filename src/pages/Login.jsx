import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }} className="animated-grid">
      <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(0, 255, 255, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--neon-cyan)', marginBottom: '20px' }}>
          <Shield color="var(--neon-cyan)" size={32} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 10px 0', color: '#fff' }}>Sentinel<span className="text-cyan">AI</span> Security</h1>
        <p className="text-muted" style={{ margin: 0 }}>Sign in to your security dashboard</p>
      </div>

      <GlassCard style={{ width: '400px', padding: '30px' }} glowColor="var(--neon-cyan)">
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sentinel-ai.com"
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,255,255,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,255,255,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }}
              required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px var(--neon-cyan)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{ marginTop: '10px', padding: '12px', borderRadius: '8px', background: 'rgba(0, 255, 255, 0.2)', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
          >
            Sign In
          </motion.button>
          
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem' }}>
            <span className="text-muted">No account? </span>
            <a href="#" className="text-cyan" style={{ textDecoration: 'none' }}>Create one</a>
          </div>
        </form>
      </GlassCard>

      <div style={{ marginTop: '30px', padding: '10px 20px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', color: '#aaa' }}>
        Demo: Sign in to explore the dashboard
      </div>
    </div>
  );
};

export default Login;

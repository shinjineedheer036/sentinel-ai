import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei';
import GlassCard from '../components/GlassCard';
import GlowText from '../components/GlowText';
import { motion } from 'framer-motion';

const RotatingCore = () => {
  const sphereRef = useRef();
  
  useFrame((state) => {
    sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Sphere ref={sphereRef} args={[1.5, 64, 64]} scale={1.5}>
      <MeshDistortMaterial 
        color="#00ffff" 
        attach="material" 
        distort={0.4} 
        speed={2} 
        roughness={0.2}
        metalness={0.8}
        emissive="#00ffff"
        emissiveIntensity={0.5}
        wireframe={true}
      />
    </Sphere>
  );
};

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <GlassCard glowColor="var(--neon-cyan)">
          <h3 className="text-muted" style={{ margin: '0 0 10px 0' }}>TOTAL REQUESTS</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}><GlowText text="14,295,302" color="cyan" /></div>
          <div className="text-green" style={{ fontSize: '0.9rem', marginTop: '5px' }}>↑ 12% from last hour</div>
        </GlassCard>
        
        <GlassCard glowColor="var(--neon-red)">
          <h3 className="text-muted" style={{ margin: '0 0 10px 0' }}>THREATS BLOCKED</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}><GlowText text="8,401" color="red" /></div>
          <div className="text-red" style={{ fontSize: '0.9rem', marginTop: '5px' }}>Critical SQLi Detected</div>
        </GlassCard>

        <GlassCard glowColor="var(--neon-green)">
          <h3 className="text-muted" style={{ margin: '0 0 10px 0' }}>SYSTEM STATUS</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}><GlowText text="OPTIMAL" color="green" /></div>
          <div className="text-muted" style={{ fontSize: '0.9rem', marginTop: '5px' }}>AI Engine: Active</div>
        </GlassCard>
      </div>

      <div style={{ flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden' }} className="glass-panel">
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
          <h2 className="text-cyan" style={{ margin: 0 }}>AI NEURAL CORE</h2>
          <p className="text-muted">Real-time analysis matrix</p>
        </div>
        
        {/* React Three Fiber Canvas positioned over the rest of the card */}
        <Canvas camera={{ position: [0, 0, 8] }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <RotatingCore />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>

        {/* Floating alerts over the 3D canvas */}
        <motion.div 
          style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 10, padding: '15px 20px', background: 'rgba(255, 0, 60, 0.2)', border: '1px solid var(--neon-red)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="text-red" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>ALERT: Suspicious Traffic</div>
          <div style={{ fontSize: '0.8rem', color: '#fff' }}>Origin: Unknown IP Block</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

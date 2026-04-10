import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', glowColor = 'var(--neon-green)', tiltOptions = {}, style = {} }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt limits
    const limit = 10;
    const rx = ((y - centerY) / centerY) * -limit;
    const ry = ((x - centerX) / centerX) * limit;

    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`glass-panel ${className}`}
      style={{
        padding: '24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, borderColor: glowColor, boxShadow: `0 0 15px ${glowColor}50` }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;

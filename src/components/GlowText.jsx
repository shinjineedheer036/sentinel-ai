import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlowText = ({ text, color = 'green', typing = false, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (typing) {
      let i = 0;
      setDisplayedText('');
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 50); // Typing speed
      return () => clearInterval(interval);
    } else {
      setDisplayedText(text);
    }
  }, [text, typing]);

  const colorClass = `text-${color}`;

  return (
    <span className={`${colorClass} ${className}`}>
      {displayedText}
      {typing && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          _
        </motion.span>
      )}
    </span>
  );
};

export default GlowText;

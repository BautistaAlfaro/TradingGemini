import React from 'react';
import { motion } from 'framer-motion';
import { audioEngine } from '../../utils/audio';

export const QuantumStructureWord: React.FC = () => {
  const letters = 'ESTRUCTURA.'.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Clear sequential drop
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: -650, // Falls from the very top ceiling
      scale: 1.6,
      rotateZ: -20,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 14,
        mass: 1.1,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="inline-flex flex-wrap prismatic-flux-text select-none tracking-tight sm:tracking-wide font-black"
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          whileHover={{
            scale: 1.25,
            y: -12,
            rotateZ: (i % 2 === 0 ? 8 : -8),
            transition: { type: 'spring', stiffness: 500, damping: 10 },
          }}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="inline-block cursor-default transition-colors duration-200"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

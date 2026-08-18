import React from 'react';
import { motion } from 'framer-motion';
import { audioEngine } from '../../utils/audio';

export const QuantumStructureWord: React.FC = () => {
  const letters = 'ESTRUCTURA'.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: -60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="inline-flex flex-wrap font-display font-black tracking-normal prismatic-flux-text select-none"
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          whileHover={{
            scale: 1.12,
            y: -4,
            transition: { type: 'spring', stiffness: 500, damping: 12 },
          }}
          onMouseEnter={() => audioEngine.playHoverSound()}
          className="inline-block cursor-default"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

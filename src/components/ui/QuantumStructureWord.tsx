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
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: -400,
      rotateZ: -10,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 18,
        mass: 0.9,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="inline-flex flex-wrap font-display font-black tracking-tight sm:tracking-normal prismatic-flux-text select-none text-glow-subtle"
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          whileHover={{
            scale: 1.15,
            y: -6,
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

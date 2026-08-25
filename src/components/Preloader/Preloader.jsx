import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 25 + 15;
      });
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const letters = 'LAXMAN D.'.split('');

  return (
    <AnimatePresence>
      <motion.div
        className="preloader-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      >
        {/* Background animated gradient */}
        <div className="preloader-bg-mesh" />

        <motion.div
          className="preloader-card"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ y: -50, opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* SVG Logo Ring */}
          <div className="preloader-logo-ring">
            <svg viewBox="0 0 100 100" className="preloader-svg-ring">
              <motion.circle
                cx="50" cy="50" r="44"
                fill="none"
                stroke="url(#preloaderGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="preloaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <span className="preloader-initials">LD</span>
          </div>

          {/* Staggered letter reveal */}
          <div className="preloader-name">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="preloader-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Loading Experience...
          </motion.p>

          {/* Progress bar */}
          <div className="preloader-progress-track">
            <motion.div
              className="preloader-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>

          {/* Progress counter */}
          <motion.span
            className="preloader-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.4 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;

import { AnimatePresence, motion } from 'framer-motion';
import './Preloader.css';

const Preloader = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="preloader-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.45 } }}
      >
        <motion.div
          className="preloader-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="preloader-logo">Laxman D.</div>
          <motion.div
            className="preloader-line"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;

import { AnimatePresence, motion } from 'framer-motion';

const Toast = ({ message, type = 'success', open, onClose }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`toast toast-${type}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

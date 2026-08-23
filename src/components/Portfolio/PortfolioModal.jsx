import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { scaleIn } from '../../motion/variants';
import './Portfolio.css';

const PortfolioModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal-card glass-card" initial="hidden" animate="visible" exit="hidden" variants={scaleIn} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close project modal">
          <FaTimes />
        </button>
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="modal-body">
          <span>{project.category}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="modal-tech">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="modal-actions">
            <a href={project.liveUrl} className="button primary" target="_blank" rel="noreferrer">
              <FaExternalLinkAlt /> Live Demo
            </a>
            <a href={project.githubUrl} className="button secondary" target="_blank" rel="noreferrer">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioModal;

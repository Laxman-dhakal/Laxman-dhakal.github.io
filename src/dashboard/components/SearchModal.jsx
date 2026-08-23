import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const items = [
  { label: 'Dashboard Home', path: '/dashboard', category: 'Pages' },
  { label: 'Analytics', path: '/dashboard/analytics', category: 'Pages' },
  { label: 'Projects', path: '/dashboard/projects', category: 'Content' },
  { label: 'Messages', path: '/dashboard/messages', category: 'Content' },
  { label: 'Settings', path: '/dashboard/settings', category: 'Account' }
];

const SearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="search-panel"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="search-header">
              <h3>Quick navigation</h3>
              <button type="button" className="search-close" onClick={onClose}>×</button>
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, messages, settings..."
              autoFocus
            />
            <div className="search-results">
              {filtered.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  className="search-item"
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                >
                  <span>{item.label}</span>
                  <small>{item.category}</small>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;

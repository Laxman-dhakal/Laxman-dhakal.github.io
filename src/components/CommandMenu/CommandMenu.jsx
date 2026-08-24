import { useEffect, useRef, useState } from 'react';
import { FaBlog, FaBolt, FaHome, FaMoon, FaRocket, FaSearch, FaTimes, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './CommandMenu.css';

const CommandMenu = ({ toggleTheme, embedded = false }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const commands = [
    { label: 'Go to home', hint: 'Home', icon: FaHome, action: () => goToSection('home') },
    { label: 'Explore skills', hint: 'Skills', icon: FaBolt, action: () => goToSection('services') },
    { label: 'View experience', hint: 'Experience', icon: FaRocket, action: () => goToSection('experience') },
    { label: 'About Laxman', hint: 'About', icon: FaUser, action: () => goToSection('about') },
    { label: 'Start a project', hint: 'Contact', icon: FaRocket, action: () => goToSection('contact') },
    { label: 'Read the blog', hint: 'Blog', icon: FaBlog, action: () => navigate('/blog') }
  ];
  if (toggleTheme) commands.push({ label: 'Switch color theme', hint: 'Theme', icon: FaMoon, action: toggleTheme });

  function goToSection(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else navigate(`/#${id}`);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  const visibleCommands = commands.filter((command) => `${command.label} ${command.hint}`.toLowerCase().includes(query.toLowerCase()));
  const runCommand = (action) => { action(); setOpen(false); };

  return (
    <>
      <button type="button" className={`command-menu-trigger ${embedded ? 'command-menu-embedded' : ''}`} onClick={() => setOpen(true)} aria-label="Open quick navigation">
        <FaSearch /><span>Quick navigate</span><kbd>Ctrl K</kbd>
      </button>
      {open && (
        <div className="command-menu-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section className="command-menu" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={(event) => event.stopPropagation()}>
            <div className="command-menu-search"><FaSearch /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages and actions..." aria-label="Search pages and actions" /><button type="button" onClick={() => setOpen(false)} aria-label="Close quick navigation"><FaTimes /></button></div>
            <div className="command-menu-list">
              <small>QUICK ACTIONS</small>
              {visibleCommands.length ? visibleCommands.map((command) => {
                const Icon = command.icon;
                return <button type="button" key={command.label} onClick={() => runCommand(command.action)}><span className="command-icon"><Icon /></span><span>{command.label}<em>{command.hint}</em></span><b>↵</b></button>;
              }) : <p>No matching action found.</p>}
            </div>
            <footer><span><kbd>↑↓</kbd> navigate</span><span><kbd>ESC</kbd> close</span></footer>
          </section>
        </div>
      )}
    </>
  );
};

export default CommandMenu;

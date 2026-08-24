import { useEffect, useRef, useState } from 'react';
import {
  FaBlog,
  FaBolt,
  FaHome,
  FaMoon,
  FaRocket,
  FaSearch,
  FaTimes,
  FaUser,
  FaCalculator,
  FaTerminal,
  FaLayerGroup,
  FaLaptopCode,
  FaGraduationCap
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { playClick, playPop } from '../../services/soundService';
import './CommandMenu.css';

export const openCommandPalette = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  }
};

const CommandMenu = ({ toggleTheme }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    { label: 'Go to Home Hero', hint: 'Home', icon: FaHome, action: () => goToSection('home') },
    { label: 'Project Cost & Timeline Estimator', hint: 'Estimator', icon: FaCalculator, action: () => goToSection('estimator') },
    { label: 'Interactive Dev Console & Code Vault', hint: 'Console', icon: FaTerminal, action: () => goToSection('developer-console') },
    { label: 'Skill Matrix & Engineering Proficiency', hint: 'Skills', icon: FaBolt, action: () => goToSection('tech-matrix') },
    { label: 'Featured Work & Case Studies', hint: 'Portfolio', icon: FaLaptopCode, action: () => goToSection('portfolio') },
    { label: 'Online Courses & Classes', hint: 'Courses', icon: FaGraduationCap, action: () => goToSection('online-courses') },
    { label: 'Experience & Career Timeline', hint: 'Experience', icon: FaRocket, action: () => goToSection('experience') },
    { label: 'About Er. Laxman Dhakal', hint: 'About', icon: FaUser, action: () => goToSection('about') },
    { label: 'Start a Project / Hire Me', hint: 'Contact', icon: FaRocket, action: () => goToSection('contact') },
    { label: 'Read Technical Blog Articles', hint: 'Blog', icon: FaBlog, action: () => navigate('/blog') }
  ];

  if (toggleTheme) {
    commands.push({ label: 'Toggle Light / Dark Mode', hint: 'Theme', icon: FaMoon, action: toggleTheme });
  }

  function goToSection(id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${id}`);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        playPop();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };

    const handleOpenEvent = () => {
      playPop();
      setOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setSelectedIndex(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  const visibleCommands = commands.filter((command) =>
    `${command.label} ${command.hint}`.toLowerCase().includes(query.toLowerCase())
  );

  const runCommand = (action) => {
    playClick();
    action();
    setOpen(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < visibleCommands.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : visibleCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visibleCommands[selectedIndex]) {
        runCommand(visibleCommands[selectedIndex].action);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="command-menu-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <section
        className="command-menu glass-card"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation palette"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="command-menu-search">
          <FaSearch className="search-cmd-icon" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a section, tool, or action..."
            aria-label="Search pages and actions"
          />
          <button
            type="button"
            className="cmd-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close command palette"
          >
            <FaTimes />
          </button>
        </div>

        <div className="command-menu-list">
          <small>NAVIGATION & TOOLS</small>
          {visibleCommands.length ? (
            visibleCommands.map((command, idx) => {
              const Icon = command.icon;
              return (
                <button
                  type="button"
                  key={command.label}
                  className={selectedIndex === idx ? 'active' : ''}
                  onClick={() => runCommand(command.action)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <span className="command-icon"><Icon /></span>
                  <span className="command-text">
                    <strong>{command.label}</strong>
                    <em>{command.hint}</em>
                  </span>
                  <kbd>↵</kbd>
                </button>
              );
            })
          ) : (
            <p className="no-cmd-match">No matching action found for "{query}".</p>
          )}
        </div>

        <footer>
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>ESC</kbd> close</span>
        </footer>
      </section>
    </div>
  );
};

export default CommandMenu;

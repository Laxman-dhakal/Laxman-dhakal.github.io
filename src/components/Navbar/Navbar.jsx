import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaVolumeUp,
  FaVolumeMute,
  FaSearch,
  FaArrowRight,
  FaHome,
  FaCalculator,
  FaTerminal,
  FaBolt,
  FaLayerGroup,
  FaBriefcase,
  FaQuestionCircle,
  FaBook,
  FaUser,
  FaPaperPlane,
  FaLock
} from 'react-icons/fa';
import { fadeRight, staggerContainer } from '../../motion/variants';
import { isSoundMuted, toggleSound, playClick, playPop } from '../../services/soundService';
import SiteNotice from '../SiteNotice/SiteNotice';
import { openCommandPalette } from '../CommandMenu/CommandMenu';
import './Navbar.css';

const navLinks = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'estimator', label: 'Estimator', icon: FaCalculator },
  { id: 'developer-console', label: 'Console', icon: FaTerminal },
  { id: 'tech-matrix', label: 'Skills', icon: FaBolt },
  { id: 'portfolio', label: 'Portfolio', icon: FaLayerGroup },
  { id: 'experience', label: 'Timeline', icon: FaBriefcase },
  { id: 'faq', label: 'FAQ', icon: FaQuestionCircle },
  { id: 'blog', label: 'Blog', icon: FaBook },
  { id: 'about', label: 'About', icon: FaUser },
  { id: 'contact', label: 'Contact', icon: FaPaperPlane }
];

const Navbar = ({ theme, toggleTheme, mounted, scrollY }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [soundMuted, setSoundMuted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    if (scrollY > prevScrollY.current && scrollY > 100 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    prevScrollY.current = scrollY;
  }, [scrollY, menuOpen]);

  useEffect(() => {
    setSoundMuted(isSoundMuted());
  }, []);

  const handleToggleSound = () => {
    const isNowEnabled = toggleSound();
    setSoundMuted(!isNowEnabled);
  };

  const scrollProgress = typeof document === 'undefined'
    ? 0
    : Math.min((scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100, 100);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActive(location.pathname.slice(1).split('/')[0] || 'home');
      return undefined;
    }
    const handleScroll = () => {
      const current = navLinks.reduce((section, item) => {
        const element = document.getElementById(item.id);
        if (!element) return section;
        const top = element.getBoundingClientRect().top;
        if (top <= 140) return item.id;
        return section;
      }, 'home');
      setActive(current);
    };

    handleScroll();
  }, [location.pathname, scrollY]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return undefined;
    const frame = requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavigate = (id) => {
    playClick();
    setMenuOpen(false);
    if (id === 'blog') {
      navigate('/blog');
      return;
    }
    if (id === 'online-class') {
      navigate('/online-class');
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${id}`);
    }
  };

  const openSearch = () => {
    openCommandPalette();
  };

  return (
    <motion.header
      className={`navbar ${scrollY > 30 ? 'navbar-scrolled' : ''} ${hidden ? 'navbar-hidden' : ''}`}
      initial="hidden"
      animate="visible"
      variants={fadeRight}
    >
      <SiteNotice />
      <span className="navbar-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </span>

      <div className="navbar-inner container">
        {/* Graphical Brand Logo */}
        <a href="#home" className="navbar-brand" onClick={() => handleNavigate('home')}>
          <div className="brand-avatar-container">
            <span className="avatar-neon-ring" />
            <img
              src={new URL('../../../image/logo.png', import.meta.url).href}
              alt="Er. Laxman Dhakal Logo"
              className="navbar-logo-img"
            />
            <span className="online-indicator" title="Available for Work" />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">Laxman <strong className="brand-badge-dev">PRO</strong></span>
            <small className="brand-role">Web Engineer</small>
          </div>
        </a>

        {/* Primary Desktop Nav Menu */}
        <nav className="navbar-links" aria-label="Primary navigation">
          <ul className="nav-pill-track">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    className={`nav-pill-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavigate(link.id)}
                    aria-label={`Navigate to ${link.label}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="nav-item-icon" />
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        className="active-pill-glow"
                        layoutId="activePill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls & Interactive Buttons */}
        <div className="navbar-actions">
          {/* Quick Search Ctrl+K Button */}
          <button
            type="button"
            className="navbar-search-btn"
            onClick={openSearch}
            aria-label="Search pages and tools (Ctrl+K)"
            title="Search actions (Ctrl+K)"
          >
            <FaSearch />
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>

          {/* Sound Synthesizer Audio Toggle */}
          <button
            type="button"
            className={`sound-toggle ${!soundMuted ? 'sound-active' : ''}`}
            onClick={handleToggleSound}
            aria-label={soundMuted ? 'Enable sound effects' : 'Mute sound effects'}
            title={soundMuted ? 'Sound: Muted (Click to enable)' : 'Sound: Active (Click to mute)'}
          >
            {soundMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            {!soundMuted && <span className="audio-wave-dot" />}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            type="button"
            className="theme-toggle"
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            disabled={!mounted}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            <span className="theme-toggle-icon">
              {theme === 'dark' ? <FaSun className="icon-sun" /> : <FaMoon className="icon-moon" />}
            </span>
          </button>

          {/* Admin Dashboard Portal Link */}
          <Link
            to="/login"
            className="navbar-admin-btn"
            title="Admin Portal (Manage Website)"
            onClick={playClick}
          >
            <FaLock className="admin-lock-icon" />
            <span>Admin</span>
          </Link>

          {/* Hire Me CTA Button */}
          <Link
            to="/contact"
            className="button primary navbar-cta"
            onClick={playClick}
          >
            <span>Hire Me</span>
            <FaArrowRight className="cta-arrow" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="menu-toggle"
            onClick={() => {
              playClick();
              setMenuOpen((prev) => !prev);
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Modern Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile-drawer glass-card"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-search-banner" onClick={() => { setMenuOpen(false); openSearch(); }}>
              <FaSearch />
              <span>Search portfolio & tools...</span>
              <kbd>Ctrl+K</kbd>
            </div>

            <motion.ul className="mobile-menu-grid" variants={staggerContainer} initial="hidden" animate="visible">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = active === link.id;
                return (
                  <motion.li
                    key={link.id}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <button
                      type="button"
                      className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavigate(link.id)}
                    >
                      <span className="mobile-nav-icon"><Icon /></span>
                      <span className="mobile-nav-label">{link.label}</span>
                      {isActive && <span className="mobile-active-dot" />}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="mobile-drawer-footer">
              <Link to="/login" className="mobile-admin-badge" onClick={() => setMenuOpen(false)}>
                <FaLock /> Admin Login
              </Link>
              <Link to="/contact" className="button primary mobile-cta-btn" onClick={() => setMenuOpen(false)}>
                Start a Project <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

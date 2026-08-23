import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { fadeRight, staggerContainer } from '../../motion/variants';
import './Navbar.css';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'faq', label: 'FAQ' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = ({ theme, toggleTheme, mounted, scrollY }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const scrollProgress = typeof document === 'undefined'
    ? 0
    : Math.min((scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100, 100);

  useEffect(() => {
    const handleScroll = () => {
      const current = navLinks.reduce((section, item) => {
        const element = document.getElementById(item.id);
        if (!element) return section;
        const top = element.getBoundingClientRect().top;
        if (top <= 120) return item.id;
        return section;
      }, 'home');
      setActive(current);
    };

    handleScroll();
  }, [scrollY]);

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
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      className={`navbar ${scrollY > 40 ? 'navbar-scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={fadeRight}
    >
      <span className="navbar-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </span>
      <div className="navbar-inner container">
        <a href="#home" className="navbar-brand" onClick={() => handleNavigate('home')}>
          <span className="navbar-logo-shell">
            <img src={new URL('../../../image/logo.png', import.meta.url).href} alt="Laxman logo" className="navbar-logo" />
          </span>
          <span className="brand-text">Laxman</span>
        </a>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  className={active === link.id ? 'active' : ''}
                  onClick={() => handleNavigate(link.id)}
                  aria-label={`Go to ${link.label}`}
                  aria-current={active === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <Link to="/login" className="button secondary navbar-admin">
            Admin
          </Link>
          <a href="#contact" className="button primary navbar-cta">
            Hire Me
          </a>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <motion.div
        className="navbar-mobile"
        initial={{ opacity: 0, y: -20 }}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
      >
        <motion.ul className="mobile-menu" variants={staggerContainer} initial="hidden" animate={menuOpen ? 'visible' : 'hidden'}>
          {navLinks.map((link) => (
            <motion.li key={link.id} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
              <button type="button" onClick={() => handleNavigate(link.id)}>
                {link.label}
              </button>
            </motion.li>
          ))}
          <motion.li variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            <Link to="/login" className="mobile-admin-link" onClick={() => setMenuOpen(false)}>
              Admin Login
            </Link>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;

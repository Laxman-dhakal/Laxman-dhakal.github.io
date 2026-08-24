import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebookF, FaTiktok, FaArrowUp, FaArrowRight, FaRegClock, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fadeUp } from '../../motion/variants';
import services from '../../data/services';
import CommandMenu from '../CommandMenu/CommandMenu';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <motion.div className="footer-brand" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <span className="footer-logo">LD</span>
          <p className="footer-tagline">Laxman Dhakal — Web &amp; React Developer</p>
          <Link to="/contact" className="button primary footer-cta-button">
            Start a conversation <FaArrowRight className="footer-cta-arrow" />
          </Link>
        </motion.div>
        <motion.div className="footer-links" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>Quick Links</h3>
          <CommandMenu embedded />
        </motion.div>
        <motion.div className="footer-services" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>Services</h3>
          <ul>
            {services.slice(0, 5).map((service) => (
              <li key={service.id}><a href="/#services">{service.title}</a></li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="footer-contact" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>Contact</h3>
          <p>laxmandhakal000@gmail.com</p>
          <p>+977-9768458058</p>
          <p>Nepalgunj, Banke, Nepal</p>
          <span className="footer-response"><FaRegClock /> Usually replies within 24 hours</span>
          <div className="footer-socials">
            <a className="social-link github" href="https://github.com/Laxman-dhakal" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a className="social-link linkedin" href="https://www.linkedin.com/in/laxman-dhakal-b24510430/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a className="social-link facebook" href="https://www.facebook.com/laxman.dhakal.923" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a className="social-link tiktok" href="https://www.tiktok.com/@laxmandhakal146" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </motion.div>
      </div>
      <div className="container footer-newsletter">
        <div className="footer-newsletter-copy">
          <span className="footer-newsletter-icon"><FaEnvelope /></span>
          <div>
            <strong>Get occasional updates</strong>
            <p>New projects, articles and availability — no spam.</p>
          </div>
        </div>
        {subscribed ? (
          <p className="footer-newsletter-success">Thanks! You’re subscribed.</p>
        ) : (
          <form onSubmit={handleSubscribe} className="footer-newsletter-form">
            <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
            <input id="footer-newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe"><FaArrowRight /></button>
          </form>
        )}
      </div>
      <div className="footer-bottom">
        <p>© 2026 Er.Laxman Dhakal. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/#home" className="back-to-top"><FaArrowUp /> Back to top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

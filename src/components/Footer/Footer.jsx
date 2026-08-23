import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaFacebookF, FaTiktok, FaArrowUp, FaArrowRight, FaRegClock } from 'react-icons/fa';
import { fadeUp } from '../../motion/variants';
import './Footer.css';

const Footer = () => {
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) return;
    localStorage.setItem('laxman-lead-email', leadEmail);
    setLeadSubmitted(true);
  };

  return (
    <footer className="footer-section">
      <div className="container footer-cta glass-card">
        <div>
          <span className="footer-kicker"><i /> Available for freelance work</span>
          <h2>Have an idea worth building?</h2>
          <p>Let’s turn the rough sketch into a fast, memorable digital experience.</p>
        </div>
        <a href="#contact" className="button primary">Start a conversation <FaArrowRight /></a>
      </div>
      <div className="container footer-grid">
        <motion.div className="footer-brand" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <span className="footer-eyebrow">LD / DIGITAL STUDIO</span>
          <h2>Laxman.</h2>
          <p>Creating premium web experiences with React, motion and thoughtful design.</p>
          <div className="footer-lead-magnet">
            <span className="footer-lead-label">Free project starter checklist</span>
            {leadSubmitted ? (
              <a className="footer-download" href="/project-starter-checklist.txt" download>Download checklist <FaArrowRight /></a>
            ) : (
              <form onSubmit={handleLeadSubmit} className="footer-lead-form">
                <label htmlFor="footer-lead-email" className="sr-only">Email address</label>
                <input id="footer-lead-email" type="email" value={leadEmail} onChange={(event) => setLeadEmail(event.target.value)} placeholder="Your email address" required />
                <button type="submit" aria-label="Get project checklist"><FaArrowRight /></button>
              </form>
            )}
          </div>
        </motion.div>
        <motion.div className="footer-links" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/login">Admin</a></li>
          </ul>
        </motion.div>
        <motion.div className="footer-contact" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>Contact</h3>
          <p>laxmandhakal000@gmail.com</p>
          <p>+977-9768458058</p>
          <p>Nepalgunj, Banke, Nepal</p>
          <span className="footer-response"><FaRegClock /> Usually replies within 24 hours</span>
          <div className="footer-network-links">
            <a href="https://github.com/Laxman-dhakal" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            <a href="https://www.linkedin.com/in/laxman-dhakal-b24510430/" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
          </div>
          <div className="footer-socials">
            <a className="social-link github" href="https://github.com/Laxman-dhakal" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a className="social-link linkedin" href="https://www.linkedin.com/in/laxman-dhakal-b24510430/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a className="social-link facebook" href="https://www.facebook.com/laxman.dhakal.923" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a className="social-link tiktok" href="https://www.tiktok.com/@laxmandhakal146" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </motion.div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Er.Laxman Dhakal. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="#home" className="back-to-top"><FaArrowUp /> Back to top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

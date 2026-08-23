import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebookF, FaInstagram, FaArrowUp } from 'react-icons/fa';
import { fadeUp } from '../../motion/variants';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <motion.div className="footer-brand" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h2>Laxman.</h2>
          <p>Creating premium web experiences with React, motion and thoughtful design.</p>
        </motion.div>
        <motion.div className="footer-links" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/login">Admin</a></li>
          </ul>
        </motion.div>
        <motion.div className="footer-contact" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>Contact</h3>
          <p>your-email@example.com</p>
          <p>+977-98XXXXXXXX</p>
          <div className="footer-socials">
            <a href="#" aria-label="GitHub"><FaGithub /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </motion.div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Laxman Dhakal. All Rights Reserved.</p>
        <a href="#home" className="back-to-top"><FaArrowUp /> Back to top</a>
      </div>
    </footer>
  );
};

export default Footer;

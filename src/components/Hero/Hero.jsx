import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { fadeUp, fadeRight } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import useTypingEffect from '../../hooks/useTypingEffect';
import './Hero.css';

const Hero = () => {
  const siteContent = getSiteContent();
  const rolePhrases = Array.isArray(siteContent.hero.roles) && siteContent.hero.roles.length
    ? siteContent.hero.roles
    : [siteContent.hero.subtitle || 'Web Developer'];
  const animatedText = useTypingEffect(rolePhrases, 120, 60, 1200);
  const currentRole = animatedText || rolePhrases[0];

  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <motion.div className="hero-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <span className="small-badge">AVAILABLE FOR FREELANCE</span>
          <h1>{siteContent.hero.title.split(' ').slice(0, 2).join(' ')} <span>{siteContent.hero.title.split(' ').slice(2).join(' ') || 'Dhakal'}</span></h1>
          <div className="hero-type">
            <p>I'm a</p>
            <span>{currentRole}<span className="cursor">|</span></span>
          </div>
          <p className="hero-description">
            {siteContent.hero.description}
          </p>
          <div className="hero-actions">
            <a href="#portfolio" className="button primary">{siteContent.hero.primaryCta}</a>
            <a href="#contact" className="button secondary">{siteContent.hero.secondaryCta}</a>
          </div>
          <div className="hero-socials">
            <a href="#" aria-label="GitHub"><FaGithub /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </motion.div>

        <motion.div className="hero-visual" variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <div className="hero-image-shell glass-card">
            <div className="hero-image-overlay" />
            <img src={siteContent.hero.image} alt="Laxman Dhakal profile" />
          </div>
          <div className="hero-floating hero-floating-1">
            <span>⚛ React</span>
          </div>
          <div className="hero-floating hero-floating-2">
            <span>💻 Developer</span>
          </div>
          <div className="hero-floating hero-floating-3">
            <span>🎨 UI/UX</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

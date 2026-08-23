import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { fadeUp, fadeRight } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import useTypingEffect from '../../hooks/useTypingEffect';
import './Hero.css';

const onlineClassUrl = import.meta.env.VITE_ONLINE_CLASS_URL || '/online-class';

const Hero = () => {
  const siteContent = getSiteContent();
  const rolePhrases = Array.isArray(siteContent.hero.roles) && siteContent.hero.roles.length
    ? siteContent.hero.roles
    : [siteContent.hero.subtitle || 'Web Developer'];
  const animatedText = useTypingEffect(rolePhrases, 120, 60, 1200);
  const currentRole = animatedText || rolePhrases[0];

  const featurePills = [
    'Custom business websites',
    'Fast performance optimization',
    'Conversion-focused design'
  ];

  const trustStats = [
    { value: '5+', label: 'Years building web experiences' },
    { value: '30+', label: 'Projects delivered' },
    { value: '100%', label: 'Responsive & conversion-ready' }
  ];

  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <motion.div className="hero-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <span className="small-badge">AVAILABLE FOR FREELANCE</span>
          <h1>{siteContent.hero.title.split(' ').slice(0, 2).join(' ')} <span>{siteContent.hero.title.split(' ').slice(2).join(' ') || 'Dhakal'}</span></h1>
          <div className="hero-type">
            <p>I'm a</p>
            {' '}
            <span>{currentRole}<span className="cursor">|</span></span>
          </div>
          <p className="hero-description">
            {siteContent.hero.description}
          </p>
          <div className="hero-actions">
            <a href="#portfolio" className="button primary">{siteContent.hero.primaryCta}</a>
            <a href="#contact" className="button secondary">{siteContent.hero.secondaryCta}</a>
            <a href={onlineClassUrl} className="button secondary">Online Class</a>
          </div>

          <div className="hero-feature-list" aria-label="Core strengths">
            {featurePills.map((item) => (
              <span key={item} className="feature-pill">{item}</span>
            ))}
          </div>

          <div className="hero-trust-grid">
            {trustStats.map((stat) => (
              <div key={stat.label} className="hero-trust-card glass-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <a className="hero-scroll-cue" href="#about">
            <span className="scroll-line" />
            <span>Scroll to explore</span>
          </a>

          <div className="hero-socials">
            <a className="social-link github" href="https://github.com/Laxman-dhakal" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a className="social-link linkedin" href="https://www.linkedin.com/in/laxman-dhakal-b24510430/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a className="social-link facebook" href="https://www.facebook.com/laxman.dhakal.923" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a className="social-link tiktok" href="https://www.tiktok.com/@laxmandhakal146" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </motion.div>

        <motion.div className="hero-visual" variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <span className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <span className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="hero-image-shell glass-card">
            <div className="hero-image-overlay" />
            <img src={siteContent.hero.image} alt="Er.Laxman Dhakal profile" />
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
          <div className="hero-code-card" aria-label="Developer code preview">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <code><b>const</b> experience = <em>"premium"</em>;</code>
            <code><b>build</b>(responsive, accessible);</code>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

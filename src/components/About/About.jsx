import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBriefcase, FaCalendarAlt, FaCode, FaLaptopCode, FaMapMarkerAlt, FaPalette, FaRocket, FaSmile, FaUniversalAccess } from 'react-icons/fa';
import { fadeUp, fadeLeft } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import './About.css';

const statIcons = [FaBriefcase, FaCalendarAlt, FaSmile, FaLaptopCode];

const quickFacts = [
  { icon: FaMapMarkerAlt, label: 'Nepalgunj, Nepal' },
  { icon: FaCode, label: 'React & JavaScript' },
  { icon: FaBriefcase, label: 'Open to Freelance' }
];

const approachCards = [
  { icon: FaPalette, title: 'Design with purpose', text: 'Clear visual systems that make every interaction feel intentional.' },
  { icon: FaRocket, title: 'Built for performance', text: 'Fast, responsive builds that work beautifully on every screen.' },
  { icon: FaUniversalAccess, title: 'Accessible by default', text: 'Thoughtful experiences that are easy for everyone to use.' }
];

const AnimatedStat = ({ value }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const numericValue = Number(String(value).replace(/[^\d.]/g, '')) || 0;
    const suffix = String(value).replace(/\d|\./g, '');
    const duration = 950;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const nextValue = numericValue * eased;
      setDisplay(nextValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(numericValue);
      }
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span>{Math.round(display)}{String(value).includes('+') ? '+' : String(value).includes('%') ? '%' : ''}</span>;
};

const About = () => {
  const { about } = getSiteContent();

  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <motion.div className="about-visual" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="about-photo-frame">
            <div className="about-photo glass-card">
              <img src={about.image} alt="Portrait of Laxman Dhakal" />
            </div>
            <div className="about-signature-card">
              <span>LD</span>
              <p><strong>Building digital</strong><br />experiences with care.</p>
            </div>
            <span className="about-badge"><i /> Available for freelance</span>
          </div>
        </motion.div>

        <motion.div className="about-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-title">
            <span>01.</span>
            <h2>{about.title}</h2>
          </div>
          <p className="about-intro">{about.intro}</p>
          <div className="about-facts">
            {quickFacts.map((fact) => (
              <span key={fact.label} className="about-fact"><fact.icon /> {fact.label}</span>
            ))}
          </div>
          <p className="about-text">{about.text}</p>
          <div className="about-approach" aria-label="How I work">
            {approachCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="about-approach-card" key={item.title}>
                  <span className="about-approach-number">0{index + 1}</span>
                  <span className="about-approach-icon"><Icon /></span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </article>
              );
            })}
          </div>
          <div className="about-stats">
            {(about.stats || []).map((item, index) => {
              const Icon = statIcons[index % statIcons.length];
              return (
                <div key={item.label} className="about-stat glass-card">
                  <span className="about-stat-icon"><Icon /></span>
                  <AnimatedStat value={item.value} />
                  <p>{item.label}</p>
                </div>
              );
            })}
          </div>
          <div className="about-actions">
            <a
              href="/image/Professional IT CV Laxman Dhakal.jpg"
              download="Professional IT CV Laxman Dhakal.jpg"
              className="button primary about-cv"
            >
              Download CV
            </a>
            <a href="/#contact" className="about-talk-link">Let's talk <FaArrowRight /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import './About.css';

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
          <div className="about-photo glass-card">
            <img src={about.image} alt="Portrait of Laxman Dhakal" />
          </div>
        </motion.div>

        <motion.div className="about-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-title">
            <span>01.</span>
            <h2>{about.title}</h2>
          </div>
          <p className="about-intro">{about.intro}</p>
          <p className="about-text">{about.text}</p>
          <div className="about-stats">
            {(about.stats || []).map((item) => (
              <div key={item.label} className="about-stat glass-card">
                <AnimatedStat value={item.value} />
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          <a
            href="/image/Professional IT CV Laxman Dhakal.jpg"
            download="Professional IT CV Laxman Dhakal.jpg"
            className="button primary about-cv"
          >
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

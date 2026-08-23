import { motion } from 'framer-motion';
import { fadeUp, fadeLeft } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import './About.css';

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
              <div key={item.label} className="about-stat">
                <span>{item.value}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          <a download href="#" className="button primary about-cv">Download CV</a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

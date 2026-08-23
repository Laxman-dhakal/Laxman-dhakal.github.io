import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../motion/variants';
import experience from '../../data/experience';
import './Experience.css';

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <div className="section-title">
          <span>04.</span>
          <h2>Experience</h2>
        </div>
        <motion.div className="timeline" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {experience.map((item, index) => (
            <motion.article key={item.id} className="timeline-item" variants={fadeUp}>
              <div className="timeline-marker" />
              <div className="timeline-card glass-card">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.role}</h3>
                <p className="timeline-company">{item.company}</p>
                <p>{item.description}</p>
                <div className="timeline-tech">
                  {item.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

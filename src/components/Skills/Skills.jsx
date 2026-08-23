import { motion } from 'framer-motion';
import { fadeUp, fadeLeft } from '../../motion/variants';
import skills from '../../data/skills';
import './Skills.css';

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="section-title">
          <span>02.</span>
          <h2>Skills</h2>
        </div>
        <div className="skills-grid">
          {skills.map((group) => (
            <motion.article key={group.id} className="skill-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h3>{group.category}</h3>
              <div className="skill-list">
                {group.items.map((item) => (
                  <div key={item.name} className="skill-item">
                    <div className="skill-meta">
                      <span>{item.name}</span>
                      <strong>{item.level}%</strong>
                    </div>
                    <div className="skill-bar">
                      <motion.div className="skill-fill" initial={{ width: 0 }} whileInView={{ width: `${item.level}%` }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, ease: 'easeOut' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

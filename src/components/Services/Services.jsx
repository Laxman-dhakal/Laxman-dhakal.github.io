import { motion } from 'framer-motion';
import {
  FaCode, FaReact, FaPalette, FaMobileAlt, FaShieldAlt, FaLightbulb,
  FaRocket, FaArrowRight, FaStar, FaCheckCircle
} from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import './Services.css';

const iconMap = {
  FaCode, FaReact, FaPalette, FaMobileAlt, FaShieldAlt, FaLightbulb
};

const accentColors = [
  { from: '#6366f1', to: '#8b5cf6', glow: 'rgba(99,102,241,0.25)' },
  { from: '#06b6d4', to: '#0891b2', glow: 'rgba(6,182,212,0.25)' },
  { from: '#10b981', to: '#059669', glow: 'rgba(16,185,129,0.25)' },
  { from: '#f59e0b', to: '#d97706', glow: 'rgba(245,158,11,0.25)' },
  { from: '#ec4899', to: '#db2777', glow: 'rgba(236,72,153,0.25)' },
  { from: '#8b5cf6', to: '#7c3aed', glow: 'rgba(139,92,246,0.25)' },
];

const highlights = ['Performance-first builds', 'Clean semantic code', '24h response time', 'Full-stack capable'];

const Services = () => {
  const { servicesCatalog } = getSiteContent();

  return (
    <section className="services-section" id="services">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="services-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="small-badge">
            <FaStar /> What I Do
          </span>
          <h2 className="services-title">
            Crafting digital products<br />
            <span className="services-title-accent">that stand out.</span>
          </h2>
          <p className="services-subtitle">
            From pixel-perfect interfaces to robust full-stack applications — I deliver work that converts, performs, and lasts.
          </p>
          <div className="services-highlights">
            {highlights.map((h) => (
              <span key={h} className="services-highlight-pill">
                <FaCheckCircle /> {h}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="services-bento"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {(servicesCatalog || []).map((item, index) => {
            const Icon = iconMap[item.icon] || FaCode;
            const color = accentColors[index % accentColors.length];
            const isFeatured = index === 0 || index === 3;
            return (
              <motion.article
                key={item.id || index}
                className={`service-bento-card ${isFeatured ? 'featured' : ''}`}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--glow-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                  e.currentTarget.style.setProperty('--glow-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
                }}
                style={{
                  '--card-from': color.from,
                  '--card-to': color.to,
                  '--card-glow': color.glow,
                }}
              >
                <div className="service-card-glow" />
                <div className="service-icon-wrap">
                  <Icon />
                </div>
                <div className="service-number-badge">0{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button type="button" className="service-cta-link" aria-label={`Learn more about ${item.title}`}>
                  Explore service <FaArrowRight />
                </button>
              </motion.article>
            );
          })}

          {/* CTA Card */}
          <motion.div
            className="service-bento-cta"
            variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } }}
            whileHover={{ y: -4 }}
          >
            <FaRocket className="cta-rocket" />
            <strong>Ready to build something great?</strong>
            <p>Let's turn your idea into a polished product.</p>
            <a href="#contact" className="button primary">
              Start a project <FaArrowRight />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

import { motion } from 'framer-motion';
import { FaCode, FaReact, FaPalette, FaMobileAlt, FaShieldAlt, FaLightbulb } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import './Services.css';

const iconMap = {
  FaCode: FaCode,
  FaReact: FaReact,
  FaPalette: FaPalette,
  FaMobileAlt: FaMobileAlt,
  FaShieldAlt: FaShieldAlt,
  FaLightbulb: FaLightbulb
};

const Services = () => {
  const { servicesCatalog, services } = getSiteContent();

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-title">
          <span>03.</span>
          <h2>{services.title || 'Services'}</h2>
        </div>
        <motion.div className="services-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {(servicesCatalog || []).map((item, index) => {
            const Icon = iconMap[item.icon] || FaCode;
            return (
              <motion.article key={item.id || index} className="service-card" whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <div className="service-number">0{item.id || index + 1}</div>
                <div className="service-icon"><Icon /></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button type="button" className="service-cta" aria-label={`Learn more about ${item.title}`}>
                  Discover
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

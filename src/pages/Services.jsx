import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import services from '../data/services';
import { fadeUp, staggerContainer } from '../motion/variants';

const Services = () => (
  <main className="page-content">
    <section className="page-hero services-hero">
      <div className="container">
        <SectionHeading title="Services" subtitle="Professional digital solutions designed to solve real-world problems." />
      </div>
    </section>
    <section className="container services-page-grid">
      <motion.div className="services-page-list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {services.map((service) => (
          <motion.article key={service.id} className="service-page-card" whileHover={{ y: -8 }}>
            <div className="service-page-number">0{service.id}</div>
            <div className="service-page-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-page-footer">
              <a href="#contact" className="button secondary">Contact Me</a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  </main>
);

export default Services;

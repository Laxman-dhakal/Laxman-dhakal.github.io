import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import { fadeUp } from '../motion/variants';
import { getSiteContent } from '../services/siteContentService';

const About = () => {
  const { about, pageCopy } = getSiteContent();

  return (
    <main className="page-content">
      <section className="page-hero about-hero">
        <div className="container">
          <SectionHeading title={pageCopy.about.title} subtitle={pageCopy.about.subtitle} />
        </div>
      </section>
      <section className="container about-page-grid">
        <motion.div className="about-page-profile" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="about-page-photo glass-card">
            <img src={about.image} alt="About illustration" />
          </div>
        </motion.div>
        <motion.div className="about-page-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <p className="section-intro">{about.intro}</p>
          <p>{about.text}</p>
        </motion.div>
      </section>
    </main>
  );
};

export default About;

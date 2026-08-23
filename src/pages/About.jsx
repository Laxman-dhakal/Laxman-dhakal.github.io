import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import { fadeUp } from '../motion/variants';

const About = () => (
  <main className="page-content">
    <section className="page-hero about-hero">
      <div className="container">
        <SectionHeading title="About Me" subtitle="Get to know me, my experience, skills and journey." />
      </div>
    </section>
    <section className="container about-page-grid">
      <motion.div className="about-page-profile" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="about-page-photo glass-card">
          <img src={new URL('../assets/images/about.svg', import.meta.url).href} alt="About illustration" />
        </div>
      </motion.div>
      <motion.div className="about-page-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <p className="section-intro">I create premium digital products and websites built for growth, clarity and strong user experiences.</p>
        <p>My experience spans modern React development, thoughtful design systems, responsive interfaces and polished front-end architecture. I work with startups, agencies and professionals to deliver websites that feel refined and perform reliably.</p>
      </motion.div>
    </section>
  </main>
);

export default About;

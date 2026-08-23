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
        <p className="section-intro">I am an IT professional and web developer with a background in computer science, software development and practical technical coordination.</p>
        <p>My experience includes IT software development, technical support, responsive web interfaces, project coordination and problem solving. I am currently pursuing a Bachelor of Computer Science and Information Technology at Quantum University, building on my Diploma in Computer Science and Engineering.</p>
      </motion.div>
    </section>
  </main>
);

export default About;

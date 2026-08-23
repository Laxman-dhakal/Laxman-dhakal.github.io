import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import faq from '../data/faq';
import { fadeUp } from '../motion/variants';

const categories = ['All', 'General', 'Services', 'Projects', 'Technology', 'Pricing', 'Support'];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(1);

  const filtered = activeCategory === 'All' ? faq : faq.filter((item) => item.category === activeCategory);

  return (
    <main className="page-content">
      <section className="page-hero faq-hero">
        <div className="container">
          <SectionHeading title="FAQ" subtitle="Answers to common questions about services, projects and collaboration." />
        </div>
      </section>
      <section className="container faq-page-grid">
        <div className="faq-page-filters">
          {categories.map((category) => (
            <button key={category} type="button" className={category === activeCategory ? 'active' : ''} onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </div>
        <motion.div className="faq-page-list" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {filtered.map((item) => (
            <div key={item.id} className="faq-page-item">
              <button type="button" className="faq-page-question" onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))} aria-expanded={openId === item.id}>
                {item.question}
              </button>
              {openId === item.id && <p className="faq-page-answer">{item.answer}</p>}
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default FAQ;

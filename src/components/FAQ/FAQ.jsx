import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { getSiteContent } from '../../services/siteContentService';
import './FAQ.css';

const FAQ = () => {
  const [openId, setOpenId] = useState(1);
  const questions = getSiteContent().faqList || [];

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-title">
          <span>07.</span>
          <h2>FAQ</h2>
        </div>
        <div className="faq-list">
          {questions.map((item) => (
            <div key={item.id} className="faq-item">
              <button type="button" className="faq-question" onClick={() => toggle(item.id)} aria-expanded={openId === item.id}>
                <span>{item.question}</span>
                {openId === item.id ? <FaMinus /> : <FaPlus />}
              </button>
              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

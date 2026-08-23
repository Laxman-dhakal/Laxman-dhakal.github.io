import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { getSiteContent } from '../../services/siteContentService';
import './Testimonials.css';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const testimonials = getSiteContent().testimonialsList || [];

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) return null;

  const handlePrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-title">
          <span>06.</span>
          <h2>Testimonials</h2>
        </div>
        <div className="testimonial-shell glass-card">
          <motion.div key={testimonials[current].id} className="testimonial-card" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
            <div className="testimonial-user">
              <img src={testimonials[current].image} alt={testimonials[current].name} />
              <div>
                <h3>{testimonials[current].name}</h3>
                <p>{testimonials[current].role} · {testimonials[current].company}</p>
              </div>
            </div>
            <div className="testimonial-rating">
              {Array.from({ length: testimonials[current].rating }).map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <p className="testimonial-text">“{testimonials[current].quote}”</p>
          </motion.div>
          <div className="testimonial-controls">
            <button type="button" onClick={handlePrev} aria-label="Previous testimonial"><FaChevronLeft /></button>
            <div className="testimonial-dots">
              {testimonials.map((item, index) => (
                <button key={item.id} type="button" className={index === current ? 'active' : ''} onClick={() => setCurrent(index)} aria-label={`Show testimonial ${index + 1}`} />
              ))}
            </div>
            <button type="button" onClick={handleNext} aria-label="Next testimonial"><FaChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

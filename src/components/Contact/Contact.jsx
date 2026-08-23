import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { contact } = getSiteContent();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email is required.';
    if (!form.subject.trim()) next.subject = 'Subject is required.';
    if (!form.message.trim() || form.message.trim().length < 20) next.message = 'Message must be at least 20 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3200);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid">
        <motion.div className="contact-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-title">
            <span>08.</span>
            <h2>{contact.title}</h2>
          </div>
          <p className="contact-description">{contact.description}</p>
          <div className="contact-info">
            <div>
              <h3>Email</h3>
              <p>{contact.email}</p>
            </div>
            <div>
              <h3>Phone</h3>
              <p>{contact.phone}</p>
            </div>
            <div>
              <h3>Location</h3>
              <p>{contact.location}</p>
            </div>
          </div>
        </motion.div>
        <motion.form className="contact-form glass-card" onSubmit={handleSubmit} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {submitted && <div className="contact-success">Message sent successfully!</div>}
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
            {errors.name && <span>{errors.name}</span>}
          </label>
          <label>
            Email
            <input name="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
            {errors.email && <span>{errors.email}</span>}
          </label>
          <label>
            Subject
            <input name="subject" value={form.subject} onChange={handleChange} aria-invalid={!!errors.subject} />
            {errors.subject && <span>{errors.subject}</span>}
          </label>
          <label>
            Message
            <textarea name="message" rows="6" value={form.message} onChange={handleChange} aria-invalid={!!errors.message} />
            {errors.message && <span>{errors.message}</span>}
          </label>
          <button type="submit" className="button primary">Send Message</button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;

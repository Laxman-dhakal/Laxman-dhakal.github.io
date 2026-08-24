import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import { fadeUp } from '../motion/variants';
import { sendContactMessage } from '../services/contactService';
import { trackMessage } from '../services/analyticsService';
import { getSiteContent } from '../services/siteContentService';

const Contact = () => {
  const { contact, pageCopy } = getSiteContent();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await sendContactMessage(form);
      trackMessage();
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 3200);
    } catch {
      setSubmitError('Something went wrong. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-content">
      <section className="page-hero contact-hero">
        <div className="container">
          <SectionHeading title={pageCopy.contact?.title || contact.title} subtitle={pageCopy.contact?.subtitle || 'Reach out to discuss your next project, collaboration or idea.'} />
        </div>
      </section>
      <section className="container contact-page-grid">
        <motion.div className="contact-details" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="contact-card">
            <h3>Contact Information</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Location: {contact.location}</p>
            <p>{contact.description}</p>
          </div>
        </motion.div>
        <motion.div className="contact-form-page" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <AnimatePresence>
            {success && <div className="contact-page-success">Message sent successfully!</div>}
          </AnimatePresence>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
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
            </div>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} />
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
            {submitError && <p role="alert" className="contact-page-error">{submitError}</p>}
            <button type="submit" className="button primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
};

export default Contact;

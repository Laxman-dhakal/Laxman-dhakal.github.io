import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../motion/variants';
import { getSiteContent } from '../../services/siteContentService';
import { sendContactMessage } from '../../services/contactService';
import { trackMessage } from '../../services/analyticsService';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const { contact } = getSiteContent();

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
    try {
      await sendContactMessage(form);
      trackMessage();
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3200);
    } catch {
      setSubmitError('Unable to send right now. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
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
              <button type="button" className="contact-email" onClick={handleCopyEmail} aria-label="Copy email address">
                {copied ? 'Email copied' : contact.email}
              </button>
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
        <motion.div className="contact-side" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="contact-cta glass-card">
            <span className="cta-label">Ready to launch?</span>
            <h3>Let’s craft a website that feels premium, performs fast, and converts visitors into clients.</h3>
            <div className="cta-meta">
              <span><i /> Reply within 24 hours</span>
              <span><i /> Free discovery call</span>
            </div>
            <a href={`mailto:${contact.email}`} className="button primary">Book a Call</a>
          </div>
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
              {submitError && <div className="contact-submit-error" role="alert">{submitError}</div>}
              <button type="submit" className="button primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

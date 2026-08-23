import { useState } from 'react';
import './DashboardPages.css';
import { getSiteContent, saveSiteContent } from '../../services/siteContentService';

const defaultForm = { question: '', answer: '', category: 'General' };

const FAQ = () => {
  const initialContent = getSiteContent();
  const [faqs, setFaqs] = useState(initialContent.faqList || []);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const persistFaqs = (nextFaqs) => {
    setFaqs(nextFaqs);
    saveSiteContent({ ...getSiteContent(), faqList: nextFaqs });
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) return;

    if (editingId !== null) {
      const updatedFaqs = faqs.map((item) => item.id === editingId ? { ...item, category: form.category, question: form.question.trim(), answer: form.answer.trim() } : item);
      persistFaqs(updatedFaqs);
    } else {
      const nextFaqs = [{ id: Date.now(), category: form.category, question: form.question.trim(), answer: form.answer.trim() }, ...faqs];
      persistFaqs(nextFaqs);
    }

    resetForm();
    setShowForm(false);
  };

  const handleDelete = (faqId) => {
    const nextFaqs = faqs.filter((item) => item.id !== faqId);
    persistFaqs(nextFaqs);
    if (editingId === faqId) resetForm();
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">FAQ</span>
          <h2>Manage frequently asked questions</h2>
          <p>Update help content to keep your portfolio and support flow clear.</p>
        </div>
        <button type="button" className="button primary hero-button" onClick={() => {
          if (showForm) resetForm();
          setShowForm((prev) => !prev);
        }}>
          {showForm ? 'Close form' : 'Add FAQ'}
        </button>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Knowledge base</span>
          <h3>FAQ entries</h3>
        </div>

        {showForm && (
          <form className="dashboard-form" onSubmit={handleSubmit}>
            <div className="dashboard-form-grid">
              <label>
                Category
                <select value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}>
                  <option value="General">General</option>
                  <option value="Projects">Projects</option>
                  <option value="Services">Services</option>
                  <option value="Technology">Technology</option>
                </select>
              </label>
              <label className="full-width">
                Question
                <input value={form.question} onChange={(event) => setForm((prev) => ({ ...prev, question: event.target.value }))} placeholder="Add a question" />
              </label>
              <label className="full-width">
                Answer
                <textarea value={form.answer} onChange={(event) => setForm((prev) => ({ ...prev, answer: event.target.value }))} rows={4} placeholder="Add the answer" />
              </label>
            </div>
            <button type="submit" className="button primary">{editingId !== null ? 'Update FAQ' : 'Save FAQ'}</button>
          </form>
        )}

        <div className="dashboard-grid faq-grid">
          {faqs.map((item) => (
            <div key={`${item.question}-${item.answer}-${item.id}`} className="info-card service-card faq-card">
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
              <div className="table-actions compact-actions">
                <button type="button" className="table-action" onClick={() => {
                  setShowForm(true);
                  setEditingId(item.id);
                  setForm({ question: item.question || '', answer: item.answer || '', category: item.category || 'General' });
                }}>Edit</button>
                <button type="button" className="table-action danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;

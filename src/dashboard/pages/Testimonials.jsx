import { useState } from 'react';
import './DashboardPages.css';
import { getSiteContent, saveSiteContent } from '../../services/siteContentService';

const defaultForm = { name: '', role: '', company: '', quote: '', rating: 5, image: '' };

const Testimonials = () => {
  const initialContent = getSiteContent();
  const [testimonials, setTestimonials] = useState(initialContent.testimonialsList || []);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const persistTestimonials = (nextTestimonials) => {
    setTestimonials(nextTestimonials);
    saveSiteContent({ ...getSiteContent(), testimonialsList: nextTestimonials });
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.company.trim()) return;

    const testimonialPayload = {
      name: form.name.trim(),
      role: form.role.trim() || 'Client',
      company: form.company.trim(),
      quote: form.quote.trim() || 'Great experience working together.',
      rating: Number(form.rating) || 5,
      image: form.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    };

    if (editingId !== null) {
      const updatedTestimonials = testimonials.map((item) => item.id === editingId ? { ...item, ...testimonialPayload, id: editingId } : item);
      persistTestimonials(updatedTestimonials);
    } else {
      const nextTestimonials = [{ id: Date.now(), ...testimonialPayload }, ...testimonials];
      persistTestimonials(nextTestimonials);
    }

    resetForm();
    setShowForm(false);
  };

  const handleDelete = (testimonialId) => {
    const nextTestimonials = testimonials.filter((item) => item.id !== testimonialId);
    persistTestimonials(nextTestimonials);
    if (editingId === testimonialId) resetForm();
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Testimonials</span>
          <h2>Manage client feedback</h2>
          <p>Showcase quality work and control which reviews are live.</p>
        </div>
        <button type="button" className="button primary hero-button" onClick={() => {
          if (showForm) resetForm();
          setShowForm((prev) => !prev);
        }}>
          {showForm ? 'Close form' : 'Add review'}
        </button>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Reviews</span>
          <h3>Client feedback</h3>
        </div>

        {showForm && (
          <form className="dashboard-form" onSubmit={handleSubmit}>
            <div className="dashboard-form-grid">
              <label>
                Client Name
                <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Client name" />
              </label>
              <label>
                Role
                <input value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))} placeholder="Product Manager" />
              </label>
              <label>
                Company
                <input value={form.company} onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))} placeholder="Company" />
              </label>
              <label>
                Rating
                <select value={form.rating} onChange={(event) => setForm((prev) => ({ ...prev, rating: Number(event.target.value) }))}>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>{rating} / 5</option>
                  ))}
                </select>
              </label>
              <label className="full-width">
                Quote
                <textarea value={form.quote} onChange={(event) => setForm((prev) => ({ ...prev, quote: event.target.value }))} rows={4} placeholder="Client feedback" />
              </label>
              <label className="full-width">
                Image URL
                <input value={form.image} onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))} placeholder="https://example.com/client.jpg" />
              </label>
            </div>
            <button type="submit" className="button primary">{editingId !== null ? 'Update review' : 'Save review'}</button>
          </form>
        )}

        <div className="dashboard-grid testimonial-grid">
          {testimonials.map((item) => (
            <div key={`${item.name}-${item.company}-${item.id}`} className="info-card service-card testimonial-card">
              <div className="testimonial-topline">
                <h4>{item.name}</h4>
              </div>
              <p>{item.company}</p>
              <div className="rating-stars">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</div>
              <span className="info-meta">{item.role}</span>
              <div className="table-actions compact-actions">
                <button type="button" className="table-action" onClick={() => {
                  setShowForm(true);
                  setEditingId(item.id);
                  setForm({ name: item.name || '', role: item.role || '', company: item.company || '', quote: item.quote || '', rating: item.rating || 5, image: item.image || '' });
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

export default Testimonials;

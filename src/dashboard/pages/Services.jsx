import { useState } from 'react';
import './DashboardPages.css';
import { getSiteContent, saveSiteContent } from '../../services/siteContentService';

const defaultForm = { title: '', description: '', price: 'Starting at $500', icon: 'FaCode' };

const Services = () => {
  const initialContent = getSiteContent();
  const [services, setServices] = useState(initialContent.servicesCatalog || []);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const persistServices = (nextServices) => {
    setServices(nextServices);
    saveSiteContent({ ...getSiteContent(), servicesCatalog: nextServices });
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    if (editingId !== null) {
      const updatedServices = services.map((item) => item.id === editingId ? { ...item, title: form.title.trim(), description: form.description.trim(), price: form.price, icon: form.icon } : item);
      persistServices(updatedServices);
    } else {
      const nextServices = [{ id: Date.now(), title: form.title.trim(), description: form.description.trim(), icon: form.icon, price: form.price }, ...services];
      persistServices(nextServices);
    }

    resetForm();
    setShowForm(false);
  };

  const handleDelete = (serviceId) => {
    const nextServices = services.filter((item) => item.id !== serviceId);
    persistServices(nextServices);
    if (editingId === serviceId) resetForm();
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Services</span>
          <h2>Manage offered services</h2>
          <p>Adjust packages and keep your service mix aligned with client demand.</p>
        </div>
        <button type="button" className="button primary hero-button" onClick={() => {
          if (showForm) resetForm();
          setShowForm((prev) => !prev);
        }}>
          {showForm ? 'Close form' : 'Add Service'}
        </button>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Catalog</span>
          <h3>Current offerings</h3>
        </div>

        {showForm && (
          <form className="dashboard-form" onSubmit={handleSubmit}>
            <div className="dashboard-form-grid">
              <label>
                Service Title
                <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Service title" />
              </label>
              <label>
                Icon
                <select value={form.icon} onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))}>
                  <option value="FaCode">Code</option>
                  <option value="FaReact">React</option>
                  <option value="FaPalette">Design</option>
                  <option value="FaMobileAlt">Mobile</option>
                  <option value="FaShieldAlt">Security</option>
                  <option value="FaLightbulb">Consultation</option>
                </select>
              </label>
              <label>
                Pricing
                <input value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} placeholder="Starting at $500" />
              </label>
              <label className="full-width">
                Description
                <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Describe this service" rows={4} />
              </label>
            </div>
            <button type="submit" className="button primary">{editingId !== null ? 'Update service' : 'Save service'}</button>
          </form>
        )}

        <div className="dashboard-grid service-grid">
          {services.map((service) => (
            <div key={`${service.title}-${service.id || service.price}`} className="info-card service-card">
              <div className="service-tag">Featured</div>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              <span className="info-meta">{service.price || 'Starting at $500'}</span>
              <div className="table-actions compact-actions">
                <button type="button" className="table-action" onClick={() => {
                  setShowForm(true);
                  setEditingId(service.id);
                  setForm({ title: service.title || '', description: service.description || '', price: service.price || 'Starting at $500', icon: service.icon || 'FaCode' });
                }}>Edit</button>
                <button type="button" className="table-action danger" onClick={() => handleDelete(service.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;

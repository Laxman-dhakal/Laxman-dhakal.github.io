import { useState } from 'react';
import './DashboardPages.css';
import { getSiteContent, saveSiteContent } from '../../services/siteContentService';

const MediaLibrary = () => {
  const [content, setContent] = useState(getSiteContent());
  const [form, setForm] = useState({ title: '', type: 'image', url: '', category: 'home' });
  const [saved, setSaved] = useState(false);

  const handleAddMedia = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;

    const newItem = {
      id: Date.now(),
      title: form.title.trim(),
      type: form.type,
      url: form.url.trim(),
      category: form.category,
      active: true
    };

    setContent((prev) => ({
      ...prev,
      media: [newItem, ...(prev.media || [])]
    }));

    setForm({ title: '', type: 'image', url: '', category: 'home' });
  };

  const handleSave = () => {
    saveSiteContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Media Library</span>
          <h2>Upload and manage images and videos</h2>
          <p>Keep website assets centralized and easy to reuse across pages and sections.</p>
        </div>
        <button type="button" className="button primary hero-button" onClick={handleSave}>Save media</button>
      </section>

      <section className="dashboard-section">
        <form className="dashboard-form" onSubmit={handleAddMedia}>
          <div className="dashboard-form-grid">
            <label>
              Title
              <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Hero banner" />
            </label>
            <label>
              Type
              <select value={form.type} onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </label>
            <label>
              Category
              <select value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}>
                <option value="home">Home</option>
                <option value="about">About</option>
                <option value="portfolio">Portfolio</option>
                <option value="promo">Promo</option>
              </select>
            </label>
            <label className="full-width">
              URL
              <input value={form.url} onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))} placeholder="https://example.com/image.jpg" />
            </label>
          </div>
          <button type="submit" className="button primary">Add media item</button>
          {saved && <p className="form-status">Media library updated.</p>}
        </form>

        <div className="dashboard-grid service-grid">
          {(content.media || []).map((item) => (
            <div key={item.id} className="info-card service-card">
              {item.type === 'image' ? (
                <img src={item.url} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '18px', marginBottom: '16px' }} />
              ) : (
                <video src={item.url} controls style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '18px', marginBottom: '16px', background: '#0f172a' }} />
              )}
              <span className="service-tag">{item.type}</span>
              <h4>{item.title}</h4>
              <p>{item.category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MediaLibrary;

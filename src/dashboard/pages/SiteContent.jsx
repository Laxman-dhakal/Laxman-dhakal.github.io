import { useState } from 'react';
import './DashboardPages.css';
import { getSiteContent, saveSiteContent } from '../../services/siteContentService';

const SiteContent = () => {
  const [content, setContent] = useState(getSiteContent());
  const [saved, setSaved] = useState(false);

  const updateSection = (section, key, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [key]: value
      }
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveSiteContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const pageFields = [
    ['about', 'About page'],
    ['servicesPage', 'Services page'],
    ['portfolioPage', 'Portfolio page'],
    ['faqPage', 'FAQ page'],
    ['onlineClassPage', 'Online Class page'],
    ['privacyPage', 'Privacy page'],
    ['termsPage', 'Terms page']
  ];

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Content Studio</span>
          <h2>Manage page content and messaging</h2>
          <p>Control the public website copy, section headings, and media references from this dashboard.</p>
        </div>
        <button type="button" className="button primary hero-button" onClick={handleSave}>Save content</button>
      </section>

      <section className="dashboard-section">
        <form className="dashboard-form" onSubmit={handleSave}>
          {saved && <p className="form-status">Content saved successfully.</p>}

          <div className="dashboard-form-grid">
            <label className="full-width">
              Hero Title
              <input value={content.hero.title} onChange={(event) => updateSection('hero', 'title', event.target.value)} />
            </label>
            <label className="full-width">
              Hero Subtitle
              <input value={content.hero.subtitle} onChange={(event) => updateSection('hero', 'subtitle', event.target.value)} />
            </label>
            <label className="full-width">
              Hero Roles (one per line or comma separated)
              <textarea
                rows={3}
                value={(content.hero.roles || []).join(', ')}
                onChange={(event) => {
                  const roles = event.target.value
                    .split(/[\n,]+/)
                    .map((item) => item.trim())
                    .filter(Boolean);
                  updateSection('hero', 'roles', roles.length ? roles : [event.target.value.trim() || content.hero.subtitle]);
                }}
              />
            </label>
            <label className="full-width">
              Hero Description
              <textarea rows={3} value={content.hero.description} onChange={(event) => updateSection('hero', 'description', event.target.value)} />
            </label>
            <label>
              Hero Image URL
              <input value={content.hero.image} onChange={(event) => updateSection('hero', 'image', event.target.value)} />
            </label>
            <label>
              Primary CTA
              <input value={content.hero.primaryCta} onChange={(event) => updateSection('hero', 'primaryCta', event.target.value)} />
            </label>
          </div>

          <div className="dashboard-form-grid">
            <div className="full-width content-group-heading">Dedicated page copy</div>
            {pageFields.map(([key, label]) => (
              <div className="content-page-fields full-width" key={key}>
                <strong>{label}</strong>
                <label>
                  Page title
                  <input value={content.pageCopy?.[key]?.title || ''} onChange={(event) => updateSection('pageCopy', key, { ...(content.pageCopy?.[key] || {}), title: event.target.value })} />
                </label>
                <label>
                  Page subtitle
                  <textarea rows={2} value={content.pageCopy?.[key]?.subtitle || ''} onChange={(event) => updateSection('pageCopy', key, { ...(content.pageCopy?.[key] || {}), subtitle: event.target.value })} />
                </label>
              </div>
            ))}
          </div>

          <div className="dashboard-form-grid">
            <label className="full-width">
              About Title
              <input value={content.about.title} onChange={(event) => updateSection('about', 'title', event.target.value)} />
            </label>
            <label className="full-width">
              About Intro
              <textarea rows={3} value={content.about.intro} onChange={(event) => updateSection('about', 'intro', event.target.value)} />
            </label>
            <label className="full-width">
              About Text
              <textarea rows={4} value={content.about.text} onChange={(event) => updateSection('about', 'text', event.target.value)} />
            </label>
            <label>
              About Image URL
              <input value={content.about.image} onChange={(event) => updateSection('about', 'image', event.target.value)} />
            </label>
          </div>

          <div className="dashboard-form-grid">
            <label className="full-width">
              Services Section Title
              <input value={content.services.title} onChange={(event) => updateSection('services', 'title', event.target.value)} />
            </label>
            <label className="full-width">
              Services Subtitle
              <textarea rows={2} value={content.services.subtitle} onChange={(event) => updateSection('services', 'subtitle', event.target.value)} />
            </label>
            <label className="full-width">
              Portfolio Title
              <input value={content.portfolio.title} onChange={(event) => updateSection('portfolio', 'title', event.target.value)} />
            </label>
            <label className="full-width">
              Portfolio Subtitle
              <textarea rows={2} value={content.portfolio.subtitle} onChange={(event) => updateSection('portfolio', 'subtitle', event.target.value)} />
            </label>
          </div>

          <div className="dashboard-form-grid">
            <label className="full-width">
              Contact Title
              <input value={content.contact.title} onChange={(event) => updateSection('contact', 'title', event.target.value)} />
            </label>
            <label>
              Email
              <input value={content.contact.email} onChange={(event) => updateSection('contact', 'email', event.target.value)} />
            </label>
            <label>
              Phone
              <input value={content.contact.phone} onChange={(event) => updateSection('contact', 'phone', event.target.value)} />
            </label>
            <label className="full-width">
              Description
              <textarea rows={3} value={content.contact.description} onChange={(event) => updateSection('contact', 'description', event.target.value)} />
            </label>
            <label className="full-width">
              Location
              <input value={content.contact.location} onChange={(event) => updateSection('contact', 'location', event.target.value)} />
            </label>
          </div>

          <button type="submit" className="button primary">Update website content</button>
        </form>
      </section>
    </div>
  );
};

export default SiteContent;

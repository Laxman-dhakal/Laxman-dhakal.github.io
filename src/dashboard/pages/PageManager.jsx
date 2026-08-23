import { useState } from 'react';
import './DashboardPages.css';
import { getSiteContent, saveSiteContent } from '../../services/siteContentService';

const PageManager = () => {
  const [content, setContent] = useState(getSiteContent());
  const [saved, setSaved] = useState(false);

  const handleToggle = (pageKey) => {
    setContent((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageKey]: {
          ...(prev.pages?.[pageKey] || {}),
          published: !(prev.pages?.[pageKey]?.published ?? true)
        }
      }
    }));
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
          <span className="small-badge">Page Manager</span>
          <h2>Control which pages are live</h2>
          <p>Enable or disable sections across your site from a single dashboard view.</p>
        </div>
        <button type="button" className="button primary hero-button" onClick={handleSave}>Save pages</button>
      </section>

      <section className="dashboard-section">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(content.pages || {}).map(([key, page]) => (
                <tr key={key}>
                  <td>{page.title}</td>
                  <td>{page.slug}</td>
                  <td><span className={`status-badge ${page.published ? 'status-published' : 'status-draft'}`}>{page.published ? 'Published' : 'Draft'}</span></td>
                  <td>
                    <button type="button" className="button secondary" onClick={() => handleToggle(key)}>
                      {page.published ? 'Hide page' : 'Publish page'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {saved && <p className="form-status" style={{ marginTop: '16px' }}>Page settings saved.</p>}
      </section>
    </div>
  );
};

export default PageManager;

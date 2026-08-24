import { useState } from 'react';
import { FaBullhorn, FaCheckCircle, FaGlobe, FaTools } from 'react-icons/fa';
import './DashboardPages.css';
import { getSiteContent, saveSiteContent } from '../../services/siteContentService';

const Settings = () => {
  const [content, setContent] = useState(getSiteContent());
  const [saved, setSaved] = useState(false);
  const settings = content.siteSettings || {};
  const update = (key, value) => setContent((current) => ({ ...current, siteSettings: { ...current.siteSettings, [key]: value } }));
  const save = (event) => {
    event?.preventDefault();
    saveSiteContent(content);
    window.dispatchEvent(new Event('site-content-updated'));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return <div className="dashboard-page">
    <section className="dashboard-hero dashboard-hero-compact"><div><span className="small-badge">Site Control Center</span><h2>Control your public website</h2><p>Manage public messaging and visitor access from one place.</p></div><button type="button" className="button primary hero-button" onClick={save}>Save live settings</button></section>
    <section className="dashboard-section"><form className="dashboard-form" onSubmit={save}>
      {saved && <p className="form-status"><FaCheckCircle /> Settings saved. Refresh the public page to see the update.</p>}
      <div className="dashboard-grid settings-grid">
        <article className="info-card service-card setting-card purple"><span className="setting-icon"><FaGlobe /></span><h4>Website identity</h4><p>Set the name used in public notices and future branding areas.</p><label>Site name<input value={settings.siteName || ''} onChange={(event) => update('siteName', event.target.value)} /></label></article>
        <article className="info-card service-card setting-card blue"><span className="setting-icon"><FaBullhorn /></span><h4>Public announcement</h4><p>Show an availability or launch notice at the top of the public website.</p><label className="settings-toggle"><input type="checkbox" checked={Boolean(settings.announcementEnabled)} onChange={(event) => update('announcementEnabled', event.target.checked)} /><span>Enable announcement</span></label><label>Announcement text<textarea rows={3} value={settings.announcementText || ''} onChange={(event) => update('announcementText', event.target.value)} /></label></article>
        <article className="info-card service-card setting-card amber"><span className="setting-icon"><FaTools /></span><h4>Maintenance mode</h4><p>Temporarily show a maintenance screen while you update the website.</p><label className="settings-toggle"><input type="checkbox" checked={Boolean(settings.maintenanceMode)} onChange={(event) => update('maintenanceMode', event.target.checked)} /><span>Enable maintenance mode</span></label>{settings.maintenanceMode && <p className="settings-warning">Public visitors will see the maintenance screen after saving.</p>}</article>
      </div><button type="submit" className="button primary">Publish changes</button>
    </form></section>
  </div>;
};

export default Settings;

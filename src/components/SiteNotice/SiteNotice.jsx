import { useEffect, useState } from 'react';
import { FaArrowRight, FaTools } from 'react-icons/fa';
import { getSiteContent } from '../../services/siteContentService';
import './SiteNotice.css';

const SiteNotice = () => {
  const [settings, setSettings] = useState(() => getSiteContent().siteSettings || {});
  useEffect(() => {
    const refresh = () => setSettings(getSiteContent().siteSettings || {});
    window.addEventListener('site-content-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener('site-content-updated', refresh); window.removeEventListener('storage', refresh); };
  }, []);
  if (settings.maintenanceMode) return <main className="maintenance-screen"><div><span><FaTools /> MAINTENANCE MODE</span><h1>Making something better.</h1><p>{settings.siteName || 'This website'} is receiving a quick upgrade. Please check back soon.</p><a href="mailto:laxmandhakal000@gmail.com">Contact directly <FaArrowRight /></a></div></main>;
  if (!settings.announcementEnabled || !settings.announcementText) return null;
  return <div className="site-notice"><span className="site-notice-dot" /> <span>{settings.announcementText}</span><a href="#contact">Get in touch <FaArrowRight /></a></div>;
};

export default SiteNotice;

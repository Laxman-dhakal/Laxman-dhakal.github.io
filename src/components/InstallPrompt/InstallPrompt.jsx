import { useEffect, useState } from 'react';
import './InstallPrompt.css';

const InstallPrompt = () => {
  const [installEvent, setInstallEvent] = useState(null);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem('laxman-install-dismissed') === 'true');

  useEffect(() => {
    const handleInstallAvailable = (event) => {
      event.preventDefault();
      setInstallEvent(event);
    };
    window.addEventListener('beforeinstallprompt', handleInstallAvailable);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallAvailable);
  }, []);

  if (!installEvent || dismissed) return null;

  const install = async () => {
    await installEvent.prompt();
    setInstallEvent(null);
  };

  const dismiss = () => {
    localStorage.setItem('laxman-install-dismissed', 'true');
    setDismissed(true);
  };

  return (
    <aside className="install-prompt" aria-label="Install portfolio app">
      <div>
        <strong>Keep this portfolio close</strong>
        <p>Install it for a faster, app-like experience.</p>
      </div>
      <div className="install-actions">
        <button type="button" className="button primary" onClick={install}>Install</button>
        <button type="button" className="install-dismiss" onClick={dismiss} aria-label="Dismiss install prompt">Later</button>
      </div>
    </aside>
  );
};

export default InstallPrompt;

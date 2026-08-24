import { useEffect } from 'react';
import './CursorSpotlight.css';

const CursorSpotlight = () => {
  useEffect(() => {
    const moveSpotlight = (event) => {
      document.documentElement.style.setProperty('--spotlight-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--spotlight-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', moveSpotlight, { passive: true });
    return () => window.removeEventListener('pointermove', moveSpotlight);
  }, []);
  return <span className="cursor-spotlight" aria-hidden="true" />;
};

export default CursorSpotlight;

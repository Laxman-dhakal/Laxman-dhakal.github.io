import { useEffect, useRef, useState } from 'react';
import './CursorSpotlight.css';

const CursorSpotlight = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const trailRef = useRef(null);
  const [hoverType, setHoverType] = useState('default');

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const trail = trailRef.current;
    if (!outer || !inner || !trail) return;

    let mouseX = -200;
    let mouseY = -200;
    let outerX = -200;
    let outerY = -200;
    let trailX = -200;
    let trailY = -200;

    const moveHandler = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant inner dot
      inner.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

      // Spotlight gradient
      document.documentElement.style.setProperty('--spotlight-x', `${mouseX}px`);
      document.documentElement.style.setProperty('--spotlight-y', `${mouseY}px`);
    };

    // Detect hover targets
    const overHandler = (e) => {
      const target = e.target.closest('a, button, [role="button"], .glass-card, img, .portfolio-3d-card');
      if (!target) {
        setHoverType('default');
        return;
      }
      if (target.matches('a, button, [role="button"]')) setHoverType('link');
      else if (target.matches('img')) setHoverType('image');
      else if (target.matches('.glass-card, .portfolio-3d-card')) setHoverType('card');
      else setHoverType('default');
    };

    const outHandler = () => setHoverType('default');

    // Spring physics loop for outer ring
    let frameId;
    const animate = () => {
      const springFactor = 0.12;
      outerX += (mouseX - outerX) * springFactor;
      outerY += (mouseY - outerY) * springFactor;
      outer.style.transform = `translate(${outerX - 20}px, ${outerY - 20}px)`;

      trailX += (mouseX - trailX) * 0.06;
      trailY += (mouseY - trailY) * 0.06;
      trail.style.transform = `translate(${trailX - 30}px, ${trailY - 30}px)`;

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', moveHandler, { passive: true });
    document.addEventListener('pointerover', overHandler, { passive: true });
    document.addEventListener('pointerout', outHandler, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', moveHandler);
      document.removeEventListener('pointerover', overHandler);
      document.removeEventListener('pointerout', outHandler);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <span className="cursor-spotlight" aria-hidden="true" />
      <span ref={trailRef} className="cursor-trail" aria-hidden="true" />
      <span ref={outerRef} className={`cursor-outer cursor-${hoverType}`} aria-hidden="true" />
      <span ref={innerRef} className={`cursor-inner cursor-${hoverType}`} aria-hidden="true" />
    </>
  );
};

export default CursorSpotlight;

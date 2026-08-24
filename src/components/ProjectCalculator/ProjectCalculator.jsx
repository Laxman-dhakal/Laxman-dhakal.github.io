import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaCheckCircle, FaRocket, FaClock, FaDollarSign, FaShieldAlt, FaComments } from 'react-icons/fa';
import { playClick, playPop } from '../../services/soundService';
import './ProjectCalculator.css';

const projectTypes = [
  { id: 'landing', label: 'Landing Page / Portfolio', baseUsd: 250, baseNpr: 32000, days: 6, icon: '🚀' },
  { id: 'business', label: 'Corporate / Business Website', baseUsd: 450, baseNpr: 58000, days: 12, icon: '🏢' },
  { id: 'fullstack', label: 'Full-Stack Web App', baseUsd: 750, baseNpr: 98000, days: 20, icon: '⚡' },
  { id: 'saas', label: 'Custom SaaS / Dashboard', baseUsd: 950, baseNpr: 125000, days: 28, icon: '📊' },
  { id: 'ecommerce', label: 'E-Commerce Online Store', baseUsd: 650, baseNpr: 85000, days: 18, icon: '🛍️' }
];

const designTiers = [
  { id: 'clean', label: 'Clean & Minimalist', addUsd: 0, addNpr: 0, addDays: 0, desc: 'Essential layout with crisp typography' },
  { id: 'animated', label: 'Interactive 3D & Animations', addUsd: 150, addNpr: 19500, addDays: 4, desc: 'Framer Motion, 3D tilts, micro-interactions' },
  { id: 'enterprise', label: 'Enterprise Design System', addUsd: 280, addNpr: 36000, addDays: 7, desc: 'Complete bespoke UI kit and high-fidelity tokens' }
];

const featureAddons = [
  { id: 'auth', label: 'User Authentication & Database', usd: 140, npr: 18000, days: 3 },
  { id: 'admin', label: 'Admin CMS / Dashboard Panel', usd: 220, npr: 28000, days: 5 },
  { id: 'payment', label: 'Payment Gateway (Stripe/eSewa/Khalti)', usd: 160, npr: 21000, days: 3 },
  { id: 'ai', label: 'AI Copilot / Smart Chatbot', usd: 180, npr: 23500, days: 4 },
  { id: 'seo', label: 'Advanced SEO & 95+ Core Web Vitals', usd: 120, npr: 15500, days: 2 },
  { id: 'multilingual', label: 'Multilingual (English + Nepali)', usd: 90, npr: 12000, days: 2 }
];

const ProjectCalculator = () => {
  const [selectedType, setSelectedType] = useState('fullstack');
  const [selectedDesign, setSelectedDesign] = useState('animated');
  const [selectedAddons, setSelectedAddons] = useState(['auth', 'seo']);
  const [isRush, setIsRush] = useState(false);
  const [currency, setCurrency] = useState('USD');

  const toggleAddon = (id) => {
    playPop();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTypeSelect = (id) => {
    playClick();
    setSelectedType(id);
  };

  const handleDesignSelect = (id) => {
    playClick();
    setSelectedDesign(id);
  };

  const calculation = useMemo(() => {
    const typeObj = projectTypes.find((t) => t.id === selectedType) || projectTypes[0];
    const designObj = designTiers.find((d) => d.id === selectedDesign) || designTiers[0];

    let totalUsd = typeObj.baseUsd + designObj.addUsd;
    let totalNpr = typeObj.baseNpr + designObj.addNpr;
    let totalDays = typeObj.days + designObj.addDays;

    featureAddons.forEach((addon) => {
      if (selectedAddons.includes(addon.id)) {
        totalUsd += addon.usd;
        totalNpr += addon.npr;
        totalDays += addon.days;
      }
    });

    if (isRush) {
      totalUsd = Math.round(totalUsd * 1.25);
      totalNpr = Math.round(totalNpr * 1.25);
      totalDays = Math.max(3, Math.round(totalDays * 0.7));
    }

    return {
      totalUsd,
      totalNpr,
      totalDays,
      typeName: typeObj.label,
      designName: designObj.label,
      addonsCount: selectedAddons.length
    };
  }, [selectedType, selectedDesign, selectedAddons, isRush]);

  const handleSendScope = () => {
    playClick();
    const typeObj = projectTypes.find((t) => t.id === selectedType);
    const addonsList = featureAddons
      .filter((a) => selectedAddons.includes(a.id))
      .map((a) => a.label)
      .join(', ');

    const message = `Hello Er. Laxman Dhakal! I generated a project estimate on your website:%0A- Project Type: ${typeObj?.label}%0A- Design Tier: ${selectedDesign}%0A- Features: ${addonsList || 'Standard'}%0A- Delivery: ${isRush ? 'Rush delivery' : 'Standard delivery'} (${calculation.totalDays} days)%0A- Estimated Budget: ${currency === 'USD' ? `$${calculation.totalUsd} USD` : `Rs. ${calculation.totalNpr.toLocaleString()} NPR`}%0A%0AI would like to discuss moving forward with this project.`;

    // Try to scroll to contact or open inquiry
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const messageField = document.querySelector('#contact textarea[name="message"]');
      if (messageField) {
        messageField.value = decodeURIComponent(message.replace(/%0A/g, '\n'));
      }
    } else {
      window.open(`https://wa.me/9779862215354?text=${message}`, '_blank');
    }
  };

  return (
    <section className="project-calculator-section" id="estimator">
      <div className="container">
        <div className="section-title">
          <span>02.</span>
          <h2>Project Cost & Timeline Estimator</h2>
        </div>

        <p className="calculator-subtitle">
          Configure your desired scope, tech features, and design fidelity to calculate real-time estimates with transparent delivery schedules.
        </p>

        <div className="calculator-grid">
          {/* Controls Column */}
          <div className="calculator-controls glass-card">
            <div className="calc-group">
              <label className="calc-label">
                <span>1. Select Project Architecture</span>
              </label>
              <div className="type-options-grid">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className={`type-card ${selectedType === type.id ? 'active' : ''}`}
                    onClick={() => handleTypeSelect(type.id)}
                  >
                    <span className="type-icon">{type.icon}</span>
                    <div className="type-info">
                      <strong>{type.label}</strong>
                      <small>From ${type.baseUsd} · ~{type.days} days</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-group">
              <label className="calc-label">
                <span>2. Design & Motion Tier</span>
              </label>
              <div className="design-options-grid">
                {designTiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    className={`design-pill ${selectedDesign === tier.id ? 'active' : ''}`}
                    onClick={() => handleDesignSelect(tier.id)}
                  >
                    <strong>{tier.label}</strong>
                    <small>{tier.desc}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-group">
              <label className="calc-label">
                <span>3. Add-on Features & Integrations</span>
              </label>
              <div className="addons-grid">
                {featureAddons.map((addon) => {
                  const active = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      className={`addon-chip ${active ? 'active' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <FaCheckCircle className={`addon-check ${active ? 'checked' : ''}`} />
                      <span>{addon.label}</span>
                      <small>+${addon.usd}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="calc-group rush-group">
              <label className="rush-toggle">
                <input
                  type="checkbox"
                  checked={isRush}
                  onChange={(e) => {
                    playClick();
                    setIsRush(e.target.checked);
                  }}
                />
                <span className="rush-switch" />
                <span className="rush-label">
                  <FaRocket /> Fast-Track Rush Delivery <em>(Priority scheduling, 30% faster)</em>
                </span>
              </label>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="calculator-summary glass-card">
            <div className="summary-header">
              <div className="summary-title">
                <FaCalculator className="calc-icon" />
                <h3>Estimate Breakdown</h3>
              </div>
              <div className="currency-switch">
                <button
                  type="button"
                  className={currency === 'USD' ? 'active' : ''}
                  onClick={() => {
                    playClick();
                    setCurrency('USD');
                  }}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  className={currency === 'NPR' ? 'active' : ''}
                  onClick={() => {
                    playClick();
                    setCurrency('NPR');
                  }}
                >
                  NPR (Rs.)
                </button>
              </div>
            </div>

            <div className="summary-price-display">
              <span className="summary-label">Estimated Investment</span>
              <div className="summary-amount">
                {currency === 'USD' ? (
                  <>
                    <small>$</small>
                    <strong>{calculation.totalUsd}</strong>
                    <span>USD</span>
                  </>
                ) : (
                  <>
                    <small>Rs.</small>
                    <strong>{calculation.totalNpr.toLocaleString()}</strong>
                    <span>NPR</span>
                  </>
                )}
              </div>
              <span className="summary-subtext">Transparent quote based on scope & fidelity</span>
            </div>

            <div className="summary-metrics">
              <div className="metric-box">
                <FaClock className="metric-icon" />
                <div>
                  <strong>{calculation.totalDays} Days</strong>
                  <span>Delivery Schedule</span>
                </div>
              </div>
              <div className="metric-box">
                <FaShieldAlt className="metric-icon" />
                <div>
                  <strong>100% Guaranteed</strong>
                  <span>Revisions & QA Included</span>
                </div>
              </div>
            </div>

            <div className="summary-scope-list">
              <h4>Scope Summary:</h4>
              <ul>
                <li>✓ {calculation.typeName}</li>
                <li>✓ {calculation.designName}</li>
                <li>✓ {calculation.addonsCount} Selected Modular Features</li>
                <li>✓ Clean React / Tailwind / Modern Tech Stack</li>
                <li>✓ Mobile Responsive & Fast Load Time</li>
              </ul>
            </div>

            <button type="button" className="button primary summary-cta" onClick={handleSendScope}>
              <FaComments /> Book Consultation with This Scope
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCalculator;

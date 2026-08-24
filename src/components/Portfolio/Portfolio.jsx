import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaSearch,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaTimes,
  FaCheck,
  FaLayerGroup,
  FaCalendarAlt
} from 'react-icons/fa';
import projects from '../../data/projects';
import { playClick, playPop } from '../../services/soundService';
import './Portfolio.css';

const categories = ['All Projects', 'React', 'Web', 'Application', 'Design'];

// 3D Tilt Card component
const TiltProjectCard = ({ project, onPreview }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className="portfolio-3d-card glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        '--glow-x': `${glowX}%`,
        '--glow-y': `${glowY}%`
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <div className="card-shine" />
      <div className="portfolio-thumb-wrapper">
        <img src={project.image} alt={project.title} loading="lazy" />
        <span className="portfolio-cat-badge">{project.category}</span>
        <button
          type="button"
          className="portfolio-quick-view-btn"
          onClick={() => {
            playPop();
            onPreview(project);
          }}
          aria-label={`Preview ${project.title}`}
        >
          <FaDesktop /> Device Simulator
        </button>
      </div>

      <div className="portfolio-card-content">
        <div className="portfolio-meta-header">
          <h3>{project.title}</h3>
          <span className="project-year"><FaCalendarAlt /> {project.year}</span>
        </div>

        <p>{project.description}</p>

        <div className="portfolio-tech-pills">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>

        <div className="portfolio-actions">
          <button
            type="button"
            className="button secondary btn-sm"
            onClick={() => {
              playPop();
              onPreview(project);
            }}
          >
            Details & Simulator
          </button>
          <div className="action-icons">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="icon-link"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <FaGithub />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl === '#' ? '#contact' : project.liveUrl}
                target={project.liveUrl === '#' ? '_self' : '_blank'}
                rel="noreferrer"
                className="icon-link"
                title="Live Demo"
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewProject, setPreviewProject] = useState(null);
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop, tablet, mobile

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === 'All Projects' || p.category === activeCategory;
      const matchQuery =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-title">
          <span>05.</span>
          <h2>Featured Work & Case Studies</h2>
        </div>

        <p className="portfolio-subtitle">
          Handcrafted web applications, high-converting product experiences, and robust digital platforms built with modern architectures.
        </p>

        {/* Toolbar */}
        <div className="portfolio-toolbar">
          <div className="portfolio-category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`portfolio-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="portfolio-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search portfolio"
            />
          </div>
        </div>

        {/* Projects 3D Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <TiltProjectCard key={project.id} project={project} onPreview={setPreviewProject} />
          ))}
          {filteredProjects.length === 0 && (
            <div className="portfolio-empty glass-card">
              <p>No matching projects found for "{searchQuery}".</p>
              <button
                type="button"
                className="button secondary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Projects');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Device Simulator & Project Details Modal */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            className="device-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewProject(null)}
          >
            <motion.div
              className="device-modal-dialog glass-card"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title-box">
                  <span className="modal-kicker">{previewProject.category} Case Study</span>
                  <h3>{previewProject.title}</h3>
                </div>

                {/* Device Mode Switcher */}
                <div className="device-switcher">
                  <button
                    type="button"
                    className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setDeviceMode('desktop');
                    }}
                    title="Desktop View"
                  >
                    <FaDesktop /> <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    className={`device-btn ${deviceMode === 'tablet' ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setDeviceMode('tablet');
                    }}
                    title="Tablet View"
                  >
                    <FaTabletAlt /> <span>Tablet</span>
                  </button>
                  <button
                    type="button"
                    className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setDeviceMode('mobile');
                    }}
                    title="Mobile View"
                  >
                    <FaMobileAlt /> <span>Mobile</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setPreviewProject(null)}
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body-layout">
                {/* Simulator Frame */}
                <div className={`simulator-frame-container frame-${deviceMode}`}>
                  <div className="simulator-browser-bar">
                    <div className="browser-dots">
                      <span className="dot red" />
                      <span className="dot yellow" />
                      <span className="dot green" />
                    </div>
                    <div className="browser-address">
                      <span>https://laxmandhakal.dev/showcase/{previewProject.id}</span>
                    </div>
                  </div>
                  <div className="simulator-viewport">
                    <img src={previewProject.image} alt={previewProject.title} className="simulator-screen-img" />
                    <div className="simulator-watermark">
                      <strong>{previewProject.title}</strong>
                      <p>{previewProject.description}</p>
                    </div>
                  </div>
                </div>

                {/* Project Specs & Details */}
                <div className="modal-specs">
                  <div className="spec-group">
                    <h4>Overview</h4>
                    <p>{previewProject.fullDescription || previewProject.description}</p>
                  </div>

                  {previewProject.features && (
                    <div className="spec-group">
                      <h4>Key Architectural Highlights</h4>
                      <ul className="spec-features-list">
                        {previewProject.features.map((feat) => (
                          <li key={feat}><FaCheck className="check-icon" /> {feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="spec-group">
                    <h4>Technologies</h4>
                    <div className="spec-tech-pills">
                      {previewProject.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions-row">
                    <a
                      href="#contact"
                      className="button primary"
                      onClick={() => setPreviewProject(null)}
                    >
                      Request Similar Project
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;

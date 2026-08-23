import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../motion/variants';
import projectsData from '../../data/projects';
import PortfolioModal from './PortfolioModal';
import './Portfolio.css';

const categories = ['All', 'Web', 'React', 'Design', 'Application'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return projectsData.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const searchableText = [project.title, project.description, project.category, ...(project.technologies || [])].join(' ').toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [activeCategory, searchTerm]);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-title">
          <span>05.</span>
          <h2>Portfolio</h2>
        </div>
        <div className="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={category === activeCategory ? 'active' : ''}
              aria-label={`Show ${category} projects`}
            >
              <span>{category}</span>
              <small>{category === 'All' ? projectsData.length : projectsData.filter((project) => project.category === category).length}</small>
            </button>
          ))}
          <label className="portfolio-search">
            <span className="sr-only">Search projects</span>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search projects..." />
          </label>
        </div>
        <p className="portfolio-result-count">Showing {projects.length} of {projectsData.length} projects</p>
        <motion.div className="portfolio-grid" variants={staggerContainer} initial="hidden" animate="visible">
          {projects.map((project) => (
            <motion.article key={project.id} className="portfolio-card" variants={fadeUp} whileHover={{ y: -6 }}>
              <div className="portfolio-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="portfolio-content">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-tags">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <button type="button" className="button secondary" onClick={() => setSelectedProject(project)}>
                  View Project
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
        {!projects.length && <div className="portfolio-empty">No projects match your search.</div>}
      </div>

      <AnimatePresence>{selectedProject && <PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </section>
  );
};

export default Portfolio;

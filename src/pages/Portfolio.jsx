import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import { getSiteContent } from '../services/siteContentService';
import { fadeUp, staggerContainer } from '../motion/variants';

const categories = ['All', 'Web', 'React', 'UI/UX', 'Application', 'Design', 'Other'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const { projects, portfolio } = getSiteContent();

  const visibleProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <main className="page-content">
      <section className="page-hero portfolio-hero">
        <div className="container">
          <SectionHeading title={portfolio.title || 'Selected Work'} subtitle={portfolio.subtitle || 'A collection of projects, applications and digital experiences.'} />
        </div>
      </section>
      <section className="container portfolio-page-grid">
        <div className="portfolio-page-filters">
          {categories.map((category) => (
            <button key={category} type="button" className={category === activeCategory ? 'active' : ''} onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </div>
        <motion.div className="portfolio-page-list" variants={staggerContainer} initial="hidden" animate="visible">
          {visibleProjects.map((project) => (
            <motion.article key={project.id} className="portfolio-page-card" variants={fadeUp} whileHover={{ y: -6 }}>
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="portfolio-page-content">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-page-tags">
                  {(project.technologies || []).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <button type="button" className="button primary" onClick={() => navigate(`/portfolio/${project.id}`)}>
                  View Details
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default Portfolio;

import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import { getSiteContent } from '../services/siteContentService';
import { fadeUp } from '../motion/variants';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectsData = Array.isArray(getSiteContent().projects) ? getSiteContent().projects : [];
  const normalizedId = String(id ?? '').trim();

  const project = useMemo(() => {
    if (!normalizedId) return undefined;
    return projectsData.find((item) => String(item?.id ?? '').trim() === normalizedId);
  }, [normalizedId, projectsData]);

  if (!project) {
    return (
      <main className="page-content">
        <section className="container not-found">
          <h2>Project not found</h2>
          <button type="button" className="button primary" onClick={() => navigate('/portfolio')}>
            Back to Portfolio
          </button>
        </section>
      </main>
    );
  }

  const overview = project.fullDescription || project.description || 'A detailed project overview is not available yet.';
  const features = Array.isArray(project.features) && project.features.length ? project.features : ['Responsive layout', 'Modern design', 'Strong user experience'];
  const technologies = Array.isArray(project.technologies) && project.technologies.length ? project.technologies : ['React', 'JavaScript', 'Responsive Design'];
  const year = project.year || new Date().getFullYear();
  const liveUrl = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : '';
  const githubUrl = project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : '';

  return (
    <main className="page-content">
      <section className="page-hero project-hero">
        <div className="container">
          <SectionHeading title={project.title} subtitle={`${project.category || 'Project'} • ${year}`} />
        </div>
      </section>
      <section className="container project-details-grid">
        <motion.img src={project.image} alt={project.title} className="project-details-image" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} />
        <motion.div className="project-details-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>Overview</h3>
          <p>{overview}</p>
          <div className="project-detail-block">
            <h4>Features</h4>
            <ul>
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="project-detail-block">
            <h4>Technologies</h4>
            <div className="project-tech-list">
              {technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
          <div className="project-detail-actions">
            {liveUrl ? (
              <a href={liveUrl} className="button primary" target="_blank" rel="noreferrer">Live Demo</a>
            ) : null}
            {githubUrl ? (
              <a href={githubUrl} className="button secondary" target="_blank" rel="noreferrer">GitHub</a>
            ) : null}
          </div>
          <button type="button" className="button secondary" onClick={() => navigate('/portfolio')}>
            Back to Portfolio
          </button>
        </motion.div>
      </section>
    </main>
  );
};

export default ProjectDetails;

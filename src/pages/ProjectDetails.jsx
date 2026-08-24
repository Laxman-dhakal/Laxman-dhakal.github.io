import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import { getSiteContent } from '../services/siteContentService';
import { fadeUp } from '../motion/variants';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const siteContent = getSiteContent();
  const projectsData = Array.isArray(siteContent.projects) ? siteContent.projects : [];
  const copy = siteContent.interactiveCopy.projectDetails;
  const normalizedId = String(id ?? '').trim();

  const project = useMemo(() => {
    if (!normalizedId) return undefined;
    return projectsData.find((item) => String(item?.id ?? '').trim() === normalizedId);
  }, [normalizedId, projectsData]);

  const projectIndex = project ? projectsData.findIndex((item) => String(item?.id ?? '').trim() === normalizedId) : -1;
  const previousProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex >= 0 && projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  if (!project) {
    return (
      <main className="page-content">
        <section className="container not-found">
          <h2>{copy.notFound}</h2>
          <button type="button" className="button primary" onClick={() => navigate('/portfolio')}>
            {copy.back}
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
        <motion.button type="button" className="project-image-button" onClick={() => setLightboxOpen(true)} aria-label={`Open larger image for ${project.title}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <img src={project.image} alt={project.title} className="project-details-image" />
          <span>{copy.expand}</span>
        </motion.button>
        <motion.div className="project-details-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h3>{copy.overview}</h3>
          <p>{overview}</p>
          <div className="project-detail-block">
            <h4>{copy.features}</h4>
            <ul>
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="project-detail-block">
            <h4>{copy.technologies}</h4>
            <div className="project-tech-list">
              {technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
          <div className="project-detail-actions">
            {liveUrl ? (
              <a href={liveUrl} className="button primary" target="_blank" rel="noreferrer">{copy.liveDemo}</a>
            ) : null}
            {githubUrl ? (
              <a href={githubUrl} className="button secondary" target="_blank" rel="noreferrer">{copy.github}</a>
            ) : null}
            <button type="button" className="button secondary" onClick={async () => {
              const url = window.location.href;
              try {
                if (navigator.share) await navigator.share({ title: project.title, url });
                else if (navigator.clipboard) await navigator.clipboard.writeText(url);
                else window.prompt('Copy project link', url);
                setShared(true);
                setTimeout(() => setShared(false), 1800);
              } catch {
                setShared(false);
              }
            }}>{shared ? copy.copied : copy.share}</button>
          </div>
          <button type="button" className="button secondary" onClick={() => navigate('/portfolio')}>
            {copy.back}
          </button>
        </motion.div>
      </section>
      <div className="project-pagination container">
        {previousProject ? <button type="button" onClick={() => navigate(`/portfolio/${previousProject.id}`)}>← {previousProject.title}</button> : <span />}
        {nextProject ? <button type="button" onClick={() => navigate(`/portfolio/${nextProject.id}`)}>{nextProject.title} →</button> : <span />}
      </div>
      {lightboxOpen && <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} image preview`} onClick={() => setLightboxOpen(false)}>
        <button type="button" className="project-lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Close image preview">×</button>
        <img src={project.image} alt={project.title} onClick={(event) => event.stopPropagation()} />
      </div>}
    </main>
  );
};

export default ProjectDetails;

import { useMemo, useState } from 'react';
import './DashboardPages.css';
import { getSiteContent, saveSiteContent } from '../../services/siteContentService';

const defaultForm = { title: '', category: 'React', status: 'Draft', description: '', image: '' };

const Projects = () => {
  const initialContent = getSiteContent();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [projectList, setProjectList] = useState(initialContent.projects || []);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  const persistProjects = (nextProjects) => {
    setProjectList(nextProjects);
    saveSiteContent({ ...getSiteContent(), projects: nextProjects });
  };

  const filtered = useMemo(() => {
    return projectList.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projectList, search, statusFilter]);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    const projectPayload = {
      title: form.title.trim(),
      category: form.category,
      status: form.status,
      description: form.description || 'New project added from dashboard.',
      image: form.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
      technologies: ['React', 'Dashboard'],
      features: ['Custom build', 'Responsive'],
      liveUrl: '#',
      githubUrl: '#',
      year: new Date().getFullYear().toString(),
      views: 'New',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (editingId !== null) {
      const updatedProjects = projectList.map((item) => item.id === editingId ? { ...item, ...projectPayload, id: editingId } : item);
      persistProjects(updatedProjects);
    } else {
      const nextProjects = [{ id: Date.now(), ...projectPayload }, ...projectList];
      persistProjects(nextProjects);
    }

    resetForm();
    setShowForm(false);
  };

  const handleDelete = (projectId) => {
    const nextProjects = projectList.filter((item) => item.id !== projectId);
    persistProjects(nextProjects);
    if (editingId === projectId) resetForm();
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Projects</span>
          <h2>Manage your portfolio work</h2>
          <p>Track delivery, review status, and keep your project pipeline moving.</p>
        </div>
        <button type="button" className="button primary hero-button" onClick={() => {
          if (showForm) {
            resetForm();
          }
          setShowForm((prev) => !prev);
        }}>
          {showForm ? 'Close form' : 'Add Project'}
        </button>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Overview</span>
          <h3>Portfolio projects</h3>
        </div>

        <div className="project-overview-grid">
          <div className="mini-stat-card">
            <strong>{projectList.length}</strong>
            <span>Total Projects</span>
          </div>
          <div className="mini-stat-card">
            <strong>{projectList.filter((item) => item.status === 'Published').length}</strong>
            <span>Published</span>
          </div>
          <div className="mini-stat-card">
            <strong>{projectList.filter((item) => item.status === 'Draft').length}</strong>
            <span>Drafts</span>
          </div>
        </div>

        {showForm && (
          <form className="dashboard-form" onSubmit={handleSubmit}>
            <div className="dashboard-form-grid">
              <label>
                Project Name
                <input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="Project title" />
              </label>
              <label>
                Category
                <select value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}>
                  <option value="React">React</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Branding">Branding</option>
                  <option value="Web">Web</option>
                  <option value="Application">Application</option>
                </select>
              </label>
              <label>
                Status
                <select value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Review">Review</option>
                </select>
              </label>
              <label className="full-width">
                Description
                <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} rows={3} placeholder="Describe this project" />
              </label>
              <label className="full-width">
                Image URL
                <input value={form.image} onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))} placeholder="https://example.com/project-image.jpg" />
              </label>
            </div>
            <button type="submit" className="button primary">{editingId !== null ? 'Update project' : 'Save project'}</button>
          </form>
        )}

        <div className="table-toolbar message-toolbar">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects" />
          <div className="filter-group">
            {['All', 'Published', 'Draft', 'Review'].map((item) => (
              <button key={item} type="button" className={`chip ${statusFilter === item ? 'active' : ''}`} onClick={() => setStatusFilter(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr key={`${project.title}-${project.date || project.id}`}>
                  <td>{project.title}</td>
                  <td>{project.category}</td>
                  <td><span className={`status-badge status-${(project.status || 'draft').toLowerCase()}`}>{project.status || 'Draft'}</span></td>
                  <td>{project.views || 'New'}</td>
                  <td>{project.date || 'Just now'}</td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="table-action" onClick={() => {
                        setShowForm(true);
                        setEditingId(project.id);
                        setForm({
                          title: project.title || '',
                          category: project.category || 'React',
                          status: project.status || 'Draft',
                          description: project.description || '',
                          image: project.image || ''
                        });
                      }}>Edit</button>
                      <button type="button" className="table-action danger" onClick={() => handleDelete(project.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Projects;

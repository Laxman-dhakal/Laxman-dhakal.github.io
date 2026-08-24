import { motion } from 'framer-motion';
import courses, { courseCategories } from '../../data/skills';
import '../Skills/Skills.css';

const filterOptions = ['Course category', 'Level', 'Duration', 'Language', 'Certificate'];
const sortOptions = ['Most Popular', 'Newest', 'Highest Rated', 'Shortest Duration'];

const Portfolio = () => {
  return (
    <section className="skills-section" id="portfolio">
      <div className="container">
        <div className="course-directory">
          <header className="course-header">
            <div className="course-brand">
              <span className="course-brand__mark">L</span>
              <span>LearnHub</span>
            </div>

            <nav className="course-nav" aria-label="Course navigation">
              <a href="#">Discover</a>
              <a href="#">Career Paths</a>
              <a href="#">Pricing</a>
              <a href="#">Resources</a>
            </nav>

            <div className="course-actions">
              <button type="button" className="btn btn-ghost">Login</button>
              <button type="button" className="btn btn-primary">Start Learning Free</button>
            </div>
          </header>

          <div className="course-hero">
            <div>
              <span className="eyebrow">Online learning platform</span>
              <h2>All Courses</h2>
              <p>Explore practical, beginner-friendly courses designed to help you build skills for modern work and growth.</p>
            </div>
            <div className="hero-cta">
              <button type="button" className="btn btn-primary">Browse Courses</button>
            </div>
          </div>

          <div className="course-toolbar">
            <label className="search-box" aria-label="Search courses">
              <span>⌕</span>
              <input type="text" placeholder="Search courses, topics, skills..." />
            </label>

            <div className="sort-box">
              <span>Sort by</span>
              <select defaultValue="Most Popular">
                {sortOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="course-main">
            <aside className="course-sidebar">
              <div className="sidebar-panel">
                <h3>Filters</h3>
                {filterOptions.map((filter) => (
                  <div key={filter} className="filter-group">
                    <label>{filter}</label>
                    <div className="filter-value">Any</div>
                  </div>
                ))}
              </div>

              <div className="sidebar-panel sidebar-panel--accent">
                <h3>Popular Topics</h3>
                <ul>
                  <li>Excel</li>
                  <li>SEO</li>
                  <li>Python</li>
                  <li>UX Design</li>
                </ul>
              </div>
            </aside>

            <div className="course-grid">
              {courseCategories.map((category, index) => (
                category !== 'All Courses' && (
                  <button key={category} type="button" className={`chip ${index === 0 ? 'chip--active' : ''}`}>
                    {category}
                  </button>
                )
              ))}

              <div className="course-cards">
                {courses.map((course, index) => (
                  <motion.article
                    key={course.id}
                    className="course-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    <div className={`course-card__thumb course-card__thumb--${course.color}`}>
                      <span className="badge">{course.badge}</span>
                    </div>

                    <div className="course-card__body">
                      <div className="course-meta-row">
                        <span className="course-category">{course.category}</span>
                        <span className="course-rating">★ {course.rating}</span>
                      </div>

                      <h3>{course.title}</h3>
                      <p>{course.description}</p>

                      <div className="course-stats">
                        <span>{course.duration}</span>
                        <span>{course.learners} learners</span>
                        <span>{course.level}</span>
                      </div>

                      <button type="button" className="course-view-btn">View Course</button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>

          <div className="course-footer-row">
            <div className="course-stat">
              <strong>48+</strong>
              <span>Expert-led tracks</span>
            </div>
            <div className="course-stat">
              <strong>94%</strong>
              <span>Career growth</span>
            </div>
            <div className="course-stat">
              <strong>2.1k</strong>
              <span>New learners this week</span>
            </div>
            <button type="button" className="btn btn-primary btn-large">Load More Courses</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

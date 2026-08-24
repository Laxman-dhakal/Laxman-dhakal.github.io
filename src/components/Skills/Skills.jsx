import { useMemo, useState } from 'react';
import courses from '../../data/skills';
import './Skills.css';

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const categories = ['All Categories', ...new Set(courses.map((course) => course.category))];

const Skills = ({ sectionId = 'skills' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeLevel, setActiveLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Popular');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(0);

  const lessonVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';
  const lessonTitles = ['Introduction and course overview', 'Core concepts and practical examples', 'Practice session and next steps'];

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return courses
      .filter((course) => activeCategory === 'All Categories' || course.category === activeCategory)
      .filter((course) => activeLevel === 'All Levels' || course.level === activeLevel)
      .filter((course) => !normalizedSearch || `${course.title} ${course.category} ${course.type}`.toLowerCase().includes(normalizedSearch))
      .sort((first, second) => {
        if (sortBy === 'Newest') return second.id - first.id;
        if (sortBy === 'Shortest') return first.duration.localeCompare(second.duration);
        return Number(second.learners.replace(/,/g, '')) - Number(first.learners.replace(/,/g, ''));
      });
  }, [activeCategory, activeLevel, searchTerm, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('All Categories');
    setActiveLevel('All Levels');
    setSortBy('Popular');
  };

  return (
    <section className="skills-section online-courses-section" id={sectionId}>
      <div className="container">
        <div className="course-directory">
          <header className="course-header">
            <div className="course-brand"><span className="course-brand__mark">L</span><span>LearnHub</span></div>
            <nav className="course-nav" aria-label="Course navigation"><a href="#online-courses">Discover</a><a href="#course-categories">Categories</a><a href="#course-levels">Learning paths</a></nav>
            <span className="course-result-count">{filteredCourses.length} courses</span>
          </header>

          <div className="courses-intro">
            <div><span className="eyebrow">Computer skills library</span><h2>Online Courses</h2><p>Learn practical computer skills through flexible courses for beginners, professionals and advanced learners.</p></div>
            <div className="courses-summary"><strong>{courses.length}</strong><span>courses available</span></div>
          </div>

          <div className="course-toolbar course-toolbar--directory">
            <label className="search-box" aria-label="Search courses"><span>⌕</span><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search courses, topics, skills..." /></label>
            <select className="course-select" value={activeLevel} onChange={(event) => setActiveLevel(event.target.value)}><option>All Levels</option>{levels.map((level) => <option key={level}>{level}</option>)}</select>
            <select className="course-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="Popular">Most Popular</option><option value="Newest">Newest</option><option value="Shortest">Shortest Duration</option></select>
            <button type="button" className="course-reset" onClick={resetFilters}>Reset</button>
          </div>

          <div className="course-category-row" id="course-categories">{categories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>

          <div className="course-directory-layout">
            <aside className="course-sidebar">
              <div className="sidebar-panel"><h3>Filter by level</h3><button type="button" className={activeLevel === 'All Levels' ? 'filter-active' : ''} onClick={() => setActiveLevel('All Levels')}>All Levels</button>{levels.map((level) => <button type="button" className={activeLevel === level ? 'filter-active' : ''} key={level} onClick={() => setActiveLevel(level)}>{level}<span>{courses.filter((course) => course.level === level).length}</span></button>)}</div>
              <div className="sidebar-panel sidebar-panel--accent"><h3>Course benefits</h3><p>Practical lessons</p><p>Certificate and diploma options</p><p>Self-paced learning</p></div>
            </aside>

            <div className="course-card-groups" id="course-levels">
              {levels.map((level) => {
                const levelCourses = filteredCourses.filter((course) => course.level === level);
                if (!levelCourses.length) return null;
                return (
                  <section className={`course-level course-level--${level.toLowerCase()}`} key={level}>
                    <div className="course-level-heading"><div><span className="course-level-kicker">Learning path</span><h3>{level}</h3></div><span className="course-level-count">{levelCourses.length} courses</span></div>
                    <div className="course-card-grid">{levelCourses.map((course) => <article className="catalog-course-card" key={course.id}><div className={`catalog-course-art catalog-course-art--${course.color}`}><span>{course.type}</span><strong>{course.category}</strong></div><div className="catalog-course-body"><span className="catalog-course-category">{course.category}</span><h4>{course.title}</h4><p>{course.description}</p><div className="catalog-course-rating"><span>★ {course.rating}</span><span>{course.learners} learners</span></div><div className="catalog-course-meta"><span>{course.duration}</span><span>{course.level}</span><button type="button" onClick={() => { setSelectedCourse(course); setSelectedLesson(0); }}>View Course</button></div></div><div className="catalog-course-hover"><strong>{course.title}</strong><p>{course.description}</p><div><span>{course.type}</span><span>{course.duration}</span><span>{course.learners} learners</span></div><button type="button" className="join-class-button" onClick={() => { setSelectedCourse(course); setSelectedLesson(0); }}>Join Class <span>→</span></button></div></article>)}</div>
                  </section>
                );
              })}
              {!filteredCourses.length && <div className="course-empty"><h3>No courses found</h3><p>Try another keyword or clear the filters.</p><button type="button" className="course-reset" onClick={resetFilters}>Clear filters</button></div>}
            </div>
          </div>
        </div>
      </div>
      {selectedCourse && <div className="course-video-modal" role="dialog" aria-modal="true" aria-labelledby="course-video-title" onClick={() => setSelectedCourse(null)}><div className="course-video-dialog" onClick={(event) => event.stopPropagation()}><button type="button" className="course-video-close" onClick={() => setSelectedCourse(null)} aria-label="Close class videos">×</button><div className="course-video-heading"><span className="eyebrow">Class videos</span><h3 id="course-video-title">{selectedCourse.title}</h3><p>{selectedCourse.description}</p></div><div className="course-video-layout"><div><video className="course-video-player" controls src={lessonVideo} key={`${selectedCourse.id}-${selectedLesson}`}><track kind="captions" /></video><strong className="course-current-lesson">{lessonTitles[selectedLesson]}</strong></div><div className="course-lesson-list"><span>Course lessons</span>{lessonTitles.map((lesson, index) => <button type="button" className={selectedLesson === index ? 'active' : ''} key={lesson} onClick={() => setSelectedLesson(index)}><b>{String(index + 1).padStart(2, '0')}</b>{lesson}</button>)}</div></div></div></div>}
    </section>
  );
};

export default Skills;

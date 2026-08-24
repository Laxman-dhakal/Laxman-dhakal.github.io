import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaJs,
  FaCss3Alt,
  FaMagic,
  FaNodeJs,
  FaFire,
  FaDatabase,
  FaFigma,
  FaMobileAlt,
  FaGitAlt,
  FaCogs,
  FaChartLine,
  FaCheck,
  FaLayerGroup
} from 'react-icons/fa';
import { skillsData, skillCategories } from '../../data/skillsMatrix';
import { playClick, playPop } from '../../services/soundService';
import './TechRadar.css';

const iconComponents = {
  FaReact: FaReact,
  FaJs: FaJs,
  FaCss3Alt: FaCss3Alt,
  FaMagic: FaMagic,
  FaNodeJs: FaNodeJs,
  FaFire: FaFire,
  FaDatabase: FaDatabase,
  FaFigma: FaFigma,
  FaMobileAlt: FaMobileAlt,
  FaGitAlt: FaGitAlt,
  FaCogs: FaCogs,
  FaChartLine: FaChartLine
};

const TechRadar = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchCategory = activeCategory === 'All' || skill.category === activeCategory;
      const matchQuery =
        !searchQuery ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="tech-radar-section" id="tech-matrix">
      <div className="container">
        <div className="section-title">
          <span>04.</span>
          <h2>Skill Matrix & Engineering Proficiency</h2>
        </div>

        <p className="radar-subtitle">
          Comprehensive breakdown of core tech stack capabilities, real-world experience benchmarks, and production-grade software delivery.
        </p>

        {/* Filter Controls */}
        <div className="radar-controls">
          <div className="radar-category-pills">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`radar-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="radar-search-box">
            <span>⌕</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tech stack..."
              aria-label="Filter tech skills"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="radar-grid">
          {filteredSkills.map((skill, index) => {
            const Icon = iconComponents[skill.icon] || FaLayerGroup;
            return (
              <motion.div
                key={skill.id}
                className="radar-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="radar-card-top">
                  <div className="radar-icon-box" style={{ color: skill.color }}>
                    <Icon />
                  </div>
                  <div className="radar-header-info">
                    <h3>{skill.name}</h3>
                    <span className="radar-exp-badge">{skill.experience}</span>
                  </div>
                </div>

                <p className="radar-desc">{skill.description}</p>

                <div className="radar-progress-container">
                  <div className="radar-progress-header">
                    <span className="radar-level-badge">{skill.levelLabel}</span>
                    <span className="radar-percentage">{skill.level}%</span>
                  </div>
                  <div className="radar-bar-track">
                    <motion.div
                      className="radar-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      style={{
                        background: `linear-gradient(90deg, var(--primary), ${skill.color})`
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechRadar;

import { motion } from "framer-motion";
import { useState } from "react";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Skills.css";

export default function Skills() {
  const { skills } = PortfolioContent;
  const [activeCategory, setActiveCategory] = useState("all");

  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return Object.values(skills.skills).flat();
    }
    return skills.skills[activeCategory] || [];
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section className="skills-page" id="skills">
      <div className="skills-page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="skills-page-header"
        >
          <span className="section-tag">{skills.tag}</span>
          <h2 className="section-title">
            {skills.title} <span className="highlight">{skills.titleHighlight}</span>
          </h2>
          <p className="section-subtitle">
            {skills.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="skills-categories"
        >
          {skills.categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="skills-grid-page">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="skill-card-page"
            >
              <div className="skill-card-header">
                <div className="skill-card-icon-wrap">
                  {skill.icon ? (
                    <img src={skill.icon} alt={`${skill.name} icon`} className="skill-card-icon" loading="lazy" />
                  ) : (
                    <span className="skill-card-fallback" aria-hidden="true">{skill.name.slice(0, 1)}</span>
                  )}
                </div>
                <div className="skill-card-info">
                  <h3 className="skill-card-name">{skill.name}</h3>
                  <span className="skill-card-level">{skill.level}%</span>
                </div>
              </div>
              <div className="skill-bar-container" aria-hidden="true">
                <motion.div
                  className="skill-bar-progress"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.04, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.6 }}
                />
              </div>
              <p className="skill-card-description">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {skills.summary.length > 0 && <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="skills-summary"
        >
          {skills.summary.map((item, index) => (
            <div key={index} className="summary-item">
              <span className="summary-number">{item.number}</span>
              <span className="summary-label">{item.label}</span>
            </div>
          ))}
        </motion.div>}
      </div>
    </section>
  );
}

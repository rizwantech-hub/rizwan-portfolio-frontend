import { motion } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/About.css";

export default function About() {
  const { about, profile } = PortfolioContent;

  return (
    <section className="about" id="about">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="about-header"
        >
          <span className="section-tag">{about.tag}</span>
          <h2 className="section-title">
            {about.title} <span className="highlight">{about.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="about-content"
          >
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="about-text">
                {paragraph}
              </p>
            ))}
            
            {about.stats.length > 0 && <div className="about-stats">
              {about.stats.map((stat, index) => (
                <div key={index} className="about-stat">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="skills-container about-facts"
          >
            <div className="about-fact"><span>Based in</span><strong>{profile.location}</strong></div>
            <div className="about-fact"><span>University</span><strong>{profile.university}</strong></div>
            <div className="about-fact"><span>Faculty</span><strong>{profile.faculty}</strong></div>
            <div className="about-fact"><span>Field of study</span><strong>{profile.field}</strong></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

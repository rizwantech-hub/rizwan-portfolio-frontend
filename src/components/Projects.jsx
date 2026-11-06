import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Projects.css";

export default function Projects() {
  const { projects } = PortfolioContent;
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    filter === "all" ? projects.items : projects.items.filter((project) => project.category === filter);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setTimeout(() => setSelectedProject(null), 300);
  };

  const renderProjectImage = (project, className = "project-img") => {
    const image = project.image || project.imageUrl;

    if (image) {
      return (
        <img
          src={image}
          alt={project.imageAlt || `${project.title} project screenshot`}
          className={className}
          loading="lazy"
        />
      );
    }

    return (
      <div className="project-image-placeholder" aria-label={project.imageAlt || `${project.title} project image placeholder`}>
        <span>{project.placeholderLabel || "Project Screenshot"}</span>
      </div>
    );
  };

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="projects-header"
        >
          <span className="section-tag">{projects.tag}</span>
          <h2 className="section-title">
            {projects.title} <span className="highlight">{projects.titleHighlight}</span>
          </h2>
          <p className="section-subtitle">{projects.description}</p>
        </motion.div>

        <div className="projects-filters">
          {projects.categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? "active" : ""}`}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="project-card"
            >
              <div className="project-image">{renderProjectImage(project)}</div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => openModal(project)} className="project-link">
                  View Project
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button className="modal-close" onClick={closeModal} aria-label="Close project details">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="modal-image">{renderProjectImage(selectedProject, "modal-project-img")}</div>

                <div className="modal-body">
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <p className="modal-description">{selectedProject.description}</p>

                  <div className="modal-tags">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="modal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="modal-actions">
                    {selectedProject.liveUrl ? (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-btn primary">
                        Live Site
                      </a>
                    ) : (
                      <button className="modal-btn primary disabled" disabled>
                        Not Live Yet
                      </button>
                    )}

                    {selectedProject.githubUrl ? (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-btn secondary">
                        GitHub
                      </a>
                    ) : (
                      <button className="modal-btn secondary disabled" disabled>
                        GitHub
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

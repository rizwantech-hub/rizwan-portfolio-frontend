import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Certifications.css";

export default function Certifications() {
  const { certifications } = PortfolioContent;
  const certsList = certifications?.items || [];
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setTimeout(() => setSelectedCert(null), 300);
  };

  const renderCertificateImage = (cert, modal = false) => {
    const image = cert.image || cert.imageUrl;

    if (image) {
      return <img src={image} alt={cert.imageAlt || `${cert.title} certificate`} className={modal ? "cert-modal-img" : "cert-img"} loading="lazy" />;
    }

    return <div className={modal ? "cert-modal-placeholder" : "cert-image-placeholder"}>Certificate Image</div>;
  };

  return (
    <section className="certifications" id="certifications">
      <div className="certifications-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="certifications-header"
        >
          <span className="section-tag">{certifications.tag}</span>
          <h2 className="section-title">
            {certifications.title}
            <span className="highlight">{certifications.titleHighlight}</span>
          </h2>
          <p className="section-subtitle">{certifications.description}</p>
        </motion.div>

        <div className="certifications-grid">
          {certsList.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`cert-card ${cert.isPlaceholder ? "cert-card-placeholder" : ""}`}
            >
              <div className="cert-image-wrapper">{renderCertificateImage(cert)}</div>

              <div className="cert-content">
                <p className="cert-issuer">{cert.issuer}</p>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-date">{cert.date}</p>
                <button onClick={() => openModal(cert)} className="cert-link">
                  View Certificate
                </button>
              </div>
            </motion.div>
          ))}

          {certsList.length === 0 && <p className="cert-empty-state">Certification details will be added here.</p>}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && selectedCert && (
            <motion.div
              className="cert-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="cert-modal-content"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button className="cert-modal-close" onClick={closeModal} aria-label="Close certificate details">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="cert-modal-image-wrapper">{renderCertificateImage(selectedCert, true)}</div>

                <div className="cert-modal-body">
                  <div className="cert-modal-header">
                    <div>
                      <h2 className="cert-modal-title">{selectedCert.title}</h2>
                      <p className="cert-modal-issuer">{selectedCert.issuer}</p>
                      <p className="cert-modal-date">{selectedCert.date}</p>
                    </div>
                  </div>

                  <p className="cert-modal-description">{selectedCert.description}</p>

                  <div className="cert-modal-actions">
                    {selectedCert.link ? (
                      <a href={selectedCert.link} target="_blank" rel="noopener noreferrer" className="cert-modal-btn primary">
                        View Credential
                      </a>
                    ) : (
                      <button className="cert-modal-btn primary disabled" disabled>
                        Certificate Link Pending
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

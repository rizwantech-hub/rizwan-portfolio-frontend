import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Torus } from "@react-three/drei";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Hero.css";

function PhotoFrame() {
  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.16}>
      <group rotation={[0.35, 0.2, 0]}>
        <Torus args={[1.42, 0.018, 16, 120]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ae7bff" emissive="#722dce" emissiveIntensity={1.3} metalness={0.8} roughness={0.2} />
        </Torus>
        <Torus args={[1.53, 0.008, 12, 120]} rotation={[1.35, 0.3, 0.25]}>
          <meshStandardMaterial color="#4eddf5" emissive="#1c9bbc" emissiveIntensity={1.5} metalness={0.7} roughness={0.2} transparent opacity={0.8} />
        </Torus>
        <Torus args={[1.63, 0.006, 10, 120]} rotation={[1.8, 0.2, 0.5]}>
          <meshStandardMaterial color="#db7aff" emissive="#8a39bb" emissiveIntensity={0.8} transparent opacity={0.65} />
        </Torus>
      </group>
    </Float>
  );
}

export default function Hero() {
  const { hero, profile } = PortfolioContent;

  const downloadCv = () => {
    const link = document.createElement("a");
    link.href = profile.cv;
    link.download = "Rizwan_Ataye_CV.pdf";
    link.click();
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-main">
          <div className="hero-content">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero-badge">
              <span className="badge-dot" />
              <span className="badge-text">{hero.badge}</span>
              <span className="badge-glow" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="hero-title">
              {hero.greeting} <span className="highlight">{hero.name}</span>
              <span className="title-cursor">|</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hero-subtitle">
              <strong className="hero-role">{hero.title}</strong>
              <br />
              {hero.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="hero-actions">
              <button className="btn-primary" onClick={downloadCv}>
                <span className="btn-content">{hero.buttons.primary}</span>
                <span className="btn-glow-effect" />
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                {hero.buttons.secondary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.25 }} className="hero-right">
            <div className="avatar-container profile-frame">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[2, 2, 4]} color="#b56cff" intensity={18} />
                <pointLight position={[-3, -1, 2]} color="#46d9f4" intensity={12} />
                <PhotoFrame />
              </Canvas>
              <img src={profile.image} alt="Rizwan Ataye" className="profile-photo" />
              <div className="ring-dots-outer" />
              <div className="avatar-glow" />
            </div>
          </motion.div>
        </div>

        <div className="hero-lower">
          {hero.stats.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="hero-stats">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-glow" />
                </div>
              ))}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="tech-stack">
            <p className="tech-label">
              <span className="tech-dot" /> Technologies
            </p>
            <div className="tech-grid">
              {hero.technologies.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                  <span className="tech-glow" />
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

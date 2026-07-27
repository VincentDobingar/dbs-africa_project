// src/shared/components/HeroSection.jsx

import React from "react";
import "../styles/hero.css";

export default function HeroSection({
  title,
  description,
  badge,
  image,
  children,
}) {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.92),
            rgba(15, 64, 175, 0.65)
          ),
          url(${image})
        `,
      }}
    >
      {/* Glow effects */}
      <div className="hero-glow hero-glow-left"></div>
      <div className="hero-glow hero-glow-right"></div>

      {/* Content */}
      <div className="hero-overlay">
        {badge && (
          <span className="hero-badge">
            {badge}
          </span>
        )}

        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}

        {children && (
          <div className="hero-actions">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
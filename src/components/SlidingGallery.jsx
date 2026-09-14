import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InteractiveWidget } from './InteractiveDemos';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Value-forward statements with highlighted breakthrough names (no question framing)
const VALUE_FORWARD_STATEMENTS = {
  alphafold: {
    highlight: 'Alphafold 3',
    statement: 'accelerates new vaccine candidates for neglected tropical diseases and predicts the 3D atomic structure of all molecules of life',
    category: 'BIOMOLECULAR & HEALTH'
  },
  bioacoustics: {
    highlight: 'Perch',
    statement: 'identifies more than 10,000 species of birds, frogs, and mammals from distant chirps in dense canopies',
    category: 'CLIMATE & EARTH'
  },
  gnome: {
    highlight: 'GNoME',
    statement: 'discovered 2.2 million new crystal materials, expanding human knowledge 10x for next-generation clean energy',
    category: 'MATERIALS & ENERGY'
  },
  graphcast: {
    highlight: 'GraphCast',
    statement: 'forecasts global weather 10 days out in under 60 seconds, predicting extreme cyclones and heatwaves days earlier',
    category: 'CLIMATE & EARTH'
  },
  flood_hub: {
    highlight: 'Flood Hub',
    statement: 'alerts 700 million vulnerable people up to 7 days before rivers breach their banks using satellite radar and AI',
    category: 'CLIMATE & EARTH'
  },
  fusion: {
    highlight: 'Autonomous Fusion',
    statement: 'coordinates 19 magnetic coils at 10,000 adjustments per second to bottle burning star plasma hotter than the sun',
    category: 'MATERIALS & ENERGY'
  },
  alphageometry: {
    highlight: 'AlphaGeometry',
    statement: 'solves International Mathematical Olympiad geometry problems at silver-medal level without human guidance',
    category: 'LOGIC & MATHEMATICS'
  },
  enformer: {
    highlight: 'Enformer',
    statement: 'reads 200,000 letters of non-coding human DNA to pinpoint master genetic switches of disease',
    category: 'BIOMOLECULAR & HEALTH'
  },
  ferminet: {
    highlight: 'FermiNet',
    statement: 'solves the fundamental quantum Schrödinger equation from scratch to design green catalysts and carbon capture',
    category: 'LOGIC & MATHEMATICS'
  },
  wildfire: {
    highlight: 'Fire AI',
    statement: 'maps active wildfire boundaries every 15 minutes through blinding smoke plumes using satellite thermal infrared',
    category: 'CLIMATE & EARTH'
  }
};

export function SlidingGallery({ projects, onSelectProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  }, [projects.length]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) {
      handleNext();
    } else if (deltaX < -50) {
      handlePrev();
    }
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex];
  const valueData = VALUE_FORWARD_STATEMENTS[currentProject.id] || {
    highlight: currentProject.title.split(':')[0],
    statement: currentProject.subtitle,
    category: currentProject.category.toUpperCase()
  };

  return (
    <div
      className="promenade-gallery-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Toolbar */}
      <div className="promenade-nav-bar">
        <div className="promenade-counter">
          <span className="current-num">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="divider">/</span>
          <span className="total-num">{String(projects.length).padStart(2, '0')}</span>
        </div>

        <div className="promenade-arrows">
          <button
            className="promenade-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous exhibit"
            title="Previous exhibit"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="promenade-arrow-btn"
            onClick={handleNext}
            aria-label="Next exhibit"
            title="Next exhibit"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Sliding Slide Stage */}
      <div className="promenade-slide-stage">
        {/* Left Editorial Narrative Column (Value-Forward) */}
        <div className="promenade-narrative-col">
          <div className="promenade-eyebrow-clean">
            <span>{valueData.category}</span>
          </div>

          {/* Value-Forward Headline with Highlighter on Project Name */}
          <h2 className="promenade-value-headline">
            <mark className="value-highlight-mark">{valueData.highlight}</mark>{' '}
            {valueData.statement}
          </h2>

          {/* Clean Action Links */}
          <div className="promenade-editorial-links">
            {currentProject.paperUrl && (
              <a
                href={currentProject.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-action-link"
              >
                READ PAPER
              </a>
            )}
            <button
              type="button"
              className="editorial-action-link"
              onClick={() => onSelectProject(currentProject)}
            >
              VIEW BOARD
            </button>
            <button
              type="button"
              className="editorial-action-link"
              onClick={() => onSelectProject(currentProject, { openChat: true })}
            >
              PLAY WITH MODELS
            </button>
          </div>
        </div>

        {/* Right Interactive Visual Stage */}
        <div className="promenade-visual-col">
          <div className="promenade-visual-header">
            <span className="visual-caption-tag">Live Model</span>
            <button
              className="visual-expand-btn"
              onClick={() => onSelectProject(currentProject)}
              title="Open full exhibit"
            >
              <Maximize2 size={13} />
              <span>Full exhibit</span>
            </button>
          </div>

          <div className="promenade-interactive-stage">
            <InteractiveWidget type={currentProject.demoType} />
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="promenade-ticker-strip">
        {projects.map((proj, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={proj.id}
              className={`promenade-thumb-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              title={proj.title}
            >
              <span className="thumb-idx">{String(idx + 1).padStart(2, '0')}</span>
              <strong className="thumb-title">{proj.title.split(':')[0]}</strong>
            </button>
          );
        })}
      </div>
    </div>
  );
}

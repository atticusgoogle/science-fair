import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InteractiveWidget } from './InteractiveDemos';
import { ChevronLeft, ChevronRight, ArrowRight, Maximize2, Sparkles, Layers, Play, Pause } from 'lucide-react';

// Curated provocative "What If" speculative questions for the sliding gallery
const EYE_CATCHING_QUESTIONS = {
  alphafold: {
    question: "What if we could map the atomic structure of every biomolecule in the living universe?",
    sub: "AlphaFold 3 predicts the structure and interactions of proteins, DNA, RNA, and ligands with atomic precision.",
    impactPill: "200M+ Structures Open-Sourced",
  },
  gnome: {
    question: "What if 800 years of new clean tech crystals could be discovered in a single year?",
    sub: "GNoME synthesized 380,000 new stable crystalline materials for EV batteries, solar panels, and semiconductors.",
    impactPill: "800 Years of Discovery Accelerated",
  },
  graphcast: {
    question: "What if AI could forecast extreme 10-day global weather in under 60 seconds?",
    sub: "GraphCast operates at 0.25° resolution, outperforming the world's most powerful numerical supercomputers.",
    impactPill: "90.3% Targets Outperformed",
  },
  fusion: {
    question: "What if neural networks could contain a 100,000,000 °C star in magnetic coils?",
    sub: "Autonomous reinforcement learning controls turbulent plasma shape inside the TCV tokamak reactor.",
    impactPill: "100M °C Plasma Confined",
  },
  flood_hub: {
    question: "What if we could forecast catastrophic river floods 7 days before water crests in 80 nations?",
    sub: "Flood Hub models rainfall and river discharge to safeguard over 700 million people without physical sensors.",
    impactPill: "700M+ Vulnerable Citizens Covered",
  },
  enformer: {
    question: "What if 98% of human 'dark DNA' held the regulatory blueprint to cure genetic disease?",
    sub: "Enformer decodes distal gene expression 100,000 base pairs away from promoters in human and mouse genomes.",
    impactPill: "100kb Sequence Window Context",
  },
  wildfire: {
    question: "What if satellite heat sensors could pierce dense smoke plumes to map wildfires in real time?",
    sub: "Fire AI synthesizes geostationary infrared thermal data to track rapidly moving fire lines for first responders.",
    impactPill: "Real-Time Fireline Mapping",
  },
  ferminet: {
    question: "What if the Schrödinger equation could be solved from pure quantum first principles?",
    sub: "FermiNet's neural wavefunctions capture antisymmetric electron correlations with sub-millihartree precision.",
    impactPill: "Quantum First-Principles Accuracy",
  },
  alphageometry: {
    question: "What if an AI could invent creative mathematical proofs at the International Math Olympiad level?",
    sub: "AlphaGeometry combines a neural language model with a formal deduction engine, solving 25 of 30 Olympiad problems.",
    impactPill: "25/30 Olympiad Theorems Solved",
  },
  bioacoustics: {
    question: "What if an AI listening to the rainforest could identify endangered species from a single chirp?",
    sub: "Perch transforms thousands of hours of bioacoustic audio into automated global biodiversity monitoring.",
    impactPill: "10,000+ Species Cataloged",
  },
};

export function SlidingGallery({ projects, onSelectProject }) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const s = parseInt(params.get('slide'), 10);
      if (!isNaN(s) && s >= 0 && s < projects.length) return s;
    } catch {
      // fallback
    }
    return 0;
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Clamp index if projects change (e.g. filtering)
  useEffect(() => {
    if (currentIndex >= projects.length) {
      setCurrentIndex(Math.max(0, projects.length - 1));
    }
  }, [projects.length, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  }, [projects.length]);

  // Autoscroll every 10 seconds: pauses when user hovers or manually toggles pause
  useEffect(() => {
    if (!isPlaying || isHovered || projects.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, handleNext, projects.length, currentIndex]);

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
  const questionData = EYE_CATCHING_QUESTIONS[currentProject.id] || {
    question: currentProject.leftPanel.question,
    sub: currentProject.subtitle,
    impactPill: currentProject.rightPanel.stats[0]?.value + ' ' + currentProject.rightPanel.stats[0]?.label.split(' ')[0],
  };

  return (
    <div
      className="promenade-gallery-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Promenade Header Toolbar */}
      <div className="promenade-nav-bar">
        <div className="promenade-counter">
          <span className="current-num">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="divider">/</span>
          <span className="total-num">{String(projects.length).padStart(2, '0')}</span>
          <span className="promenade-category-badge">{currentProject.category}</span>
        </div>

        <div className="promenade-nav-controls">
          {/* Autoscroll 10s status toggle */}
          <button
            className={`promenade-autoplay-btn ${isPlaying ? (isHovered ? 'hover-paused' : 'playing') : 'paused'}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? (isHovered ? 'Hovered (Paused) - Click to disable autoscroll' : '10s Autoscroll active - Click to pause') : 'Autoscroll paused - Click to resume'}
            aria-label={isPlaying ? 'Pause autoscroll' : 'Resume autoscroll'}
          >
            {isPlaying ? (
              isHovered ? (
                <>
                  <Pause size={11} />
                  <span>10s (Hover paused)</span>
                </>
              ) : (
                <>
                  <Pause size={11} />
                  <span>10s Autoscroll</span>
                </>
              )
            ) : (
              <>
                <Play size={11} />
                <span>Autoscroll paused</span>
              </>
            )}
          </button>

          <div className="promenade-arrows">
            <button className="promenade-arrow-btn" onClick={handlePrev} aria-label="Previous exhibit" title="Previous exhibit (Left Arrow)">
              <ChevronLeft size={18} />
            </button>
            <button className="promenade-arrow-btn" onClick={handleNext} aria-label="Next exhibit" title="Next exhibit (Right Arrow)">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 10-Second Hairline Progress Indicator */}
      <div className="promenade-timer-bar-track">
        <div
          key={`${currentIndex}-${isPlaying && !isHovered}`}
          className={`promenade-timer-bar-fill ${isPlaying && !isHovered ? 'animating' : 'paused'}`}
        />
      </div>

      {/* Main Sliding Slide Stage */}
      <div className="promenade-slide-stage">
        {/* Left Editorial Narrative Column */}
        <div className="promenade-narrative-col">
          <div className="promenade-eyebrow">
            <span>{currentProject.field} • {currentProject.year}</span>
            {currentProject.award && (
              <span className="promenade-award-tag">{currentProject.award}</span>
            )}
          </div>

          {/* Eye-Catching Provocative Question */}
          <h2 className="promenade-question-heading">
            "{questionData.question}"
          </h2>

          {/* CTA: Unfold 3D Trifold Modal */}
          <div className="promenade-cta-group">
            <button className="promenade-unfold-btn" onClick={() => onSelectProject(currentProject)}>
              <span>Unfold 3D trifold exhibit</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Right Interactive Visual Stage */}
        <div className="promenade-visual-col">
          <div className="promenade-visual-header">
            <span className="visual-caption-tag">Live Computational Model</span>
            <button className="visual-expand-btn" onClick={() => onSelectProject(currentProject)} title="Open full 3-panel study spread">
              <Maximize2 size={13} />
              <span>Full trifold spread</span>
            </button>
          </div>

          <div className="promenade-interactive-stage">
            <InteractiveWidget type={currentProject.demoType} />
          </div>

          <div className="promenade-visual-footer">
            <span className="promenade-method-note">
              <strong>Method:</strong> {currentProject.centerPanel.heading}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Promenade Strip */}
      <div className="promenade-ticker-strip">
        {projects.map((proj, idx) => {
          const isActive = idx === currentIndex;
          const qSnippet = EYE_CATCHING_QUESTIONS[proj.id]?.question || proj.title;

          return (
            <button
              key={proj.id}
              className={`promenade-thumb-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              title={proj.title}
            >
              <span className="thumb-idx">{String(idx + 1).padStart(2, '0')}</span>
              <div className="thumb-info">
                <strong className="thumb-title">{proj.title.split(':')[0]}</strong>
                <span className="thumb-cat">{proj.category}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

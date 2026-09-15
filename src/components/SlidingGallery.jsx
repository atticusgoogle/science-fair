import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InteractiveWidget } from './InteractiveDemos';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [foldState, setFoldState] = useState('open'); // 'open' | 'closing' | 'opening'
  const isTransitioning = useRef(false);
  const lastWheelTime = useRef(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Transition to a specific slide with realistic trifold board folding & unfolding
  const goToSlide = useCallback((targetIndex) => {
    if (isTransitioning.current || targetIndex === currentIndex) return;
    isTransitioning.current = true;

    // 1. Fold the current trifold wings shut
    setFoldState('closing');

    // 2. While folded, switch to target project and begin unfolding open
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setFoldState('opening');

      // 3. Complete unfold into standing position
      setTimeout(() => {
        setFoldState('open');
        isTransitioning.current = false;
      }, 340);
    }, 280);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    const nextIdx = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    goToSlide(nextIdx);
  }, [currentIndex, projects.length, goToSlide]);

  const handleNext = useCallback(() => {
    const nextIdx = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    goToSlide(nextIdx);
  }, [currentIndex, projects.length, goToSlide]);

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

  // Horizontal wheel / trackpad scroll listener:
  // As user scrolls left/right, the current trifold closes and opens to the next
  const handleWheel = useCallback((e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) < 25) return;

    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;
    lastWheelTime.current = now;

    if (delta > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 45) {
      handleNext();
    } else if (deltaX < -45) {
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

  // Monogram initials for left wing
  const initials = currentProject.researcher.name
    .split(' ')
    .filter(w => !w.startsWith('Dr.') && !w.startsWith('&') && w.length > 0)
    .slice(0, 2)
    .map(w => w[0])
    .join('');

  return (
    <div
      className="promenade-gallery-wrapper"
      onWheel={handleWheel}
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

          {/* Clean Action Links: Only VIEW BOARD */}
          <div className="promenade-editorial-links">
            <button
              type="button"
              className="editorial-action-link"
              onClick={() => onSelectProject(currentProject)}
            >
              VIEW BOARD
            </button>
          </div>
        </div>

        {/* Right Standing 3D Trifold Board View */}
        <div className="promenade-trifold-stage">
          {/* Standing Tabletop Drop Shadow */}
          <div className={`promenade-board-shadow ${foldState}`} />

          {/* 3-Panel Standing Trifold Assembly */}
          <div className={`promenade-trifold-board ${foldState}`}>
            {/* Left Wing */}
            <div className="promenade-wing left">
              <div className="wing-paperboard-surface">
                <div className="wing-monogram">{initials}</div>
                <div className="wing-lines">
                  <div className="wline w-80" />
                  <div className="wline w-60" />
                  <div className="wline w-70" />
                </div>
                <div className="wing-field-badge">
                  {currentProject.category.split('&')[0].trim()}
                </div>
              </div>
            </div>

            {/* Center Panel (Houses the Interactive Computational Model) */}
            <div className="promenade-center-panel">
              <div className="center-board-surface">
                <div className="center-model-viewport">
                  <InteractiveWidget type={currentProject.demoType} project={currentProject} />
                </div>
              </div>
            </div>

            {/* Right Wing */}
            <div className="promenade-wing right">
              <div className="wing-paperboard-surface">
                {currentProject.rightPanel?.stats?.[0] && (
                  <div className="wing-stat-card">
                    <strong className="wing-stat-num">{currentProject.rightPanel.stats[0].value}</strong>
                    <span className="wing-stat-lbl">
                      {currentProject.rightPanel.stats[0].label
                        .split(' ')
                        .filter(w => !['of', 'the', 'in', 'for', 'to'].includes(w.toLowerCase()))
                        .slice(0, 2)
                        .join(' ')}
                    </span>
                  </div>
                )}
                {currentProject.award && (
                  <div className="wing-award-ribbon">
                    <span>{currentProject.award}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

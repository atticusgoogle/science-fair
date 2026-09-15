import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InteractiveWidget } from './InteractiveDemos';

// Value-forward statements with highlighted breakthrough names
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
  const trackRef = useRef(null);
  const slotRefs = useRef([]);
  const rafRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartLeft = useRef(0);
  const hasDragged = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Continuously compute each poster's distance from viewport center
  // and drive its 3D wing folding (--abs-dist, --signed-dist) in real time
  const updateScrollTransforms = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const viewportCenter = trackRect.left + trackRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    slotRefs.current.forEach((slotEl, idx) => {
      if (!slotEl) return;
      const rect = slotEl.getBoundingClientRect();
      const slotCenter = rect.left + rect.width / 2;
      const rawPixelOffset = slotCenter - viewportCenter;

      // Normalize distance relative to slot spacing (-1 to +1 range for adjacent posters)
      const normalizedOffset = rawPixelOffset / 880;
      const signedDist = Math.max(-1.15, Math.min(1.15, normalizedOffset));
      const absDist = Math.min(1, Math.abs(signedDist));

      slotEl.style.setProperty('--signed-dist', signedDist.toFixed(4));
      slotEl.style.setProperty('--abs-dist', absDist.toFixed(4));

      if (Math.abs(rawPixelOffset) < minDistance) {
        minDistance = Math.abs(rawPixelOffset);
        closestIdx = idx;
      }
    });

    setActiveIndex(prev => (prev !== closestIdx ? closestIdx : prev));
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScrollTransforms);
  }, [updateScrollTransforms]);

  // Scroll smoothly to a specific poster index
  const scrollToPoster = useCallback((index, behavior = 'smooth') => {
    const slotEl = slotRefs.current[index];
    const track = trackRef.current;
    if (!slotEl || !track) return;

    const slotLeft = slotEl.offsetLeft;
    const slotWidth = slotEl.offsetWidth;
    const trackWidth = track.clientWidth;
    const targetScrollLeft = slotLeft - (trackWidth - slotWidth) / 2;

    track.scrollTo({
      left: targetScrollLeft,
      behavior
    });
  }, []);

  // Mouse drag-to-scroll support (ignores clicks inside the interactive model viewport)
  const handleMouseDown = (e) => {
    if (e.target.closest('.center-model-viewport') || e.target.closest('button')) return;
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - track.offsetLeft;
    scrollStartLeft.current = track.scrollLeft;
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX.current) * 1.25;
    if (Math.abs(walk) > 6) {
      hasDragged.current = true;
    }
    track.scrollLeft = scrollStartLeft.current - walk;
  };

  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const track = trackRef.current;
    if (!track) return;
    track.style.scrollSnapType = 'x mandatory';
    track.style.scrollBehavior = 'smooth';
    // Snap smoothly to closest poster
    scrollToPoster(activeIndex, 'smooth');
  };

  // Initialize scroll position (and support ?slide= query param)
  useEffect(() => {
    let initialIdx = 0;
    try {
      const params = new URLSearchParams(window.location.search);
      const s = parseInt(params.get('slide'), 10);
      if (!isNaN(s) && s >= 0 && s < projects.length) {
        initialIdx = s;
      }
    } catch {
      // ignore
    }

    // Wait one frame for layout measurements
    const timer = requestAnimationFrame(() => {
      if (initialIdx > 0) {
        scrollToPoster(initialIdx, 'instant');
      }
      updateScrollTransforms();
    });

    const onResize = () => updateScrollTransforms();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [projects.length, scrollToPoster, updateScrollTransforms]);

  // Keyboard navigation (ArrowLeft / ArrowRight) connected to smooth horizontal scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const nextIdx = Math.max(0, activeIndex - 1);
        scrollToPoster(nextIdx, 'smooth');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = Math.min(projects.length - 1, activeIndex + 1);
        scrollToPoster(nextIdx, 'smooth');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, projects.length, scrollToPoster]);

  // Convert vertical mouse wheel scrolling into smooth connected horizontal scroll
  const handleWheel = useCallback((e) => {
    const track = trackRef.current;
    if (!track) return;

    // If user is scrolling primarily vertically with a mouse wheel, glide horizontally
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
      // Allow native horizontal trackpad swipe to pass through untouched
      track.scrollLeft += e.deltaY * 1.15;
    }
  }, []);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="connected-gallery-bleed">
      <div
        ref={trackRef}
        className="connected-trifold-stream"
        onScroll={handleScroll}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {projects.map((project, idx) => {
          const valueData = VALUE_FORWARD_STATEMENTS[project.id] || {
            highlight: project.title.split(':')[0],
            statement: project.subtitle,
            category: project.category.toUpperCase()
          };
          const isActive = idx === activeIndex;

          return (
            <div
              key={project.id}
              ref={(el) => { slotRefs.current[idx] = el; }}
              className={`connected-poster-slot ${isActive ? 'is-active' : 'is-neighbor'}`}
              onClick={() => {
                if (!hasDragged.current && !isActive) {
                  scrollToPoster(idx, 'smooth');
                }
              }}
            >
              {/* Diffused Tabletop Shadow underneath each standing trifold */}
              <div className="poster-table-shadow" />

              {/* Full 3-Panel Standing Trifold Poster */}
              <div className="poster-3d-assembly">
                {/* LEFT FOLD: Editorial Value Narrative */}
                <div className="poster-wing left">
                  <div className="poster-wing-surface left-surface">
                    <div className="poster-eyebrow">
                      <span>{valueData.category}</span>
                    </div>

                    <h2 className="poster-headline">
                      <mark className="value-highlight-mark">{valueData.highlight}</mark>{' '}
                      {valueData.statement}
                    </h2>

                    <div className="poster-index-mark">
                      <span className="idx-current">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="idx-slash">/</span>
                      <span className="idx-total">{String(projects.length).padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>

                {/* CENTER FOLD: Interactive Computational Model */}
                <div className="poster-center">
                  <div className="poster-center-surface">
                    <div className="center-model-viewport">
                      <InteractiveWidget type={project.demoType} project={project} />
                    </div>
                  </div>
                </div>

                {/* RIGHT FOLD: Minimalist Architectural Portal (Zero Clutter) */}
                <div className="poster-wing right">
                  <div className="poster-wing-surface right-surface">
                    <div className="poster-right-top-rule" />

                    <div className="poster-right-cta-wrap">
                      <button
                        type="button"
                        className="poster-view-board-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                      >
                        <span>VIEW BOARD</span>
                        <span className="btn-arrow">↗</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

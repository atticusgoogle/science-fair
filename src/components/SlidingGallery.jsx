import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InteractiveWidget } from './InteractiveDemos';
import gsap from 'gsap';

// Value-forward statements + Real-world human use-case photography for the side flaps
const VALUE_FORWARD_STATEMENTS = {
  alphafold: {
    highlight: 'Alphafold 3',
    statement: 'accelerates new vaccine candidates for neglected tropical diseases and predicts the 3D atomic structure of all molecules of life',
    category: 'BIOMOLECULAR & HEALTH',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
      tag: 'CLINICAL IMPACT',
      caption: 'Designing targeted treatments for malaria & neglected tropical diseases in months instead of years.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80',
      tag: 'GLOBAL SCALE',
      stat: '2M+ Scientists',
      caption: 'Researchers across 190 countries using free 3D molecular structures daily.'
    }
  },
  gnome: {
    highlight: 'GNoME',
    statement: 'discovered 2.2 million new crystal materials, expanding human knowledge 10x for next-generation clean energy',
    category: 'MATERIALS & ENERGY',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      tag: 'CLEAN ENERGY',
      caption: 'Unlocking high-capacity solid-state EV batteries and ultra-efficient solar cells.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      tag: 'LAB SYNTHESIS',
      stat: '380,000 Crystals',
      caption: 'Stable new materials identified by AI and verified in autonomous robotics labs.'
    }
  },
  graphcast: {
    highlight: 'GraphCast',
    statement: 'forecasts global weather 10 days out in under 60 seconds, predicting extreme cyclones and heatwaves days earlier',
    category: 'CLIMATE & EARTH',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      tag: 'DISASTER RESPONSE',
      caption: 'Giving coastal families extra days to evacuate safely before extreme cyclones strike.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      tag: 'SPEED BREAKTHROUGH',
      stat: 'Under 60 Sec',
      caption: 'Outperforms traditional supercomputer weather simulations on 90% of atmospheric metrics.'
    }
  },
  fusion: {
    highlight: 'Autonomous Fusion',
    statement: 'coordinates 19 magnetic coils at 10,000 adjustments per second to bottle burning star plasma hotter than the sun',
    category: 'MATERIALS & ENERGY',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
      tag: 'ZERO-CARBON GRID',
      caption: 'Paving the path toward limitless, safe, zero-emission baseload power for cities worldwide.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      tag: 'PLASMA CONTROL',
      stat: '100 Million °C',
      caption: 'Deep reinforcement learning sculpts superheated plasma inside magnetic tokamaks.'
    }
  },
  flood_hub: {
    highlight: 'Flood Hub',
    statement: 'alerts 700 million vulnerable people up to 7 days before rivers breach their banks using satellite radar and AI',
    category: 'CLIMATE & EARTH',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
      tag: 'COMMUNITY PROTECTION',
      caption: 'Delivering localized smartphone flood warnings to villages along unmonitored river basins.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80',
      tag: 'GLOBAL REACH',
      stat: '700M People',
      caption: 'Protecting communities across 80+ countries with free 7-day advance flood forecasts.'
    }
  },
  enformer: {
    highlight: 'Enformer',
    statement: 'reads 200,000 letters of non-coding human DNA to pinpoint master genetic switches of disease',
    category: 'BIOMOLECULAR & HEALTH',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80',
      tag: 'PRECISION GENOMICS',
      caption: 'Helping clinical geneticists uncover hidden mutations responsible for complex inherited diseases.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      tag: 'DARK GENOME',
      stat: '98% of DNA',
      caption: 'Decodes how distant regulatory switches fold in 3D space to turn human genes on or off.'
    }
  },
  wildfire: {
    highlight: 'Fire AI',
    statement: 'maps active wildfire boundaries every 15 minutes through blinding smoke plumes using satellite thermal infrared',
    category: 'CLIMATE & EARTH',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      tag: 'FRONTLINE SAFETY',
      caption: 'Guiding emergency responders and evacuating families safely around fast-moving fire perimeters.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80',
      tag: 'LIVE SATELLITE AI',
      stat: 'Every 15 Min',
      caption: 'Real-time wildfire boundary alerts broadcast directly in Google Search and Maps.'
    }
  },
  ferminet: {
    highlight: 'FermiNet',
    statement: 'solves the fundamental quantum Schrödinger equation from scratch to design green catalysts and carbon capture',
    category: 'LOGIC & MATHEMATICS',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
      tag: 'GREEN CHEMISTRY',
      caption: 'Simulating complex chemical reactions virtually to discover cleaner industrial catalysts.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
      tag: 'QUANTUM PRECISION',
      stat: 'Zero Lab Data',
      caption: 'Calculates electron wavefunctions from pure first principles without empirical shortcuts.'
    }
  },
  alphageometry: {
    highlight: 'AlphaGeometry',
    statement: 'solves International Mathematical Olympiad geometry problems at silver-medal level without human guidance',
    category: 'LOGIC & MATHEMATICS',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      tag: 'VERIFIED ENGINEERING',
      caption: 'Providing mathematical certainty for safety-critical aerospace and structural engineering.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?auto=format&fit=crop&w=600&q=80',
      tag: 'NEURO-SYMBOLIC AI',
      stat: '25 / 30 Solved',
      caption: 'Combines neural intuition with formal deduction to construct Olympiad-grade mathematical proofs.'
    }
  },
  bioacoustics: {
    highlight: 'Perch',
    statement: 'identifies more than 10,000 species of birds, frogs, and mammals from distant chirps in dense canopies',
    category: 'CLIMATE & EARTH',
    useCaseLeft: {
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      tag: 'RAINFOREST RECOVERY',
      caption: 'Monitoring endangered wildlife recovery in remote tropical forests using solar microphones.'
    },
    useCaseRight: {
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
      tag: 'BIODIVERSITY SCALE',
      stat: '10,000+ Species',
      caption: 'Detects rare vocalizations across millions of hours of wild acoustic recordings.'
    }
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
  const isTransitioningOut = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Continuously compute each poster's distance from viewport center
  // and drive its 3D flap folding (--abs-dist, --signed-dist) in real time
  const updateScrollTransforms = useCallback(() => {
    if (isTransitioningOut.current) return;
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

      // Dead-zone snap threshold so the centered board stands 100% straight and symmetric
      const effectiveOffset = Math.abs(rawPixelOffset) < 12 ? 0 : rawPixelOffset;

      // Normalize distance relative to slot spacing (-1 to +1 range for adjacent posters)
      const normalizedOffset = effectiveOffset / 1050;
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

  // GSAP Creative-Lab Origami Fold & Camera Dolly Transition when clicking "VIEW BOARD"
  const handleTriggerViewBoard = useCallback((project, idx, e) => {
    if (e) e.stopPropagation();
    if (isTransitioningOut.current) return;

    const slotEl = slotRefs.current[idx];
    if (!slotEl) {
      onSelectProject(project);
      return;
    }

    isTransitioningOut.current = true;
    const assembly = slotEl.querySelector('.poster-3d-assembly');
    const leftFlap = slotEl.querySelector('.poster-flap.left');
    const rightFlap = slotEl.querySelector('.poster-flap.right');
    const shadow = slotEl.querySelector('.poster-table-shadow');

    const tl = gsap.timeline({
      onComplete: () => {
        onSelectProject(project);
        // Reset inline GSAP transforms after modal covers screen
        setTimeout(() => {
          gsap.set([assembly, leftFlap, rightFlap, shadow], { clearProps: 'all' });
          isTransitioningOut.current = false;
          updateScrollTransforms();
        }, 120);
      }
    });

    // 1. Fold the side flaps inward briefly like a real trifold board gathering momentum
    tl.to(leftFlap, {
      rotationY: 72,
      duration: 0.22,
      ease: 'power2.in'
    }, 0)
    .to(rightFlap, {
      rotationY: -72,
      duration: 0.22,
      ease: 'power2.in'
    }, 0)
    // 2. Simultaneously elevate the board and sweep flaps open while zooming into the exhibition spread
    .to(assembly, {
      z: 160,
      scale: 1.09,
      rotationX: 2,
      duration: 0.44,
      ease: 'power3.inOut'
    }, 0.12)
    .to(leftFlap, {
      rotationY: 12,
      duration: 0.34,
      ease: 'power3.out'
    }, 0.22)
    .to(rightFlap, {
      rotationY: -12,
      duration: 0.34,
      ease: 'power3.out'
    }, 0.22)
    .to(shadow, {
      scaleX: 1.25,
      opacity: 0.1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.12);
  }, [onSelectProject, updateScrollTransforms]);

  // Mouse drag-to-scroll support (ignores clicks inside interactive model viewport)
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

    const timer = requestAnimationFrame(() => {
      scrollToPoster(initialIdx, 'instant');
      updateScrollTransforms();
    });

    const onResize = () => {
      scrollToPoster(activeIndex, 'instant');
      updateScrollTransforms();
    };
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
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
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
            category: project.category.toUpperCase(),
            useCaseLeft: {
              image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
              tag: 'FIELD APPLICATION',
              caption: project.leftPanel.whyItMatters
            },
            useCaseRight: {
              image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
              tag: 'REAL-WORLD SCALE',
              stat: project.rightPanel.stats[0]?.value || 'Global',
              caption: project.rightPanel.stats[0]?.label || ''
            }
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

              {/* Grand 3-Panel Standing Trifold Assembly */}
              <div className="poster-3d-assembly">
                {/* LEFT FLAP: Real-World Use Case Documentary Photo (B&W until hover) */}
                <div className="poster-flap left">
                  <div className="poster-flap-surface left-flap-surface">
                    <div className="flap-header-row">
                      <div className="flap-index-badge">
                        <span className="idx-current">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="idx-slash">/</span>
                        <span className="idx-total">{String(projects.length).padStart(2, '0')}</span>
                      </div>
                    </div>

                    <div className="flap-usecase-photo-frame">
                      <img
                        src={valueData.useCaseLeft.image}
                        alt={valueData.useCaseLeft.tag}
                        className="flap-usecase-img"
                        loading="lazy"
                      />
                    </div>

                    <p className="flap-usecase-caption">
                      {valueData.useCaseLeft.caption}
                    </p>
                  </div>
                </div>

                {/* GRAND CENTER PANEL: Houses BOTH Main Narrative Text & Interactive Model */}
                <div className="poster-center-grand">
                  <div className="poster-center-grand-surface">
                    <div className="center-grand-grid">
                      {/* Left Column inside Center Panel: Editorial Narrative & VIEW BOARD */}
                      <div className="center-narrative-col">
                        <div className="poster-eyebrow">
                          <span>{valueData.category}</span>
                        </div>

                        <h2 className="poster-headline-grand">
                          <mark className="poster-highlight-name">{valueData.highlight}</mark>{' '}
                          {valueData.statement}
                        </h2>

                        <div className="center-cta-row">
                          <button
                            type="button"
                            className="poster-view-board-btn"
                            onClick={(e) => handleTriggerViewBoard(project, idx, e)}
                          >
                            <span>VIEW BOARD</span>
                            <span className="btn-arrow">↗</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Column inside Center Panel: Interactive Computational Model */}
                      <div className="center-model-col">
                        <div className="center-model-viewport">
                          <InteractiveWidget type={project.demoType} project={project} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT FLAP: Real-World Human Scale & Impact Vignette (B&W until hover) */}
                <div className="poster-flap right">
                  <div className="poster-flap-surface right-flap-surface">
                    <div className="flap-header-row right-align-spacer" aria-hidden="true" />

                    <div className="flap-usecase-photo-frame">
                      <img
                        src={valueData.useCaseRight.image}
                        alt={valueData.useCaseRight.tag}
                        className="flap-usecase-img"
                        loading="lazy"
                      />
                    </div>

                    <p className="flap-usecase-caption">
                      {valueData.useCaseRight.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Horizontal Scroll Affordance Box (Clean without 01/10 or arrow buttons) */}
      <div className="sliding-gallery-scroll-bar">
        <span className="scroll-hint-text">← Scroll or drag horizontally to explore →</span>
      </div>
    </div>
  );
}

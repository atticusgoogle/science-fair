import React, { useEffect, useRef, useCallback } from 'react';
import { InteractiveWidget } from './InteractiveDemos';
import { StickyPaperChat } from './StickyPaperChat';
import { Award, Sparkles, X, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

export function TrifoldModal({ project, initialOpenChat = false, onClose }) {
  const overlayRef = useRef(null);
  const spreadRef = useRef(null);
  const leftPanelRef = useRef(null);
  const centerPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const isClosing = useRef(false);

  // Smooth GSAP fold-shut exit animation before calling onClose
  const handleSmoothClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      }
    });

    // Fold wings shut over the center panel and recede smoothly
    tl.to(leftPanelRef.current, {
      rotationY: 78,
      opacity: 0.7,
      duration: 0.38,
      ease: 'power3.inOut'
    }, 0)
    .to(rightPanelRef.current, {
      rotationY: -78,
      opacity: 0.7,
      duration: 0.38,
      ease: 'power3.inOut'
    }, 0)
    .to(spreadRef.current, {
      scale: 0.86,
      z: -180,
      rotationX: 4,
      opacity: 0,
      duration: 0.44,
      ease: 'power3.inOut'
    }, 0.06)
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.38,
      ease: 'power2.out'
    }, 0.12);
  }, [onClose]);

  useEffect(() => {
    // GSAP Entrance Choreography: Smooth, gradual, Creative-Lab 3D Origami Unfold
    const overlay = overlayRef.current;
    const spread = spreadRef.current;
    const leftPanel = leftPanelRef.current;
    const centerPanel = centerPanelRef.current;
    const rightPanel = rightPanelRef.current;

    const sectionBlocks = spread.querySelectorAll('.section-block, .pinned-header-strip, .method-summary-box, .center-interactive-stage, .specs-grid, .researcher-quote-box, .publication-card, .award-ribbon-pill');

    // Initial folded state
    gsap.set(overlay, { opacity: 0 });
    gsap.set(spread, { scale: 0.88, z: -160, rotationX: 5 });
    gsap.set(leftPanel, { rotationY: 82, transformOrigin: 'right center', opacity: 0.5 });
    gsap.set(rightPanel, { rotationY: -82, transformOrigin: 'left center', opacity: 0.5 });
    gsap.set(centerPanel, { opacity: 0.85 });
    gsap.set(sectionBlocks, { y: 18, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Backdrop fade-in + Board dolly forward
    tl.to(overlay, { opacity: 1, duration: 0.42 }, 0)
      .to(spread, {
        scale: 1,
        z: 0,
        rotationX: 0,
        duration: 0.82,
        ease: 'expo.out'
      }, 0.04)
      .to(centerPanel, { opacity: 1, duration: 0.45 }, 0.08)
      // 2. Gradual, elegant unfolding of Left and Right wings
      .to(leftPanel, {
        rotationY: 18,
        opacity: 1,
        duration: 0.88,
        ease: 'power3.out'
      }, 0.14)
      .to(rightPanel, {
        rotationY: -18,
        opacity: 1,
        duration: 0.88,
        ease: 'power3.out'
      }, 0.14)
      // 3. Staggered reveal of interior exhibition cards
      .to(sectionBlocks, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.035,
        ease: 'power2.out'
      }, 0.28);

    // Keyboard escape to close
    const handleKey = (e) => {
      if (e.key === 'Escape') handleSmoothClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      tl.kill();
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleSmoothClose]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div ref={overlayRef} className="trifold-modal-overlay" onClick={handleSmoothClose}>
      {/* Fixed Persistent Top-Right Close Button */}
      <button
        className="modal-fixed-close-btn"
        onClick={handleSmoothClose}
        aria-label="Close exhibit"
        title="Close exhibit"
      >
        <X size={18} />
      </button>

      {/* Sticky Right-Side "Talk to this Paper" Button & Slide-Over Chatbox Drawer */}
      <StickyPaperChat project={project} initialOpen={initialOpenChat} />

      <div className="trifold-modal-viewport" onClick={(e) => e.stopPropagation()}>
        {/* 3D Hinged Trifold Spread controlled by GSAP */}
        <div ref={spreadRef} className="trifold-full-spread gsap-driven">
          {/* ================= LEFT PANEL ================= */}
          <div ref={leftPanelRef} className="trifold-panel left-panel">
            <div className="panel-inner-paper">
              <div className="section-block">
                <span className="panel-eyebrow">The researcher</span>
                <div className="researcher-card">
                  <div className="researcher-avatar-box">
                    <span className="avatar-monogram">
                      {project.researcher.name.split(' ').filter(w => !w.startsWith('Dr.') && !w.startsWith('&')).slice(0, 2).map(w => w[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="researcher-name">{project.researcher.name}</h4>
                    <p className="researcher-role">{project.researcher.role}</p>
                    <p className="researcher-affiliation">{project.researcher.affiliation}</p>
                  </div>
                </div>
              </div>

              <div className="section-block">
                <span className="panel-eyebrow">The research question</span>
                <div className="highlight-callout">
                  <p className="question-text">"{project.leftPanel.question}"</p>
                </div>
              </div>

              <div className="section-block">
                <span className="panel-eyebrow">Why it matters</span>
                <p className="body-text">{project.leftPanel.whyItMatters}</p>
              </div>

              <div className="section-block">
                <span className="panel-eyebrow">Background & significance</span>
                <ul className="bullet-list">
                  {project.leftPanel.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ================= CENTER PANEL ================= */}
          <div ref={centerPanelRef} className="trifold-panel center-panel">
            <div className="panel-inner-paper">
              {/* Clean Title Header Strip */}
              <div className="pinned-header-strip">
                <h1 className="hero-board-title">{project.title}</h1>
                <p className="hero-board-subtitle">{project.subtitle}</p>
              </div>

              {/* AI Architecture Overview */}
              <div className="method-summary-box">
                <span className="panel-eyebrow">Methodology & architecture</span>
                <p className="method-text">{project.centerPanel.methodology}</p>
              </div>

              {/* Interactive Center Widget */}
              <div className="center-interactive-stage">
                <div className="stage-header">
                  <div className="interactive-indicator">
                    <Sparkles size={14} />
                    <strong>{project.centerPanel.demoTitle}</strong>
                  </div>
                  <span className="stage-hint">Live computational model</span>
                </div>

                <div className="stage-body">
                  <InteractiveWidget type={project.demoType} />
                </div>

                <p className="stage-caption">{project.centerPanel.demoDescription}</p>
              </div>

              {/* Performance Specs */}
              <div className="specs-grid">
                {project.centerPanel.specs.map((sp, idx) => (
                  <div key={idx} className="spec-item">
                    <span className="spec-label">{sp.label}</span>
                    <strong className="spec-value">{sp.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div ref={rightPanelRef} className="trifold-panel right-panel">
            <div className="panel-inner-paper">
              {/* Award Line */}
              {project.award && (
                <div className="award-ribbon-pill" onClick={triggerCelebration} title="Click to Celebrate">
                  <Award size={15} />
                  <span>{project.award}</span>
                </div>
              )}

              <div className="section-block">
                <span className="panel-eyebrow">Results & scale</span>
                <div className="stats-stack">
                  {project.rightPanel.stats.map((st, idx) => (
                    <div key={idx} className="stat-card">
                      <strong className="stat-big">{st.value}</strong>
                      <span className="stat-sub">{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-block">
                <span className="panel-eyebrow">Real-world impact</span>
                <ul className="bullet-list">
                  {project.rightPanel.impactPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Researcher Direct Quote */}
              <div className="researcher-quote-box">
                <p className="quote-text">"{project.researcher.quote}"</p>
                <span className="quote-author">— {project.researcher.name}</span>
              </div>

              {/* Primary Research Publication Card */}
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noreferrer"
                className="physical-bridge-card publication-card"
                title="Read full scientific paper"
              >
                <div className="bridge-icon"><FileText size={16} /></div>
                <div>
                  <strong>Primary Research Publication</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

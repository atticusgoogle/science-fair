import React, { useState, useEffect } from 'react';
import { InteractiveWidget } from './InteractiveDemos';
import { InteractivePaperChat } from './InteractivePaperChat';
import { ExternalLink, Award, Sparkles, X, MessageSquareQuote, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export function TrifoldModal({ project, initialOpenChat = false, onClose }) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState('findings');

  useEffect(() => {
    // Trigger smooth 3D unfolding animation right after mount
    const timer = setTimeout(() => setIsUnfolded(true), 60);

    // Keyboard escape to close
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="trifold-modal-overlay" onClick={onClose}>
      {/* Fixed Persistent Top-Right Close Button - Always visible regardless of scroll position or screen size */}
      <button
        className="modal-fixed-close-btn"
        onClick={onClose}
        aria-label="Close exhibit"
        title="Close exhibit [ESC]"
      >
        <X size={18} />
        <span className="esc-hint">ESC</span>
      </button>

      <div className="trifold-modal-viewport" onClick={(e) => e.stopPropagation()}>
        {/* Top Floating Control Bar */}
        <div className="modal-top-bar">
          <div className="board-category-chip">
            {project.category} • {project.year}
          </div>
          <div className="top-bar-actions">
            <button
              className={`action-pill-btn chat ${rightPanelTab === 'chat' ? 'active' : ''}`}
              onClick={() => setRightPanelTab(rightPanelTab === 'chat' ? 'findings' : 'chat')}
              title="Toggle between results and interactive paper Q&A"
            >
              <MessageSquareQuote size={14} />
              <span>{rightPanelTab === 'chat' ? 'Results & impact' : 'Ask the paper'}</span>
              {rightPanelTab === 'chat' && <span className="live-chat-dot" />}
            </button>
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noreferrer"
              className="action-pill-btn paper"
              title="Read Published Scientific Paper"
            >
              <ExternalLink size={14} />
              <span>Original paper</span>
            </a>
            <button className="close-btn" onClick={onClose} title="Close exhibit [ESC]">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 3D Hinged Trifold Spread */}
        <div className={`trifold-full-spread ${isUnfolded ? 'unfolded' : 'folded'}`}>
          {/* ================= LEFT PANEL ================= */}
          <div className="trifold-panel left-panel">
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
          <div className="trifold-panel center-panel">
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
          <div className="trifold-panel right-panel">
            <div className="panel-inner-paper">
              {/* Award Line */}
              {project.award && (
                <div className="award-ribbon-pill" onClick={triggerCelebration} title="Click to Celebrate">
                  <Award size={15} />
                  <span>{project.award}</span>
                </div>
              )}

              {/* Integrated Panel Mode Tabs */}
              <div className="right-panel-tab-bar">
                <button
                  type="button"
                  className={`panel-tab-btn ${rightPanelTab === 'findings' ? 'active' : ''}`}
                  onClick={() => setRightPanelTab('findings')}
                >
                  <Sparkles size={13} />
                  <span>Results & Impact</span>
                </button>
                <button
                  type="button"
                  className={`panel-tab-btn ${rightPanelTab === 'chat' ? 'active' : ''}`}
                  onClick={() => setRightPanelTab('chat')}
                >
                  <MessageSquareQuote size={13} />
                  <span>Ask the Paper</span>
                  <span className="live-dot-mini" />
                </button>
              </div>

              {rightPanelTab === 'chat' ? (
                <div className="embedded-chat-wrapper simple">
                  <InteractivePaperChat project={project} />
                </div>
              ) : (
                <>
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

                  {/* Interactive Paper Inquiry Card */}
                  <div
                    className="interactive-inquiry-card"
                    onClick={() => setRightPanelTab('chat')}
                    title="Ask the paper questions"
                  >
                    <div className="inquiry-icon-wrap">
                      <MessageSquareQuote size={16} />
                    </div>
                    <div className="inquiry-content">
                      <div className="inquiry-title-row">
                        <strong>Talk to this Paper</strong>
                      </div>
                    </div>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

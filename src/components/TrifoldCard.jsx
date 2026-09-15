import React from 'react';
import { ModelThumbnail } from './ModelThumbnail';

const BENEFIT_FRONTLOAD_PHRASES = {
  alphafold: 'Accelerates new vaccines and predicts the 3D atomic shape of life’s molecules',
  gnome: 'Discovered 2.2 million new crystal materials for next-generation clean energy',
  graphcast: 'Forecasts extreme global weather 10 days out in under 60 seconds',
  fusion: 'Bottles star plasma hotter than the sun to unlock limitless clean energy',
  flood_hub: 'Alerts 700 million vulnerable people up to 7 days before river floods strike',
  enformer: 'Pinpoints master genetic switches of disease across non-coding human DNA',
  wildfire: 'Maps active wildfire boundaries every 15 minutes through blinding smoke',
  ferminet: 'Solves quantum physics equations from scratch to design green catalysts',
  alphageometry: 'Solves Olympiad geometry theorems at silver-medal level without human guidance',
  bioacoustics: 'Identifies 10,000+ endangered species from distant chirps in dense canopies'
};

// Standing 3D Mini-Trifold Thumbnail
// Sculptural paperboard object with CSS 3D perspective
export function TrifoldCard({ project, onSelect }) {
  const shortTitle = project.title.split(':')[0];
  const benefitPhrase = BENEFIT_FRONTLOAD_PHRASES[project.id] || project.leftPanel.whyItMatters;

  // Extract clean monogram initials for the left fold
  const initials = project.researcher.name
    .split(' ')
    .filter(w => !w.startsWith('Dr.') && !w.startsWith('&') && w.length > 0)
    .slice(0, 2)
    .map(w => w[0])
    .join('');

  // Concise 2-word stat label for the right fold
  const statLabel = project.rightPanel.stats[0].label
    .split(' ')
    .filter(w => !['of', 'the', 'in', 'for', 'to', 'on'].includes(w.toLowerCase()))
    .slice(0, 2)
    .join(' ');

  return (
    <div className="trifold-thumbnail-container" onClick={() => onSelect(project)}>
      <div className="trifold-3d-scene">
        {/* Soft Tabletop Shadow */}
        <div className="trifold-table-shadow" />

        {/* 3-Panel Standing Board */}
        <div className="trifold-standing-board">
          {/* Left Wing (Minimal Researcher Info) */}
          <div className="panel-wing left">
            <div className="panel-cardboard-surface wing-minimal-surface">
              <div className="mini-panel-header">
                <span>Lead</span>
              </div>
              <div className="mini-avatar-monogram">{initials}</div>
              <span className="mini-wing-subtext">{project.year}</span>
            </div>
          </div>

          {/* Center Main Board */}
          <div className="panel-center">
            <div className="panel-cardboard-surface center-cardboard-layout">
              {/* Benefit-Frontloaded Statement */}
              <div className="taped-title-card benefit-only-card">
                <p className="benefit-frontload-phrase">{benefitPhrase}</p>
              </div>

              {/* Center Diagram Graphic Preview */}
              <div className="center-diagram-preview">
                <ModelThumbnail demoType={project.demoType} title={project.title} />
              </div>
            </div>
          </div>

          {/* Right Wing (Minimal Key Stat) */}
          <div className="panel-wing right">
            <div className="panel-cardboard-surface wing-minimal-surface">
              <div className="mini-panel-header">
                <span>Scale</span>
              </div>
              <div className="mini-stat-box">
                <strong>{project.rightPanel.stats[0].value}</strong>
                <span>{statLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Understated Card Label */}
      <div className="trifold-meta-footer">
        <span className="project-lead">{shortTitle}</span>
        <span className="unfold-prompt">View board →</span>
      </div>
    </div>
  );
}

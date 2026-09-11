import React from 'react';
import { ModelThumbnail } from './ModelThumbnail';

// Standing 3D Mini-Trifold Thumbnail
// Sculptural paperboard object with CSS 3D perspective
export function TrifoldCard({ project, onSelect }) {
  // Extract clean monogram initials
  const initials = project.researcher.name
    .split(' ')
    .filter(w => !w.startsWith('Dr.') && !w.startsWith('&') && w.length > 0)
    .slice(0, 2)
    .map(w => w[0])
    .join('');

  return (
    <div className="trifold-thumbnail-container" onClick={() => onSelect(project)}>
      <div className="trifold-3d-scene">
        {/* Soft Tabletop Shadow */}
        <div className="trifold-table-shadow" />

        {/* 3-Panel Standing Board */}
        <div className="trifold-standing-board">
          {/* Left Wing (Angled inward) */}
          <div className="panel-wing left">
            <div className="panel-cardboard-surface">
              <div className="mini-panel-header">
                <span>The question</span>
              </div>
              <div className="mini-bullet-lines">
                <div className="mini-line w-80" />
                <div className="mini-line w-60" />
                <div className="mini-line w-70" />
              </div>
              <div className="mini-avatar-monogram">{initials}</div>
            </div>
          </div>

          {/* Center Main Board */}
          <div className="panel-center">
            <div className="panel-cardboard-surface">
              {/* Center Title Card */}
              <div className="taped-title-card">
                <span className="field-tag">{project.category}</span>
                <h3 className="board-title">{project.title.split(':')[0]}</h3>
                <p className="board-sub">{project.subtitle.substring(0, 48)}...</p>
              </div>

              {/* Center Diagram Graphic Preview */}
              <div className="center-diagram-preview">
                <ModelThumbnail demoType={project.demoType} title={project.title} />
              </div>

              {/* Award Line */}
              {project.award && (
                <div className="award-ribbon-badge">
                  <span>{project.award}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Wing (Angled inward) */}
          <div className="panel-wing right">
            <div className="panel-cardboard-surface">
              <div className="mini-panel-header">
                <span>Key results</span>
              </div>
              <div className="mini-stat-box">
                <strong>{project.rightPanel.stats[0].value}</strong>
                <span>
                  {project.rightPanel.stats[0].label
                    .split(' ')
                    .filter(w => !['of', 'the', 'in', 'for'].includes(w.toLowerCase()))
                    .slice(0, 2)
                    .join(' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Understated Card Label */}
      <div className="trifold-meta-footer">
        <span className="project-lead">{project.researcher.name.split('&')[0]}</span>
        <span className="unfold-prompt">Open exhibit & talk to paper →</span>
      </div>
    </div>
  );
}

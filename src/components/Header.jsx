import React from 'react';
import { Layers, LayoutGrid, GitFork } from 'lucide-react';

export function Header({ viewMode, setViewMode }) {
  return (
    <header className="site-header clean-unified-header">
      <div className="header-bg-image" />
      <div className="header-bg-gradient" />

      <div className="header-inner unified-header-inner">
        <div className="brand-lockup-col">
          <h1 className="brand-title">Google for Science</h1>
          <p className="header-demo-oneliner">
            An interactive exhibition of Google’s landmark AI breakthroughs — play with live computational models and explore standing trifold displays.
          </p>
        </div>

        {/* View Mode Switcher: Only Sliding Gallery, Tabletop Grid, and Research Lineage */}
        <div className="view-mode-toggle-group">
          <button
            type="button"
            className={`view-mode-btn ${viewMode === 'promenade' ? 'active' : ''}`}
            onClick={() => setViewMode('promenade')}
          >
            <Layers size={13} />
            <span>Sliding Gallery</span>
          </button>
          <button
            type="button"
            className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={13} />
            <span>Tabletop Grid</span>
          </button>
          <button
            type="button"
            className={`view-mode-btn ${viewMode === 'lineage' ? 'active' : ''}`}
            onClick={() => setViewMode('lineage')}
          >
            <GitFork size={13} />
            <span>Research Lineage</span>
          </button>
        </div>
      </div>
    </header>
  );
}

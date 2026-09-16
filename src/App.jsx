import React, { useState } from 'react';
import { PROJECTS_DATA } from './data/projectsData';
import { Header } from './components/Header';
import { TrifoldCard } from './components/TrifoldCard';
import { TrifoldModal } from './components/TrifoldModal';
import { SlidingGallery } from './components/SlidingGallery';
import { ResearchLineageView } from './components/ResearchLineageView';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const projId = params.get('project');
      if (projId) {
        return PROJECTS_DATA.find((p) => p.id === projId) || null;
      }
    } catch {
      // fallback
    }
    return null;
  });
  const [openChatInitially, setOpenChatInitially] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('chat') === 'true';
    } catch {
      return false;
    }
  });
  const [viewMode, setViewMode] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view');
      if (v === 'lineage') return 'lineage';
      return v === 'grid' ? 'grid' : 'promenade';
    } catch {
      return 'promenade';
    }
  });

  const handleSelectProject = (project, options = {}) => {
    setSelectedProject(project);
    setOpenChatInitially(!!options.openChat);
  };

  return (
    <div className="science-fair-app">
      {/* Top Header & Navigation */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Exhibition Floor Content */}
      <main className="fair-main-content">
        <section className="trifold-wall-section">
          {viewMode === 'lineage' ? (
            <ResearchLineageView
              onOpenProjectModal={(projectId) => {
                const proj = PROJECTS_DATA.find((p) => p.id === projectId);
                if (proj) handleSelectProject(proj);
              }}
            />
          ) : viewMode === 'promenade' ? (
            <SlidingGallery
              projects={PROJECTS_DATA}
              onSelectProject={handleSelectProject}
            />
          ) : (
            <div className="trifold-cards-grid">
              {PROJECTS_DATA.map((project) => (
                <TrifoldCard
                  key={project.id}
                  project={project}
                  onSelect={handleSelectProject}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Expanded Unfolded Trifold Modal */}
      {selectedProject && (
        <TrifoldModal
          project={selectedProject}
          initialOpenChat={openChatInitially}
          onClose={() => {
            setSelectedProject(null);
            setOpenChatInitially(false);
          }}
        />
      )}

      {/* Science Fair Exhibition Footer */}
      <footer className="fair-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4>Google Research: Google for Science</h4>
            <p>
              Transforming the science fair trifold board into an interactive computational medium. Every exhibit demonstrates how artificial intelligence accelerates discoveries across fundamental scientific disciplines.
            </p>
          </div>
          <div className="footer-col">
            <h4>Open Scientific Research</h4>
            <p>
              Direct access to peer-reviewed Nature and Science papers, open-sourced protein and crystal databases, and reproducible machine learning architectures for global researchers.
            </p>
          </div>
          <div className="footer-col stats-col">
            <div className="footer-stat">
              <strong>10</strong>
              <span>Flagship Exhibits</span>
            </div>
            <div className="footer-stat">
              <strong>100%</strong>
              <span>Open Science</span>
            </div>
            <div className="footer-stat">
              <strong>Nobel</strong>
              <span>Recognized Research</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

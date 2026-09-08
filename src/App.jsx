import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from './data/projectsData';
import { Header } from './components/Header';
import { TrifoldCard } from './components/TrifoldCard';
import { TrifoldModal } from './components/TrifoldModal';
import { SlidingGallery } from './components/SlidingGallery';
import { Layers, LayoutGrid } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Breakthroughs');
  const [viewMode, setViewMode] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('view') === 'grid' ? 'grid' : 'promenade';
    } catch {
      return 'promenade';
    }
  });

  // Extract unique categories
  const categories = useMemo(() => {
    return ['All Breakthroughs', 'Biomolecular & Health', 'Climate & Earth', 'Materials & Energy', 'Logic & Mathematics'];
  }, []);

  // Filter projects by search and category
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      const matchesCategory =
        selectedCategory === 'All Breakthroughs' || proj.category === selectedCategory;

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        proj.title.toLowerCase().includes(term) ||
        proj.subtitle.toLowerCase().includes(term) ||
        proj.researcher.name.toLowerCase().includes(term) ||
        proj.leftPanel.question.toLowerCase().includes(term) ||
        proj.centerPanel.methodology.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="science-fair-app">
      {/* Top Header & Navigation */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Main Exhibition Floor Content */}
      <main className="fair-main-content">
        <section className="trifold-wall-section">
          <div className="section-intro-bar">
            <div className="intro-left">
              <span className="count-label">
                Showing {filteredProjects.length} study exhibits
              </span>
              <span className="tactile-hint">
                {viewMode === 'promenade'
                  ? 'Swipe or use arrow keys to browse provocative questions with live models'
                  : 'Select any standing board to unfold its research spread'}
              </span>
            </div>

            {/* View Mode Switcher: Promenade vs Grid */}
            <div className="view-mode-toggle-group">
              <button
                className={`view-mode-btn ${viewMode === 'promenade' ? 'active' : ''}`}
                onClick={() => setViewMode('promenade')}
                title="Sliding Gallery View: Eye-catching questions & live interactive models"
              >
                <Layers size={13} />
                <span>Sliding Gallery</span>
              </button>
              <button
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Tabletop Grid View: 3D standing paperboard trifolds"
              >
                <LayoutGrid size={13} />
                <span>Tabletop Grid</span>
              </button>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="empty-results-box">
              <p>No research projects matched "{searchTerm}".</p>
              <button className="reset-filter-btn" onClick={() => { setSearchTerm(''); setSelectedCategory('All Breakthroughs'); }}>
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'promenade' ? (
            <SlidingGallery
              projects={filteredProjects}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          ) : (
            <div className="trifold-cards-grid">
              {filteredProjects.map((project) => (
                <TrifoldCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
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
          onClose={() => setSelectedProject(null)}
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

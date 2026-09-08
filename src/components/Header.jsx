import React from 'react';
import { Search } from 'lucide-react';

export function Header({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories
}) {
  return (
    <header className="site-header">
      {/* Translucent background image from Gemini science blog header */}
      <div className="header-bg-image" />
      <div className="header-bg-gradient" />

      <div className="header-inner">
        {/* Top Masthead Band */}
        <div className="header-top-row">
          <div className="brand-lockup">
            <h1 className="brand-title">Google for Science</h1>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="search-filter-row">
          {/* Category Filter Tabs */}
          <nav className="category-pills-list" aria-label="Filter exhibits by scientific discipline">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Search Input */}
          <div className="search-input-wrapper">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search researchers, topics, or models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-field"
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')} aria-label="Clear search">✕</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

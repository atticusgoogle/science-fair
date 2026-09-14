import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  DOMAINS,
  LINEAGE_NODES,
  LINEAGE_CONNECTIONS,
  CURATED_TRAILS
} from '../data/lineageGraphData';
import {
  GitFork,
  ArrowRight,
  Compass,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Share2,
  Check,
  ChevronRight,
  Flame,
  Layers,
  HelpCircle
} from 'lucide-react';

export function ResearchLineageView({ onOpenProjectModal }) {
  // Active selected node ID
  const [selectedNodeId, setSelectedNodeId] = useState('alphafold');
  // Traversed trail: array of { nodeId, viaConnectionId, question }
  const [trail, setTrail] = useState([
    { nodeId: 'alphafold', viaConnectionId: null, question: null }
  ]);
  // Hovered node or connection
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [activeCuratedTrailId, setActiveCuratedTrailId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Canvas pan & zoom state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPos, setStartPanPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  // Active node data
  const activeNode = useMemo(() => {
    return LINEAGE_NODES.find((n) => n.id === selectedNodeId) || LINEAGE_NODES[0];
  }, [selectedNodeId]);

  // Outgoing connections from the active node
  const outgoingConnections = useMemo(() => {
    return LINEAGE_CONNECTIONS.filter((conn) => conn.from === selectedNodeId || conn.to === selectedNodeId).map((conn) => {
      const isFrom = conn.from === selectedNodeId;
      const targetNodeId = isFrom ? conn.to : conn.from;
      const targetNode = LINEAGE_NODES.find((n) => n.id === targetNodeId);
      return {
        ...conn,
        targetNode,
        targetNodeId
      };
    });
  }, [selectedNodeId]);

  // If the last step in the trail was a leap, find the bridging connection
  const lastTrailStep = trail[trail.length - 1];
  const lastConnection = useMemo(() => {
    if (!lastTrailStep || !lastTrailStep.viaConnectionId) return null;
    return LINEAGE_CONNECTIONS.find((c) => c.id === lastTrailStep.viaConnectionId) || null;
  }, [lastTrailStep]);

  // Disciplines crossed metric
  const disciplinesCount = useMemo(() => {
    const domains = new Set();
    trail.forEach((step) => {
      const n = LINEAGE_NODES.find((item) => item.id === step.nodeId);
      if (n) domains.add(n.domain);
    });
    return domains.size;
  }, [trail]);

  // Select node directly
  const handleSelectNode = (nodeId, connection = null, questionText = null) => {
    setSelectedNodeId(nodeId);
    setActiveCuratedTrailId(null);

    setTrail((prev) => {
      // If clicking the current node, no change
      if (prev[prev.length - 1]?.nodeId === nodeId) return prev;

      // If node is already in trail, don't duplicate needlessly or append new leap
      return [
        ...prev,
        {
          nodeId,
          viaConnectionId: connection?.id || null,
          question: questionText || connection?.paaQuestion || null
        }
      ];
    });
  };

  // Launch a curated starter trail
  const handleSelectCuratedTrail = (trailDef) => {
    setActiveCuratedTrailId(trailDef.id);
    setSelectedNodeId(trailDef.startNode);
    setTrail([
      { nodeId: trailDef.startNode, viaConnectionId: null, question: null }
    ]);
  };

  // Reset the trail back to AlphaFold
  const handleResetTrail = () => {
    setSelectedNodeId('alphafold');
    setTrail([{ nodeId: 'alphafold', viaConnectionId: null, question: null }]);
    setActiveCuratedTrailId(null);
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  // Share trail link
  const handleShareTrail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Canvas Drag & Pan Handlers
  const handleMouseDown = (e) => {
    // Only pan if dragging canvas background
    if (e.target.tagName === 'svg' || e.target.classList.contains('canvas-background')) {
      setIsPanning(true);
      setStartPanPos({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - startPanPos.x,
      y: e.clientY - startPanPos.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div className="research-lineage-container">
      {/* Top Bar: Curated Starter Rabbit Holes */}
      <div className="lineage-top-strip">
        <div className="strip-label-box">
          <Compass size={15} className="compass-icon" />
          <span className="strip-title">Curated journeys</span>
        </div>
        <div className="curated-pills-row">
          {CURATED_TRAILS.map((curated) => (
            <button
              key={curated.id}
              type="button"
              className={`curated-pill-btn ${activeCuratedTrailId === curated.id ? 'active' : ''}`}
              onClick={() => handleSelectCuratedTrail(curated)}
            >
              <Sparkles size={12} className="pill-spark" />
              <span className="curated-btn-title">{curated.title}</span>
              <span className="curated-btn-tagline">{curated.tagline}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: 65% Interactive Archipelago Canvas + 35% Linear Dossier */}
      <div className="lineage-main-layout">
        {/* ================= LEFT: 2.5D CONSTELLATION CANVAS ================= */}
        <div
          className={`lineage-canvas-wrapper ${isPanning ? 'panning' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Canvas Navigation Utilities */}
          <div className="canvas-floating-controls">
            <div className="zoom-btn-group">
              <button
                type="button"
                className="canvas-tool-btn"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.6))}
                title="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                className="canvas-tool-btn"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.75))}
                title="Zoom out"
              >
                −
              </button>
              <button
                type="button"
                className="canvas-tool-btn reset"
                onClick={() => {
                  setPanOffset({ x: 0, y: 0 });
                  setZoomLevel(1);
                }}
                title="Reset view orientation"
              >
                <RotateCcw size={13} />
              </button>
            </div>
            <div className="canvas-legend-hint">
              <span>Drag to pan canvas • Select nodes to leap</span>
            </div>
          </div>

          <svg
            ref={svgRef}
            className="lineage-svg-canvas"
            viewBox="0 0 920 720"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: '460px 360px'
            }}
          >
            <rect width="920" height="720" fill="#FAFAF8" className="canvas-background" />

            {/* Subtle Grid Coordinates (Architectural Blueprint) */}
            <defs>
              <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAEAE5" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="920" height="720" fill="url(#arch-grid)" className="canvas-background" />

            {/* Academic Continental Territories */}
            {Object.values(DOMAINS).map((dom) => (
              <g key={dom.id} className="domain-territory-group">
                <circle
                  cx={dom.center.x}
                  cy={dom.center.y}
                  r="170"
                  fill={dom.bgTint}
                  stroke={dom.borderTint}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={dom.center.x}
                  y={dom.center.y - 145}
                  textAnchor="middle"
                  className="domain-territory-label"
                  fill={dom.color}
                >
                  {dom.label}
                </text>
              </g>
            ))}

            {/* Connection Ley-Lines */}
            <g className="connections-layer">
              {LINEAGE_CONNECTIONS.map((conn) => {
                const source = LINEAGE_NODES.find((n) => n.id === conn.from);
                const target = LINEAGE_NODES.find((n) => n.id === conn.to);
                if (!source || !target) return null;

                const isConnectedToActive =
                  conn.from === selectedNodeId || conn.to === selectedNodeId;
                const isTraversedInTrail = trail.some(
                  (t) => t.viaConnectionId === conn.id
                );

                // Curved bezier link between nodes
                const dx = target.coords.x - source.coords.x;
                const dy = target.coords.y - source.coords.y;
                const midX = (source.coords.x + target.coords.x) / 2 - dy * 0.15;
                const midY = (source.coords.y + target.coords.y) / 2 + dx * 0.15;
                const pathData = `M ${source.coords.x} ${source.coords.y} Q ${midX} ${midY} ${target.coords.x} ${target.coords.y}`;

                return (
                  <g key={conn.id} className={`connection-path-wrap ${isTraversedInTrail ? 'traversed' : ''} ${isConnectedToActive ? 'active-branch' : ''}`}>
                    {/* Background hit area */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                      className="connection-hit-area"
                    />
                    {/* Visual connection line */}
                    <path
                      d={pathData}
                      fill="none"
                      className="connection-line"
                      stroke={
                        isTraversedInTrail
                          ? '#B45309'
                          : isConnectedToActive
                          ? '#2C5282'
                          : '#D9D9D2'
                      }
                      strokeWidth={isTraversedInTrail ? 2.5 : isConnectedToActive ? 2 : 1.2}
                      strokeDasharray={isTraversedInTrail ? 'none' : isConnectedToActive ? 'none' : '3 3'}
                    />

                    {/* Animated pulse dot along active or traversed bridges */}
                    {(isConnectedToActive || isTraversedInTrail) && (
                      <circle r="3.5" fill={isTraversedInTrail ? '#B45309' : '#2C5282'} className="pulse-dot">
                        <animateMotion path={pathData} dur="3s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Research Nodes */}
            <g className="nodes-layer">
              {LINEAGE_NODES.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isHovered = node.id === hoveredNodeId;
                const domainDef = DOMAINS[node.domain.toUpperCase()] || DOMAINS.BIOMOLECULAR;
                const trailStepIndex = trail.findIndex((t) => t.nodeId === node.id);
                const isInTrail = trailStepIndex !== -1;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.coords.x}, ${node.coords.y})`}
                    className={`lineage-node-group ${isSelected ? 'selected' : ''} ${isInTrail ? 'in-trail' : ''}`}
                    onClick={() => handleSelectNode(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Selected Amber Halo */}
                    {isSelected && (
                      <circle
                        r="36"
                        fill="none"
                        stroke="#B45309"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="node-selection-halo"
                      />
                    )}

                    {/* Node Core Body */}
                    <circle
                      r={isSelected ? 26 : 22}
                      fill="#FFFFFF"
                      stroke={isSelected ? '#121316' : isInTrail ? '#B45309' : '#D0D0CA'}
                      strokeWidth={isSelected ? 2.5 : isInTrail ? 2 : 1.5}
                      className="node-outer-circle"
                    />

                    {/* Domain Color Dot */}
                    <circle
                      r={isSelected ? 8 : 6}
                      fill={domainDef.color}
                      className="node-domain-dot"
                    />

                    {/* Trail Order Badge if traversed */}
                    {isInTrail && (
                      <g transform="translate(14, -16)">
                        <circle r="9" fill="#B45309" />
                        <text
                          textAnchor="middle"
                          dy="3.5"
                          fill="#FFFFFF"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="Google Sans, sans-serif"
                        >
                          {trailStepIndex + 1}
                        </text>
                      </g>
                    )}

                    {/* Node Text Label */}
                    <g transform={`translate(0, ${isSelected ? 42 : 36})`}>
                      <text
                        textAnchor="middle"
                        className="node-title-label"
                        fill={isSelected ? '#121316' : '#2D3748'}
                        fontWeight={isSelected ? '600' : '500'}
                        fontSize={isSelected ? '13' : '11.5'}
                        fontFamily="Google Sans, sans-serif"
                      >
                        {node.title}
                      </text>
                      <text
                        textAnchor="middle"
                        dy="14"
                        className="node-subtitle-label"
                        fill="#718096"
                        fontSize="9.5"
                        fontFamily="Google Sans Text, sans-serif"
                      >
                        {node.subtitle}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ================= RIGHT: LINEAR DOSSIER PANEL ================= */}
        <aside className="lineage-dossier-panel">
          {/* Dossier Header */}
          <div className="dossier-header">
            <div className="dossier-badge-row">
              <span
                className="domain-indicator-pill"
                style={{
                  color: DOMAINS[activeNode.domain.toUpperCase()]?.color || '#2563EB',
                  backgroundColor: DOMAINS[activeNode.domain.toUpperCase()]?.bgTint || 'rgba(37,99,235,0.08)'
                }}
              >
                {DOMAINS[activeNode.domain.toUpperCase()]?.label}
              </span>
              <span className="dossier-year">{activeNode.year}</span>
              {activeNode.award && (
                <span className="dossier-award-tag">{activeNode.award}</span>
              )}
            </div>

            <h2 className="dossier-title">{activeNode.title}</h2>
            <p className="dossier-subtitle">{activeNode.subtitle}</p>

            {/* Direct Link to full trifold exhibit */}
            <button
              type="button"
              className="open-exhibit-btn"
              onClick={() => onOpenProjectModal(activeNode.id)}
            >
              <span>View full trifold exhibit</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="dossier-content-scroll">
            {/* If a connection was just traversed, show the bridging context */}
            {lastConnection && lastTrailStep.nodeId === activeNode.id && (
              <div className="lineage-bridge-card">
                <div className="bridge-card-header">
                  <GitFork size={13} className="bridge-icon" />
                  <span className="bridge-label">Lineage bridge from previous step</span>
                </div>
                <p className="bridge-question">"{lastConnection.paaQuestion}"</p>
                <p className="bridge-story">{lastConnection.story}</p>
                <div className="bridge-gene-tag">
                  <span className="gene-title">Shared DNA:</span> {lastConnection.sharedGene}
                </div>
              </div>
            )}

            {/* Origin Story: How did this come about? */}
            <div className="dossier-section">
              <h3 className="section-eyebrow">How this breakthrough came about</h3>
              <p className="dossier-body-text">{activeNode.originStory}</p>
            </div>

            {/* Algorithmic Gene & Summary */}
            <div className="dossier-section">
              <h3 className="section-eyebrow">Methodological core</h3>
              <div className="core-gene-banner">
                <span className="gene-pill">{activeNode.leadGene}</span>
              </div>
              <p className="dossier-body-text">{activeNode.summary}</p>
            </div>

            {/* Scientific Tools Used */}
            <div className="dossier-section">
              <h3 className="section-eyebrow">Tools & infrastructure</h3>
              <div className="tools-tags-wrap">
                {activeNode.toolsUsed.map((tool, idx) => (
                  <span key={idx} className="tool-tag-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* People Also Asked: Follow-up Rabbit Hole Leaps */}
            <div className="dossier-section paa-section">
              <div className="paa-header-row">
                <HelpCircle size={14} className="paa-icon" />
                <h3 className="section-eyebrow paa-title">Follow the rabbit hole (People also asked)</h3>
              </div>
              <p className="paa-intro-hint">
                Select a question below to leap to connected research and see how these tools transferred.
              </p>

              <div className="paa-questions-list">
                {outgoingConnections.map((conn) => {
                  if (!conn.targetNode) return null;
                  return (
                    <button
                      key={conn.id}
                      type="button"
                      className="paa-question-card"
                      onClick={() => handleSelectNode(conn.targetNodeId, conn, conn.paaQuestion)}
                    >
                      <div className="paa-question-content">
                        <span className="paa-target-chip">
                          Leap to {conn.targetNode.title}
                        </span>
                        <h4 className="paa-question-heading">{conn.paaQuestion}</h4>
                        <p className="paa-shared-preview">{conn.sharedGene}</p>
                      </div>
                      <div className="paa-arrow-badge">
                        <ChevronRight size={15} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ================= BOTTOM: MY RABBIT HOLE TRAIL TRACKER ================= */}
      <footer className="lineage-trail-footer">
        <div className="trail-metrics-box">
          <div className="trail-count-badge">
            <Flame size={13} className="flame-icon" />
            <span>{trail.length} {trail.length === 1 ? 'step' : 'steps'} in your rabbit hole</span>
          </div>
          <span className="disciplines-count">
            {disciplinesCount} {disciplinesCount === 1 ? 'discipline' : 'disciplines'} crossed
          </span>
        </div>

        {/* Trail Breadcrumbs */}
        <div className="trail-breadcrumbs-rail">
          {trail.map((step, idx) => {
            const node = LINEAGE_NODES.find((n) => n.id === step.nodeId);
            if (!node) return null;
            const isCurrent = idx === trail.length - 1;

            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <div className="trail-connector-arrow">
                    <ArrowRight size={12} />
                  </div>
                )}
                <button
                  type="button"
                  className={`trail-node-btn ${isCurrent ? 'active' : ''}`}
                  onClick={() => handleSelectNode(node.id)}
                  title={`Step ${idx + 1}: ${node.title}`}
                >
                  <span className="trail-step-num">{idx + 1}</span>
                  <span className="trail-node-name">{node.title}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Trail Actions */}
        <div className="trail-actions-group">
          <button
            type="button"
            className="trail-action-btn share"
            onClick={handleShareTrail}
            title="Copy link to this research path"
          >
            {copiedLink ? <Check size={13} /> : <Share2 size={13} />}
            <span>{copiedLink ? 'Copied' : 'Share trail'}</span>
          </button>
          <button
            type="button"
            className="trail-action-btn reset"
            onClick={handleResetTrail}
            title="Start a new rabbit hole"
          >
            <RotateCcw size={13} />
            <span>Reset trail</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

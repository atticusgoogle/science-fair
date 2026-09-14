import React, { useState, useMemo, useRef } from 'react';
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
  Share2,
  Check,
  ChevronRight,
  Flame,
  ArrowLeft,
  Lightbulb,
  Cpu,
  HelpCircle
} from 'lucide-react';

export function ResearchLineageView({ onOpenProjectModal }) {
  // Active selected node ID
  const [selectedNodeId, setSelectedNodeId] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const n = params.get('node');
      if (n && LINEAGE_NODES.some((item) => item.id === n)) return n;
    } catch {
      // fallback
    }
    return 'alphafold';
  });

  // Traversed trail: array of { nodeId, viaConnectionId, question }
  const [trail, setTrail] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const n = params.get('node');
      if (n && n !== 'alphafold' && LINEAGE_NODES.some((item) => item.id === n)) {
        // If starting directly on another node via URL, show trail from AlphaFold to that node
        const conn = LINEAGE_CONNECTIONS.find((c) => c.from === 'alphafold' && c.to === n);
        return [
          { nodeId: 'alphafold', viaConnectionId: null, question: null },
          { nodeId: n, viaConnectionId: conn?.id || null, question: conn?.paaQuestion || null }
        ];
      }
    } catch {
      // fallback
    }
    return [{ nodeId: 'alphafold', viaConnectionId: null, question: null }];
  });
  // Hovered node on canvas or hovered question target
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [hoveredQuestionTargetId, setHoveredQuestionTargetId] = useState(null);
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

  // Set of visited node IDs in the current trail to prevent loops and ping-ponging
  const visitedNodeIds = useMemo(() => {
    return new Set(trail.map((t) => t.nodeId));
  }, [trail]);

  // Outgoing connections leading ONLY to unvisited breakthroughs
  const outgoingConnections = useMemo(() => {
    return LINEAGE_CONNECTIONS
      .filter((conn) => conn.from === selectedNodeId && !visitedNodeIds.has(conn.to))
      .map((conn) => {
        const targetNode = LINEAGE_NODES.find((n) => n.id === conn.to);
        return {
          ...conn,
          targetNode,
          targetNodeId: conn.to
        };
      });
  }, [selectedNodeId, visitedNodeIds]);

  // Remaining unvisited nodes across the entire constellation
  const unvisitedNodes = useMemo(() => {
    return LINEAGE_NODES.filter((n) => !visitedNodeIds.has(n.id));
  }, [visitedNodeIds]);

  // If the last step in the trail was a leap, find the bridging connection
  const lastTrailStep = trail[trail.length - 1];
  const lastConnection = useMemo(() => {
    if (!lastTrailStep || !lastTrailStep.viaConnectionId) return null;
    return LINEAGE_CONNECTIONS.find((c) => c.id === lastTrailStep.viaConnectionId) || null;
  }, [lastTrailStep]);

  // Previous node in the trail (for visual bridge)
  const previousNode = useMemo(() => {
    if (trail.length < 2) return null;
    const prevStep = trail[trail.length - 2];
    return LINEAGE_NODES.find((n) => n.id === prevStep.nodeId) || null;
  }, [trail]);

  // Disciplines crossed metric
  const disciplinesCount = useMemo(() => {
    const domains = new Set();
    trail.forEach((step) => {
      const n = LINEAGE_NODES.find((item) => item.id === step.nodeId);
      if (n) domains.add(n.domain);
    });
    return domains.size;
  }, [trail]);

  // Select node directly - prevents cycles by rewinding if node was already visited
  const handleSelectNode = (nodeId, connection = null, questionText = null) => {
    setSelectedNodeId(nodeId);
    setActiveCuratedTrailId(null);
    setHoveredQuestionTargetId(null);

    setTrail((prev) => {
      // If clicking the current node, no change
      if (prev[prev.length - 1]?.nodeId === nodeId) return prev;

      // If node was already visited earlier in this trail, rewind back to that step
      const existingIndex = prev.findIndex((step) => step.nodeId === nodeId);
      if (existingIndex !== -1) {
        return prev.slice(0, existingIndex + 1);
      }

      // Otherwise append new step to the trail
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

  // Step back one step in the trail
  const handleStepBack = () => {
    if (trail.length > 1) {
      const newTrail = trail.slice(0, -1);
      const prevStep = newTrail[newTrail.length - 1];
      setSelectedNodeId(prevStep.nodeId);
      setTrail(newTrail);
    }
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
    setHoveredQuestionTargetId(null);
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
          <Compass size={14} className="compass-icon" />
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

      {/* Main Split: 65% Interactive Archipelago Canvas + 35% Linear Story Dossier */}
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
              <span>Select any node or pick a question on the right to leap</span>
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

            {/* Subtle Grid Coordinates (Architectural Drafting Paper) */}
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
                const isHoveredTargetBridge =
                  conn.from === selectedNodeId && conn.to === hoveredQuestionTargetId;

                // Curved bezier link between nodes
                const dx = target.coords.x - source.coords.x;
                const dy = target.coords.y - source.coords.y;
                const midX = (source.coords.x + target.coords.x) / 2 - dy * 0.15;
                const midY = (source.coords.y + target.coords.y) / 2 + dx * 0.15;
                const pathData = `M ${source.coords.x} ${source.coords.y} Q ${midX} ${midY} ${target.coords.x} ${target.coords.y}`;

                return (
                  <g
                    key={conn.id}
                    className={`connection-path-wrap ${isTraversedInTrail ? 'traversed' : ''} ${isHoveredTargetBridge ? 'target-hover' : ''}`}
                  >
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
                          : isHoveredTargetBridge
                          ? '#B45309'
                          : isConnectedToActive
                          ? '#2C5282'
                          : '#D9D9D2'
                      }
                      strokeWidth={
                        isTraversedInTrail ? 2.5 : isHoveredTargetBridge ? 3 : isConnectedToActive ? 2 : 1.2
                      }
                      strokeDasharray={
                        isTraversedInTrail ? 'none' : isHoveredTargetBridge ? 'none' : isConnectedToActive ? 'none' : '3 3'
                      }
                    />

                    {/* Animated pulse dot along active or traversed bridges */}
                    {(isConnectedToActive || isTraversedInTrail || isHoveredTargetBridge) && (
                      <circle
                        r={isHoveredTargetBridge ? 4.5 : 3.5}
                        fill={isTraversedInTrail || isHoveredTargetBridge ? '#B45309' : '#2C5282'}
                        className="pulse-dot"
                      >
                        <animateMotion path={pathData} dur="2.5s" repeatCount="indefinite" />
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
                const isHoveredTarget = node.id === hoveredQuestionTargetId;
                const domainDef = DOMAINS[node.domain.toUpperCase()] || DOMAINS.BIOMOLECULAR;
                const trailStepIndex = trail.findIndex((t) => t.nodeId === node.id);
                const isInTrail = trailStepIndex !== -1;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.coords.x}, ${node.coords.y})`}
                    className={`lineage-node-group ${isSelected ? 'selected' : ''} ${isInTrail ? 'in-trail' : ''} ${isHoveredTarget ? 'target-beacon' : ''}`}
                    onClick={() => handleSelectNode(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Hover Beacon Ring when user hovers a question card */}
                    {isHoveredTarget && (
                      <circle
                        r="38"
                        fill="none"
                        stroke="#B45309"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        className="node-target-beacon-ring"
                      />
                    )}

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
                      stroke={isSelected ? '#121316' : isInTrail ? '#B45309' : isHoveredTarget ? '#B45309' : '#D0D0CA'}
                      strokeWidth={isSelected ? 2.5 : isInTrail || isHoveredTarget ? 2 : 1.5}
                      className="node-outer-circle"
                    />

                    {/* Friendly Icon / Emoji inside node */}
                    <text
                      textAnchor="middle"
                      dy="5.5"
                      fontSize={isSelected ? "16" : "14"}
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {node.icon}
                    </text>

                    {/* Domain Color Badge Accent */}
                    <circle
                      cx="14"
                      cy="-14"
                      r="4.5"
                      fill={domainDef.color}
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />

                    {/* Trail Order Badge if traversed */}
                    {isInTrail && (
                      <g transform="translate(-14, -14)">
                        <circle r="8.5" fill="#B45309" />
                        <text
                          textAnchor="middle"
                          dy="3"
                          fill="#FFFFFF"
                          fontSize="9.5"
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
                        fontSize={isSelected ? '12.5' : '11'}
                        fontFamily="Google Sans, sans-serif"
                      >
                        {node.title}
                      </text>
                      <text
                        textAnchor="middle"
                        dy="13"
                        className="node-subtitle-label"
                        fill="#718096"
                        fontSize="9"
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

        {/* ================= RIGHT: HIGH-DIGESTIBILITY STORY DOSSIER ================= */}
        <aside className="lineage-dossier-panel">
          {/* Dossier Hero Header */}
          <div className="dossier-header simplified">
            <div className="dossier-hero-row">
              <span className="dossier-hero-icon">{activeNode.icon}</span>
              <div className="dossier-hero-text">
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
              </div>
            </div>

            {/* One-Sentence Superpower & Stat Badge */}
            <p className="dossier-superpower-headline">
              "{activeNode.superpower}"
            </p>

            <div className="dossier-meta-actions">
              <span className="dossier-stat-highlight">
                ⚡ {activeNode.keyStat}
              </span>
              <button
                type="button"
                className="open-exhibit-btn compact"
                onClick={() => onOpenProjectModal(activeNode.id)}
                title="Open 3D standing trifold exhibit"
              >
                <span>View 3D exhibit</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div className="dossier-content-scroll">
            {/* Visual Lineage Bridge: How did we get from Step A to Step B? */}
            {lastConnection && previousNode && lastTrailStep.nodeId === activeNode.id ? (
              <div className="easy-bridge-card">
                <div className="easy-bridge-top">
                  <span className="bridge-step-chip">{previousNode.icon} {previousNode.title}</span>
                  <ArrowRight size={13} className="bridge-arrow" />
                  <span className="bridge-step-chip active">{activeNode.icon} {activeNode.title}</span>
                </div>
                <h4 className="easy-bridge-question">"{lastConnection.paaQuestion}"</h4>
                <p className="easy-bridge-explanation">{lastConnection.story}</p>
                <div className="easy-bridge-dna">
                  <Cpu size={12} />
                  <span><strong>Shared tool DNA:</strong> {lastConnection.sharedGene}</span>
                </div>
              </div>
            ) : (
              <div className="easy-origin-card">
                <div className="origin-card-title-row">
                  <Lightbulb size={14} className="origin-bulb-icon" />
                  <span className="origin-card-label">The core scientific spark</span>
                </div>
                <p className="origin-card-text">{activeNode.simpleOrigin}</p>
              </div>
            )}

            {/* Methodological Engine & Tools Summary */}
            <div className="dossier-engine-card">
              <span className="engine-card-label">How it works in plain English</span>
              <p className="engine-card-text">{activeNode.summary}</p>
              <div className="engine-tools-strip">
                <span className="tools-strip-title">Tools used:</span>
                {activeNode.toolsUsed.map((tool, idx) => (
                  <span key={idx} className="tool-tag-pill compact">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* The Next Doorways: Follow the Rabbit Hole */}
            <div className="dossier-section paa-section simplified">
              <div className="paa-header-row">
                <HelpCircle size={14} className="paa-icon" />
                <h3 className="section-eyebrow paa-title">
                  {outgoingConnections.length > 0
                    ? "Where curiosity leads next"
                    : "Rabbit hole branch complete"}
                </h3>
              </div>
              <p className="paa-intro-hint">
                {outgoingConnections.length > 0
                  ? "Hover to see where each question points on the map, or click to leap forward."
                  : "All direct pathways from this breakthrough are already in your trail."}
              </p>

              {outgoingConnections.length > 0 ? (
                <div className="paa-questions-list simplified">
                  {outgoingConnections.map((conn) => {
                    if (!conn.targetNode) return null;
                    return (
                      <button
                        key={conn.id}
                        type="button"
                        className="paa-question-card simplified"
                        onClick={() => handleSelectNode(conn.targetNodeId, conn, conn.paaQuestion)}
                        onMouseEnter={() => setHoveredQuestionTargetId(conn.targetNodeId)}
                        onMouseLeave={() => setHoveredQuestionTargetId(null)}
                      >
                        <div className="paa-card-target-row">
                          <span className="paa-target-chip">
                            {conn.targetNode.icon} Leap to {conn.targetNode.title}
                          </span>
                          <ChevronRight size={14} className="paa-arrow" />
                        </div>
                        <h4 className="paa-question-heading simplified">{conn.paaQuestion}</h4>
                        <p className="paa-shared-preview simplified">{conn.sharedGene}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rabbit-hole-complete-card">
                  <div className="complete-card-header">
                    <Sparkles size={14} className="complete-spark" />
                    <h4 className="complete-heading">Branch fully explored</h4>
                  </div>
                  <p className="complete-text">
                    You’ve charted every direct connection from {activeNode.title}! Select an unvisited breakthrough below to jump to a new sector of science:
                  </p>

                  {unvisitedNodes.length > 0 ? (
                    <div className="unvisited-jump-box">
                      <div className="unvisited-pills-wrap">
                        {unvisitedNodes.map((uNode) => (
                          <button
                            key={uNode.id}
                            type="button"
                            className="unvisited-pill-btn"
                            onClick={() => handleSelectNode(uNode.id)}
                            title={`Jump to ${uNode.title}`}
                          >
                            <span>{uNode.icon}</span>
                            <span>{uNode.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="complete-all-done-note">
                      🏆 Constellation master: You have connected all 10 breakthroughs across every academic field!
                    </p>
                  )}

                  <button type="button" className="complete-reset-btn" onClick={handleResetTrail}>
                    <RotateCcw size={12} />
                    <span>Start a fresh rabbit hole</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* ================= BOTTOM: STEPPER DISCOVERY TRAIL ================= */}
      <footer className="lineage-trail-footer simplified">
        <div className="trail-metrics-box">
          <div className="trail-count-badge">
            <Flame size={13} className="flame-icon" />
            <span>Step {trail.length} of your journey</span>
          </div>
          <span className="disciplines-count">
            {disciplinesCount} {disciplinesCount === 1 ? 'discipline' : 'disciplines'} crossed
          </span>
        </div>

        {/* Trail Breadcrumbs Stepper */}
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
                  <span className="trail-node-icon">{node.icon}</span>
                  <span className="trail-node-name">{node.title}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Trail Actions */}
        <div className="trail-actions-group">
          {trail.length > 1 && (
            <button
              type="button"
              className="trail-action-btn step-back"
              onClick={handleStepBack}
              title="Step back one leap"
            >
              <ArrowLeft size={12} />
              <span>Step back</span>
            </button>
          )}
          <button
            type="button"
            className="trail-action-btn share"
            onClick={handleShareTrail}
            title="Copy link to this research path"
          >
            {copiedLink ? <Check size={12} /> : <Share2 size={12} />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
          <button
            type="button"
            className="trail-action-btn reset"
            onClick={handleResetTrail}
            title="Start a new rabbit hole"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useMemo, useRef } from 'react';
import {
  DOMAINS,
  LINEAGE_NODES,
  LINEAGE_CONNECTIONS,
  STARTING_QUESTIONS,
  getLineageConnection
} from '../data/lineageGraphData';
import {
  ArrowRight,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  ArrowLeft,
  Lightbulb,
  Cpu,
  HelpCircle
} from 'lucide-react';

export function ResearchLineageView({ onOpenProjectModal }) {
  // Whether user is exploring a rabbit hole or on the opening selection screen
  const [isExploring, setIsExploring] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const n = params.get('node');
      return Boolean(n && LINEAGE_NODES.some((item) => item.id === n));
    } catch {
      return false;
    }
  });

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
        const conn = getLineageConnection('alphafold', n);
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

  // Previous node in the trail (for visual bridge)
  const previousNode = useMemo(() => {
    if (trail.length < 2) return null;
    const prevStep = trail[trail.length - 2];
    return LINEAGE_NODES.find((n) => n.id === prevStep.nodeId) || null;
  }, [trail]);

  // The bridging connection explaining how previousNode connects to activeNode
  // Guarantees an explanation is ALWAYS found and displayed on subsequent steps
  const lastConnection = useMemo(() => {
    if (!previousNode || !activeNode || previousNode.id === activeNode.id) return null;
    return getLineageConnection(previousNode.id, activeNode.id);
  }, [previousNode, activeNode]);

  // Disciplines crossed metric
  const disciplinesCount = useMemo(() => {
    const domains = new Set();
    trail.forEach((step) => {
      const n = LINEAGE_NODES.find((item) => item.id === step.nodeId);
      if (n) domains.add(n.domain);
    });
    return domains.size;
  }, [trail]);

  // Start rabbit hole from opening screen question
  const handleStartRabbitHole = (nodeId) => {
    setSelectedNodeId(nodeId);
    setTrail([{ nodeId, viaConnectionId: null, question: null }]);
    setIsExploring(true);
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(1);
    setHoveredQuestionTargetId(null);
  };

  // Return to opening screen
  const handleBackToQuestions = () => {
    setIsExploring(false);
    setHoveredQuestionTargetId(null);
  };

  // Select node directly - prevents cycles by rewinding if node was already visited,
  // and always resolves the connection story from the previous node to this node
  const handleSelectNode = (nodeId, connection = null, questionText = null) => {
    const fromId = selectedNodeId;
    setSelectedNodeId(nodeId);
    setHoveredQuestionTargetId(null);

    // Resolve connection between current node and clicked node if not passed
    const resolvedConn = connection || getLineageConnection(fromId, nodeId);

    setTrail((prev) => {
      if (prev[prev.length - 1]?.nodeId === nodeId) return prev;

      // If node was already visited earlier in this trail, rewind back to that step
      const existingIndex = prev.findIndex((step) => step.nodeId === nodeId);
      if (existingIndex !== -1) {
        return prev.slice(0, existingIndex + 1);
      }

      // Otherwise append new step to the trail with its connecting bridge
      return [
        ...prev,
        {
          nodeId,
          viaConnectionId: resolvedConn?.id || `${fromId}_${nodeId}`,
          question: questionText || resolvedConn?.paaQuestion || null
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

  // Reset the trail back to the current root node
  const handleResetTrail = () => {
    const rootId = trail[0]?.nodeId || selectedNodeId;
    setSelectedNodeId(rootId);
    setTrail([{ nodeId: rootId, viaConnectionId: null, question: null }]);
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(1);
    setHoveredQuestionTargetId(null);
  };

  // Share trail link
  const handleShareTrail = () => {
    if (navigator.clipboard) {
      const url = new URL(window.location.href);
      url.searchParams.set('view', 'lineage');
      url.searchParams.set('node', selectedNodeId);
      navigator.clipboard.writeText(url.toString());
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

  // =========================================================================
  // VIEW 1: OPENING SCREEN ("Where do you want to explore first?")
  // Pure, clean, NO subtext, just intuitive curiosity questions.
  // =========================================================================
  if (!isExploring) {
    return (
      <div className="research-lineage-container">
        <div className="lineage-opening-screen">
          <h1 className="opening-hero-title">Where do you want to explore first?</h1>

          <div className="opening-questions-list">
            {STARTING_QUESTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="opening-question-row"
                onClick={() => handleStartRabbitHole(item.nodeId)}
              >
                <span className="opening-question-text">{item.question}</span>
                <ArrowRight size={16} className="opening-question-arrow" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE RABBIT HOLE (Archipelago Map + Story Dossier)
  // =========================================================================
  return (
    <div className="research-lineage-container">
      {/* Top Navigation Strip */}
      <div className="rabbit-hole-nav-bar">
        <button
          type="button"
          className="rabbit-hole-back-btn"
          onClick={handleBackToQuestions}
          title="Return to questions"
        >
          <ArrowLeft size={14} />
          <span>Back to questions</span>
        </button>

        <div className="rabbit-hole-nav-status">
          <span className="status-label">Rabbit Hole:</span>
          <span className="status-title">{activeNode.title}</span>
          <span className="status-step-pill">Step {trail.length}</span>
        </div>

        <div className="rabbit-hole-nav-actions">
          <button
            type="button"
            className="rabbit-hole-action-btn"
            onClick={handleResetTrail}
            title="Reset this rabbit hole"
          >
            <RotateCcw size={13} />
            <span>Reset trail</span>
          </button>
        </div>
      </div>

      {/* Main Split: Interactive Archipelago Canvas + Story Dossier */}
      <div className="lineage-main-layout">
        {/* ================= LEFT: CONSTELLATION CANVAS ================= */}
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

            {/* Subtle Grid Coordinates */}
            <defs>
              <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAEAE5" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="920" height="720" fill="url(#arch-grid)" className="canvas-background" />

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
                    <path
                      d={pathData}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                      className="connection-hit-area"
                    />
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

                    {/* Animated pulse dot along active bridges */}
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
                    {/* Hover Beacon Ring when hovering a question */}
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

                    {/* Selected Halo */}
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
                      r={isSelected ? 24 : 20}
                      fill={isInTrail ? '#B45309' : '#FFFFFF'}
                      stroke={isSelected ? '#121316' : isInTrail ? '#B45309' : isHoveredTarget ? '#B45309' : '#D0D0CA'}
                      strokeWidth={isSelected ? 2.5 : isInTrail || isHoveredTarget ? 2 : 1.5}
                      className="node-outer-circle"
                    />

                    {/* Node Label inside circle: Trail Step # if visited, else Code */}
                    {isInTrail ? (
                      <text
                        textAnchor="middle"
                        dy="4.5"
                        fill="#FFFFFF"
                        fontSize="12"
                        fontWeight="700"
                        fontFamily="Google Sans, sans-serif"
                        style={{ userSelect: 'none', pointerEvents: 'none' }}
                      >
                        {trailStepIndex + 1}
                      </text>
                    ) : (
                      <text
                        textAnchor="middle"
                        dy="4"
                        fill={isSelected ? '#121316' : '#64748B'}
                        fontSize="10"
                        fontWeight="600"
                        fontFamily="Google Sans, monospace"
                        style={{ userSelect: 'none', pointerEvents: 'none' }}
                      >
                        {node.code}
                      </text>
                    )}

                    {/* Domain Color Badge Accent */}
                    <circle
                      cx="14"
                      cy="-14"
                      r="4.5"
                      fill={domainDef.color}
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />

                    {/* Node Text Label */}
                    <g transform={`translate(0, ${isSelected ? 38 : 32})`}>
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
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ================= RIGHT: STORY DOSSIER ================= */}
        <aside className="lineage-dossier-panel">
          {/* Dossier Header: Clean, minimal, zero tags, zero emojis */}
          <div className="dossier-header simplified">
            <div className="dossier-clean-title-block">
              <h2 className="dossier-title">{activeNode.title}</h2>
            </div>

            {/* One-Sentence Superpower Headline */}
            <p className="dossier-superpower-headline">
              "{activeNode.superpower}"
            </p>

            <div className="dossier-meta-actions">
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
            {/* Visual Lineage Bridge: How previousNode connects to activeNode */}
            {/* Guarantees that clicking one node after another ALWAYS explains the connection! */}
            {previousNode && activeNode && previousNode.id !== activeNode.id && lastConnection ? (
              <div className="easy-bridge-card">
                <div className="easy-bridge-top">
                  <span className="bridge-step-chip">{previousNode.title}</span>
                  <ArrowRight size={13} className="bridge-arrow" />
                  <span className="bridge-step-chip active">{activeNode.title}</span>
                </div>
                <h4 className="easy-bridge-question">
                  {typeof lastConnection.paaQuestion === 'string'
                    ? lastConnection.paaQuestion.replace(/^["'`]|["'`]$/g, '')
                    : lastConnection.paaQuestion}
                </h4>
                <p className="easy-bridge-explanation">{lastConnection.story}</p>
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
                            {activeNode.title} → {conn.targetNode.title}
                          </span>
                          <ArrowRight size={13} className="paa-arrow" />
                        </div>
                        <h4 className="paa-question-heading simplified">{conn.paaQuestion}</h4>
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
                            <span>{uNode.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="complete-all-done-note">
                      Constellation master: You have connected all 10 breakthroughs across every academic field!
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
            className="trail-action-btn"
            onClick={handleBackToQuestions}
            title="Return to questions list"
          >
            <ArrowLeft size={12} />
            <span>Change question</span>
          </button>
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
            title="Reset to starting breakthrough"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

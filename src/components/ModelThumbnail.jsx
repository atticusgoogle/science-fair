import React from 'react';

/**
 * ModelThumbnail
 * Renders an evocative, high-fidelity miniature visual of the scientific AI model
 * for each research project on the trifold cards.
 */
export function ModelThumbnail({ demoType, title }) {
  switch (demoType) {
    case 'protein_3d':
      return (
        <div className="model-thumbnail-canvas protein-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            <defs>
              <linearGradient id="proteinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
              <filter id="glow-protein" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Background grid */}
            <line x1="20" y1="34" x2="140" y2="34" stroke="#1f293d" strokeWidth="0.8" strokeDasharray="2,3" />
            <line x1="80" y1="10" x2="80" y2="58" stroke="#1f293d" strokeWidth="0.8" strokeDasharray="2,3" />

            {/* Alpha-helix backbone ribbon */}
            <path
              d="M 18,34 Q 32,8 48,34 T 78,34 T 108,34 T 142,34"
              fill="none"
              stroke="url(#proteinGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow-protein)"
            />
            <path
              d="M 18,34 Q 32,60 48,34 T 78,34 T 108,34 T 142,34"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeDasharray="2,2"
              opacity="0.6"
            />

            {/* Residue backbone nodes */}
            {[
              { cx: 24, cy: 22, r: 2.2, col: '#bae6fd' },
              { cx: 38, cy: 16, r: 2.5, col: '#38bdf8' },
              { cx: 58, cy: 46, r: 2.2, col: '#818cf8' },
              { cx: 68, cy: 48, r: 2.5, col: '#a78bfa' },
              { cx: 88, cy: 20, r: 2.2, col: '#38bdf8' },
              { cx: 100, cy: 18, r: 2.5, col: '#818cf8' },
              { cx: 122, cy: 46, r: 2.5, col: '#c084fc' },
              { cx: 136, cy: 40, r: 2.2, col: '#e0e7ff' },
            ].map((pt, i) => (
              <circle key={i} cx={pt.cx} cy={pt.cy} r={pt.r} fill={pt.col} />
            ))}

            {/* Ligand molecule in binding pocket */}
            <g transform="translate(80, 34)">
              <line x1="0" y1="0" x2="8" y2="-7" stroke="#facc15" strokeWidth="1.2" strokeDasharray="1.5,1.5" />
              <circle cx="0" cy="0" r="4.5" fill="#f43f5e" />
              <circle cx="8" cy="-7" r="3.2" fill="#facc15" />
              <circle cx="-6" cy="6" r="2.5" fill="#fb923c" />
            </g>

            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">AF3 3D</text>
          </svg>
        </div>
      );

    case 'crystal_lattice':
      return (
        <div className="model-thumbnail-canvas crystal-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            <defs>
              <linearGradient id="latticeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            {/* Coordinate lattice bonds */}
            {[
              { x1: 25, y1: 22, x2: 65, y2: 16 },
              { x1: 65, y1: 16, x2: 105, y2: 16 },
              { x1: 105, y1: 16, x2: 135, y2: 24 },
              { x1: 25, y1: 48, x2: 65, y2: 44 },
              { x1: 65, y1: 44, x2: 105, y2: 44 },
              { x1: 105, y1: 44, x2: 135, y2: 50 },
              { x1: 25, y1: 22, x2: 25, y2: 48 },
              { x1: 65, y1: 16, x2: 65, y2: 44 },
              { x1: 105, y1: 16, x2: 105, y2: 44 },
              { x1: 135, y1: 24, x2: 135, y2: 50 },
              { x1: 65, y1: 16, x2: 105, y2: 44 },
              { x1: 65, y1: 44, x2: 105, y2: 16 },
            ].map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#334155" strokeWidth="1" />
            ))}

            {/* Interstitial lithium and transition metal atoms */}
            {[
              { cx: 25, cy: 22, r: 3.5, fill: '#34d399', label: 'Li' },
              { cx: 65, cy: 16, r: 4.5, fill: '#38bdf8', label: 'V' },
              { cx: 105, cy: 16, r: 3.5, fill: '#34d399', label: 'Li' },
              { cx: 135, cy: 24, r: 3, fill: '#f43f5e', label: 'O' },
              { cx: 25, cy: 48, r: 3, fill: '#f43f5e', label: 'O' },
              { cx: 65, cy: 44, r: 3.5, fill: '#34d399', label: 'Li' },
              { cx: 105, cy: 44, r: 4.5, fill: '#38bdf8', label: 'V' },
              { cx: 135, cy: 50, r: 3.5, fill: '#34d399', label: 'Li' },
              { cx: 85, cy: 30, r: 4, fill: '#fbbf24', label: 'P' },
            ].map((atom, i) => (
              <g key={i}>
                <circle cx={atom.cx} cy={atom.cy} r={atom.r} fill={atom.fill} />
                <circle cx={atom.cx} cy={atom.cy} r={atom.r + 1.2} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
              </g>
            ))}

            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">GNoME</text>
          </svg>
        </div>
      );

    case 'weather_slider':
      return (
        <div className="model-thumbnail-canvas weather-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            {/* Atmospheric pressure contours */}
            <ellipse cx="75" cy="34" rx="55" ry="24" fill="none" stroke="#1e293b" strokeWidth="1" />
            <ellipse cx="75" cy="34" rx="42" ry="18" fill="none" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" strokeDasharray="3,2" />
            <ellipse cx="75" cy="34" rx="26" ry="11" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.7" />

            {/* Cyclonic swirling spiral */}
            <path
              d="M 75,34 m -18,0 a 18,18 0 1,0 36,0 a 14,14 0 1,0 -28,0 a 10,10 0 1,0 20,0 a 6,6 0 1,0 -12,0"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Storm Track Vector (AI 10-day trajectory) */}
            <path
              d="M 22,54 Q 50,48 75,34 T 132,14"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
            {/* Landfall prediction star */}
            <circle cx="132" cy="14" r="3" fill="#f43f5e" />
            <circle cx="132" cy="14" r="6" fill="none" stroke="#f43f5e" strokeWidth="0.8" opacity="0.6" />

            <text x="14" y="20" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">9-DAY AI</text>
            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">GraphCast</text>
          </svg>
        </div>
      );

    case 'fusion_tokamak':
      return (
        <div className="model-thumbnail-canvas fusion-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            <defs>
              <filter id="plasmaGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>
            {/* Tokamak Chamber Shell */}
            <ellipse cx="80" cy="34" rx="64" ry="24" fill="none" stroke="#334155" strokeWidth="2.5" />

            {/* Magnetic poloidal coils */}
            {[-45, -25, 0, 25, 45].map((dx, i) => (
              <rect key={i} x={80 + dx - 4} y="7" width="8" height="6" fill="#f97316" rx="1" />
            ))}
            {[-45, -25, 0, 25, 45].map((dx, i) => (
              <rect key={i} x={80 + dx - 4} y="55" width="8" height="6" fill="#f97316" rx="1" />
            ))}

            {/* 100M °C Plasma Core */}
            <ellipse
              cx="80"
              cy="34"
              rx="46"
              ry="14"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
              filter="url(#plasmaGlow)"
              opacity="0.9"
            />
            <ellipse
              cx="80"
              cy="34"
              rx="46"
              ry="14"
              fill="none"
              stroke="#f0abfc"
              strokeWidth="2"
              opacity="0.95"
            />

            <text x="80" y="37" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">
              100M °C STABLE
            </text>
            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">RL-Tokamak</text>
          </svg>
        </div>
      );

    case 'flood_timeline':
      return (
        <div className="model-thumbnail-canvas flood-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            <defs>
              <linearGradient id="floodWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.45)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 0.05)" />
              </linearGradient>
            </defs>
            {/* Grid & Axis */}
            <line x1="16" y1="56" x2="148" y2="56" stroke="#1e293b" strokeWidth="1" />
            <line x1="16" y1="12" x2="16" y2="56" stroke="#1e293b" strokeWidth="1" />

            {/* Critical Flood Risk Alert Line */}
            <line x1="16" y1="26" x2="148" y2="26" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" />
            <text x="146" y="23" textAnchor="end" fill="#f87171" fontSize="6" fontFamily="var(--font-mono)">CRITICAL THRESHOLD</text>

            {/* River Discharge Hydrograph area */}
            <path
              d="M 16,56 L 16,48 Q 50,45 75,18 T 115,44 L 148,52 L 148,56 Z"
              fill="url(#floodWaterGrad)"
            />
            {/* River discharge curve line */}
            <path
              d="M 16,48 Q 50,45 75,18 T 115,44 L 148,52"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Peak prediction point */}
            <circle cx="75" cy="18" r="3" fill="#22d3ee" />
            <circle cx="75" cy="18" r="6" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />

            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">Flood Hub</text>
          </svg>
        </div>
      );

    case 'dna_sequence':
      return (
        <div className="model-thumbnail-canvas dna-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            {/* Regulatory Expression Peak Curve (Histone peak) */}
            <path
              d="M 14,32 Q 40,32 55,14 Q 70,8 85,16 Q 105,32 146,32"
              fill="none"
              stroke="#34d399"
              strokeWidth="1.5"
            />
            <line x1="14" y1="32" x2="146" y2="32" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="2,2" />

            {/* Base pair nodes (A, T, G, C) */}
            {[
              { base: 'A', col: '#38bdf8', x: 26 },
              { base: 'C', col: '#34d399', x: 44 },
              { base: 'G', col: '#fbbf24', x: 62 },
              { base: 'T', col: '#f87171', x: 80 },
              { base: 'G', col: '#fbbf24', x: 98 },
              { base: 'A', col: '#38bdf8', x: 116 },
              { base: 'C', col: '#34d399', x: 134 },
            ].map((b, i) => (
              <g key={i} transform={`translate(${b.x}, 48)`}>
                <rect x="-6" y="-8" width="12" height="14" rx="2" fill="#1e293b" stroke={b.col} strokeWidth="1" />
                <text x="0" y="2.5" textAnchor="middle" fill={b.col} fontSize="7" fontWeight="bold" fontFamily="var(--font-mono)">
                  {b.base}
                </text>
              </g>
            ))}

            <text x="14" y="16" fill="#34d399" fontSize="6.5" fontFamily="var(--font-mono)">EXPRESSION</text>
            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">Enformer</text>
          </svg>
        </div>
      );

    case 'fire_satellite':
      return (
        <div className="model-thumbnail-canvas fire-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            <defs>
              <radialGradient id="fireThermalGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f87171" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fb923c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Topographic elevation contours */}
            <path d="M 12,48 Q 50,30 90,44 T 150,36" fill="none" stroke="#1e293b" strokeWidth="1" />
            <path d="M 12,30 Q 60,18 110,32 T 150,22" fill="none" stroke="#1e293b" strokeWidth="1" />

            {/* Thermal fire boundary polygon */}
            <ellipse cx="80" cy="34" rx="34" ry="18" fill="url(#fireThermalGrad)" />
            <path
              d="M 52,34 Q 65,20 88,22 Q 106,24 112,36 Q 96,48 74,44 Z"
              fill="rgba(239, 68, 68, 0.4)"
              stroke="#ef4444"
              strokeWidth="1.8"
            />

            {/* Satellite IR Reticle */}
            <g transform="translate(80, 34)">
              <line x1="-8" y1="0" x2="-3" y2="0" stroke="#facc15" strokeWidth="1" />
              <line x1="3" y1="0" x2="8" y2="0" stroke="#facc15" strokeWidth="1" />
              <line x1="0" y1="-8" x2="0" y2="-3" stroke="#facc15" strokeWidth="1" />
              <line x1="0" y1="3" x2="0" y2="8" stroke="#facc15" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="#facc15" />
            </g>

            <text x="14" y="18" fill="#f87171" fontSize="6.5" fontFamily="var(--font-mono)">THERMAL IR</text>
            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">Fire AI</text>
          </svg>
        </div>
      );

    case 'quantum_orbital':
      return (
        <div className="model-thumbnail-canvas quantum-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            <defs>
              <radialGradient id="orbitalP1" cx="40%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.1" />
              </radialGradient>
              <radialGradient id="orbitalP2" cx="60%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* Nodal Plane hairline */}
            <line x1="80" y1="8" x2="80" y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="20" y1="34" x2="140" y2="34" stroke="#1e293b" strokeWidth="0.8" />

            {/* Dumbbell Orbital Lobes */}
            <ellipse cx="58" cy="34" rx="20" ry="14" fill="url(#orbitalP1)" stroke="#c084fc" strokeWidth="1.2" />
            <ellipse cx="102" cy="34" rx="20" ry="14" fill="url(#orbitalP2)" stroke="#38bdf8" strokeWidth="1.2" />

            {/* Atomic Core */}
            <circle cx="80" cy="34" r="3" fill="#facc15" />
            <text x="58" y="37" textAnchor="middle" fill="#f3e8ff" fontSize="8" fontWeight="bold">Ψ+</text>
            <text x="102" y="37" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="bold">Ψ−</text>

            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">FermiNet</text>
          </svg>
        </div>
      );

    case 'geometry_proof':
      return (
        <div className="model-thumbnail-canvas proof-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            {/* Auxiliary Circumcircle (proposed by AI) */}
            <circle cx="80" cy="36" r="26" fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3,2" />

            {/* Fundamental Triangle ABC */}
            <polygon points="80,12 42,54 118,54" fill="rgba(255,255,255,0.03)" stroke="#f8fafc" strokeWidth="1.8" />

            {/* Orthogonal ray & proof steps */}
            <line x1="80" y1="12" x2="80" y2="54" stroke="#38bdf8" strokeWidth="1.4" />
            <line x1="42" y1="54" x2="99" y2="33" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2,2" />

            {/* Key vertices */}
            <circle cx="80" cy="12" r="2.5" fill="#f8fafc" />
            <circle cx="42" cy="54" r="2.5" fill="#f8fafc" />
            <circle cx="118" cy="54" r="2.5" fill="#f8fafc" />
            {/* Orthocenter */}
            <circle cx="80" cy="39" r="2.5" fill="#f43f5e" />

            <text x="80" y="8" textAnchor="middle" fill="#cbd5e1" fontSize="6.5" fontFamily="var(--font-mono)">A</text>
            <text x="34" y="58" fill="#cbd5e1" fontSize="6.5" fontFamily="var(--font-mono)">B</text>
            <text x="122" y="58" fill="#cbd5e1" fontSize="6.5" fontFamily="var(--font-mono)">C</text>

            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">AlphaGeo</text>
          </svg>
        </div>
      );

    case 'bioacoustics_demo':
      return (
        <div className="model-thumbnail-canvas audio-preview">
          <svg viewBox="0 0 160 68" className="mini-model-svg">
            {/* Frequency Spectrogram Bars */}
            {[
              12, 18, 28, 42, 36, 22, 14, 25, 46, 52, 40, 30, 20, 35, 48, 38, 24, 16, 28, 45, 32, 18, 14, 26
            ].map((h, i) => (
              <rect
                key={i}
                x={12 + i * 5.8}
                y={56 - (h * 0.75)}
                width="3.6"
                height={h * 0.75}
                fill={i >= 8 && i <= 15 ? '#34d399' : '#38bdf8'}
                rx="1"
                opacity="0.85"
              />
            ))}

            {/* Bird Song Harmonic Pitch Curve */}
            <path
              d="M 14,40 Q 50,14 74,12 T 110,24 T 146,38"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <text x="14" y="16" fill="#34d399" fontSize="6.5" fontFamily="var(--font-mono)">98.4% MATCH</text>
            <text x="148" y="62" textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">Perch AI</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="model-thumbnail-canvas default-preview">
          <div className="default-preview-content">
            <span className="default-preview-label">{title || 'Interactive AI Model'}</span>
          </div>
        </div>
      );
  }
}

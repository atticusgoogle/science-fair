import React, { useState, useEffect, useRef } from 'react';

// 1. AlphaFold 3: 3D Protein & Drug Docking Simulator
export function Protein3DDemo() {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0.4, y: 0.7 });
  const [candidate, setCandidate] = useState('inhibitor'); // 'inhibitor' | 'mismatch'
  const [dockProgress, setDockProgress] = useState(1); // 0 = undocked, 1 = docked
  const [isDocking, setIsDocking] = useState(false);
  const [showSurface, setShowSurface] = useState(false);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const testDocking = (targetCandidate) => {
    const selected = targetCandidate || candidate;
    if (targetCandidate) setCandidate(targetCandidate);
    setIsDocking(true);
    setDockProgress(0);

    const start = performance.now();
    const duration = 650;

    const animate = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDockProgress(eased);

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsDocking(false);
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let autoAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.fillStyle = '#080b11';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      for (let i = -140; i <= 140; i += 24) {
        ctx.beginPath();
        ctx.moveTo(cx + i, cy - 80);
        ctx.lineTo(cx + i, cy + 80);
        ctx.stroke();
      }

      const rotY = rotation.y + autoAngle;
      const rotX = rotation.x;

      const numNodes = 36;
      const points = [];

      for (let i = 0; i < numNodes; i++) {
        const t = (i / numNodes) * Math.PI * 4;
        const r = 45 + Math.sin(t * 1.5) * 15;
        let x = Math.cos(t) * r;
        let y = (i - numNodes / 2) * 4.5;
        let z = Math.sin(t) * r;

        let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        let z1 = x * Math.sin(rotY) + z * Math.cos(rotY);

        let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

        const scale = 300 / (300 + z2);
        points.push({
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
          color: i < 18 ? '#38bdf8' : '#818cf8'
        });
      }

      if (showSurface) {
        points.forEach(p => {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.07)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 15 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        ctx.strokeStyle = p1.color;
        ctx.lineWidth = Math.max(1.5, 4 * p1.scale);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        ctx.fillStyle = p1.z > 0 ? '#e0f2fe' : '#0284c7';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(2, 3.5 * p1.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      const targetLX = 8 * Math.cos(rotY) - 8 * Math.sin(rotY);
      const targetLZ = 8 * Math.sin(rotY) + 8 * Math.cos(rotY);
      const targetLY = 4 * Math.cos(rotX) - targetLZ * Math.sin(rotX);

      const isGood = candidate === 'inhibitor';
      const startDist = 95;
      const approachAngle = isGood ? 0 : 0.6;
      const curDist = (1 - dockProgress) * startDist;
      const bounce = (!isGood && dockProgress > 0.7) ? Math.sin((dockProgress - 0.7) * Math.PI * 3.33) * 22 : 0;

      const lx = targetLX + Math.cos(rotY + approachAngle) * (curDist + bounce);
      const ly = targetLY - (curDist + bounce) * 0.4;
      const lz = targetLZ + Math.sin(rotY + approachAngle) * (curDist + bounce);
      const lScale = 300 / (300 + lz);

      const ligX = cx + lx * lScale;
      const ligY = cy + ly * lScale;

      if (isGood) {
        ctx.fillStyle = '#34d399';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = dockProgress > 0.9 ? 16 : 6;
        ctx.beginPath();
        ctx.arc(ligX, ligY, 8.5 * lScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(ligX + 12 * lScale, ligY - 7 * lScale, 6 * lScale, 0, Math.PI * 2);
        ctx.fill();

        if (dockProgress > 0.85) {
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          [11, 13, 22].forEach(idx => {
            if (points[idx]) {
              ctx.beginPath();
              ctx.moveTo(ligX, ligY);
              ctx.lineTo(points[idx].x, points[idx].y);
              ctx.stroke();
            }
          });
          ctx.setLineDash([]);
        }
      } else {
        ctx.fillStyle = '#f87171';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = bounce > 4 ? 16 : 4;
        ctx.beginPath();
        ctx.arc(ligX, ligY, 9 * lScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#fb923c';
        ctx.beginPath();
        ctx.arc(ligX - 10 * lScale, ligY + 8 * lScale, 6.5 * lScale, 0, Math.PI * 2);
        ctx.fill();

        if (bounce > 4) {
          ctx.strokeStyle = '#f87171';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ligX - 5, ligY - 5);
          ctx.lineTo(ligX + 5, ligY + 5);
          ctx.moveTo(ligX + 5, ligY - 5);
          ctx.lineTo(ligX - 5, ligY + 5);
          ctx.stroke();
        }
      }

      if (!isDragging.current) {
        autoAngle += 0.007;
      }
      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [rotation, candidate, dockProgress, showSurface]);

  const verdict = candidate === 'inhibitor' && dockProgress > 0.85
    ? { dot: 'green', text: 'Target locked: 98% binding affinity (protein deactivated)' }
    : candidate === 'mismatch' && dockProgress > 0.85
    ? { dot: 'red', text: 'Steric clash: 12% affinity (compound repelled)' }
    : { dot: 'cyan', text: 'Simulating molecular docking trajectory...' };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>
        <canvas
          ref={canvasRef}
          width={380}
          height={175}
          onMouseDown={(e) => {
            isDragging.current = true;
            lastMouse.current = { x: e.clientX, y: e.clientY };
          }}
          onMouseMove={(e) => {
            if (!isDragging.current) return;
            const dx = e.clientX - lastMouse.current.x;
            const dy = e.clientY - lastMouse.current.y;
            lastMouse.current = { x: e.clientX, y: e.clientY };
            setRotation(prev => ({ x: prev.x + dy * 0.01, y: prev.y + dx * 0.01 }));
          }}
          onMouseUp={() => isDragging.current = false}
          onMouseLeave={() => isDragging.current = false}
          onTouchStart={(e) => {
            if (e.touches.length === 1) {
              isDragging.current = true;
              lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
          }}
          onTouchMove={(e) => {
            if (!isDragging.current || e.touches.length !== 1) return;
            const dx = e.touches[0].clientX - lastMouse.current.x;
            const dy = e.touches[0].clientY - lastMouse.current.y;
            lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            setRotation(prev => ({ x: prev.x + dy * 0.01, y: prev.y + dx * 0.01 }));
          }}
          onTouchEnd={() => isDragging.current = false}
          style={{ cursor: 'grab', display: 'block', width: '100%', height: 'auto' }}
        />
        <div className="demo-drag-hint">drag to rotate in 3D</div>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${candidate === 'inhibitor' ? 'active' : ''}`}
            onClick={() => testDocking('inhibitor')}
          >
            Target inhibitor
          </button>
          <button
            className={`demo-segment-btn ${candidate === 'mismatch' ? 'active' : ''}`}
            onClick={() => testDocking('mismatch')}
          >
            Mismatched compound
          </button>
        </div>

        <div className="demo-control-row">
          <button
            className="demo-action-btn primary"
            onClick={() => testDocking()}
            disabled={isDocking}
          >
            {isDocking ? 'Simulating...' : 'Test docking'}
          </button>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showSurface}
              onChange={(e) => setShowSurface(e.target.checked)}
            />
            <span>Show surface</span>
          </label>
        </div>
      </div>

      <div className="demo-subnote">
        AlphaFold 3 predicts how synthetic drugs lock into disease proteins with atomic precision.
      </div>
    </div>
  );
}

// 2. GNoME: AI Crystal Discovery & Autonomous Lab Synthesizer
export function CrystalLatticeDemo() {
  const [material, setMaterial] = useState('battery');
  const [vacancies, setVacancies] = useState(new Set());
  const [testing, setTesting] = useState(false);

  const materialsData = {
    battery: {
      formula: 'Li3V2(PO4)3',
      name: 'Lithium battery cathode',
      energy: -0.048,
      stable: true,
      color: '#38bdf8',
      desc: 'High-density cathode for electric vehicles'
    },
    solar: {
      formula: 'Cs2AgBiBr6',
      name: 'Lead-free solar perovskite',
      energy: -0.032,
      stable: true,
      color: '#34d399',
      desc: 'Non-toxic, high-durability next-gen solar cell'
    },
    superconductor: {
      formula: 'YBa2Cu3O7',
      name: 'High-temperature superconductor',
      energy: -0.015,
      stable: true,
      color: '#c084fc',
      desc: 'Zero-resistance electrical transmission'
    },
    unstable: {
      formula: 'Fe4C3S2',
      name: 'High-energy alloy',
      energy: +0.095,
      stable: false,
      color: '#f87171',
      desc: 'Unstable: spontaneously decomposes at room temperature'
    }
  };

  const current = materialsData[material];
  const defectPenalty = vacancies.size * 0.035;
  const effectiveEnergy = Number((current.energy + defectPenalty).toFixed(3));
  const isCurrentlyStable = effectiveEnergy < 0;

  const toggleAtom = (index) => {
    setVacancies(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const runRobotTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
    }, 600);
  };

  const verdict = isCurrentlyStable
    ? { dot: 'green', text: `${current.formula}: stable crystal structure (${effectiveEnergy > 0 ? `+${effectiveEnergy}` : effectiveEnergy} eV/atom)` }
    : { dot: 'red', text: `${current.formula}: unstable lattice (${effectiveEnergy > 0 ? `+${effectiveEnergy}` : effectiveEnergy} eV/atom), decomposes` };

  // Calculate pin position along 330px track: 0.0 eV is at center x = 190.
  // Range is -0.09 to +0.09 eV mapped to x = 30 to x = 350
  const clamped = Math.max(-0.09, Math.min(0.09, effectiveEnergy));
  const pinX = 190 + (clamped / 0.09) * 145;

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <svg width="100%" height="182" viewBox="0 0 380 182" style={{ background: '#080b11', display: 'block' }}>
          {/* Header guidance line inside SVG */}
          <text x="14" y="15" fill="#64748b" fontSize="7.5" fontFamily="monospace">
            Tap atom to simulate vacancy defect
          </text>
          <text x="366" y="15" fill="#94a3b8" fontSize="7.5" textAnchor="end" fontFamily="monospace">
            {current.formula}
          </text>

          {/* Background perspective axes */}
          <line x1="45" y1="108" x2="335" y2="108" stroke="#161e2e" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="190" y1="20" x2="190" y2="108" stroke="#161e2e" strokeWidth="1" strokeDasharray="3,3" />

          {/* 3D Isometric Crystal Lattice */}
          {[0, 1, 2].map(layer => (
            <g key={`layer-${layer}`} opacity={layer === 0 ? 0.55 : layer === 1 ? 0.82 : 1}>
              {[0, 1, 2].map(row => (
                <g key={`row-${row}`}>
                  {[0, 1, 2, 3].map(col => {
                    const idx = layer * 12 + row * 4 + col;
                    const isRemoved = vacancies.has(idx);

                    const x = 75 + col * 62 + layer * 15 - row * 11;
                    const y = 24 + row * 26 + layer * 10;

                    const rightX = x + 62;
                    const downY = y + 26;

                    return (
                      <g key={idx}>
                        {col < 3 && (
                          <line
                            x1={x}
                            y1={y}
                            x2={rightX}
                            y2={y}
                            stroke={isCurrentlyStable ? '#2a3649' : '#7f1d1d'}
                            strokeWidth={isRemoved ? 1 : 1.8}
                            strokeDasharray={isRemoved ? '3,3' : 'none'}
                          />
                        )}
                        {row < 2 && (
                          <line
                            x1={x}
                            y1={y}
                            x2={x - 11}
                            y2={downY}
                            stroke={isCurrentlyStable ? '#2a3649' : '#7f1d1d'}
                            strokeWidth={isRemoved ? 1 : 1.8}
                            strokeDasharray={isRemoved ? '3,3' : 'none'}
                          />
                        )}
                        <circle
                          cx={x}
                          cy={y}
                          r={isRemoved ? 3.5 : testing ? 9 : 7.5}
                          fill={isRemoved ? 'transparent' : current.color}
                          stroke={isRemoved ? '#64748b' : '#ffffff'}
                          strokeWidth={isRemoved ? 1.5 : 1}
                          strokeDasharray={isRemoved ? '2,2' : 'none'}
                          style={{
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            filter: testing && !isRemoved ? `drop-shadow(0 0 8px ${current.color})` : 'none'
                          }}
                          onClick={() => toggleAtom(idx)}
                        />
                        {!isRemoved && (
                          <text
                            x={x}
                            y={y + 3}
                            textAnchor="middle"
                            fill="#000000"
                            fontSize="7"
                            fontWeight="bold"
                            pointerEvents="none"
                          >
                            {material === 'battery' ? (idx % 2 === 0 ? 'Li' : 'V') : material === 'solar' ? 'Cs' : 'Cu'}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>
              ))}
            </g>
          ))}

          {/* Separator Boundary above Convex Hull Gauge */}
          <line x1="20" y1="120" x2="360" y2="120" stroke="#1c2433" strokeWidth="1" />

          {/* Convex Hull Thermodynamic Stability Section */}
          <text x="190" y="132" fill="#94a3b8" fontSize="7.5" textAnchor="middle" fontFamily="monospace">
            Convex hull stability threshold (0.0 eV)
          </text>
          <text x="25" y="132" fill="#34d399" fontSize="6.5" fontFamily="monospace">
            Stable zone
          </text>
          <text x="355" y="132" fill="#f87171" fontSize="6.5" textAnchor="end" fontFamily="monospace">
            Decomposes
          </text>

          {/* Track background with dual-zone color gradient */}
          <rect x="25" y="138" width="330" height="8" rx="4" fill="#0c111a" stroke="#1e293b" strokeWidth="1" />
          <rect x="25" y="138" width="165" height="8" rx="4" fill="rgba(52, 211, 153, 0.25)" />
          <rect x="190" y="138" width="165" height="8" rx="4" fill="rgba(248, 113, 113, 0.2)" />
          <line x1="190" y1="134" x2="190" y2="150" stroke="#ffffff" strokeWidth="1.5" />

          {/* Energy Level Pin Indicator */}
          <circle
            cx={pinX}
            cy={142}
            r={5.5}
            fill={isCurrentlyStable ? '#34d399' : '#f87171'}
            stroke="#ffffff"
            strokeWidth="1.5"
          />

          {/* Readout labels below track */}
          <text
            x={pinX}
            y="158"
            fill={isCurrentlyStable ? '#34d399' : '#f87171'}
            fontSize="7.5"
            textAnchor="middle"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {effectiveEnergy > 0 ? `+${effectiveEnergy}` : effectiveEnergy} eV/atom
          </text>
          <text x="190" y="172" fill="#64748b" fontSize="6.5" textAnchor="middle" fontFamily="monospace">
            0.0 eV baseline
          </text>
        </svg>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${material === 'battery' ? 'active' : ''}`}
            onClick={() => { setMaterial('battery'); setVacancies(new Set()); }}
          >
            Battery cathode
          </button>
          <button
            className={`demo-segment-btn ${material === 'solar' ? 'active' : ''}`}
            onClick={() => { setMaterial('solar'); setVacancies(new Set()); }}
          >
            Solar cell
          </button>
          <button
            className={`demo-segment-btn ${material === 'superconductor' ? 'active' : ''}`}
            onClick={() => { setMaterial('superconductor'); setVacancies(new Set()); }}
          >
            Superconductor
          </button>
          <button
            className={`demo-segment-btn ${material === 'unstable' ? 'active' : ''}`}
            onClick={() => { setMaterial('unstable'); setVacancies(new Set()); }}
          >
            Unstable alloy
          </button>
        </div>

        <div className="demo-control-row">
          <button className="demo-action-btn primary" onClick={runRobotTest}>
            {testing ? 'Testing...' : 'Test in robot lab'}
          </button>

          {vacancies.size > 0 && (
            <button className="demo-action-btn" onClick={() => setVacancies(new Set())}>
              Reset defects ({vacancies.size})
            </button>
          )}

          <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: 'auto', fontFamily: 'monospace' }}>
            {current.formula}
          </span>
        </div>
      </div>

      <div className="demo-subnote">
        GNoME evaluates millions of atomic recipes on a computer before sending the 380,000 stable candidates to robotic synthesis labs.
      </div>
    </div>
  );
}

// 3. GraphCast: 10-Day Hurricane Track AI vs Supercomputer
export function WeatherSliderDemo() {
  const [day, setDay] = useState(9);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'ai' | 'nwp'
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setDay(prev => {
          if (prev >= 10) {
            setIsPlaying(false);
            return 10;
          }
          return prev + 1;
        });
      }, 500);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const graphCastTrack = [
    { day: 1, x: 120, y: 145 },
    { day: 2, x: 135, y: 138 },
    { day: 3, x: 155, y: 128 },
    { day: 4, x: 175, y: 118 },
    { day: 5, x: 195, y: 105 },
    { day: 6, x: 215, y: 92 },
    { day: 7, x: 235, y: 78 },
    { day: 8, x: 255, y: 64 },
    { day: 9, x: 275, y: 50 },
    { day: 10, x: 295, y: 38 },
  ];

  const supercomputerTrack = [
    { day: 1, x: 120, y: 145 },
    { day: 2, x: 135, y: 138 },
    { day: 3, x: 155, y: 128 },
    { day: 4, x: 175, y: 118 },
    { day: 5, x: 205, y: 112 },
    { day: 6, x: 240, y: 108 },
    { day: 7, x: 278, y: 106 },
    { day: 8, x: 315, y: 105 },
    { day: 9, x: 345, y: 108 },
    { day: 10, x: 365, y: 115 },
  ];

  const currentAI = graphCastTrack[day - 1];
  const currentNWP = supercomputerTrack[day - 1];

  const verdict = day === 9
    ? { dot: 'green', text: 'Day 9: GraphCast verified landfall in Nova Scotia; supercomputer missed to open sea' }
    : { dot: 'cyan', text: `Day ${day} forecast track: AI 45s compute vs supercomputer 2.2 hours` };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <svg width="100%" height="155" viewBox="0 0 380 155" style={{ background: '#080b11', display: 'block' }}>
          <path
            d="M 50,155 Q 60,135 70,120 T 95,90 Q 120,75 165,65 T 235,55 Q 260,48 285,42 Q 310,35 335,22 L 335,0 L 0,0 L 0,155 Z"
            fill="#121824"
            stroke="#232e42"
            strokeWidth="1.5"
          />
          <path
            d="M 265,55 Q 285,44 305,50 Q 295,62 275,60 Z"
            fill="#1e293b"
            stroke="#38bdf8"
            strokeWidth="1"
          />
          <text x="285" y="70" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
            NOVA SCOTIA
          </text>
          <text x="85" y="105" fill="#64748b" fontSize="8" fontFamily="monospace">
            US EAST COAST
          </text>

          <line x1="0" y1="45" x2="380" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="4,4" />
          <line x1="0" y1="95" x2="380" y2="95" stroke="rgba(255,255,255,0.05)" strokeDasharray="4,4" />
          <line x1="200" y1="0" x2="200" y2="155" stroke="rgba(255,255,255,0.05)" strokeDasharray="4,4" />

          {(viewMode === 'both' || viewMode === 'nwp') && (
            <g>
              <path
                d={supercomputerTrack.slice(0, day).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                strokeDasharray="4,3"
              />
              <circle cx={currentNWP.x} cy={currentNWP.y} r={5} fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
              {day >= 8 && (
                <text x={currentNWP.x} y={currentNWP.y + 14} fill="#f87171" fontSize="7.5" textAnchor="middle" fontWeight="bold">
                  Missed to sea
                </text>
              )}
            </g>
          )}

          {(viewMode === 'both' || viewMode === 'ai') && (
            <g>
              <path
                d={graphCastTrack.slice(0, day).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
              />
              <circle cx={currentAI.x} cy={currentAI.y} r={8} fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" strokeWidth="2" />
              <circle cx={currentAI.x} cy={currentAI.y} r={3} fill="#ffffff" />
              {day === 9 && (
                <text x={currentAI.x} y={currentAI.y - 12} fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">
                  Landfall match (Day 9)
                </text>
              )}
            </g>
          )}

          <rect x="12" y="10" width="135" height="34" rx="3" fill="rgba(8, 11, 17, 0.85)" stroke="#232e42" />
          <text x="18" y="22" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">
            AI: 45 SEC (1 TPU)
          </text>
          <text x="18" y="34" fill="#f87171" fontSize="7.5" fontFamily="monospace">
            SUPERCOMPUTER: 2.2 HRS
          </text>
        </svg>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${viewMode === 'both' ? 'active' : ''}`}
            onClick={() => setViewMode('both')}
          >
            Both models
          </button>
          <button
            className={`demo-segment-btn ${viewMode === 'ai' ? 'active' : ''}`}
            onClick={() => setViewMode('ai')}
          >
            GraphCast AI
          </button>
          <button
            className={`demo-segment-btn ${viewMode === 'nwp' ? 'active' : ''}`}
            onClick={() => setViewMode('nwp')}
          >
            Supercomputer
          </button>
        </div>

        <div className="demo-control-row">
          <button
            className="demo-action-btn primary"
            onClick={() => {
              if (day >= 10) setDay(1);
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? 'Pause' : day >= 10 ? 'Replay run' : 'Play forecast'}
          </button>

          <div className="demo-slider-row" style={{ flex: 1 }}>
            <span className="demo-slider-label">Day {day}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="demo-slider"
            />
          </div>
        </div>
      </div>

      <div className="demo-subnote">
        GraphCast forecasts global weather 10 days out in under 1 minute — pinpointing Hurricane Lee's exact landfall when supercomputers missed.
      </div>
    </div>
  );
}

// 4. Tokamak Fusion: AI Plasma Stabilizer vs Human Reflexes
export function FusionTokamakDemo() {
  const [mode, setMode] = useState('ai'); // 'ai' | 'manual'
  const [manualOffset, setManualOffset] = useState(0); // -40 to +40
  const [quenched, setQuenched] = useState(false);
  const [turbulenceCount, setTurbulenceCount] = useState(0);

  useEffect(() => {
    if (mode === 'manual' && !quenched) {
      let drift = 0;
      const interval = setInterval(() => {
        drift += (Math.random() - 0.48) * 6;
        const totalDisplacement = Math.abs(manualOffset + drift);

        if (totalDisplacement > 36) {
          setQuenched(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [mode, manualOffset, quenched]);

  const injectTurbulence = () => {
    setTurbulenceCount(prev => prev + 1);
  };

  const verdict = quenched
    ? { dot: 'red', text: 'Wall collision: reaction quenched, heat lost to chamber wall' }
    : mode === 'ai'
    ? { dot: 'cyan', text: 'AI autopilot active: 19 magnetic coils adjusted at 10,000 Hz' }
    : { dot: 'yellow', text: 'Manual steering: human reaction (200 ms) is too slow for plasma' };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <svg width="100%" height="150" viewBox="0 0 380 150" style={{ background: '#080b11', display: 'block' }}>
          <ellipse cx="190" cy="75" rx="150" ry="56" fill="none" stroke="#2a364a" strokeWidth="4" />
          <ellipse cx="190" cy="75" rx="142" ry="48" fill="none" stroke="#161f2e" strokeWidth="1" />

          {[-120, -70, -20, 30, 80, 130].map((dx, i) => (
            <g key={i}>
              <rect
                x={190 + dx - 8}
                y={12}
                width="16"
                height="10"
                fill={mode === 'ai' ? '#38bdf8' : '#fb923c'}
                rx="2"
              />
              <rect
                x={190 + dx - 8}
                y={128}
                width="16"
                height="10"
                fill={mode === 'ai' ? '#38bdf8' : '#fb923c'}
                rx="2"
              />
            </g>
          ))}

          {mode === 'ai' && (
            <g opacity="0.4">
              <ellipse cx="190" cy="75" rx="118" ry="38" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,4" />
              <ellipse cx="190" cy="75" rx="98" ry="28" fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="3,3" />
            </g>
          )}

          {quenched ? (
            <g>
              <ellipse cx="190" cy="75" rx="142" ry="48" fill="none" stroke="#ef4444" strokeWidth="6" opacity="0.5" />
              <text x="190" y="72" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                Reaction quenched
              </text>
              <text x="190" y="87" fill="#94a3b8" fontSize="8" textAnchor="middle">
                Human reflexes (200 ms) too slow for microsecond instability
              </text>
            </g>
          ) : (
            <g>
              <ellipse
                cx="190"
                cy={75 + (mode === 'manual' ? manualOffset : 0)}
                rx={mode === 'ai' ? 105 : 95 + Math.sin(Date.now() * 0.01) * 12}
                ry={mode === 'ai' ? 30 : 22 + Math.cos(Date.now() * 0.01) * 10}
                fill="none"
                stroke={mode === 'ai' ? '#38bdf8' : '#f97316'}
                strokeWidth={mode === 'ai' ? 16 : 24}
                opacity={0.7}
                style={{ filter: 'blur(3px)' }}
              />
              <ellipse
                cx="190"
                cy={75 + (mode === 'manual' ? manualOffset : 0)}
                rx={mode === 'ai' ? 100 : 90}
                ry={mode === 'ai' ? 26 : 18}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
              />
              <text x="190" y="79" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                100,000,000 °C FUSION PLASMA
              </text>
            </g>
          )}

          <text x="18" y="140" fill={mode === 'ai' ? '#38bdf8' : '#fb923c'} fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            {mode === 'ai' ? '10,000 HZ ACTIVE FEEDBACK' : 'MANUAL STEERING'}
          </text>
        </svg>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${mode === 'ai' ? 'active' : ''}`}
            onClick={() => { setMode('ai'); setQuenched(false); }}
          >
            AI controller (10 kHz)
          </button>
          <button
            className={`demo-segment-btn ${mode === 'manual' ? 'active' : ''}`}
            onClick={() => { setMode('manual'); setQuenched(false); }}
          >
            Manual steering
          </button>
        </div>

        <div className="demo-control-row">
          {mode === 'ai' ? (
            <button className="demo-action-btn primary" onClick={injectTurbulence}>
              Inject turbulence
            </button>
          ) : (
            <>
              {quenched ? (
                <button className="demo-action-btn primary" onClick={() => { setQuenched(false); setManualOffset(0); }}>
                  Reignite plasma
                </button>
              ) : (
                <div className="demo-slider-row" style={{ flex: 1 }}>
                  <span className="demo-slider-label">Steer:</span>
                  <input
                    type="range"
                    min="-35"
                    max="35"
                    value={manualOffset}
                    onChange={(e) => setManualOffset(Number(e.target.value))}
                    className="demo-slider"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="demo-subnote">
        Deep reinforcement learning shapes 19 magnetic coils 10,000 times per second to keep 100,000,000°C plasma safely off reactor walls.
      </div>
    </div>
  );
}

// 5. Flood Hub: 7-Day River Forecast & AI Early Warning Simulator
export function FloodTimelineDemo() {
  const [forecastDay, setForecastDay] = useState(3);
  const [rainfall, setRainfall] = useState('monsoon'); // 'monsoon' | 'normal'
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimer = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      playTimer.current = setInterval(() => {
        setForecastDay(prev => {
          if (prev >= 7) {
            setIsPlaying(false);
            return 7;
          }
          return prev + 1;
        });
      }, 750);
    } else {
      clearInterval(playTimer.current);
    }
    return () => clearInterval(playTimer.current);
  }, [isPlaying]);

  // Hydrograph curve calculations
  const maxSurge = rainfall === 'monsoon' ? 1420 : 680;
  const isFloodScenario = rainfall === 'monsoon';

  // Water level in m³/s based on day curve (peaks around day 5)
  const discharge = Math.round(
    280 + Math.sin((forecastDay / 7) * Math.PI) * (maxSurge - 280)
  );
  const floodThreshold = 1000;
  const isOvertopping = discharge >= floodThreshold;
  const alertTriggered = forecastDay >= 3 && isFloodScenario;

  // Visual river water height (from bottom of channel 125 up towards 40)
  const waterY = Math.max(42, 115 - (discharge / maxSurge) * 70);

  const verdict = !isFloodScenario
    ? { dot: 'green', text: `Nominal discharge: ${discharge} m³/s (safely below embankment limit)` }
    : forecastDay >= 5
    ? { dot: 'red', text: `Peak flood surge: ${discharge} m³/s (channel overtopped, community safe)` }
    : forecastDay >= 3
    ? { dot: 'yellow', text: `Early alert broadcast: peak surge in 48h (35,000 residents notified)` }
    : { dot: 'cyan', text: `Upstream rainfall detected: AI forecasting downstream river crest` };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <svg width="100%" height="165" viewBox="0 0 380 165" style={{ display: 'block', background: '#080b11' }}>
          {/* Valley Cross-section & Mountains */}
          <path d="M 0,90 Q 40,85 70,100 T 110,120 L 110,165 L 0,165 Z" fill="#141c24" stroke="#253341" strokeWidth="1.5" />
          <path d="M 270,120 Q 300,95 330,85 T 380,80 L 380,165 L 270,165 Z" fill="#141c24" stroke="#253341" strokeWidth="1.5" />

          {/* Riverbed channel */}
          <path d="M 110,120 Q 190,145 270,120 L 270,165 L 110,165 Z" fill="#0b131e" />

          {/* River Water Surface with flow ripples */}
          <path
            d={`M 105,${waterY + 12} Q 190,${waterY - 4} 275,${waterY + 12} L 275,165 L 105,165 Z`}
            fill={isOvertopping ? 'rgba(239, 68, 68, 0.45)' : 'rgba(14, 165, 233, 0.45)'}
          />
          <path
            d={`M 105,${waterY + 12} Q 190,${waterY - 4} 275,${waterY + 12}`}
            fill="none"
            stroke={isOvertopping ? '#f87171' : '#38bdf8'}
            strokeWidth="3"
          />

          {/* Critical Flood Bank Threshold (1,000 m³/s) */}
          <line x1="80" y1="62" x2="300" y2="62" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" />
          <text x="190" y="58" fill="#ef4444" fontSize="7.5" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
            Critical embankment threshold (1,000 m³/s)
          </text>

          {/* Village Huts on Riverbank */}
          <g transform="translate(295, 70)">
            <rect x="0" y="10" width="18" height="12" fill="#334155" rx="1" />
            <polygon points="-2,10 9,0 20,10" fill="#64748b" />
            <rect x="24" y="8" width="22" height="14" fill="#334155" rx="1" />
            <polygon points="22,8 35,-2 48,8" fill="#64748b" />
            <text x="22" y="32" fill={alertTriggered ? '#34d399' : '#94a3b8'} fontSize="7.5" textAnchor="middle" fontFamily="monospace">
              {alertTriggered ? 'Evacuated safely' : 'Settlement'}
            </text>
          </g>

          {/* Upstream Catchment Rain Animation */}
          {rainfall === 'monsoon' && (
            <g opacity="0.6">
              {[20, 45, 70, 95].map((rx, idx) => (
                <line
                  key={idx}
                  x1={rx}
                  y1={20}
                  x2={rx - 10}
                  y2={45}
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="3,4"
                />
              ))}
              <text x="45" y="16" fill="#38bdf8" fontSize="7" fontFamily="monospace">
                +150mm basin rain
              </text>
            </g>
          )}

          {/* AI Early Warning Alert Banner */}
          {alertTriggered && (
            <g transform="translate(15, 78)">
              <rect x="0" y="0" width="175" height="38" rx="4" fill="rgba(15, 23, 42, 0.94)" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="8" y="13" fill="#38bdf8" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                Flood warning bulletin
              </text>
              <text x="8" y="24" fill="#f8fafc" fontSize="7" fontFamily="monospace">
                Peak flood in 48 hrs (Day 5)
              </text>
              <text x="8" y="33" fill="#4ade80" fontSize="7" fontWeight="bold" fontFamily="monospace">
                35,000 residents notified early
              </text>
            </g>
          )}

          {/* Flow Rate Telemetry Badge */}
          <rect x="245" y="12" width="122" height="28" rx="3" fill="rgba(15, 23, 42, 0.85)" stroke="#334155" />
          <text x="252" y="23" fill="#94a3b8" fontSize="7" fontFamily="monospace">
            Forecast discharge:
          </text>
          <text
            x="252"
            y="35"
            fill={isOvertopping ? '#f87171' : '#38bdf8'}
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {discharge} m³/s {isOvertopping ? '(critical)' : '(nominal)'}
          </text>
        </svg>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${rainfall === 'monsoon' ? 'active' : ''}`}
            onClick={() => setRainfall('monsoon')}
          >
            Monsoon surge (+150mm)
          </button>
          <button
            className={`demo-segment-btn ${rainfall === 'normal' ? 'active' : ''}`}
            onClick={() => setRainfall('normal')}
          >
            Normal seasonal flow
          </button>
        </div>

        <div className="demo-slider-row">
          <span className="demo-slider-label">Day {forecastDay}</span>
          <input
            type="range"
            min="0"
            max="7"
            value={forecastDay}
            onChange={(e) => setForecastDay(Number(e.target.value))}
            className="demo-slider"
          />
          <button
            className="demo-action-btn primary"
            onClick={() => {
              if (forecastDay >= 7) setForecastDay(0);
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? 'Pause' : forecastDay >= 7 ? 'Replay surge' : 'Play surge'}
          </button>
        </div>
      </div>

      <div className="demo-subnote">
        Flood Hub predicts river floods up to 7 days ahead for 460M people across 80+ countries, turning zero-notice disasters into planned evacuations.
      </div>
    </div>
  );
}

// 6. Enformer: Long-Range DNA Switch & Gene Dimmer
export function DnaSequenceDemo() {
  const [baseVariant, setBaseVariant] = useState('A'); // 'A' (Healthy) | 'G' (Disease mutation)
  const isHealthy = baseVariant === 'A';
  const expression = isHealthy ? 96 : 14;

  const toggleMutation = () => {
    setBaseVariant(prev => (prev === 'A' ? 'G' : 'A'));
  };

  const verdict = isHealthy
    ? { dot: 'green', text: 'Enhancer loop connected: immune gene fully active (96% expression)' }
    : { dot: 'red', text: 'Loop disconnected: distant single-letter mutation silences gene (14% expression)' };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <svg width="100%" height="160" viewBox="0 0 380 160" style={{ display: 'block', background: '#080b11' }}>
          {/* Distance Indicator Scale: 100,000 Base Pairs Span */}
          <line x1="30" y1="20" x2="350" y2="20" stroke="#334155" strokeWidth="1" />
          <line x1="30" y1="16" x2="30" y2="24" stroke="#64748b" strokeWidth="1" />
          <line x1="350" y1="16" x2="350" y2="24" stroke="#64748b" strokeWidth="1" />
          <text x="190" y="16" fill="#94a3b8" fontSize="7.5" textAnchor="middle" fontFamily="monospace">
            100,000 base pairs of non-coding genome
          </text>

          {/* Chromatin Loop: Healthy bends and makes contact; Mutation stays disconnected */}
          {isHealthy ? (
            <g>
              <path
                d="M 60,85 C 80,-5 280,-5 300,85"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
              />
              <circle cx="300" cy="85" r="8" fill="rgba(52, 211, 153, 0.4)" />
              <circle cx="300" cy="85" r="4" fill="#34d399" />
              <text x="300" y="68" fill="#34d399" fontSize="7.5" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                Contact locked
              </text>
            </g>
          ) : (
            <g>
              <path
                d="M 60,85 Q 180,125 300,85"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
                strokeDasharray="4,4"
              />
              <text x="180" y="110" fill="#f87171" fontSize="7.5" textAnchor="middle" fontFamily="monospace">
                Loop detached (no contact)
              </text>
            </g>
          )}

          {/* Distal Enhancer Switch (Left Side, -100kb) */}
          <g transform="translate(30, 60)">
            <rect
              x="0"
              y="0"
              width="60"
              height="50"
              rx="4"
              fill="#1e293b"
              stroke={isHealthy ? '#38bdf8' : '#ef4444'}
              strokeWidth="1.5"
              style={{ cursor: 'pointer' }}
              onClick={toggleMutation}
            />
            <text x="30" y="15" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">
              Enhancer
            </text>
            <text
              x="30"
              y="38"
              fill={isHealthy ? '#38bdf8' : '#f87171'}
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {baseVariant}
            </text>
            <text x="30" y="62" fill="#64748b" fontSize="6.5" textAnchor="middle">
              Click to flip
            </text>
          </g>

          {/* Target Gene & Cellular Output (Right Side) */}
          <g transform="translate(265, 60)">
            <rect
              x="0"
              y="0"
              width="85"
              height="50"
              rx="4"
              fill="#1e293b"
              stroke={isHealthy ? '#34d399' : '#64748b'}
              strokeWidth="1.5"
            />
            <text x="42" y="15" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">
              Immune gene
            </text>
            <text
              x="42"
              y="34"
              fill={isHealthy ? '#34d399' : '#f87171'}
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {expression}%
            </text>
            <text x="42" y="44" fill="#94a3b8" fontSize="6.5" textAnchor="middle" fontFamily="monospace">
              {isHealthy ? 'Active' : 'Shut off'}
            </text>
          </g>

          {/* Expression Meter Bar along bottom */}
          <rect x="30" y="140" width="320" height="7" rx="3.5" fill="#1e293b" />
          <rect
            x="30"
            y="140"
            width={(expression / 100) * 320}
            height="7"
            rx="3.5"
            fill={isHealthy ? '#34d399' : '#ef4444'}
            style={{ transition: 'width 0.4s ease' }}
          />
        </svg>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${isHealthy ? 'active' : ''}`}
            onClick={() => setBaseVariant('A')}
          >
            Healthy base (A)
          </button>
          <button
            className={`demo-segment-btn ${!isHealthy ? 'active' : ''}`}
            onClick={() => setBaseVariant('G')}
          >
            Disease variant (G)
          </button>
        </div>

        <div className="demo-control-row">
          <button className="demo-action-btn primary" onClick={toggleMutation}>
            Flip base pair
          </button>
          <span style={{ fontSize: '11px', color: isHealthy ? '#34d399' : '#f87171', fontWeight: 500 }}>
            {isHealthy ? '96% gene expression' : '14% gene expression (risk)'}
          </span>
        </div>
      </div>

      <div className="demo-subnote">
        Enformer predicts how mutations in non-coding DNA 100,000 letters away fold across 3D cellular space to switch genes on or off.
      </div>
    </div>
  );
}

// 7. Fire AI: Satellite Thermal Infrared & Fire Perimeter Tracker
export function FireSatelliteDemo() {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('thermal'); // 'thermal' | 'visible' | 'split'
  const [splitPos, setSplitPos] = useState(50);
  const [hour, setHour] = useState(3); // 0, 3, 6 hours spread
  const [showEvacRoute, setShowEvacRoute] = useState(true);
  const [hoverData, setHoverData] = useState(null);
  const isDraggingSplit = useRef(false);

  // Animated embers and smoke particles
  const embersRef = useRef(
    Array.from({ length: 30 }, () => ({
      x: 140 + Math.random() * 80,
      y: 65 + Math.random() * 60,
      vx: 0.8 + Math.random() * 1.5,
      vy: -0.3 + (Math.random() - 0.5) * 0.8,
      size: 1.2 + Math.random() * 2,
      alpha: 0.5 + Math.random() * 0.5,
      life: Math.random() * 100,
      maxLife: 60 + Math.random() * 60,
    }))
  );

  const smokePuffsRef = useRef(
    Array.from({ length: 24 }, () => ({
      x: 110 + Math.random() * 110,
      y: 45 + Math.random() * 80,
      vx: 0.4 + Math.random() * 0.9,
      vy: -0.15 + (Math.random() - 0.5) * 0.5,
      r: 22 + Math.random() * 32,
      growth: 0.12 + Math.random() * 0.18,
      life: Math.random() * 140,
      maxLife: 100 + Math.random() * 80,
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let tick = 0;
    let animId;

    const render = () => {
      tick++;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Base terrain & topography
      const drawTerrain = (isThermal) => {
        ctx.fillStyle = isThermal ? '#080c18' : '#141d15';
        ctx.fillRect(0, 0, w, h);

        // Topographic contour curves
        ctx.strokeStyle = isThermal ? 'rgba(75, 85, 120, 0.22)' : 'rgba(80, 110, 70, 0.25)';
        ctx.lineWidth = 1;
        [25, 55, 85, 115, 145, 175].forEach((cy, idx) => {
          ctx.beginPath();
          ctx.moveTo(0, cy + Math.sin(idx + 1) * 8);
          ctx.bezierCurveTo(w * 0.3, cy - 16, w * 0.7, cy + 20, w, cy - 6);
          ctx.stroke();
        });

        // River natural firebreak
        ctx.strokeStyle = isThermal ? 'rgba(14, 165, 233, 0.45)' : 'rgba(30, 58, 138, 0.6)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(15, 185);
        ctx.bezierCurveTo(115, 165, 195, 195, 365, 155);
        ctx.stroke();
        ctx.fillStyle = isThermal ? 'rgba(14, 165, 233, 0.75)' : 'rgba(148, 163, 184, 0.6)';
        ctx.font = '7px JetBrains Mono, monospace';
        ctx.fillText('River firebreak', 210, 174);
      };

      // Thermal Infrared Layer
      const drawThermalLayer = () => {
        // Fire polygon expands based on selected hour
        const spreadFactor = hour === 0 ? 0.7 : hour === 3 ? 1.0 : 1.35;
        const pulse = Math.sin(tick * 0.06) * 3;

        // Radiant heat bloom
        const radGrad = ctx.createRadialGradient(185, 95, 10, 195, 95, 75 * spreadFactor);
        radGrad.addColorStop(0, 'rgba(239, 68, 68, 0.55)');
        radGrad.addColorStop(0.35, 'rgba(249, 115, 22, 0.35)');
        radGrad.addColorStop(0.7, 'rgba(220, 38, 38, 0.15)');
        radGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(190, 95, 85 * spreadFactor, 0, Math.PI * 2);
        ctx.fill();

        // Active fire polygon perimeter
        const firePoly = [
          { x: 190 - 55 * spreadFactor + pulse * 0.4, y: 95 + 10 },
          { x: 190 - 45 * spreadFactor, y: 95 - 20 * spreadFactor },
          { x: 190 - 15 * spreadFactor + pulse * 0.6, y: 95 - 40 * spreadFactor },
          { x: 190 + 25 * spreadFactor + pulse * 0.8, y: 95 - 32 * spreadFactor },
          { x: 190 + 60 * spreadFactor + pulse * 0.5, y: 95 - 10 * spreadFactor },
          { x: 190 + 72 * spreadFactor + pulse * 0.7, y: 95 + 15 * spreadFactor },
          { x: 190 + 48 * spreadFactor, y: 95 + 40 * spreadFactor },
          { x: 190 + 5 * spreadFactor - pulse * 0.4, y: 95 + 45 * spreadFactor },
          { x: 190 - 35 * spreadFactor, y: 95 + 30 * spreadFactor }
        ];

        // False-color thermal core
        const coreGrad = ctx.createRadialGradient(195, 95, 5, 195, 95, 55 * spreadFactor);
        coreGrad.addColorStop(0, '#fef08a'); // 890°C peak yellow
        coreGrad.addColorStop(0.25, '#fb923c'); // 720°C orange
        coreGrad.addColorStop(0.65, '#dc2626'); // 480°C red
        coreGrad.addColorStop(1, '#7f1d1d'); // 280°C boundary
        ctx.fillStyle = coreGrad;

        ctx.beginPath();
        ctx.moveTo(firePoly[0].x, firePoly[0].y);
        for (let i = 1; i < firePoly.length; i++) {
          const xc = (firePoly[i].x + firePoly[i - 1].x) / 2;
          const yc = (firePoly[i].y + firePoly[i - 1].y) / 2;
          ctx.quadraticCurveTo(firePoly[i - 1].x, firePoly[i - 1].y, xc, yc);
        }
        ctx.closePath();
        ctx.fill();

        // Vector perimeter line
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(firePoly[0].x, firePoly[0].y);
        for (let i = 1; i < firePoly.length; i++) {
          const xc = (firePoly[i].x + firePoly[i - 1].x) / 2;
          const yc = (firePoly[i].y + firePoly[i - 1].y) / 2;
          ctx.quadraticCurveTo(firePoly[i - 1].x, firePoly[i - 1].y, xc, yc);
        }
        ctx.closePath();
        ctx.stroke();

        // Perimeter nodes
        firePoly.forEach((pt, idx) => {
          ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#facc15';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Drifting Embers
        embersRef.current.forEach((ember) => {
          ember.x += ember.vx;
          ember.y += ember.vy;
          ember.life++;
          if (ember.life > ember.maxLife || ember.x > w) {
            ember.x = 150 + Math.random() * 60;
            ember.y = 70 + Math.random() * 50;
            ember.life = 0;
          }
          const alpha = (1 - ember.life / ember.maxLife) * ember.alpha;
          ctx.fillStyle = `rgba(254, 240, 138, ${alpha})`;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // AI Evacuation Safe Route
        if (showEvacRoute) {
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(25, 40);
          ctx.bezierCurveTo(80, 45, 120, 20, 220, 22);
          ctx.lineTo(350, 35);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 7.5px JetBrains Mono, monospace';
          ctx.textAlign = 'right';
          ctx.fillText('Safe evacuation route', w - 12, 16);
          ctx.textAlign = 'left';
        }

        // Telemetry header
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.fillText('Thermal infrared 3.9µm', 12, 16);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '7px JetBrains Mono, monospace';
        ctx.fillText(`T+${hour}h | Active perimeter: 890°C`, 12, 26);
      };

      // Visible Optical Camera (Opaque smoke plumes)
      const drawVisibleLayer = () => {
        ctx.fillStyle = 'rgba(20, 30, 20, 0.88)';
        ctx.fillRect(0, 0, w, h);

        smokePuffsRef.current.forEach((smoke) => {
          smoke.x += smoke.vx;
          smoke.y += smoke.vy;
          smoke.r += smoke.growth * 0.1;
          smoke.life++;
          if (smoke.life > smoke.maxLife || smoke.x > w + 50) {
            smoke.x = 120 + Math.random() * 70;
            smoke.y = 75 + Math.random() * 50;
            smoke.r = 20 + Math.random() * 25;
            smoke.life = 0;
          }

          const puffGrad = ctx.createRadialGradient(smoke.x, smoke.y, 4, smoke.x, smoke.y, smoke.r);
          puffGrad.addColorStop(0, 'rgba(100, 116, 139, 0.9)');
          puffGrad.addColorStop(0.5, 'rgba(148, 163, 184, 0.7)');
          puffGrad.addColorStop(0.9, 'rgba(203, 213, 225, 0.4)');
          puffGrad.addColorStop(1, 'rgba(203, 213, 225, 0)');

          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(smoke.x, smoke.y, smoke.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Visible Optical HUD
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.fillText('Visible optical (RGB camera)', 12, 16);
        ctx.fillStyle = '#f87171';
        ctx.font = '7.5px JetBrains Mono, monospace';
        ctx.fillText('Surface obscured by dense smoke canopy', 12, 26);
      };

      if (viewMode === 'thermal') {
        drawTerrain(true);
        drawThermalLayer();
      } else if (viewMode === 'visible') {
        drawTerrain(false);
        drawVisibleLayer();
      } else if (viewMode === 'split') {
        const splitX = (splitPos / 100) * w;
        drawTerrain(false);
        drawVisibleLayer();

        ctx.save();
        ctx.beginPath();
        ctx.rect(splitX, 0, w - splitX, h);
        ctx.clip();
        drawTerrain(true);
        drawThermalLayer();
        ctx.restore();

        // Divider Line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(splitX, 0);
        ctx.lineTo(splitX, h);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(splitX, h / 2, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#080b11';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(splitX - 2, h / 2 - 3);
        ctx.lineTo(splitX - 2, h / 2 + 3);
        ctx.moveTo(splitX + 2, h / 2 - 3);
        ctx.lineTo(splitX + 2, h / 2 + 3);
        ctx.stroke();
      }

      // Hover Crosshair
      if (hoverData) {
        const { x, y } = hoverData;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 8, y);
        ctx.lineTo(x + 8, y);
        ctx.moveTo(x, y - 8);
        ctx.lineTo(x, y + 8);
        ctx.stroke();

        const dist = Math.hypot(x - 190, y - 95);
        const tempC = Math.max(22, Math.round(890 * Math.exp(-(dist * dist) / (2 * 45 * 45))));
        const isFire = tempC > 180;

        const tipX = Math.min(x + 10, w - 115);
        const tipY = Math.max(y - 25, 20);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.fillRect(tipX, tipY, 110, 26);
        ctx.strokeStyle = isFire ? '#ef4444' : '#64748b';
        ctx.strokeRect(tipX, tipY, 110, 26);

        ctx.fillStyle = isFire ? '#f87171' : '#38bdf8';
        ctx.font = 'bold 7.5px JetBrains Mono, monospace';
        ctx.fillText(isFire ? `Fire front: ${tempC}°C` : `Canopy: ${tempC}°C`, tipX + 6, tipY + 12);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '6.5px JetBrains Mono, monospace';
        ctx.fillText('37.842° N, 119.531° W', tipX + 6, tipY + 21);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => { if (animId) cancelAnimationFrame(animId); };
  }, [viewMode, splitPos, hour, showEvacRoute, hoverData]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    if (isDraggingSplit.current && viewMode === 'split') {
      setSplitPos(Math.max(10, Math.min(90, Math.round((x / canvas.width) * 100))));
    }
    setHoverData({ x, y });
  };

  const verdict = viewMode === 'thermal'
    ? { dot: 'red', text: `Thermal infrared 3.9µm: active fire front tracked at 890°C (T+${hour}h)` }
    : viewMode === 'visible'
    ? { dot: 'yellow', text: 'Visible optical: surface fire front obscured beneath thick smoke canopy' }
    : { dot: 'cyan', text: 'Split comparison: slide wipe line to inspect smoke penetration' };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <div style={{ position: 'relative', width: '100%' }}>
          <canvas
            ref={canvasRef}
            width={380}
            height={185}
            onMouseMove={handleMouseMove}
            onMouseDown={() => { if (viewMode === 'split') isDraggingSplit.current = true; }}
            onMouseUp={() => { isDraggingSplit.current = false; }}
            onMouseLeave={() => { isDraggingSplit.current = false; setHoverData(null); }}
            style={{ display: 'block', width: '100%', height: 'auto', cursor: 'crosshair' }}
          />
        </div>

        <div className="demo-drag-hint">
          {viewMode === 'split' ? 'drag divider to wipe between smoke and thermal' : 'hover across map for sensor temperature'}
        </div>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${viewMode === 'thermal' ? 'active' : ''}`}
            onClick={() => setViewMode('thermal')}
          >
            Thermal infrared
          </button>
          <button
            className={`demo-segment-btn ${viewMode === 'visible' ? 'active' : ''}`}
            onClick={() => setViewMode('visible')}
          >
            Visible optical
          </button>
          <button
            className={`demo-segment-btn ${viewMode === 'split' ? 'active' : ''}`}
            onClick={() => setViewMode('split')}
          >
            Split comparison
          </button>
        </div>

        <div className="demo-control-row">
          <div className="demo-segmented-control" style={{ maxWidth: '170px' }}>
            {[0, 3, 6].map(h => (
              <button
                key={h}
                className={`demo-segment-btn ${hour === h ? 'active' : ''}`}
                onClick={() => setHour(h)}
              >
                T+{h}h
              </button>
            ))}
          </div>

          <button
            className={`demo-action-btn ${showEvacRoute ? 'primary' : ''}`}
            onClick={() => setShowEvacRoute(!showEvacRoute)}
          >
            {showEvacRoute ? 'Evacuation corridor: On' : 'Evacuation corridor: Off'}
          </button>
        </div>
      </div>

      <div className="demo-subnote">
        Fire AI processes geostationary thermal infrared sensors to penetrate dense smoke clouds, mapping active perimeters and calculating safe evacuation corridors.
      </div>
    </div>
  );
}

// 8. FermiNet: Neural Quantum Chemistry & Molecular Bond Sandbox
export function QuantumOrbitalDemo() {
  const [system, setSystem] = useState('h2'); // 'h2' (Hydrogen molecule) | 'lih' (Lithium Hydride)
  const [distance, setDistance] = useState(0.74); // Angstroms (0.5 to 2.2)

  // Ground state equilibrium distances
  const eqDistance = system === 'h2' ? 0.74 : 1.59;
  const isOptimal = Math.abs(distance - eqDistance) < 0.08;
  const isRepelling = distance < (eqDistance - 0.2);
  const isDissociated = distance > 1.8;

  // Potential Energy calculation (Morse Potential curve)
  // V(r) = D_e * (1 - e^(-a*(r - r_e)))^2 - D_e
  const De = system === 'h2' ? 1.174 : 0.85; // Hartree
  const a = 1.9;
  const potentialEnergy = Number((De * Math.pow(1 - Math.exp(-a * (distance - eqDistance)), 2) - De).toFixed(3));

  const verdict = isOptimal
    ? { dot: 'green', text: `Equilibrium ground state: ${distance.toFixed(2)} Å (${potentialEnergy} Ha)` }
    : isRepelling
    ? { dot: 'red', text: `Nuclear repulsion: nuclei forced too close (${distance.toFixed(2)} Å)` }
    : isDissociated
    ? { dot: 'yellow', text: `Bond dissociation: atoms separated beyond chemical attraction (${distance.toFixed(2)} Å)` }
    : { dot: 'cyan', text: `Molecular potential: ${distance.toFixed(2)} Å (${potentialEnergy} Ha)` };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <svg width="100%" height="165" viewBox="0 0 380 165" style={{ display: 'block', background: '#080b11' }}>
          {/* Upper Stage: Molecular Quantum Probability Cloud */}
          {(() => {
            const cx = 190;
            const cy = 55;
            // Map distance (0.5 to 2.2 Å) to pixel separation (35px to 140px)
            const sep = 35 + ((distance - 0.5) / 1.7) * 105;
            const leftX = cx - sep / 2;
            const rightX = cx + sep / 2;

            return (
              <g>
                {/* Shared Covalent Bonding Orbital Glow */}
                {!isDissociated && (
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={sep / 2 + 26}
                    ry={26}
                    fill={isRepelling ? 'rgba(239, 68, 68, 0.25)' : 'rgba(56, 189, 248, 0.28)'}
                    stroke={isRepelling ? '#ef4444' : '#38bdf8'}
                    strokeWidth="1.5"
                    strokeDasharray={isOptimal ? 'none' : '3,3'}
                  />
                )}

                {/* Left Nucleus */}
                <circle cx={leftX} cy={cy} r={system === 'lih' ? 9 : 7} fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
                <text x={leftX} y={cy + 3} textAnchor="middle" fill="#000" fontSize="7.5" fontWeight="bold">
                  {system === 'lih' ? 'Li⁺' : 'H⁺'}
                </text>

                {/* Right Nucleus */}
                <circle cx={rightX} cy={cy} r={7} fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                <text x={rightX} y={cy + 3} textAnchor="middle" fill="#000" fontSize="7.5" fontWeight="bold">
                  H⁺
                </text>

                {/* Distance Dimension Line */}
                <line x1={leftX} y1={cy - 22} x2={rightX} y2={cy - 22} stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <text x={cx} y={cy - 26} fill="#94a3b8" fontSize="7.5" textAnchor="middle" fontFamily="monospace">
                  r = {distance.toFixed(2)} Å
                </text>
              </g>
            );
          })()}

          {/* Lower Stage: Potential Energy Well Curve */}
          <line x1="30" y1="140" x2="350" y2="140" stroke="#334155" strokeWidth="1" />
          <text x="350" y="137" fill="#64748b" fontSize="7" textAnchor="end" fontFamily="monospace">
            Distance (Å)
          </text>
          <text x="32" y="105" fill="#64748b" fontSize="7" fontFamily="monospace">
            Energy (Ha)
          </text>

          {/* Potential Curve Path */}
          <path
            d="M 45,95 Q 60,150 110,155 T 190,146 T 340,141"
            fill="none"
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Equilibrium Ground State Marker */}
          <circle cx={110} cy={155} r={3} fill="#34d399" />
          <text x={110} y={163} fill="#34d399" fontSize="6.5" textAnchor="middle" fontFamily="monospace">
            Ground state ({eqDistance} Å)
          </text>

          {/* Current Position Marker on Curve */}
          {(() => {
            const curX = 45 + ((distance - 0.5) / 1.7) * 295;
            const curY = Math.max(92, Math.min(156, 140 - (potentialEnergy * -15)));
            return (
              <circle
                cx={curX}
                cy={curY}
                r={6}
                fill={isOptimal ? '#34d399' : isRepelling ? '#f87171' : '#38bdf8'}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            );
          })()}
        </svg>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${system === 'h2' ? 'active' : ''}`}
            onClick={() => { setSystem('h2'); setDistance(0.74); }}
          >
            Hydrogen molecule (H₂)
          </button>
          <button
            className={`demo-segment-btn ${system === 'lih' ? 'active' : ''}`}
            onClick={() => { setSystem('lih'); setDistance(1.59); }}
          >
            Lithium hydride (LiH)
          </button>
        </div>

        <div className="demo-slider-row">
          <span className="demo-slider-label">{distance.toFixed(2)} Å</span>
          <input
            type="range"
            min="0.5"
            max="2.2"
            step="0.02"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="demo-slider"
          />
          <button
            className="demo-action-btn primary"
            onClick={() => setDistance(eqDistance)}
          >
            Snap to ground state
          </button>
        </div>
      </div>

      <div className="demo-subnote">
        FermiNet calculates multi-electron chemical bonds straight from fundamental physics using neural wavefunctions, bypassing empirical approximations.
      </div>
    </div>
  );
}

// 9. AlphaGeometry: Olympiad Math Proof Solver
export function GeometryProofDemo() {
  const [step, setStep] = useState(1); // 1: Problem, 2: Neural Construction, 3: Deduction, 4: Q.E.D.

  const verdict = step === 1
    ? { dot: 'yellow', text: 'Olympiad problem: classic symbolic solvers reach dead end without helper line' }
    : step === 2
    ? { dot: 'cyan', text: 'Neural intuition: language model invents helper circle Ω from 100M constructions' }
    : step === 3
    ? { dot: 'cyan', text: 'Symbolic deduction: formal logic engine executes 14 deduction steps' }
    : { dot: 'green', text: 'Proof complete: theorem formally verified at IMO gold medal standard (0.42s)' };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <svg width="100%" height="165" viewBox="0 0 380 165" style={{ display: 'block', background: '#080b11' }}>
          {/* Coordinate Geometry Board */}
          {/* Base Triangle ABC */}
          <polygon
            points="190,25 90,120 290,120"
            fill="rgba(30, 41, 59, 0.4)"
            stroke="#f8fafc"
            strokeWidth="2"
          />
          <text x="190" y="18" fill="#fff" fontSize="9.5" fontWeight="bold" textAnchor="middle">A</text>
          <text x="78" y="125" fill="#fff" fontSize="9.5" fontWeight="bold">B</text>
          <text x="298" y="125" fill="#fff" fontSize="9.5" fontWeight="bold">C</text>

          {/* Point D on base BC */}
          <circle cx="190" cy="120" r="3" fill="#ffffff" />
          <text x="190" y="134" fill="#94a3b8" fontSize="8.5" textAnchor="middle">D</text>

          {/* Step 2 & up: Neural Auxiliary Circumcircle Ω */}
          {step >= 2 && (
            <g>
              <circle
                cx="190"
                cy="76"
                r="56"
                fill="none"
                stroke="#facc15"
                strokeWidth="2"
                strokeDasharray="4,3"
              />
              <text x="245" y="42" fill="#facc15" fontSize="8" fontWeight="bold" fontFamily="monospace">
                Auxiliary circle Ω
              </text>
            </g>
          )}

          {/* Step 3 & up: Symbolic Formal Deduction Rays & Tangents */}
          {step >= 3 && (
            <g>
              {/* Altitude AD */}
              <line x1="190" y1="25" x2="190" y2="120" stroke="#38bdf8" strokeWidth="2" />
              {/* Right angle marker at D */}
              <rect x="190" y="112" width="8" height="8" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Similar triangle ray */}
              <line x1="90" y1="120" x2="220" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
            </g>
          )}

          {/* Step 4: Q.E.D. Proof Banner */}
          {step === 4 && (
            <g transform="translate(105, 60)">
              <rect x="0" y="0" width="170" height="36" rx="4" fill="rgba(15, 23, 42, 0.95)" stroke="#34d399" strokeWidth="1.5" />
              <text x="85" y="15" fill="#34d399" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                Theorem verified (Q.E.D.)
              </text>
              <text x="85" y="28" fill="#94a3b8" fontSize="7.5" textAnchor="middle" fontFamily="monospace">
                0.42s compute (IMO gold medal standard)
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          {[
            { id: 1, label: '1. Problem' },
            { id: 2, label: '2. Helper line' },
            { id: 3, label: '3. Deduction' },
            { id: 4, label: '4. Verified' }
          ].map(s => (
            <button
              key={s.id}
              className={`demo-segment-btn ${step === s.id ? 'active' : ''}`}
              onClick={() => setStep(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="demo-control-row">
          <button
            className="demo-action-btn primary"
            onClick={() => setStep(s => (s < 4 ? s + 1 : 1))}
          >
            {step === 1 ? 'Add neural helper circle' : step === 2 ? 'Run symbolic deduction' : step === 3 ? 'Verify proof' : 'Restart proof'}
          </button>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            Step {step} of 4
          </span>
        </div>
      </div>

      <div className="demo-subnote">
        AlphaGeometry pairs neural language intuition for helper constructions with rigorous symbolic deduction to solve Olympiad geometry theorems.
      </div>
    </div>
  );
}

// 10. Perch: AI Bioacoustics Classifier & Anti-Poaching Detector
export function BioacousticsDemo() {
  const [target, setTarget] = useState('honeycreeper'); // 'honeycreeper' | 'chainsaw' | 'whale'
  const [filterActive, setFilterActive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const targetsData = {
    honeycreeper: {
      name: "Hawaiian 'Akikiki",
      freq: "8.2 kHz",
      noiseSource: "Tropical wind gusts",
      threat: "Critically endangered",
      confidence: "98.8%"
    },
    chainsaw: {
      name: "2-Stroke chainsaw",
      freq: "1.4 kHz",
      noiseSource: "Torrential rainforest rain",
      threat: "Illegal logging detected",
      confidence: "97.2%"
    },
    whale: {
      name: "Antarctic blue whale",
      freq: "16 Hz sub-harmonic",
      noiseSource: "Ocean cargo ship cavitation",
      threat: "Marine sanctuary advisory",
      confidence: "99.4%"
    }
  };

  const current = targetsData[target];

  const verdict = filterActive
    ? { dot: target === 'chainsaw' ? 'red' : 'green', text: `Identified: ${current.name} (${current.confidence} confidence) — ${current.threat}` }
    : { dot: 'yellow', text: `Signal obscured: ${current.noiseSource.toLowerCase()} masks bioacoustic frequencies` };

  return (
    <div className="demo-box">
      <div className="demo-stage-card">
        <div className="demo-verdict-bar">
          <span className={`verdict-dot ${verdict.dot}`}></span>
          <span className="verdict-text">{verdict.text}</span>
        </div>

        <svg width="100%" height="155" viewBox="0 0 380 155" style={{ display: 'block', background: '#080b11' }}>
          {/* Frequency & Time Axis Ticks */}
          <text x="12" y="16" fill="#64748b" fontSize="7.5" fontFamily="monospace">
            10 kHz
          </text>
          <text x="12" y="145" fill="#64748b" fontSize="7.5" fontFamily="monospace">
            0 Hz
          </text>
          <text x="350" y="145" fill="#64748b" fontSize="7.5" textAnchor="end" fontFamily="monospace">
            Time
          </text>

          {/* Ambient Noise Floor (Fuzzy grey bars when Filter is OFF) */}
          {!filterActive && (
            <g opacity="0.65">
              {[...Array(32)].map((_, i) => (
                <rect
                  key={`noise-${i}`}
                  x={20 + i * 11}
                  y={25 + (i % 5) * 18}
                  width="9"
                  height={50 + (i % 7) * 8}
                  fill="#475569"
                  opacity="0.5"
                />
              ))}
              <text x="190" y="72" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                Signal obscured by {current.noiseSource.toLowerCase()}
              </text>
            </g>
          )}

          {/* Harmonic Signature Bars (Vivid when Filter is ON) */}
          {filterActive && (
            <g>
              {[...Array(24)].map((_, i) => {
                const isHarmonic = target === 'honeycreeper'
                  ? (i >= 8 && i <= 15) // High pitch bird
                  : target === 'chainsaw'
                  ? (i >= 3 && i <= 9) || (i >= 16 && i <= 21) // Engine buzz harmonics
                  : (i >= 1 && i <= 6); // Low whale rumble

                const barHeight = isHarmonic
                  ? 45 + Math.sin(i * 0.8 + (isPlaying ? 1.5 : 0)) * 22
                  : 8;

                return (
                  <rect
                    key={`sig-${i}`}
                    x={25 + i * 14}
                    y={target === 'honeycreeper' ? 35 : target === 'chainsaw' ? 65 : 95}
                    width="10"
                    height={barHeight}
                    fill={isHarmonic ? (target === 'chainsaw' ? '#f87171' : '#38bdf8') : '#1e293b'}
                    rx="2"
                    opacity={isHarmonic ? 0.9 : 0.25}
                  />
                );
              })}

              {/* Scanned Playhead Line */}
              <line x1="240" y1="20" x2="240" y2="135" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3,3" />
            </g>
          )}

          {/* AI Recognition Notification Pill */}
          <g transform="translate(180, 15)">
            <rect
              x="0"
              y="0"
              width="185"
              height="34"
              rx="4"
              fill="rgba(15, 23, 42, 0.94)"
              stroke={filterActive ? (target === 'chainsaw' ? '#f87171' : '#34d399') : '#64748b'}
              strokeWidth="1.5"
            />
            <text
              x="10"
              y="14"
              fill={filterActive ? (target === 'chainsaw' ? '#f87171' : '#34d399') : '#94a3b8'}
              fontSize="8"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {filterActive ? `${current.name} (${current.confidence})` : 'Uncertain (high noise)'}
            </text>
            <text x="10" y="26" fill="#94a3b8" fontSize="7" fontFamily="monospace">
              {filterActive ? current.threat : `Noise floor: ${current.noiseSource}`}
            </text>
          </g>
        </svg>
      </div>

      <div className="demo-control-deck">
        <div className="demo-segmented-control">
          <button
            className={`demo-segment-btn ${target === 'honeycreeper' ? 'active' : ''}`}
            onClick={() => setTarget('honeycreeper')}
          >
            Hawaiian 'Akikiki
          </button>
          <button
            className={`demo-segment-btn ${target === 'chainsaw' ? 'active' : ''}`}
            onClick={() => setTarget('chainsaw')}
          >
            2-Stroke chainsaw
          </button>
          <button
            className={`demo-segment-btn ${target === 'whale' ? 'active' : ''}`}
            onClick={() => setTarget('whale')}
          >
            Antarctic blue whale
          </button>
        </div>

        <div className="demo-control-row">
          <button
            className={`demo-action-btn ${filterActive ? 'primary' : ''}`}
            onClick={() => setFilterActive(!filterActive)}
          >
            {filterActive ? 'AI noise filter: Active' : 'AI noise filter: Bypassed'}
          </button>
          <button
            className="demo-action-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? 'Pause scan' : 'Resume scan'}
          </button>
        </div>
      </div>

      <div className="demo-subnote">
        Perch isolates faint wildlife vocalizations and illegal chainsaw acoustics through extreme background noise to protect endangered ecosystems.
      </div>
    </div>
  );
}

// Master selector rendering the appropriate interactive widget
export function InteractiveWidget({ type }) {
  switch (type) {
    case 'protein_3d': return <Protein3DDemo />;
    case 'crystal_lattice': return <CrystalLatticeDemo />;
    case 'weather_slider': return <WeatherSliderDemo />;
    case 'fusion_tokamak': return <FusionTokamakDemo />;
    case 'flood_timeline': return <FloodTimelineDemo />;
    case 'dna_sequence': return <DnaSequenceDemo />;
    case 'fire_satellite': return <FireSatelliteDemo />;
    case 'quantum_orbital': return <QuantumOrbitalDemo />;
    case 'geometry_proof': return <GeometryProofDemo />;
    case 'bioacoustics_demo': return <BioacousticsDemo />;
    default: return <Protein3DDemo />;
  }
}

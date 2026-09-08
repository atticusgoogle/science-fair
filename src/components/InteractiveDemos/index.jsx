import React, { useState, useEffect, useRef } from 'react';

// 1. AlphaFold 3: 3D Protein & Ligand Complex Viewer
export function Protein3DDemo() {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.8 });
  const [showLigand, setShowLigand] = useState(true);
  const [showSurface, setShowSurface] = useState(false);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

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

      // Dark molecular lab background
      ctx.fillStyle = '#0a0e1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle depth grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = -100; i <= 100; i += 20) {
        ctx.beginPath();
        ctx.moveTo(cx + i, cy - 80);
        ctx.lineTo(cx + i, cy + 80);
        ctx.stroke();
      }

      const rotY = rotation.y + autoAngle;
      const rotX = rotation.x;

      // Generate protein ribbon backbone nodes
      const numNodes = 36;
      const points = [];

      for (let i = 0; i < numNodes; i++) {
        const t = (i / numNodes) * Math.PI * 4;
        const r = 45 + Math.sin(t * 1.5) * 15;
        // 3D coordinates
        let x = Math.cos(t) * r;
        let y = (i - numNodes / 2) * 4.5;
        let z = Math.sin(t) * r;

        // Apply Y rotation
        let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        let z1 = x * Math.sin(rotY) + z * Math.cos(rotY);

        // Apply X rotation
        let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

        // Perspective projection
        const scale = 300 / (300 + z2);
        points.push({
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
          color: i < 18 ? '#38bdf8' : '#818cf8'
        });
      }

      // Draw surface glow if toggled
      if (showSurface) {
        points.forEach(p => {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 14 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Draw protein backbone ribbon
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        ctx.strokeStyle = p1.color;
        ctx.lineWidth = Math.max(1.5, 4 * p1.scale);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Residue atom sphere
        ctx.fillStyle = p1.z > 0 ? '#e0f2fe' : '#0284c7';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(2, 3.5 * p1.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw small molecule ligand in binding pocket
      if (showLigand) {
        const lx = 10 * Math.cos(rotY) - 10 * Math.sin(rotY);
        const lz = 10 * Math.sin(rotY) + 10 * Math.cos(rotY);
        const ly = 5 * Math.cos(rotX) - lz * Math.sin(rotX);
        const lScale = 300 / (300 + lz);

        const ligX = cx + lx * lScale;
        const ligY = cy + ly * lScale;

        // Ligand glow & spheres (red & amber drug molecule)
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(ligX, ligY, 8 * lScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(ligX + 12 * lScale, ligY - 8 * lScale, 5 * lScale, 0, Math.PI * 2);
        ctx.fill();

        // Hydrogen bond dashes
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(ligX, ligY);
        ctx.lineTo(points[12].x, points[12].y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (!isDragging.current) {
        autoAngle += 0.008;
      }
      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [rotation, showLigand, showSurface]);

  return (
    <div className="demo-box">
      <div className="demo-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={380}
          height={200}
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
        />
        <div className="demo-drag-hint">⇄ Drag to rotate in 3D</div>
      </div>
      <div className="demo-controls-bar">
        <label className="demo-checkbox">
          <input type="checkbox" checked={showLigand} onChange={(e) => setShowLigand(e.target.checked)} />
          <span>Drug Ligand Complex</span>
        </label>
        <label className="demo-checkbox">
          <input type="checkbox" checked={showSurface} onChange={(e) => setShowSurface(e.target.checked)} />
          <span>Solvent Surface</span>
        </label>
      </div>
    </div>
  );
}

// 2. GNoME: Crystal Lattice Synthesizer
export function CrystalLatticeDemo() {
  const [element, setElement] = useState('Li'); // Li, Na, Fe
  const [spacing, setSpacing] = useState(38);

  const energies = {
    Li: { energy: -0.042, stable: true, formula: 'Li3V2(PO4)3', use: 'High-Density EV Battery' },
    Na: { energy: -0.018, stable: true, formula: 'Na2FeP2O7', use: 'Low-Cost Abundant Battery' },
    Fe: { energy: +0.085, stable: false, formula: 'Fe4C3S2', use: 'Unstable on Convex Hull' }
  };

  const current = energies[element];

  return (
    <div className="demo-box">
      <div className="lattice-display">
        <svg width="340" height="150" viewBox="0 0 340 150">
          <rect width="340" height="150" fill="#090d16" />
          {/* Periodic Crystal Grid */}
          {[0, 1, 2].map(r =>
            [0, 1, 2, 3, 4].map(c => {
              const x = 50 + c * (spacing * 1.3);
              const y = 30 + r * (spacing * 0.9);
              return (
                <g key={`${r}-${c}`}>
                  {c < 4 && <line x1={x} y1={y} x2={x + spacing * 1.3} y2={y} stroke="#1e293b" strokeWidth="2" />}
                  {r < 2 && <line x1={x} y1={y} x2={x} y2={y + spacing * 0.9} stroke="#1e293b" strokeWidth="2" />}
                  <circle
                    cx={x}
                    cy={y}
                    r={element === 'Na' ? 9 : element === 'Li' ? 7 : 8}
                    fill={element === 'Li' ? '#38bdf8' : element === 'Na' ? '#34d399' : '#f87171'}
                  />
                  <text x={x} y={y + 3} textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">
                    {element}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>
      <div className="demo-controls-bar">
        <div className="element-buttons">
          <button className={`chip-btn ${element === 'Li' ? 'active' : ''}`} onClick={() => setElement('Li')}>Lithium (Li)</button>
          <button className={`chip-btn ${element === 'Na' ? 'active' : ''}`} onClick={() => setElement('Na')}>Sodium (Na)</button>
          <button className={`chip-btn ${element === 'Fe' ? 'active' : ''}`} onClick={() => setElement('Fe')}>Iron-Carbide (Fe)</button>
        </div>
        <div className="demo-metric-pill">
          <span>{current.formula}</span> |
          <strong style={{ color: current.stable ? '#34d399' : '#f87171' }}>
            {current.stable ? ' ✓ Stable' : ' ✕ Unstable'} ({current.energy} eV/atom)
          </strong>
        </div>
      </div>
    </div>
  );
}

// 3. GraphCast: Weather Prediction Split Comparison
export function WeatherSliderDemo() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="demo-box">
      <div className="weather-split-wrap" style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#0284c7' }}>
        {/* Under layer: Numerical Supercomputer NWP Forecast */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '16px' }}>
          <div className="weather-badge red">Traditional Supercomputer (HRES) - Day 9</div>
          <div className="storm-track error">
            <span style={{ fontSize: '11px', color: '#f87171' }}>⚠️ Projected Landfall: Dissipated at Sea (False Miss)</span>
          </div>
        </div>

        {/* Top layer: GraphCast AI 9-Day Forecast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${sliderPos}%`,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0284c7, #0f172a)',
            borderRight: '3px solid #38bdf8',
            padding: '16px'
          }}
        >
          <div className="weather-badge blue">GraphCast AI - Day 9</div>
          <div className="storm-track success">
            <span style={{ fontSize: '11px', color: '#38bdf8' }}>★ Actual Landfall Verified: Nova Scotia (Exact Match)</span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(e.target.value)}
          style={{ position: 'absolute', bottom: '10px', left: '20px', width: 'calc(100% - 40px)', zIndex: 10 }}
        />
      </div>
      <div className="demo-caption">Slide left/right to compare GraphCast AI forecast vs traditional supercomputer prediction.</div>
    </div>
  );
}

// 4. Tokamak Fusion: Plasma Magnetic Coil Controller
export function FusionTokamakDemo() {
  const [coilCurrent, setCoilCurrent] = useState(85);
  const isStable = coilCurrent >= 75 && coilCurrent <= 95;

  return (
    <div className="demo-box">
      <svg width="340" height="130" viewBox="0 0 340 130">
        <rect width="340" height="130" fill="#090d16" />
        {/* Tokamak Chamber Walls */}
        <ellipse cx="170" cy="65" rx="120" ry="45" fill="none" stroke="#334155" strokeWidth="4" />
        {/* Magnetic Coils */}
        {[-80, -40, 0, 40, 80].map((dx, i) => (
          <rect key={i} x={170 + dx - 6} y={15} width="12" height="12" fill={isStable ? '#fb923c' : '#ef4444'} rx="2" />
        ))}
        {/* Plasma Donut Ring */}
        <ellipse
          cx="170"
          cy="65"
          rx={isStable ? 85 : 75 + (coilCurrent % 20)}
          ry={isStable ? 25 : 15 + (coilCurrent % 15)}
          fill="none"
          stroke={isStable ? '#38bdf8' : '#ef4444'}
          strokeWidth={isStable ? '12' : '18'}
          style={{ filter: 'blur(2px)', opacity: 0.85 }}
        />
        <text x="170" y="70" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
          {isStable ? '100,000,000 °C STABLE PLASMA' : 'MAGNETIC INSTABILITY WARNING'}
        </text>
      </svg>
      <div className="demo-controls-bar">
        <label className="slider-label">Coil Current: {coilCurrent} kA</label>
        <input
          type="range"
          min="40"
          max="120"
          value={coilCurrent}
          onChange={(e) => setCoilCurrent(Number(e.target.value))}
        />
        <span className={`status-tag ${isStable ? 'green' : 'red'}`}>
          {isStable ? 'RL Controller: Locked' : 'Plasma Wobble'}
        </span>
      </div>
    </div>
  );
}

// 5. Flood Hub: River Discharge & Alert Simulator
export function FloodTimelineDemo() {
  const [rainfallLevel, setRainfallLevel] = useState(80);
  const discharge = Math.round(rainfallLevel * 14.5);
  const floodRisk = discharge > 1000 ? 'SEVERE FLOOD WARNING' : discharge > 750 ? 'MODERATE ADVISORY' : 'NORMAL FLOW';

  return (
    <div className="demo-box">
      <div className="chart-preview">
        <svg width="340" height="110" viewBox="0 0 340 110">
          <rect width="340" height="110" fill="#090d16" />
          {/* Threshold line */}
          <line x1="30" y1="40" x2="320" y2="40" stroke="#ef4444" strokeDasharray="4" />
          <text x="35" y="35" fill="#ef4444" fontSize="8">Flood Threshold (1,000 m³/s)</text>
          {/* Hydrograph Curve */}
          <path
            d={`M 30,95 Q 120,${Math.max(10, 100 - (rainfallLevel * 0.9))} 220,${Math.max(20, 100 - (rainfallLevel * 0.8))} T 320,90`}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="demo-controls-bar">
        <label className="slider-label">Precipitation Surge: {rainfallLevel} mm</label>
        <input type="range" min="20" max="120" value={rainfallLevel} onChange={(e) => setRainfallLevel(Number(e.target.value))} />
        <span className={`status-tag ${discharge > 1000 ? 'red' : discharge > 750 ? 'yellow' : 'green'}`}>
          {floodRisk}
        </span>
      </div>
    </div>
  );
}

// 6. Enformer: DNA Sequence Mutator
export function DnaSequenceDemo() {
  const [seq, setSeq] = useState(['A', 'G', 'C', 'T', 'G', 'A', 'T', 'C']);
  const mutateBase = (idx) => {
    const bases = ['A', 'C', 'G', 'T'];
    const next = bases[(bases.indexOf(seq[idx]) + 1) % 4];
    const newSeq = [...seq];
    newSeq[idx] = next;
    setSeq(newSeq);
  };

  const expressionScore = seq.filter(b => b === 'G' || b === 'C').length * 12.5;

  return (
    <div className="demo-box">
      <div className="dna-blocks-row">
        {seq.map((base, idx) => (
          <button key={idx} className="dna-base-btn" onClick={() => mutateBase(idx)}>
            <span className="base-letter">{base}</span>
            <span className="base-idx">{idx + 1042}</span>
          </button>
        ))}
      </div>
      <div className="demo-caption">Click any base pair to introduce a point mutation and recalculate expression.</div>
      <div className="demo-controls-bar">
        <span>Predicted Expression: <strong>{expressionScore}%</strong></span>
        <span className={`status-tag ${expressionScore > 60 ? 'green' : 'yellow'}`}>
          {expressionScore > 60 ? 'Promoter Active' : 'Suppressed'}
        </span>
      </div>
    </div>
  );
}

// 7. Fire AI: Satellite Thermal Infrared
export function FireSatelliteDemo() {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('thermal'); // 'thermal' | 'visible' | 'split'
  const [splitPos, setSplitPos] = useState(55);
  const [hoverData, setHoverData] = useState(null);
  const isDraggingSplit = useRef(false);

  // Animated embers and smoke particles
  const embersRef = useRef(
    Array.from({ length: 32 }, () => ({
      x: 140 + Math.random() * 80,
      y: 70 + Math.random() * 60,
      vx: 0.8 + Math.random() * 1.6,
      vy: -0.3 + (Math.random() - 0.5) * 0.8,
      size: 1.2 + Math.random() * 2,
      alpha: 0.5 + Math.random() * 0.5,
      life: Math.random() * 100,
      maxLife: 60 + Math.random() * 60,
    }))
  );

  const smokePuffsRef = useRef(
    Array.from({ length: 26 }, () => ({
      x: 110 + Math.random() * 110,
      y: 50 + Math.random() * 80,
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

        // River thermal barrier
        ctx.strokeStyle = isThermal ? 'rgba(14, 165, 233, 0.45)' : 'rgba(30, 58, 138, 0.6)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(15, 185);
        ctx.bezierCurveTo(115, 165, 195, 195, 365, 155);
        ctx.stroke();
        ctx.fillStyle = isThermal ? 'rgba(14, 165, 233, 0.75)' : 'rgba(148, 163, 184, 0.6)';
        ctx.font = '7px JetBrains Mono, monospace';
        ctx.fillText('RIVER (NATURAL FIREBREAK)', 210, 174);

        // Coordinate ticks
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.5;
        for (let x = 40; x < w; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 30; y < h; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      };

      // Thermal Infrared Layer (AI segmentation, heat gradient, embers)
      const drawThermalLayer = () => {
        // 1. Radiant heat bloom
        const radGrad = ctx.createRadialGradient(185, 95, 10, 195, 95, 90);
        radGrad.addColorStop(0, 'rgba(239, 68, 68, 0.6)');
        radGrad.addColorStop(0.35, 'rgba(249, 115, 22, 0.38)');
        radGrad.addColorStop(0.7, 'rgba(220, 38, 38, 0.16)');
        radGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(190, 95, 95, 0, Math.PI * 2);
        ctx.fill();

        // 2. Active fire polygon
        const pulse = Math.sin(tick * 0.06) * 3;
        const firePoly = [
          { x: 130 + pulse * 0.4, y: 105 },
          { x: 145, y: 75 + pulse * 0.5 },
          { x: 175 + pulse * 0.6, y: 55 },
          { x: 215 + pulse * 0.8, y: 62 },
          { x: 250 + pulse * 0.5, y: 85 },
          { x: 265 + pulse * 0.7, y: 110 },
          { x: 240, y: 135 + pulse * 0.3 },
          { x: 195 - pulse * 0.4, y: 140 },
          { x: 155, y: 125 }
        ];

        // False-color thermal core
        const coreGrad = ctx.createRadialGradient(200, 95, 5, 195, 95, 65);
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

        // 3. AI Extracted Perimeter Vector
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(firePoly[0].x, firePoly[0].y);
        for (let i = 1; i < firePoly.length; i++) {
          const xc = (firePoly[i].x + firePoly[i - 1].x) / 2;
          const yc = (firePoly[i].y + firePoly[i - 1].y) / 2;
          ctx.quadraticCurveTo(firePoly[i - 1].x, firePoly[i - 1].y, xc, yc);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 4. AI Perimeter Nodes
        firePoly.forEach((pt, idx) => {
          ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#facc15';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // 5. Active Flame Front leading edge
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 2]);
        ctx.beginPath();
        ctx.moveTo(firePoly[2].x, firePoly[2].y);
        ctx.lineTo(firePoly[3].x, firePoly[3].y);
        ctx.lineTo(firePoly[4].x, firePoly[4].y);
        ctx.stroke();
        ctx.setLineDash([]);

        // 6. Spot fire alert
        const spotX = 295;
        const spotY = 72;
        const spotPulse = (Math.sin(tick * 0.1) + 1) / 2;
        ctx.strokeStyle = `rgba(244, 63, 94, ${0.4 + spotPulse * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(spotX, spotY, 7 + spotPulse * 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(spotX, spotY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fca5a5';
        ctx.font = '7.5px JetBrains Mono, monospace';
        ctx.fillText('⚠️ SPOT FIRE +1.4km', spotX - 38, spotY - 10);

        // 7. Drifting Embers
        embersRef.current.forEach((ember) => {
          ember.x += ember.vx;
          ember.y += ember.vy;
          ember.life++;
          if (ember.life > ember.maxLife || ember.x > w) {
            ember.x = 160 + Math.random() * 60;
            ember.y = 70 + Math.random() * 50;
            ember.life = 0;
          }
          const alpha = (1 - ember.life / ember.maxLife) * ember.alpha;
          ctx.fillStyle = `rgba(254, 240, 138, ${alpha})`;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // 8. Satellite Telemetry Overlays
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.fillText('● THERMAL IR BAND 7 (3.9µm)', 12, 18);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '7.5px JetBrains Mono, monospace';
        ctx.fillText('AI SEGMENTATION: ACTIVE FIRE FRONT', 12, 28);
        ctx.fillText('PERIMETER: 18.4 km | RAD TEMP: 890°C', 12, 38);

        // Wind vector compass
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '8px JetBrains Mono, monospace';
        ctx.fillText('WIND: 18 mph ENE ↗', w - 105, 18);
      };

      // Visible Light Layer (Billowing smoke concealing fire)
      const drawVisibleLayer = () => {
        ctx.fillStyle = 'rgba(20, 30, 20, 0.85)';
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
          puffGrad.addColorStop(0, 'rgba(100, 116, 139, 0.88)');
          puffGrad.addColorStop(0.5, 'rgba(148, 163, 184, 0.68)');
          puffGrad.addColorStop(0.9, 'rgba(203, 213, 225, 0.42)');
          puffGrad.addColorStop(1, 'rgba(203, 213, 225, 0)');

          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(smoke.x, smoke.y, smoke.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Visible Optical HUD
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.fillText('○ VISIBLE SPECTRUM (0.64µm OPTICAL)', 12, 18);
        ctx.fillStyle = '#f87171';
        ctx.font = '7.5px JetBrains Mono, monospace';
        ctx.fillText('⚠️ CAMERA BLINDED BY OPAQUE SMOKE PLUME', 12, 28);
        ctx.fillStyle = '#64748b';
        ctx.fillText('FIRE PERIMETER CANNOT BE DETECTED', 12, 38);
      };

      if (viewMode === 'thermal') {
        drawTerrain(true);
        drawThermalLayer();
      } else if (viewMode === 'visible') {
        drawTerrain(false);
        drawVisibleLayer();
      } else if (viewMode === 'split') {
        const splitX = (splitPos / 100) * w;

        // Draw Visible layer full
        drawTerrain(false);
        drawVisibleLayer();

        // Clip and draw Thermal layer on the right side
        ctx.save();
        ctx.beginPath();
        ctx.rect(splitX, 0, w - splitX, h);
        ctx.clip();
        drawTerrain(true);
        drawThermalLayer();
        ctx.restore();

        // Split Divider Line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(splitX, 0);
        ctx.lineTo(splitX, h);
        ctx.stroke();

        // Split handle badge
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(splitX, h / 2, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⇄', splitX, h / 2);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';

        // Labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '7px JetBrains Mono, monospace';
        ctx.fillText('VISIBLE (SMOKE)', Math.max(10, splitX - 85), h - 10);
        ctx.fillStyle = '#f87171';
        ctx.fillText('THERMAL IR (PIERCED)', Math.min(w - 105, splitX + 8), h - 10);
      }

      // Hover crosshair and real-time infrared temperature readout
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
        ctx.strokeRect(x - 4, y - 4, 8, 8);

        const dist = Math.hypot(x - 190, y - 95);
        const tempC = Math.max(22, Math.round(890 * Math.exp(-(dist * dist) / (2 * 48 * 48))));
        const isFire = tempC > 200;

        const tipX = Math.min(x + 12, w - 122);
        const tipY = Math.max(y - 25, 20);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
        ctx.strokeStyle = isFire ? '#ef4444' : '#64748b';
        ctx.lineWidth = 1;
        ctx.fillRect(tipX, tipY, 116, 36);
        ctx.strokeRect(tipX, tipY, 116, 36);

        ctx.fillStyle = isFire ? '#f87171' : '#38bdf8';
        ctx.font = 'bold 7.5px JetBrains Mono, monospace';
        ctx.fillText(isFire ? `🔥 FIRE FRONT: ${tempC}°C` : `CANOPY: ${tempC}°C`, tipX + 6, tipY + 12);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '6.5px JetBrains Mono, monospace';
        ctx.fillText(`LAT: ${(37.84 + y * 0.001).toFixed(3)}°N`, tipX + 6, tipY + 22);
        ctx.fillText(`LON: ${(-119.53 - x * 0.001).toFixed(3)}°W`, tipX + 6, tipY + 30);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [viewMode, splitPos, hoverData]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (isDraggingSplit.current && viewMode === 'split') {
      const pct = Math.max(10, Math.min(90, Math.round((x / canvas.width) * 100)));
      setSplitPos(pct);
    }
    setHoverData({ x, y });
  };

  const handleMouseDown = (e) => {
    if (viewMode === 'split') {
      isDraggingSplit.current = true;
      handleMouseMove(e);
    }
  };

  const handleMouseUp = () => {
    isDraggingSplit.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingSplit.current = false;
    setHoverData(null);
  };

  return (
    <div className="demo-box">
      <div
        className="demo-canvas-wrap"
        style={{ width: '100%', maxWidth: '380px', height: '200px', position: 'relative' }}
      >
        <canvas
          ref={canvasRef}
          width={380}
          height={200}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}
        />
        <div className="demo-drag-hint">
          {viewMode === 'split' ? '⇄ Drag on map to adjust split wipe' : '✛ Hover for real-time infrared temperature'}
        </div>
      </div>
      <div className="demo-controls-bar" style={{ flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            className={`chip-btn ${viewMode === 'thermal' ? 'active' : ''}`}
            onClick={() => setViewMode('thermal')}
          >
            🔴 Thermal IR
          </button>
          <button
            className={`chip-btn ${viewMode === 'visible' ? 'active' : ''}`}
            onClick={() => setViewMode('visible')}
          >
            💨 Visible Camera
          </button>
          <button
            className={`chip-btn ${viewMode === 'split' ? 'active' : ''}`}
            onClick={() => setViewMode('split')}
          >
            ⚡ Split Comparison
          </button>
        </div>
        <div className="demo-metric-pill">
          <span>Perimeter: <strong style={{ color: '#f87171' }}>18.4 km</strong></span>
          <span style={{ margin: '0 4px', color: '#64748b' }}>|</span>
          <span>Embers: <strong style={{ color: '#facc15' }}>32</strong></span>
        </div>
      </div>
    </div>
  );
}

// 8. FermiNet: Quantum Orbital Density
export function QuantumOrbitalDemo() {
  const [orbital, setOrbital] = useState('p'); // s, p, d

  return (
    <div className="demo-box">
      <svg width="340" height="130" viewBox="0 0 340 130">
        <rect width="340" height="130" fill="#090d16" />
        <circle cx="170" cy="65" r="4" fill="#facc15" />
        {orbital === 's' && (
          <circle cx="170" cy="65" r="45" fill="rgba(168, 85, 247, 0.3)" stroke="#c084fc" strokeWidth="2" />
        )}
        {orbital === 'p' && (
          <g>
            <ellipse cx="140" cy="65" rx="30" ry="20" fill="rgba(168, 85, 247, 0.35)" stroke="#c084fc" strokeWidth="2" />
            <ellipse cx="200" cy="65" rx="30" ry="20" fill="rgba(56, 189, 248, 0.35)" stroke="#38bdf8" strokeWidth="2" />
          </g>
        )}
        {orbital === 'd' && (
          <g>
            <circle cx="145" cy="45" r="20" fill="rgba(168, 85, 247, 0.3)" stroke="#c084fc" />
            <circle cx="195" cy="45" r="20" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" />
            <circle cx="145" cy="85" r="20" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" />
            <circle cx="195" cy="85" r="20" fill="rgba(168, 85, 247, 0.3)" stroke="#c084fc" />
          </g>
        )}
      </svg>
      <div className="demo-controls-bar">
        <button className={`chip-btn ${orbital === 's' ? 'active' : ''}`} onClick={() => setOrbital('s')}>1s Spherical</button>
        <button className={`chip-btn ${orbital === 'p' ? 'active' : ''}`} onClick={() => setOrbital('p')}>2p Dumbbell</button>
        <button className={`chip-btn ${orbital === 'd' ? 'active' : ''}`} onClick={() => setOrbital('d')}>3d Cloverleaf</button>
      </div>
    </div>
  );
}

// 9. AlphaGeometry: Olympiad Proof Animator
export function GeometryProofDemo() {
  const [step, setStep] = useState(1);

  return (
    <div className="demo-box">
      <svg width="340" height="130" viewBox="0 0 340 130">
        <rect width="340" height="130" fill="#090d16" />
        {/* Base Triangle ABC */}
        <polygon points="170,25 90,105 250,105" fill="none" stroke="#f8fafc" strokeWidth="2" />
        <text x="170" y="20" fill="#fff" fontSize="9" textAnchor="middle">A</text>
        <text x="80" y="112" fill="#fff" fontSize="9">B</text>
        <text x="255" y="112" fill="#fff" fontSize="9">C</text>

        {/* Step 2: Auxiliary Circumcircle proposed by Neural Net */}
        {step >= 2 && (
          <circle cx="170" cy="70" r="52" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3" />
        )}
        {/* Step 3: Orthocenter & Formal Deductive Line */}
        {step >= 3 && (
          <line x1="170" y1="25" x2="170" y2="105" stroke="#38bdf8" strokeWidth="2" />
        )}
      </svg>
      <div className="demo-controls-bar">
        <span style={{ fontSize: '10px' }}>Proof Step {step} of 3</span>
        <button className="chip-btn" onClick={() => setStep(s => (s % 3) + 1)}>
          {step === 1 ? '▶ Suggest Construction' : step === 2 ? '▶ Deduce Theorem' : '↺ Reset Proof'}
        </button>
      </div>
    </div>
  );
}

// 10. Perch: Bioacoustics Spectrogram
export function BioacousticsDemo() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="demo-box">
      <div className="spectrogram-wrap" style={{ height: '110px', background: '#090d16', position: 'relative', overflow: 'hidden' }}>
        <svg width="340" height="110">
          {[...Array(24)].map((_, i) => (
            <rect
              key={i}
              x={i * 14 + 10}
              y={Math.max(10, 80 - Math.sin(i * 0.7 + (playing ? Date.now() * 0.005 : 0)) * 50)}
              width="9"
              height={Math.max(8, Math.sin(i * 0.7 + (playing ? Date.now() * 0.005 : 0)) * 50)}
              fill={i > 14 ? '#34d399' : '#38bdf8'}
              rx="2"
            />
          ))}
        </svg>
        <div style={{ position: 'absolute', top: '8px', right: '12px', background: 'rgba(5, 150, 105, 0.9)', color: '#fff', padding: '3px 7px', borderRadius: '3px', fontSize: '9px', fontWeight: 'bold' }}>
          ✓ Species: Hawaiian Honeycreeper (98.4%)
        </div>
      </div>
      <div className="demo-controls-bar">
        <button className="chip-btn active" onClick={() => setPlaying(!playing)}>
          {playing ? '⏸ Pause Audio Stream' : '▶ Listen to Canopy'}
        </button>
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

# Google for Science — Digital Trifold Exhibition

An interactive computational exhibition transforming the classic science fair trifold board into a digital research medium. Showcasing breakthroughs across AI for Science from Google DeepMind and Google Research.

Inspired by the serene, architectural minimalism of The Noguchi Museum, featuring 100% Google Sans typography and live interactive computational models.

## ✨ Features

- **Two Exhibition Views**:
  - **Sliding Gallery**: High-impact editorial promenade presenting provocative speculative questions, live computational model simulations, and 10-second autoscroll.
  - **Tabletop Grid**: 3D paperboard science fair trifold boards arranged on a virtual exhibition floor with realistic inward-folding wings on hover.
- **Full Interactive Trifold Modal**: Clicking any board unfolds a 3-panel study spread:
  - *Left Panel*: The researcher monogram & profile, core hypothesis, why it matters, and scientific background.
  - *Center Panel*: Pinned headline, methodology, and live interactive computational simulator.
  - *Right Panel*: Honors & awards (with interactive celebration confetti), key result metrics, real-world impact, and direct link to the primary peer-reviewed Nature/Science publication.
- **10 Flagship Scientific Exhibits**:
  1. **AlphaFold 3**: 3D Protein & Ligand Complex Viewer (interactive rotation, backbone ribbon, drug binding).
  2. **GNoME**: Crystalline Materials Discovery (interactive 3D crystal lattice & battery stability convex hull).
  3. **GraphCast**: Medium-Range Global Weather Forecast (numerical weather supercomputer vs AI split comparison).
  4. **Autonomous Fusion**: Tokamak Magnetic Plasma Confinement (reinforcement learning magnetic coil control).
  5. **Flood Hub**: Riverine Inundation Forecasting (interactive gauge threshold & 7-day hydrograph).
  6. **Enformer**: Gene Expression & Chromatin Architecture (interactive DNA sequence variant editor).
  7. **Fire AI**: Real-Time Satellite Thermal Infrared Wildfire Tracking (multi-spectral thermal IR vs visible optical smoke plume simulation with spot fire detection).
  8. **FermiNet**: Quantum Molecular Wavefunctions (antisymmetric electron correlation orbitals).
  9. **AlphaGeometry**: Neuro-symbolic Olympiad Mathematical Theorem Prover.
  10. **Perch**: Bioacoustics Endangered Rainforest Species Canopy Audio Classifier.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/atticusgoogle/science-fair.git
cd science-fair

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 19**
- **Vite 5**
- **Lucide React** (icons)
- **Canvas-Confetti** (interactive award celebration)
- **HTML5 Canvas / SVG** (computational physics & molecular rendering)

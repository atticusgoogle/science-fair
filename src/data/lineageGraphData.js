// Scientific Lineage & Interconnectedness Dataset for Google for Science
// Defines the nodes, coordinates, shared algorithmic DNA, and "People Also Asked" question bridges.

export const DOMAINS = {
  BIOMOLECULAR: {
    id: 'biomolecular',
    label: 'Biomolecular & Health',
    color: '#2563EB',
    bgTint: 'rgba(37, 99, 235, 0.05)',
    borderTint: 'rgba(37, 99, 235, 0.2)',
    center: { x: 230, y: 170 }
  },
  MATERIALS: {
    id: 'materials',
    label: 'Materials & Energy',
    color: '#059669',
    bgTint: 'rgba(5, 150, 105, 0.05)',
    borderTint: 'rgba(5, 150, 105, 0.2)',
    center: { x: 630, y: 170 }
  },
  CLIMATE: {
    id: 'climate',
    label: 'Climate & Earth Systems',
    color: '#0284C7',
    bgTint: 'rgba(2, 132, 199, 0.05)',
    borderTint: 'rgba(2, 132, 199, 0.2)',
    center: { x: 230, y: 490 }
  },
  REASONING: {
    id: 'reasoning',
    label: 'Logic & Quantum Physics',
    color: '#7C3AED',
    bgTint: 'rgba(124, 58, 237, 0.05)',
    borderTint: 'rgba(124, 58, 237, 0.2)',
    center: { x: 630, y: 490 }
  }
};

export const LINEAGE_NODES = [
  {
    id: 'alphafold',
    title: 'AlphaFold 3',
    subtitle: 'Biomolecular Modeling',
    domain: 'biomolecular',
    coords: { x: 190, y: 150 },
    year: '2024',
    award: 'Nobel Prize in Chemistry 2024',
    leadGene: 'Evoformer & Cartesian Diffusion',
    summary: 'Predicts the 3D structures and binding interactions of all of life’s molecules—proteins, DNA, RNA, and ligands—with atomic precision.',
    toolsUsed: ['3D Cartesian Diffusion', 'Evoformer Invariant Attention', 'EMBL-EBI Protein Database', 'Google TPU v4 Pods'],
    originStory: 'Originated from a 50-year-old biophysics challenge: how amino acid sequences fold in 3D. DeepMind realized that biological molecules could be modeled as geometric graphs where physical distance acts as edge attention.'
  },
  {
    id: 'enformer',
    title: 'Enformer',
    subtitle: 'Non-Coding Genome Attention',
    domain: 'biomolecular',
    coords: { x: 310, y: 240 },
    year: '2021',
    award: 'Nature Methods Paper',
    leadGene: 'Long-Range Sequence Transformer',
    summary: 'Reads 200,000 base pairs of non-coding human DNA to predict epigenetic switches and how distant mutations trigger disease.',
    toolsUsed: ['Long-Range Self-Attention', 'Convolutional Receptive Fields', 'ENCODE Epigenomic Consortia', 'Cross-Species Transfer Learning'],
    originStory: 'While AlphaFold tackled the 2% of DNA that codes for proteins, Enformer tackled the other 98%—the "dark matter" of the genome. Researchers adapted language transformers to decipher distant genetic regulatory loops.'
  },
  {
    id: 'gnome',
    title: 'GNoME',
    subtitle: 'Crystal Materials Discovery',
    domain: 'materials',
    coords: { x: 550, y: 140 },
    year: '2023',
    award: 'Nature Cover Story',
    leadGene: 'Periodic Graph Neural Networks',
    summary: 'Discovered 2.2 million stable crystal structures—expanding humanity’s catalog of known materials tenfold for solid-state batteries and solar cells.',
    toolsUsed: ['Active Learning GNNs', 'Density Functional Theory (DFT)', 'Autonomous A-Lab Robotics', 'Convex Hull Optimization'],
    originStory: 'DeepMind scientists asked: if graph networks can learn how atoms bind in proteins, can they learn the thermodynamic stability of inorganic crystals? GNoME turned material discovery from wet-lab trial into algorithmic search.'
  },
  {
    id: 'fusion',
    title: 'Autonomous Fusion',
    subtitle: 'Magnetic Tokamak Control',
    domain: 'materials',
    coords: { x: 710, y: 220 },
    year: '2022',
    award: 'Nature Publication',
    leadGene: 'Non-Linear Deep Reinforcement Learning',
    summary: 'Holds 100,000,000°C plasma in a magnetic bottle inside the Swiss Plasma Center’s tokamak using high-frequency neural feedback.',
    toolsUsed: ['Actor-Critic Deep RL', 'TCV Hardware Tokamak', 'High-Fidelity Plasma Simulators', '10kHz Real-Time Controller Loop'],
    originStory: 'Tokamak plasma is wildly turbulent. Traditional controllers required dozens of hand-tuned PID loops. DeepMind applied the same deep reinforcement learning architecture that solved StarCraft and Go to coordinate 19 magnetic coils at 10,000 adjustments per second.'
  },
  {
    id: 'graphcast',
    title: 'GraphCast',
    subtitle: 'Global Weather Forecasting',
    domain: 'climate',
    coords: { x: 170, y: 440 },
    year: '2023',
    award: 'Science Cover Paper',
    leadGene: 'Icosahedral Multi-Mesh GNN',
    summary: 'Generates 10-day global weather forecasts in under 60 seconds on a single TPU, outperforming the European supercomputer on 90% of variables.',
    toolsUsed: ['Icosahedral Multi-Mesh Representation', '40-Year ECMWF ERA5 Dataset', 'Autoregressive Trajectory Rollouts', 'Google TPU v4 Accelerators'],
    originStory: 'Traditional weather simulation solves partial differential equations on hundreds of supercomputer nodes over hours. DeepMind mapped Earth’s spherical atmosphere onto an icosahedral graph mesh, learning physics directly from 40 years of climate history.'
  },
  {
    id: 'flood_hub',
    title: 'Flood Hub',
    subtitle: 'Humanitarian Early Warning',
    domain: 'climate',
    coords: { x: 330, y: 530 },
    year: '2024',
    award: 'UN & Red Cross Deployment',
    leadGene: 'Hydrological Watershed LSTMs',
    summary: 'Provides life-saving riverine flood forecasts up to 7 days in advance across 80+ countries and 700 million vulnerable residents.',
    toolsUsed: ['Recurrent Hydrologic Networks', 'Satellite Precipitation Radar', 'Digital Elevation Models (DEMs)', 'Google Maps Alert Broadcast'],
    originStory: 'Developing river basins lack physical water gauges. Researchers trained transfer-learning models on global satellite elevation and rain gauges, teaching the AI to predict river discharge in basins it had never physically measured.'
  },
  {
    id: 'wildfire',
    title: 'Fire AI',
    subtitle: 'Satellite Thermal Perimeter Tracking',
    domain: 'climate',
    coords: { x: 190, y: 620 },
    year: '2024',
    award: 'USFS & CAL FIRE Partner',
    leadGene: 'Multi-Spectral Thermal Deep Nets',
    summary: 'Maps active wildfire perimeters every 15 minutes through heavy smoke using geostationary satellite thermal infrared streams.',
    toolsUsed: ['NOAA GOES-16 & 18 Infrared', 'False-Positive Glint Filters', 'Convolutional Spatial Segmenters', 'Google Maps Emergency Layer'],
    originStory: 'Smoke plumes blind optical aerial cameras during megafires. Google teams developed real-time infrared filters that ignore rock heat and industrial flaring to extract verified fire fronts for frontline evacuations.'
  },
  {
    id: 'ferminet',
    title: 'FermiNet',
    subtitle: 'First-Principles Quantum Physics',
    domain: 'reasoning',
    coords: { x: 550, y: 440 },
    year: '2020',
    award: 'Physical Review Research',
    leadGene: 'Antisymmetric Neural Wavefunctions',
    summary: 'Solves the fundamental many-electron Schrödinger equation directly from scratch without any empirical training data.',
    toolsUsed: ['Slater-Determinant Tensors', 'Variational Quantum Monte Carlo', 'Strict Fermionic Antisymmetry', 'Chemical Accuracy Benchmark'],
    originStory: 'Paul Dirac famously stated in 1929 that fundamental chemical equations were too complex to solve. FermiNet built neural networks that strictly respect quantum antisymmetry, letting AI compute chemical bond energies from first principles.'
  },
  {
    id: 'alphageometry',
    title: 'AlphaGeometry',
    subtitle: 'Olympiad Mathematical Proof',
    domain: 'reasoning',
    coords: { x: 720, y: 530 },
    year: '2024',
    award: 'IMO Silver Medal Benchmark',
    leadGene: 'Neuro-Symbolic Deductive Co-Pilot',
    summary: 'Solves complex International Mathematical Olympiad geometry problems at silver-medal level by marrying neural intuition with formal deduction.',
    toolsUsed: ['100M Synthetic Proof Engine', 'Formal Axiomatic Reasoner', 'Transformer Construction Proposer', 'Lean Mathematical Language'],
    originStory: 'Language models hallucinate math proofs, while pure symbolic engines lack the intuition to draw auxiliary lines in a diagram. AlphaGeometry combined a neural proposer with a rigid deductive engine, synthesizing 100 million self-taught proofs.'
  },
  {
    id: 'bioacoustics',
    title: 'Perch',
    subtitle: 'Global Bioacoustics Foundation Model',
    domain: 'climate',
    coords: { x: 370, y: 400 },
    year: '2023',
    award: 'Global Conservation Deployments',
    leadGene: 'Self-Supervised Spectrogram Embeddings',
    summary: 'Identifies over 10,000 wildlife species from canopy audio recordings, tracking endangered species and detecting illegal chainsaw logging in real time.',
    toolsUsed: ['Frequency Spectrogram Embeddings', 'Few-Shot Animal Classifier', 'Low-Power Bioacoustic Edge Sensors', 'Coral Reef Hydrophone Array'],
    originStory: 'Ecologists collect millions of hours of jungle audio that humans could never listen to. DeepMind adapted acoustic transformer embeddings to isolate rare bird songs from torrential rain, wind, and insect static.'
  }
];

// Curated directed lineage connections with "People Also Asked" questions
// Each connection is directional (from -> to) so questions are tailored from the perspective of the starting breakthrough.
export const LINEAGE_CONNECTIONS = [
  // --- From AlphaFold 3 ---
  {
    id: 'af_gnome',
    from: 'alphafold',
    to: 'gnome',
    connectionType: 'architecture_transfer',
    sharedGene: 'Geometric Graph Attention: Proteins ➔ Inorganic Crystals',
    paaQuestion: 'How did predicting protein folding lead to discovering 2.2 million new crystal materials?',
    story: 'AlphaFold learned how atoms assemble into 3D biological proteins. GNoME adapted that exact spatial graph intuition to inorganic chemistry—treating crystal unit cells as periodic graphs to predict thermodynamic stability for EV batteries.'
  },
  {
    id: 'af_enformer',
    from: 'alphafold',
    to: 'enformer',
    connectionType: 'biological_code',
    sharedGene: 'Long-Range Attention: 3D Protein Complexes ➔ Non-Coding Switches',
    paaQuestion: 'How does 3D molecular folding relate to the 98% non-coding human genome?',
    story: 'While AlphaFold predicts the 3D shapes of proteins, 98% of human DNA does not code for proteins at all. DeepMind scientists applied long-range attention architectures to model how distant non-coding regulatory switches fold in 3D space to trigger or suppress gene expression.'
  },
  {
    id: 'af_ferminet',
    from: 'alphafold',
    to: 'ferminet',
    connectionType: 'first_principles',
    sharedGene: 'Neural Approximation ➔ First-Principles Quantum Chemistry',
    paaQuestion: 'Can first-principles quantum physics simulate drug binding even deeper than neural nets?',
    story: 'AlphaFold predicts molecular geometry using learned statistical patterns. FermiNet takes the next leap: solving the fundamental Schrödinger equation directly for electrons without training data, computing exact chemical bond energies from first principles.'
  },

  // --- From GNoME ---
  {
    id: 'gnome_graphcast',
    from: 'gnome',
    to: 'graphcast',
    connectionType: 'architecture_transfer',
    sharedGene: 'Periodic Graph Networks: Nanoscale Crystals ➔ Planetary Weather',
    paaQuestion: 'How did crystal lattice modeling inspire global 10-day weather forecasting?',
    story: 'Both crystals and Earth’s atmosphere cannot be mapped onto flat Euclidean grids without distortion. The graph neural network innovations developed in GNoME for periodic crystal boundaries were scaled up into GraphCast’s icosahedral multi-mesh, wrapping the entire spherical atmosphere.'
  },
  {
    id: 'gnome_fusion',
    from: 'gnome',
    to: 'fusion',
    connectionType: 'materials_extreme',
    sharedGene: 'Thermodynamic Stability ➔ 100M°C Tokamak Divertor Walls',
    paaQuestion: 'Can newly discovered crystal materials withstand 100,000,000°C plasma walls?',
    story: 'Nuclear fusion chambers require ultra-resilient materials that won’t melt or degrade under intense neutron bombardment. GNoME’s discovery of 736 potential superhard materials provides promising candidates for next-generation tokamak divertor tiles.'
  },
  {
    id: 'gnome_ferminet',
    from: 'gnome',
    to: 'ferminet',
    connectionType: 'first_principles',
    sharedGene: 'Quantum Energy Benchmarks: Convex Hull ➔ Ab-Initio Wavefunctions',
    paaQuestion: 'How do quantum electron wavefunctions verify thermodynamic stability on the convex hull?',
    story: 'GNoME generates millions of theoretical candidate crystal structures. To verify whether a crystal will spontaneously decompose, physicists use quantum ab-initio simulations pioneered by FermiNet to calculate ground-state electronic energies with chemical accuracy.'
  },

  // --- From GraphCast ---
  {
    id: 'graphcast_flood',
    from: 'graphcast',
    to: 'flood_hub',
    connectionType: 'data_cascade',
    sharedGene: 'Atmospheric Dynamics ➔ Hydrological Watershed Runoff',
    paaQuestion: 'How does a 10-day global weather forecast save lives from local river floods?',
    story: 'GraphCast predicts extreme atmospheric rivers and torrential rain up to 10 days out. Flood Hub takes these precipitation forecasts and routes them through digital elevation models to alert 700 million people before riverbanks breach.'
  },
  {
    id: 'graphcast_wildfire',
    from: 'graphcast',
    to: 'wildfire',
    connectionType: 'data_cascade',
    sharedGene: 'Atmospheric Wind Vectors ➔ Ground Thermal Fire Lines',
    paaQuestion: 'Can 60-second weather models predict which way a wildfire will blow?',
    story: 'GraphCast models surface wind velocity and relative humidity at fine resolution. Fire AI pairs these meteorological vectors with 15-minute satellite thermal perimeters to anticipate fire spread across mountain ridges.'
  },
  {
    id: 'graphcast_bioacoustics',
    from: 'graphcast',
    to: 'bioacoustics',
    connectionType: 'climate_impact',
    sharedGene: 'Planetary Meteorological Shifts ➔ Ecosystem Acoustic Monitoring',
    paaQuestion: 'How do global atmospheric shifts impact vulnerable rainforest ecosystems?',
    story: 'As GraphCast tracks shifting drought corridors and heatwaves worldwide, conservationists use Perch’s acoustic canopy arrays to record how bird and animal migration patterns shift in real time in response to changing microclimates.'
  },

  // --- From Flood Hub ---
  {
    id: 'flood_wildfire',
    from: 'flood_hub',
    to: 'wildfire',
    connectionType: 'humanitarian_alert',
    sharedGene: 'Crisis AI Infrastructure: Google Maps & Android Emergency Broadcasting',
    paaQuestion: 'How do satellite climate models translate into real-time emergency evacuations?',
    story: 'Both Flood Hub and Fire AI share Google’s humanitarian emergency broadcasting infrastructure—transforming complex satellite telemetry and neural predictions into plain-language push alerts and Google Maps evacuation boundaries.'
  },
  {
    id: 'flood_bioacoustics',
    from: 'flood_hub',
    to: 'bioacoustics',
    connectionType: 'ecology_hydrology',
    sharedGene: 'Hydrological Discharge ➔ Riparian Ecosystem Preservation',
    paaQuestion: 'Can river discharge modeling safeguard vulnerable wetland wildlife?',
    story: 'Flood Hub’s watershed runoff models predict seasonal inundation of critical river basins, helping ecologists deploy Perch acoustic sensors to protect endangered amphibious species and monitor mangrove restoration corridors.'
  },
  {
    id: 'flood_alphageometry',
    from: 'flood_hub',
    to: 'alphageometry',
    connectionType: 'formal_safety',
    sharedGene: 'Mission-Critical Reliability ➔ Formal Verification & Reasoning',
    paaQuestion: 'How does Google verify that crisis alert software never hallucinates during a disaster?',
    story: 'When alerting 700 million people to incoming natural disasters, AI models cannot produce false anomalies. The formal mathematical proof and neuro-symbolic verification techniques from AlphaGeometry are adapted into safety-critical pipeline verification.'
  },

  // --- From Fire AI (Wildfire) ---
  {
    id: 'wildfire_flood',
    from: 'wildfire',
    to: 'flood_hub',
    connectionType: 'post_disaster_coupling',
    sharedGene: 'Satellite Burn Scars ➔ Post-Fire Mudslide Forecasting',
    paaQuestion: 'How does satellite burn scar mapping forecast catastrophic winter mudslides?',
    story: 'When a wildfire incinerates vegetation, hydrophobic soil cannot absorb winter rain. Fire AI’s verified perimeter burn-severity maps feed directly into Flood Hub’s elevation runoff models to predict deadly debris flows months before the first storms hit.'
  },
  {
    id: 'wildfire_bioacoustics',
    from: 'wildfire',
    to: 'bioacoustics',
    connectionType: 'conservation_defense',
    sharedGene: 'Thermal Infrared Surveillance ➔ Acoustic Poaching & Chainsaw Defense',
    paaQuestion: 'Can forest canopy microphones detect illegal logging before fires are ignited?',
    story: 'Many catastrophic wildfires in tropical reserves begin with illegal agricultural slash-and-burn clearing. Perch acoustic sensors detect chainsaws and motor equipment in real time, alerting rangers before illegal deforestation ignites wildfire lines.'
  },
  {
    id: 'wildfire_graphcast',
    from: 'wildfire',
    to: 'graphcast',
    connectionType: 'meteorological_feedback',
    sharedGene: 'Wildfire Smoke Pyrocumulonimbus ➔ Global Atmospheric Feedback',
    paaQuestion: 'How do massive wildfire smoke plumes alter global weather forecasts?',
    story: 'Megafires generate pyrocumulonimbus thunderstorm clouds that inject millions of tons of smoke aerosol into the stratosphere, altering solar radiation. Coupling Fire AI perimeters back into GraphCast ensures global weather predictions account for active burn emissions.'
  },

  // --- From Autonomous Fusion ---
  {
    id: 'fusion_alphageometry',
    from: 'fusion',
    to: 'alphageometry',
    connectionType: 'search_reasoning',
    sharedGene: 'Infinite State Space Search: Tokamak Plasma ➔ Olympiad Proofs',
    paaQuestion: 'What connects stabilizing 100M°C plasma with solving Olympiad geometry?',
    story: 'Both problems require navigating an astronomically vast space of choices without human guidance. The deep reinforcement learning search algorithms that modulate 19 tokamak magnetic coils were refined into AlphaGeometry’s neuro-symbolic search for creative auxiliary geometric constructions.'
  },
  {
    id: 'fusion_gnome',
    from: 'fusion',
    to: 'gnome',
    connectionType: 'clean_energy_ecosystem',
    sharedGene: 'Magnetic Plasma Engineering ➔ High-Entropy Alloy Materials',
    paaQuestion: 'What novel crystal materials are needed to build commercial fusion power plants?',
    story: 'Containing burning star plasma requires ultra-dense magnetic fields and radiation-resistant materials. The materials discovered by GNoME—including novel tungsten-based alloys and superconductor candidates—form the experimental roadmap for commercial fusion reactor vessels.'
  },
  {
    id: 'fusion_ferminet',
    from: 'fusion',
    to: 'ferminet',
    connectionType: 'quantum_physics',
    sharedGene: 'Turbulent Plasma Transport ➔ Ab-Initio Multi-Electron Simulations',
    paaQuestion: 'How do quantum mechanical simulations model turbulent plasma ionization?',
    story: 'At 100,000,000°C, atomic nuclei and electrons detach into turbulent, conductive plasma. FermiNet’s ab-initio quantum wavefunctions help physicists calculate atomic ionization rates and bremsstrahlung radiation loss directly from first principles.'
  },

  // --- From FermiNet ---
  {
    id: 'ferminet_gnome',
    from: 'ferminet',
    to: 'gnome',
    connectionType: 'first_principles',
    sharedGene: 'Fundamental Quantum Energies ➔ Convex Hull Material Filters',
    paaQuestion: 'How does solving the Schrödinger equation from scratch verify new battery crystals?',
    story: 'When GNoME invents 2.2 million theoretical crystal structures, physicists must verify whether they will decompose. FermiNet’s first-principles quantum calculations provide the fundamental ground-truth electron energies to validate stable candidates on the convex hull.'
  },
  {
    id: 'ferminet_fusion',
    from: 'ferminet',
    to: 'fusion',
    connectionType: 'clean_energy_physics',
    sharedGene: 'First-Principles Quantum Mechanics ➔ Magnetic Confinement Simulations',
    paaQuestion: 'Can neural wavefunctions simulate extreme plasma confinement physics?',
    story: 'Simulating quantum electron collisions under extreme magnetic fields is essential to understanding fusion plasma stability. FermiNet demonstrates that neural networks can solve multi-particle wavefunctions without empirical approximations.'
  },
  {
    id: 'ferminet_alphafold',
    from: 'ferminet',
    to: 'alphafold',
    connectionType: 'molecular_precision',
    sharedGene: 'Quantum Chemistry Precision ➔ Sub-Angstrom Biomolecular Docking',
    paaQuestion: 'Could quantum wavefunctions compute atomic bond forces directly in drug discovery?',
    story: 'While AlphaFold predicts protein and ligand coordinate geometry, calculating exact quantum transition states for drug efficacy requires electron-level physics. FermiNet provides the sub-angstrom energy landscapes that take biomolecular modeling to chemical precision.'
  },

  // --- From Enformer ---
  {
    id: 'enformer_alphafold',
    from: 'enformer',
    to: 'alphafold',
    connectionType: 'biological_code',
    sharedGene: 'Long-Range Attention: Non-Coding Switches ➔ 3D Molecular Complexes',
    paaQuestion: 'Why did decoding the non-coding genome require the same transformer architecture as AlphaFold?',
    story: 'DNA loops in 3D: a genetic switch 100,000 base pairs away physically touches a gene promoter. Enformer’s 200,000-base-pair attention window demonstrated that biological sequences must be processed with long-range structural attention, directly mirroring AlphaFold 3’s biomolecular interactions.'
  },
  {
    id: 'enformer_perch',
    from: 'enformer',
    to: 'bioacoustics',
    connectionType: 'representation_learning',
    sharedGene: 'High-Dimensional Biological Embeddings: DNA Bases ➔ Rainforest Soundscapes',
    paaQuestion: 'How does reading genetic code translate into listening to 10,000 animal species?',
    story: 'Both DNA sequences and rainforest audio spectrograms are continuous, noisy biological signals where rare signals (disease mutations or endangered bird calls) are buried in petabytes of background noise. DeepMind used self-supervised foundation representations across both.'
  },
  {
    id: 'enformer_alphageometry',
    from: 'enformer',
    to: 'alphageometry',
    connectionType: 'symbolic_biology',
    sharedGene: 'Biological Syntactic Grammars ➔ Formal Axiomatic Deductions',
    paaQuestion: 'Can neuro-symbolic reasoning verify complex biological pathways without error?',
    story: 'Genetic regulatory networks operate like complex logical circuits with AND/OR transcription switches. Research from AlphaGeometry into combining neural intuition with formal deductive logic is being applied to verify synthetic biology gene circuits.'
  },

  // --- From AlphaGeometry ---
  {
    id: 'alphageometry_ferminet',
    from: 'alphageometry',
    to: 'ferminet',
    connectionType: 'mathematical_foundations',
    sharedGene: 'Formal Theorem Proving ➔ Quantum Wavefunction Antisymmetry Constraints',
    paaQuestion: 'Can formal mathematical verification prove quantum wavefunction approximations?',
    story: 'Ensuring that neural networks strictly obey mathematical symmetries (such as fermionic antisymmetry in quantum physics) requires formal verification. AlphaGeometry’s neuro-symbolic techniques help formally prove physical invariant bounds.'
  },
  {
    id: 'alphageometry_fusion',
    from: 'alphageometry',
    to: 'fusion',
    connectionType: 'provable_safety',
    sharedGene: 'Neuro-Symbolic Deductions ➔ Provably Stable Plasma Controllers',
    paaQuestion: 'How can formal logic ensure magnetic plasma control policies remain provably stable?',
    story: 'Pure neural controllers can be unpredictable under rare edge conditions. By integrating AlphaGeometry’s symbolic deduction with deep reinforcement learning, engineers create hybrid controllers that are formally guaranteed never to drive plasma into reactor walls.'
  },
  {
    id: 'alphageometry_alphafold',
    from: 'alphageometry',
    to: 'alphafold',
    connectionType: 'geometric_intuition',
    sharedGene: 'Synthetic Diagram Constructions ➔ Biomolecular Coordinate Manifolds',
    paaQuestion: 'Could formal logic co-pilots prove mathematical bounds on protein docking?',
    story: 'AlphaGeometry synthesizes 100 million geometric proofs without human demonstration. Researchers are adapting these synthetic axiomatic engines to verify that predicted protein-ligand docking pockets satisfy strict steric and thermodynamic boundary laws.'
  },

  // --- From Perch (Bioacoustics) ---
  {
    id: 'bioacoustics_wildfire',
    from: 'bioacoustics',
    to: 'wildfire',
    connectionType: 'early_detection',
    sharedGene: 'Acoustic Canopy Listening ➔ Satellite Thermal Fire Mapping',
    paaQuestion: 'How do canopy acoustic sensors collaborate with satellites to detect wildfire ignition?',
    story: 'Before a wildfire is large enough to be spotted by geostationary weather satellites, canopy microphones detect the distinct acoustic crackle of ignition and unauthorized human vehicles in remote conservation reserves, giving frontline crews an immediate head start.'
  },
  {
    id: 'bioacoustics_flood',
    from: 'bioacoustics',
    to: 'flood_hub',
    connectionType: 'riparian_preservation',
    sharedGene: 'Soundscape Bio-Indicators ➔ Mangrove Wetland Flood Barriers',
    paaQuestion: 'How do bioacoustic soundscapes guide river restoration and natural flood barriers?',
    story: 'Healthy mangrove wetlands reduce storm surge and river flood severity by up to 50%. Ecologists use Perch to track snapping shrimp and bird vocalizations, using bioacoustic health metrics to guide where to restore natural riverine wetlands.'
  },
  {
    id: 'bioacoustics_enformer',
    from: 'bioacoustics',
    to: 'enformer',
    connectionType: 'biodiversity_genomics',
    sharedGene: 'Acoustic Species Identification ➔ Environmental DNA (eDNA) Sequencing',
    paaQuestion: 'How do acoustic foundation models pair with environmental DNA sequencing?',
    story: 'By combining Perch’s audio identification of wild species with Enformer’s genomic sequence analysis from water and soil eDNA samples, scientists can map entire biodiversity ecosystems without capturing or disturbing animals.'
  }
];

// Curated Narrative Rabbit Hole Starter Paths
export const CURATED_TRAILS = [
  {
    id: 'clean_energy',
    title: 'The Clean Energy Arc',
    tagline: 'Quantum Physics ➔ 2.2M Crystals ➔ 100M°C Fusion',
    startNode: 'ferminet',
    steps: ['ferminet', 'gnome', 'fusion'],
    description: 'Follow how solving the fundamental Schrödinger equation from first principles led to discovering 2.2 million new battery materials, and how reinforcement learning learned to hold burning star plasma in a magnetic chamber.'
  },
  {
    id: 'planetary_shield',
    title: 'The Planetary Shield',
    tagline: 'Protein Geometry ➔ 60-Second Weather ➔ 700M Flood Alerts',
    startNode: 'alphafold',
    steps: ['alphafold', 'gnome', 'graphcast', 'flood_hub'],
    description: 'Trace how modeling 3D atomic bonds inspired periodic graph networks for crystals, which scaled up to predict 10-day global weather in 60 seconds, now providing flood warnings to 700 million people across 80 nations.'
  },
  {
    id: 'biological_code',
    title: 'Decoding Life’s Code',
    tagline: 'Non-Coding DNA ➔ Nobel Prize Structures ➔ Wild Bioacoustics',
    startNode: 'enformer',
    steps: ['enformer', 'alphafold', 'bioacoustics'],
    description: 'Explore how long-range self-attention cracked the 98% of human DNA that controls disease, predicted 200M molecular shapes with atomic precision, and trained foundation models to listen to 10,000 endangered animal species.'
  }
];

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
    subtitle: '3D Molecular Sculpting',
    code: 'AF3',
    domain: 'biomolecular',
    coords: { x: 190, y: 150 },
    year: '2024',
    award: 'Nobel Prize in Chemistry 2024',
    superpower: 'Predicts the 3D atomic structure of every molecule of life in seconds.',
    keyStat: '200M+ Structures Open-Sourced',
    leadGene: '3D Atom Sculpting (Diffusion AI)',
    summary: 'Predicts how proteins, DNA, RNA, and medicines snap together in 3D with atomic precision.',
    toolsUsed: ['3D Atom Sculpting', 'Molecular Attention', 'EMBL-EBI Protein Database', 'Google TPU Supercomputers'],
    originStory: 'How do flat chains of biological code twist into life-saving machines? DeepMind trained an AI that starts with a fuzzy cloud of atoms and sculpts them into their exact 3D positions in minutes.',
    simpleOrigin: 'Proteins are the microscopic machines of life. Instead of 5 years of lab trials, AlphaFold predicts how atoms snap together directly on a computer.'
  },
  {
    id: 'enformer',
    title: 'Enformer',
    subtitle: 'Reading the Non-Coding Genome',
    code: 'EN',
    domain: 'biomolecular',
    coords: { x: 310, y: 240 },
    year: '2021',
    award: 'Nature Methods Paper',
    superpower: 'Decodes the 98% of human DNA that controls disease switches.',
    keyStat: '200,000 Base Pair Reading Window',
    leadGene: 'Long-Distance DNA Language AI',
    summary: 'Reads 200,000 letters of non-coding DNA to predict the master switches of human disease.',
    toolsUsed: ['Long-Distance Attention', 'DNA Sequence Readers', 'ENCODE Genetic Database', 'Cross-Species Transfer'],
    originStory: 'While AlphaFold cracked the 2% of DNA that builds proteins, Enformer reads the other 98%—the vast control room containing the master switches of disease.',
    simpleOrigin: 'DNA loops in 3D: a genetic typo 100,000 letters away can activate a cancer gene. Enformer reads across long genetic distances to spot these triggers.'
  },
  {
    id: 'gnome',
    title: 'GNoME',
    subtitle: 'Crystal Materials Discovery',
    code: 'GN',
    domain: 'materials',
    coords: { x: 550, y: 140 },
    year: '2023',
    award: 'Nature Cover Story',
    superpower: 'Discovered 2.2 million new crystal materials, expanding human knowledge 10x.',
    keyStat: '800 Years of Discovery in Months',
    leadGene: 'Atomic Recipe Graph AI',
    summary: 'Invented blueprints for next-generation solid-state batteries, solar panels, and superconductors.',
    toolsUsed: ['Active Recipe Search', 'Quantum Stability Checks', 'A-Lab Robotic Synthesis', 'Materials Project Database'],
    originStory: 'If AI can predict how atoms connect in proteins, can it discover brand-new inorganic crystals? GNoME turned materials science into rapid computational search.',
    simpleOrigin: 'Humanity had only found 28,000 stable materials in all of history. GNoME discovered 2.2 million more, providing blueprints for greener technologies.'
  },
  {
    id: 'fusion',
    title: 'Autonomous Fusion',
    subtitle: 'Star-in-a-Bottle Autopilot',
    code: 'FU',
    domain: 'materials',
    coords: { x: 710, y: 220 },
    year: '2022',
    award: 'Nature Publication',
    superpower: 'Holds 100,000,000°C plasma in a magnetic bottle at 10,000 adjustments per second.',
    keyStat: '100M°C Core Stabilized',
    leadGene: 'High-Speed Magnetic Autopilot',
    summary: 'AI autopilot coordinates 19 magnetic coils to bottle burning star plasma hotter than the sun.',
    toolsUsed: ['Reinforcement Learning', 'TCV Tokamak Reactor', '10,000Hz Magnetic Controller', 'Plasma Simulators'],
    originStory: 'Tokamak plasma is hotter than the core of the sun and wildly turbulent. DeepMind used reinforcement learning to coordinate 19 magnets in real time with superhuman reflexes.',
    simpleOrigin: 'Nuclear fusion produces clean, limitless electricity using ordinary seawater as fuel, with zero long-lived radioactive waste.'
  },
  {
    id: 'graphcast',
    title: 'GraphCast',
    subtitle: '10-Day Weather in 1 Minute',
    code: 'GC',
    domain: 'climate',
    coords: { x: 170, y: 440 },
    year: '2023',
    award: 'Science Cover Paper',
    superpower: 'Forecasts 10-day global weather in under 60 seconds on a single TPU chip.',
    keyStat: 'Beats Supercomputers on 90% of Metrics',
    leadGene: 'Spherical Atmosphere AI',
    summary: 'Predicts extreme storms, hurricanes, and heatwaves days earlier using 1,000x less energy.',
    toolsUsed: ['Spherical Planet Grid', '40 Years of Satellite Weather', 'Fast 10-Day Forecast Loops', 'Google TPU Supercomputers'],
    originStory: 'Traditional supercomputers take hours on large clusters to compute 10-day forecasts. GraphCast wrapped Earth in a spherical mesh and learned physics directly from 40 years of climate data.',
    simpleOrigin: 'Spotted Hurricane Lee’s exact Canadian landfall 9 days ahead—giving emergency crews critical extra days to prepare flood defenses.'
  },
  {
    id: 'flood_hub',
    title: 'Flood Hub',
    subtitle: 'Satellite Flood Early Warning',
    code: 'FH',
    domain: 'climate',
    coords: { x: 330, y: 530 },
    year: '2024',
    award: 'UN & Red Cross Deployment',
    superpower: 'Alerts 700 million people across 80 countries up to 7 days before rivers breach.',
    keyStat: '700M+ People Protected',
    leadGene: 'Satellite Watershed Flow Predictor',
    summary: 'Predicts river flood crests in ungauged river basins using satellite elevation, rain radar, and soil maps.',
    toolsUsed: ['River Elevation Models', 'Satellite Rainfall Radar', 'Soil Absorption Maps', 'Google Maps Emergency Alerts'],
    originStory: 'Most vulnerable river basins in the developing world have zero physical water gauges. DeepMind trained AI on global satellite rainfall and elevation to generalize to rivers it had never measured.',
    simpleOrigin: 'A 24-hour flood warning cuts damage and casualties by up to 50%. Free alerts are sent directly to phones via Google Search and Maps.'
  },
  {
    id: 'wildfire',
    title: 'Fire AI',
    subtitle: 'Live Satellite Fire Tracking',
    code: 'FA',
    domain: 'climate',
    coords: { x: 190, y: 620 },
    year: '2024',
    award: 'USFS & CAL FIRE Partner',
    superpower: 'Maps active wildfire boundaries every 15 minutes through blinding smoke plumes.',
    keyStat: '15-Minute Live Perimeters',
    leadGene: 'Satellite Thermal Heat Sensing',
    summary: 'Processes satellite thermal infrared streams to extract verified fire boundaries in near real time.',
    toolsUsed: ['NOAA Satellite Infrared', 'Heat Glint Filters', 'Smoke-Penetrating Vision', 'CAL FIRE Live Integration'],
    originStory: 'Dense smoke blinds optical cameras. Google teams built AI filters that process space satellite thermal heat streams, separating genuine fire lines from rock glint and factories.',
    simpleOrigin: 'Displayed live on Google Maps so evacuating families know which roads are safe and firefighters can deploy crews with pinpoint precision.'
  },
  {
    id: 'ferminet',
    title: 'FermiNet',
    subtitle: 'Quantum Physics from Scratch',
    code: 'FN',
    domain: 'reasoning',
    coords: { x: 550, y: 440 },
    year: '2020',
    award: 'Physical Review Research',
    superpower: 'Solves the fundamental quantum Schrödinger equation from scratch with zero lab data.',
    keyStat: 'Chemical Accuracy (<1 kcal/mol)',
    leadGene: 'Quantum Electron Wavefunctions',
    summary: 'Simulates electrons directly from fundamental physics to design green catalysts and carbon capture.',
    toolsUsed: ['Fundamental Physics Equations', 'Quantum Monte Carlo', 'Electron Cloud Simulation', 'Chemical Precision Benchmarks'],
    originStory: 'Paul Dirac stated in 1929 that fundamental chemical equations were too complex to solve. FermiNet built neural networks that strictly respect quantum rules, solving equations without human lab data.',
    simpleOrigin: 'If we can simulate chemistry from fundamental physics rather than lab experiments, we can invent carbon capture materials that clean our air.'
  },
  {
    id: 'alphageometry',
    title: 'AlphaGeometry',
    subtitle: 'Creative Proof Reasoning',
    code: 'AG',
    domain: 'reasoning',
    coords: { x: 720, y: 530 },
    year: '2024',
    award: 'IMO Silver Medal Benchmark',
    superpower: 'Solves International Mathematical Olympiad geometry problems at silver-medal level.',
    keyStat: 'Solved 25 of 30 Olympiad Problems',
    leadGene: 'Creative Helper Lines + Strict Logic',
    summary: 'Combines creative intuition with rigorous mathematical deduction to invent verified proofs.',
    toolsUsed: ['Creative Language Model', 'Deductive Logic Engine', '100M Synthesized Theorems', 'Axiomatic Math Checker'],
    originStory: 'Language models often hallucinate math, while symbolic calculators cannot think creatively. AlphaGeometry pairs a creative AI proposer with a rigorous logic engine, trained on 100M synthetic proofs.',
    simpleOrigin: 'Geometry proofs require drawing new helper lines that do not exist in the initial problem. AlphaGeometry invents creative helper lines, then proves the theorem step-by-step.'
  },
  {
    id: 'bioacoustics',
    title: 'Perch',
    subtitle: 'Wildlife Audio Fingerprinting',
    code: 'PE',
    domain: 'climate',
    coords: { x: 370, y: 400 },
    year: '2023',
    award: 'Global Conservation Deployments',
    superpower: 'Listens to forest soundscapes to identify 10,000 animal species and detect illegal logging.',
    keyStat: '10,000+ Wildlife Species Tracked',
    leadGene: 'Wildlife Audio Fingerprinting',
    summary: 'Acoustic foundation model protecting endangered birds, coral reefs, and rainforest canopies worldwide.',
    toolsUsed: ['Sound Spectrograms', 'Few-Shot Wildlife Classifier', 'Rainforest Canopy Microphones', 'Coral Reef Hydrophones'],
    originStory: 'Ecologists collect millions of hours of jungle audio. DeepMind trained acoustic AI models that isolate rare bird songs from torrential rain, wind, and chainsaw motors.',
    simpleOrigin: 'Detects illegal chainsaws and gunshots in real time, alerting wildlife rangers before poachers or loggers destroy protected wilderness.'
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
    sharedGene: 'Geometric Graph Attention: Proteins → Inorganic Crystals',
    paaQuestion: "How did AlphaFold 3's 3D molecular predictions lead to GNoME discovering 2.2 million new crystal materials?",
    story: 'AlphaFold learned how atoms assemble into 3D biological proteins. GNoME adapted that exact spatial graph intuition to inorganic chemistry—treating crystal unit cells as periodic graphs to predict thermodynamic stability for EV batteries.'
  },
  {
    id: 'af_enformer',
    from: 'alphafold',
    to: 'enformer',
    connectionType: 'biological_code',
    sharedGene: 'Long-Range Attention: 3D Protein Complexes → Non-Coding Switches',
    paaQuestion: "How does AlphaFold 3's 3D protein folding connect to Enformer decoding the 98% non-coding human genome?",
    story: 'While AlphaFold predicts the 3D shapes of proteins, 98% of human DNA does not code for proteins at all. DeepMind scientists applied long-range attention architectures to model how distant non-coding regulatory switches fold in 3D space to trigger or suppress gene expression.'
  },
  {
    id: 'af_ferminet',
    from: 'alphafold',
    to: 'ferminet',
    connectionType: 'first_principles',
    sharedGene: 'Neural Approximation → First-Principles Quantum Chemistry',
    paaQuestion: "How did predicting molecular structures in AlphaFold 3 push scientists toward FermiNet's first-principles quantum chemistry?",
    story: 'AlphaFold predicts molecular geometry using learned statistical patterns. FermiNet takes the next leap: solving the fundamental Schrödinger equation directly for electrons without training data, computing exact chemical bond energies from first principles.'
  },

  // --- From GNoME ---
  {
    id: 'gnome_graphcast',
    from: 'gnome',
    to: 'graphcast',
    connectionType: 'architecture_transfer',
    sharedGene: 'Periodic Graph Networks: Nanoscale Crystals → Planetary Weather',
    paaQuestion: "How did GNoME's crystal lattice graph networks inspire GraphCast's global 10-day weather forecasting?",
    story: 'Both crystals and Earth’s atmosphere cannot be mapped onto flat Euclidean grids without distortion. The graph neural network innovations developed in GNoME for periodic crystal boundaries were scaled up into GraphCast’s icosahedral multi-mesh, wrapping the entire spherical atmosphere.'
  },
  {
    id: 'gnome_fusion',
    from: 'gnome',
    to: 'fusion',
    connectionType: 'materials_extreme',
    sharedGene: 'Thermodynamic Stability → 100M°C Tokamak Divertor Walls',
    paaQuestion: "How can GNoME's newly discovered crystal materials protect Autonomous Fusion's 100,000,000°C plasma walls?",
    story: 'Nuclear fusion chambers require ultra-resilient materials that won’t melt or degrade under intense neutron bombardment. GNoME’s discovery of 736 potential superhard materials provides promising candidates for next-generation tokamak divertor tiles.'
  },
  {
    id: 'gnome_ferminet',
    from: 'gnome',
    to: 'ferminet',
    connectionType: 'first_principles',
    sharedGene: 'Quantum Energy Benchmarks: Convex Hull → Ab-Initio Wavefunctions',
    paaQuestion: "How does GNoME rely on FermiNet's quantum Schrödinger equations to verify whether 2.2 million new crystals will decompose?",
    story: 'GNoME generates millions of theoretical candidate crystal structures. To verify whether a crystal will spontaneously decompose, physicists use quantum ab-initio simulations pioneered by FermiNet to calculate ground-state electronic energies with chemical accuracy.'
  },

  // --- From GraphCast ---
  {
    id: 'graphcast_flood',
    from: 'graphcast',
    to: 'flood_hub',
    connectionType: 'data_cascade',
    sharedGene: 'Atmospheric Dynamics → Hydrological Watershed Runoff',
    paaQuestion: "How do GraphCast's 10-day global weather forecasts feed directly into Flood Hub's life-saving river alerts?",
    story: 'GraphCast predicts extreme atmospheric rivers and torrential rain up to 10 days out. Flood Hub takes these precipitation forecasts and routes them through digital elevation models to alert 700 million people before riverbanks breach.'
  },
  {
    id: 'graphcast_wildfire',
    from: 'graphcast',
    to: 'wildfire',
    connectionType: 'data_cascade',
    sharedGene: 'Atmospheric Wind Vectors → Ground Thermal Fire Lines',
    paaQuestion: "How do GraphCast's 60-second wind and humidity vectors help Fire AI predict which way a wildfire will spread?",
    story: 'GraphCast models surface wind velocity and relative humidity at fine resolution. Fire AI pairs these meteorological vectors with 15-minute satellite thermal perimeters to anticipate fire spread across mountain ridges.'
  },
  {
    id: 'graphcast_bioacoustics',
    from: 'graphcast',
    to: 'bioacoustics',
    connectionType: 'climate_impact',
    sharedGene: 'Planetary Meteorological Shifts → Ecosystem Acoustic Monitoring',
    paaQuestion: "How do GraphCast's planetary drought and heatwave forecasts guide Perch's acoustic monitoring of rainforest wildlife?",
    story: 'As GraphCast tracks shifting drought corridors and heatwaves worldwide, conservationists use Perch’s acoustic canopy arrays to record how bird and animal migration patterns shift in real time in response to changing microclimates.'
  },

  // --- From Flood Hub ---
  {
    id: 'flood_wildfire',
    from: 'flood_hub',
    to: 'wildfire',
    connectionType: 'humanitarian_alert',
    sharedGene: 'Crisis AI Infrastructure: Google Maps & Android Emergency Broadcasting',
    paaQuestion: "How does Flood Hub's emergency alerting infrastructure share real-time Google Maps evacuations with Fire AI?",
    story: 'Both Flood Hub and Fire AI share Google’s humanitarian emergency broadcasting infrastructure—transforming complex satellite telemetry and neural predictions into plain-language push alerts and Google Maps evacuation boundaries.'
  },
  {
    id: 'flood_bioacoustics',
    from: 'flood_hub',
    to: 'bioacoustics',
    connectionType: 'ecology_hydrology',
    sharedGene: 'Hydrological Discharge → Riparian Ecosystem Preservation',
    paaQuestion: "How do Flood Hub's river watershed runoff models guide Perch's acoustic sensors to protect wetland ecosystems?",
    story: 'Flood Hub’s watershed runoff models predict seasonal inundation of critical river basins, helping ecologists deploy Perch acoustic sensors to protect endangered amphibious species and monitor mangrove restoration corridors.'
  },
  {
    id: 'flood_alphageometry',
    from: 'flood_hub',
    to: 'alphageometry',
    connectionType: 'formal_safety',
    sharedGene: 'Mission-Critical Reliability → Formal Verification & Reasoning',
    paaQuestion: "How does Flood Hub use AlphaGeometry's formal mathematical verification to guarantee zero errors during disaster alerts?",
    story: 'When alerting 700 million people to incoming natural disasters, AI models cannot produce false anomalies. The formal mathematical proof and neuro-symbolic verification techniques from AlphaGeometry are adapted into safety-critical pipeline verification.'
  },

  // --- From Fire AI (Wildfire) ---
  {
    id: 'wildfire_flood',
    from: 'wildfire',
    to: 'flood_hub',
    connectionType: 'post_disaster_coupling',
    sharedGene: 'Satellite Burn Scars → Post-Fire Mudslide Forecasting',
    paaQuestion: "How do Fire AI's satellite burn perimeters feed directly into Flood Hub's post-fire mudslide warnings?",
    story: 'When a wildfire incinerates vegetation, hydrophobic soil cannot absorb winter rain. Fire AI’s verified perimeter burn-severity maps feed directly into Flood Hub’s elevation runoff models to predict deadly debris flows months before the first storms hit.'
  },
  {
    id: 'wildfire_bioacoustics',
    from: 'wildfire',
    to: 'bioacoustics',
    connectionType: 'conservation_defense',
    sharedGene: 'Thermal Infrared Surveillance → Acoustic Poaching & Chainsaw Defense',
    paaQuestion: "How does Fire AI's satellite thermal tracking combine with Perch's canopy microphones to catch illegal logging before fires ignite?",
    story: 'Many catastrophic wildfires in tropical reserves begin with illegal agricultural slash-and-burn clearing. Perch acoustic sensors detect chainsaws and motor equipment in real time, alerting rangers before illegal deforestation ignites wildfire lines.'
  },
  {
    id: 'wildfire_graphcast',
    from: 'wildfire',
    to: 'graphcast',
    connectionType: 'meteorological_feedback',
    sharedGene: 'Wildfire Smoke Pyrocumulonimbus → Global Atmospheric Feedback',
    paaQuestion: "How do Fire AI's real-time wildfire smoke perimeters feed back into GraphCast's global weather forecasts?",
    story: 'Megafires generate pyrocumulonimbus thunderstorm clouds that inject millions of tons of smoke aerosol into the stratosphere, altering solar radiation. Coupling Fire AI perimeters back into GraphCast ensures global weather predictions account for active burn emissions.'
  },

  // --- From Autonomous Fusion ---
  {
    id: 'fusion_alphageometry',
    from: 'fusion',
    to: 'alphageometry',
    connectionType: 'search_reasoning',
    sharedGene: 'Infinite State Space Search: Tokamak Plasma → Olympiad Proofs',
    paaQuestion: "How does stabilizing 100,000,000°C plasma in Autonomous Fusion connect with solving Olympiad geometry in AlphaGeometry?",
    story: 'Both problems require navigating an astronomically vast space of choices without human guidance. The deep reinforcement learning search algorithms that modulate 19 tokamak magnetic coils were refined into AlphaGeometry’s neuro-symbolic search for creative auxiliary geometric constructions.'
  },
  {
    id: 'fusion_gnome',
    from: 'fusion',
    to: 'gnome',
    connectionType: 'clean_energy_ecosystem',
    sharedGene: 'Magnetic Plasma Engineering → High-Entropy Alloy Materials',
    paaQuestion: "How does Autonomous Fusion's 100,000,000°C reactor rely on newly discovered crystal alloys from GNoME for its plasma walls?",
    story: 'Containing burning star plasma requires ultra-dense magnetic fields and radiation-resistant materials. The materials discovered by GNoME—including novel tungsten-based alloys and superconductor candidates—form the experimental roadmap for commercial fusion reactor vessels.'
  },
  {
    id: 'fusion_ferminet',
    from: 'fusion',
    to: 'ferminet',
    connectionType: 'quantum_physics',
    sharedGene: 'Turbulent Plasma Transport → Ab-Initio Multi-Electron Simulations',
    paaQuestion: "How does Autonomous Fusion use FermiNet's ab-initio quantum wavefunctions to model turbulent plasma ionization?",
    story: 'At 100,000,000°C, atomic nuclei and electrons detach into turbulent, conductive plasma. FermiNet’s ab-initio quantum wavefunctions help physicists calculate atomic ionization rates and bremsstrahlung radiation loss directly from first principles.'
  },

  // --- From FermiNet ---
  {
    id: 'ferminet_gnome',
    from: 'ferminet',
    to: 'gnome',
    connectionType: 'first_principles',
    sharedGene: 'Fundamental Quantum Energies → Convex Hull Material Filters',
    paaQuestion: "How does FermiNet's solution to the Schrödinger equation verify thermodynamic stability for GNoME's 2.2 million new crystals?",
    story: 'When GNoME invents 2.2 million theoretical crystal structures, physicists must verify whether they will decompose. FermiNet’s first-principles quantum calculations provide the fundamental ground-truth electron energies to validate stable candidates on the convex hull.'
  },
  {
    id: 'ferminet_fusion',
    from: 'ferminet',
    to: 'fusion',
    connectionType: 'clean_energy_physics',
    sharedGene: 'First-Principles Quantum Mechanics → Magnetic Confinement Simulations',
    paaQuestion: "How do FermiNet's first-principles quantum wavefunctions simulate extreme plasma confinement inside Autonomous Fusion's tokamak?",
    story: 'Simulating quantum electron collisions under extreme magnetic fields is essential to understanding fusion plasma stability. FermiNet demonstrates that neural networks can solve multi-particle wavefunctions without empirical approximations.'
  },
  {
    id: 'ferminet_alphafold',
    from: 'ferminet',
    to: 'alphafold',
    connectionType: 'molecular_precision',
    sharedGene: 'Quantum Chemistry Precision → Sub-Angstrom Biomolecular Docking',
    paaQuestion: "How does FermiNet's electron-level quantum chemistry compute exact atomic bond energies to refine AlphaFold 3's drug structures?",
    story: 'While AlphaFold predicts protein and ligand coordinate geometry, calculating exact quantum transition states for drug efficacy requires electron-level physics. FermiNet provides the sub-angstrom energy landscapes that take biomolecular modeling to chemical precision.'
  },

  // --- From Enformer ---
  {
    id: 'enformer_alphafold',
    from: 'enformer',
    to: 'alphafold',
    connectionType: 'biological_code',
    sharedGene: 'Long-Range Attention: Non-Coding Switches → 3D Molecular Complexes',
    paaQuestion: "How did Enformer's attention across 200,000 non-coding DNA letters share transformer architecture with AlphaFold 3's 3D molecular structures?",
    story: 'DNA loops in 3D: a genetic switch 100,000 base pairs away physically touches a gene promoter. Enformer’s 200,000-base-pair attention window demonstrated that biological sequences must be processed with long-range structural attention, directly mirroring AlphaFold 3’s biomolecular interactions.'
  },
  {
    id: 'enformer_perch',
    from: 'enformer',
    to: 'bioacoustics',
    connectionType: 'representation_learning',
    sharedGene: 'High-Dimensional Biological Embeddings: DNA Bases → Rainforest Soundscapes',
    paaQuestion: "How does Enformer's attention across the human genome translate into Perch's acoustic model listening to 10,000 animal species?",
    story: 'Both DNA sequences and rainforest audio spectrograms are continuous, noisy biological signals where rare signals (disease mutations or endangered bird calls) are buried in petabytes of background noise. DeepMind used self-supervised foundation representations across both.'
  },
  {
    id: 'enformer_alphageometry',
    from: 'enformer',
    to: 'alphageometry',
    connectionType: 'symbolic_biology',
    sharedGene: 'Biological Syntactic Grammars → Formal Axiomatic Deductions',
    paaQuestion: "How can Enformer's complex genetic regulatory circuits be verified using AlphaGeometry's formal deductive logic?",
    story: 'Genetic regulatory networks operate like complex logical circuits with AND/OR transcription switches. Research from AlphaGeometry into combining neural intuition with formal deductive logic is being applied to verify synthetic biology gene circuits.'
  },

  // --- From AlphaGeometry ---
  {
    id: 'alphageometry_ferminet',
    from: 'alphageometry',
    to: 'ferminet',
    connectionType: 'mathematical_foundations',
    sharedGene: 'Formal Theorem Proving → Quantum Wavefunction Antisymmetry Constraints',
    paaQuestion: "How does AlphaGeometry's formal theorem proving verify that neural wavefunctions in FermiNet strictly obey quantum symmetry?",
    story: 'Ensuring that neural networks strictly obey mathematical symmetries (such as fermionic antisymmetry in quantum physics) requires formal verification. AlphaGeometry’s neuro-symbolic techniques help formally prove physical invariant bounds.'
  },
  {
    id: 'alphageometry_fusion',
    from: 'alphageometry',
    to: 'fusion',
    connectionType: 'provable_safety',
    sharedGene: 'Neuro-Symbolic Deductions → Provably Stable Plasma Controllers',
    paaQuestion: "How can AlphaGeometry's neuro-symbolic logic mathematically guarantee that Autonomous Fusion's plasma controllers never breach reactor walls?",
    story: 'Pure neural controllers can be unpredictable under rare edge conditions. By integrating AlphaGeometry’s symbolic deduction with deep reinforcement learning, engineers create hybrid controllers that are formally guaranteed never to drive plasma into reactor walls.'
  },
  {
    id: 'alphageometry_alphafold',
    from: 'alphageometry',
    to: 'alphafold',
    connectionType: 'geometric_intuition',
    sharedGene: 'Synthetic Diagram Constructions → Biomolecular Coordinate Manifolds',
    paaQuestion: "How can AlphaGeometry's synthetic proof engine prove strict physical boundary laws on AlphaFold 3's protein docking pockets?",
    story: 'AlphaGeometry synthesizes 100 million geometric proofs without human demonstration. Researchers are adapting these synthetic axiomatic engines to verify that predicted protein-ligand docking pockets satisfy strict steric and thermodynamic boundary laws.'
  },

  // --- From Perch (Bioacoustics) ---
  {
    id: 'bioacoustics_wildfire',
    from: 'bioacoustics',
    to: 'wildfire',
    connectionType: 'early_detection',
    sharedGene: 'Acoustic Canopy Listening → Satellite Thermal Fire Mapping',
    paaQuestion: "How do Perch's canopy microphones detect illegal logging before fires ignite, collaborating with Fire AI's satellite thermal tracking?",
    story: 'Before a wildfire is large enough to be spotted by geostationary weather satellites, canopy microphones detect the distinct acoustic crackle of ignition and unauthorized human vehicles in remote conservation reserves, giving frontline crews an immediate head start.'
  },
  {
    id: 'bioacoustics_flood',
    from: 'bioacoustics',
    to: 'flood_hub',
    connectionType: 'riparian_preservation',
    sharedGene: 'Soundscape Bio-Indicators → Mangrove Wetland Flood Barriers',
    paaQuestion: "How do Perch's bioacoustic soundscapes guide river wetland restoration to strengthen Flood Hub's natural flood barriers?",
    story: 'Healthy mangrove wetlands reduce storm surge and river flood severity by up to 50%. Ecologists use Perch to track snapping shrimp and bird vocalizations, using bioacoustic health metrics to guide where to restore natural riverine wetlands.'
  },
  {
    id: 'bioacoustics_enformer',
    from: 'bioacoustics',
    to: 'enformer',
    connectionType: 'biodiversity_genomics',
    sharedGene: 'Acoustic Species Identification → Environmental DNA (eDNA) Sequencing',
    paaQuestion: "How does Perch's audio species identification pair with Enformer's genomic sequence analysis of environmental DNA?",
    story: 'By combining Perch’s audio identification of wild species with Enformer’s genomic sequence analysis from water and soil eDNA samples, scientists can map entire biodiversity ecosystems without capturing or disturbing animals.'
  }
];

// Starting questions for the opening screen ("Where do you want to explore first?")
export const STARTING_QUESTIONS = [
  {
    id: 'alphafold',
    nodeId: 'alphafold',
    question: 'How does AI predict the 3D shape of every molecule of life?'
  },
  {
    id: 'gnome',
    nodeId: 'gnome',
    question: 'How did AI discover 2.2 million new materials for clean energy?'
  },
  {
    id: 'graphcast',
    nodeId: 'graphcast',
    question: 'How does AI forecast global weather 10 days out in under 60 seconds?'
  },
  {
    id: 'flood_hub',
    nodeId: 'flood_hub',
    question: 'How can AI alert 700 million people before rivers flood?'
  },
  {
    id: 'fusion',
    nodeId: 'fusion',
    question: 'How do you bottle a 100,000,000°C star on Earth using AI?'
  },
  {
    id: 'alphageometry',
    nodeId: 'alphageometry',
    question: 'Can AI solve International Mathematical Olympiad geometry without humans?'
  },
  {
    id: 'bioacoustics',
    nodeId: 'bioacoustics',
    question: 'How can AI listen to rainforest soundscapes to stop illegal logging?'
  },
  {
    id: 'enformer',
    nodeId: 'enformer',
    question: 'What is hiding in the 98% of human DNA that controls disease switches?'
  },
  {
    id: 'ferminet',
    nodeId: 'ferminet',
    question: 'Can neural networks simulate electrons directly from fundamental quantum physics?'
  },
  {
    id: 'wildfire',
    nodeId: 'wildfire',
    question: 'How do satellites map active wildfire boundaries through blinding smoke?'
  }
];


// Helper function to find or synthesize a connection explanation between ANY two breakthroughs
export function getLineageConnection(fromId, toId) {
  if (!fromId || !toId || fromId === toId) return null;

  // 1. Direct connection (from -> to)
  const direct = LINEAGE_CONNECTIONS.find((c) => c.from === fromId && c.to === toId);
  if (direct) return direct;

  // 2. Reverse connection (to -> from)
  const reverse = LINEAGE_CONNECTIONS.find((c) => c.from === toId && c.to === fromId);
  if (reverse) {
    const fromNode = LINEAGE_NODES.find((n) => n.id === fromId);
    const toNode = LINEAGE_NODES.find((n) => n.id === toId);
    return {
      id: `${fromId}_${toId}`,
      from: fromId,
      to: toId,
      sharedGene: reverse.sharedGene,
      paaQuestion: "`How does ${fromNode?.title || fromId} connect with ${toNode?.title || toId}?`",
      story: reverse.story
    };
  }

  // 3. Synthesized bridge between any other pair of breakthroughs in the constellation
  const fromNode = LINEAGE_NODES.find((n) => n.id === fromId);
  const toNode = LINEAGE_NODES.find((n) => n.id === toId);
  if (!fromNode || !toNode) return null;

  return {
    id: `${fromId}_${toId}`,
    from: fromId,
    to: toId,
    sharedGene: `${fromNode.leadGene} → ${toNode.leadGene}`,
    paaQuestion: "`How does ${fromNode.title} connect to ${toNode.title}?`",
    story: `Both breakthroughs belong to Google's shared foundation in deep learning. While ${fromNode.title} focuses on ${fromNode.subtitle.toLowerCase()} (${fromNode.summary}), its core architectural principles—such as high-dimensional representation learning and spatial attention—directly informed the computational methods in ${toNode.title} for ${toNode.subtitle.toLowerCase()}.`
  };
}

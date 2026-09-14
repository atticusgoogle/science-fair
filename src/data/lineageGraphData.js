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
    icon: '🧬',
    domain: 'biomolecular',
    coords: { x: 190, y: 150 },
    year: '2024',
    award: 'Nobel Prize in Chemistry 2024',
    superpower: 'Predicts the 3D atomic structure of every molecule of life in seconds.',
    keyStat: '200M+ Structures Open-Sourced',
    leadGene: 'Evoformer & Cartesian Diffusion',
    summary: 'Predicts 3D shapes of proteins, DNA, RNA, and drug molecules with atomic precision.',
    toolsUsed: ['3D Cartesian Diffusion', 'Evoformer Attention', 'EMBL-EBI Protein Database', 'Google TPU v4 Pods'],
    originStory: 'How do flat chains of amino acids twist into life-saving proteins? DeepMind treated biological molecules as geometric graphs where physical distance acts as spatial attention.',
    simpleOrigin: 'Proteins are the microscopic machinery of life. Instead of 5-year wet-lab experiments, AlphaFold learns the 3D geometry of atomic bonds directly.'
  },
  {
    id: 'enformer',
    title: 'Enformer',
    subtitle: 'Non-Coding Genome Attention',
    icon: '🔬',
    domain: 'biomolecular',
    coords: { x: 310, y: 240 },
    year: '2021',
    award: 'Nature Methods Paper',
    superpower: 'Decodes the 98% of human DNA that controls disease switches.',
    keyStat: '200,000 Base Pair Context',
    leadGene: 'Long-Range Sequence Transformer',
    summary: 'Reads 200,000 letters of non-coding DNA to predict epigenetic master switches.',
    toolsUsed: ['Long-Range Self-Attention', 'Convolutional Receptive Fields', 'ENCODE Epigenomics', 'Cross-Species Transfer'],
    originStory: 'While AlphaFold cracked the 2% of DNA that makes proteins, Enformer reads the other 98%—the "dark matter" of the genome containing the master switches of disease.',
    simpleOrigin: 'DNA loops in 3D: a mutation 100,000 letters away can trigger cancer. Enformer uses language transformers to see across long genetic distances.'
  },
  {
    id: 'gnome',
    title: 'GNoME',
    subtitle: 'Crystal Materials Discovery',
    icon: '💎',
    domain: 'materials',
    coords: { x: 550, y: 140 },
    year: '2023',
    award: 'Nature Cover Story',
    superpower: 'Discovered 2.2 million new crystal materials, expanding human knowledge 10x.',
    keyStat: '800 Years of Discovery in Months',
    leadGene: 'Periodic Graph Neural Networks',
    summary: 'Invented blueprints for next-generation solid-state batteries, solar cells, and superconductors.',
    toolsUsed: ['Active Learning GNNs', 'Quantum DFT Verification', 'Autonomous A-Lab Robotics', 'Convex Hull Optimization'],
    originStory: 'If graph neural networks can predict how atoms connect in proteins, can they discover brand new inorganic crystals? GNoME turned materials science into rapid algorithmic search.',
    simpleOrigin: 'Humanity had only found 28,000 stable materials in history. GNoME discovered 2.2 million more, providing the blueprints for greener technologies.'
  },
  {
    id: 'fusion',
    title: 'Autonomous Fusion',
    subtitle: 'Magnetic Tokamak Control',
    icon: '⚡',
    domain: 'materials',
    coords: { x: 710, y: 220 },
    year: '2022',
    award: 'Nature Publication',
    superpower: 'Holds 100,000,000°C plasma in a magnetic bottle at 10,000 adjustments per second.',
    keyStat: '100M°C Core Stabilized',
    leadGene: 'Non-Linear Deep Reinforcement Learning',
    summary: 'Deep reinforcement learning coordinates 19 magnetic coils to bottle burning star plasma.',
    toolsUsed: ['Actor-Critic Deep RL', 'TCV Hardware Tokamak', '10kHz Controller Loop', 'EPFL Plasma Simulators'],
    originStory: 'Tokamak plasma is hotter than the core of the sun and wildly turbulent. DeepMind used the reinforcement learning that conquered Go to coordinate 19 magnets in real time.',
    simpleOrigin: 'Nuclear fusion produces clean, limitless electricity using ordinary seawater as fuel, with zero long-lived radioactive waste.'
  },
  {
    id: 'graphcast',
    title: 'GraphCast',
    subtitle: 'Global Weather Forecasting',
    icon: '🌪️',
    domain: 'climate',
    coords: { x: 170, y: 440 },
    year: '2023',
    award: 'Science Cover Paper',
    superpower: 'Forecasts 10-day global weather in under 60 seconds on a single TPU.',
    keyStat: 'Beats Supercomputers on 90% of Metrics',
    leadGene: 'Icosahedral Multi-Mesh GNN',
    summary: 'Predicts extreme storms, hurricanes, and heatwaves days earlier using 1,000x less energy.',
    toolsUsed: ['Icosahedral Spherical Mesh', '40-Year ECMWF Climate Data', 'Autoregressive Rollouts', 'Google TPU v4 Pods'],
    originStory: 'Traditional physics supercomputers take hours on large clusters to compute 10-day forecasts. GraphCast wrapped Earth in an icosahedral graph and learned physics directly from 40 years of climate data.',
    simpleOrigin: 'Spotted Hurricane Lee’s exact Canadian landfall 9 days ahead—giving emergency crews critical extra days to prepare flood defenses.'
  },
  {
    id: 'flood_hub',
    title: 'Flood Hub',
    subtitle: 'Humanitarian Early Warning',
    icon: '🌊',
    domain: 'climate',
    coords: { x: 330, y: 530 },
    year: '2024',
    award: 'UN & Red Cross Deployment',
    superpower: 'Alerts 700 million people across 80 countries up to 7 days before rivers breach.',
    keyStat: '700M+ People Protected',
    leadGene: 'Hydrological Watershed LSTMs',
    summary: 'Predicts riverine flood crests in ungauged river basins using satellite elevation and radar.',
    toolsUsed: ['Recurrent Hydrologic Networks', 'Satellite Precipitation Radar', 'Digital Elevation Models', 'Google Maps Emergency Alerts'],
    originStory: 'Most vulnerable river basins in the developing world have zero physical water gauges. DeepMind trained AI on global satellite rainfall and elevation to generalize to rivers it had never measured.',
    simpleOrigin: 'A 24-hour flood warning cuts damage and casualties by up to 50%. Free alerts are sent directly to phones via Google Search and Maps.'
  },
  {
    id: 'wildfire',
    title: 'Fire AI',
    subtitle: 'Satellite Thermal Perimeter Tracking',
    icon: '🔥',
    domain: 'climate',
    coords: { x: 190, y: 620 },
    year: '2024',
    award: 'USFS & CAL FIRE Partner',
    superpower: 'Maps active wildfire boundaries every 15 minutes through blinding smoke plumes.',
    keyStat: '15-Minute Live Perimeters',
    leadGene: 'Multi-Spectral Thermal Deep Nets',
    summary: 'Processes satellite thermal infrared streams to extract verified fire fronts in near real time.',
    toolsUsed: ['NOAA GOES Satellite Infrared', 'Glint False-Positive Filters', 'Convolutional Spatial Segmenters', 'CAL FIRE Live Integration'],
    originStory: 'Dense smoke blinds optical cameras. Google teams built deep learning filters that process geostationary satellite thermal infrared streams, separating genuine fire lines from rock glint and factories.',
    simpleOrigin: 'Displayed live on Google Maps so evacuating families know which roads are safe and firefighters can deploy crews with pinpoint precision.'
  },
  {
    id: 'ferminet',
    title: 'FermiNet',
    subtitle: 'First-Principles Quantum Physics',
    icon: '⚛️',
    domain: 'reasoning',
    coords: { x: 550, y: 440 },
    year: '2020',
    award: 'Physical Review Research',
    superpower: 'Solves the fundamental quantum Schrödinger equation from scratch with zero data.',
    keyStat: 'Chemical Accuracy (<1 kcal/mol)',
    leadGene: 'Antisymmetric Neural Wavefunctions',
    summary: 'Simulates electrons directly from fundamental physics to design green catalysts and carbon capture.',
    toolsUsed: ['Slater-Determinant Tensors', 'Variational Quantum Monte Carlo', 'Strict Fermionic Antisymmetry', 'Chemical Accuracy Benchmark'],
    originStory: 'Paul Dirac stated in 1929 that fundamental chemical equations were too complex to solve. FermiNet built neural networks that strictly respect quantum antisymmetry, solving equations without human data.',
    simpleOrigin: 'If we can simulate chemistry from fundamental physics rather than lab experiments, we can invent carbon capture materials that clean our air.'
  },
  {
    id: 'alphageometry',
    title: 'AlphaGeometry',
    subtitle: 'Olympiad Mathematical Proof',
    icon: '📐',
    domain: 'reasoning',
    coords: { x: 720, y: 530 },
    year: '2024',
    award: 'IMO Silver Medal Benchmark',
    superpower: 'Solves International Mathematical Olympiad geometry problems at silver-medal level.',
    keyStat: 'Solved 25 of 30 Olympiad Problems',
    leadGene: 'Neuro-Symbolic Deductive Co-Pilot',
    summary: 'Marries neural intuition with formal mathematical deduction to invent verified proofs.',
    toolsUsed: ['100M Synthetic Proof Engine', 'Formal Axiomatic Reasoner', 'Transformer Construction Proposer', 'Lean Mathematical Language'],
    originStory: 'Language models often hallucinate math, while symbolic calculators cannot think creatively. AlphaGeometry pairs a neural proposer with a rigorous symbolic engine, trained on 100M synthetic proofs.',
    simpleOrigin: 'Geometry proofs require drawing new lines that do not exist in the initial problem. AlphaGeometry invents creative auxiliary lines, then proves the theorem step-by-step.'
  },
  {
    id: 'bioacoustics',
    title: 'Perch',
    subtitle: 'Global Bioacoustics Foundation Model',
    icon: '🦜',
    domain: 'climate',
    coords: { x: 370, y: 400 },
    year: '2023',
    award: 'Global Conservation Deployments',
    superpower: 'Listens to forest soundscapes to identify 10,000 animal species and detect illegal logging.',
    keyStat: '10,000+ Wildlife Species Tracked',
    leadGene: 'Self-Supervised Spectrogram Embeddings',
    summary: 'Acoustic foundation model protecting endangered birds, coral reefs, and canopy reserves worldwide.',
    toolsUsed: ['Frequency Spectrogram Embeddings', 'Few-Shot Animal Classifier', 'Canopy Acoustic Edge Sensors', 'Hydrophone Coral Arrays'],
    originStory: 'Ecologists collect millions of hours of jungle audio. DeepMind trained self-supervised acoustic transformers that isolate rare bird songs from torrential rain, wind, and chainsaw motors.',
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

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
    story: "AlphaFold learned how nature snaps atoms together into 3D biological proteins—the microscopic engines of life. DeepMind researchers realized that an inorganic crystal (like the battery materials needed for electric vehicles or solar panels) is also just an arrangement of atoms in 3D space. By taking the spatial reasoning AI developed for proteins and applying it to inorganic chemistry, GNoME was able to test billions of crystal combinations on a computer, uncovering 2.2 million stable new materials in months rather than centuries of slow lab experiments."
  },
  {
    id: 'af_enformer',
    from: 'alphafold',
    to: 'enformer',
    connectionType: 'biological_code',
    sharedGene: 'Long-Range Attention: 3D Protein Complexes → Non-Coding Switches',
    paaQuestion: "How does AlphaFold 3's 3D protein folding connect to Enformer decoding the 98% non-coding human genome?",
    story: "While AlphaFold predicts the physical 3D shapes of proteins, over 98% of human DNA doesn't actually code for proteins at all. Scientists used to call this mysterious region 'dark matter DNA.' We now know it acts like a giant control panel of genetic switches that turn genes on and off. Because DNA loops in 3D space, a switch located very far away can bend over and trigger a disease gene. Enformer adapted the long-range attention neural networks from AlphaFold to read 200,000 letters of genetic code at once, figuring out which distant switches control human health and illness."
  },
  {
    id: 'af_ferminet',
    from: 'alphafold',
    to: 'ferminet',
    connectionType: 'first_principles',
    sharedGene: 'Neural Approximation → First-Principles Quantum Chemistry',
    paaQuestion: "How did predicting molecular structures in AlphaFold 3 push scientists toward FermiNet's first-principles quantum chemistry?",
    story: "AlphaFold predicts where atoms sit in 3D space by recognizing patterns from thousands of past experiments. But to design breakthrough medicines or understand why chemical bonds form at the deepest level, scientists must calculate how individual electrons move according to the laws of quantum physics. FermiNet takes this next leap: instead of learning from past examples, it uses neural networks to solve Schrödinger's fundamental quantum wave equations directly from scratch, calculating molecular energies with pure physics accuracy."
  },
  {
    id: 'af_alphageometry',
    from: 'alphafold',
    to: 'alphageometry',
    connectionType: 'geometric_intuition',
    sharedGene: 'Biomolecular Manifolds → Neuro-Symbolic Mathematical Proofs',
    paaQuestion: "How does AlphaFold 3's 3D molecular geometry connect to AlphaGeometry solving Olympiad math?",
    story: "Both AlphaFold 3 and AlphaGeometry tackle challenges where spatial geometry meets deep logical reasoning. AlphaFold maps how intricate proteins, DNA, and drug molecules dock together in 3D physical space, while AlphaGeometry invents new geometric constructions to solve International Mathematical Olympiad problems without human demonstration. DeepMind researchers adapted the geometric attention networks from AlphaFold to help AlphaGeometry visualize auxiliary lines, circles, and angles when searching for complex mathematical proofs."
  },

  // --- From GNoME ---
  {
    id: 'gnome_graphcast',
    from: 'gnome',
    to: 'graphcast',
    connectionType: 'architecture_transfer',
    sharedGene: 'Periodic Graph Networks: Nanoscale Crystals → Planetary Weather',
    paaQuestion: "How did GNoME's crystal lattice graph networks inspire GraphCast's global 10-day weather forecasting?",
    story: "Both crystal materials and Earth's atmosphere share an unexpected mathematical challenge: you cannot draw them on a flat map without stretching and distorting reality, because crystals repeat endlessly in 3D space and Earth is a round, spinning sphere. The geometric graph neural networks developed in GNoME to track atoms inside repeating 3D crystal grids directly inspired the spherical multi-mesh architecture behind GraphCast. GraphCast wraps the entire globe in an interconnected 3D mesh to simulate atmospheric physics and forecast worldwide weather 10 days ahead in under a minute."
  },
  {
    id: 'gnome_fusion',
    from: 'gnome',
    to: 'fusion',
    connectionType: 'materials_extreme',
    sharedGene: 'Thermodynamic Stability → 100M°C Tokamak Divertor Walls',
    paaQuestion: "How can GNoME's newly discovered crystal materials protect Autonomous Fusion's 100,000,000°C plasma walls?",
    story: "Nuclear fusion aims to harness the clean energy of the stars here on Earth by trapping 100,000,000°C plasma inside a magnetic chamber called a tokamak. But finding materials that can survive inches away from temperatures ten times hotter than the core of the Sun without melting has been one of science's greatest bottlenecks. GNoME's AI discovered over 700 brand-new superhard, heat-resistant crystal materials that are now being tested to build the ultra-durable inner tiles and superconducting magnets needed for commercial fusion power."
  },
  {
    id: 'gnome_ferminet',
    from: 'gnome',
    to: 'ferminet',
    connectionType: 'first_principles',
    sharedGene: 'Quantum Energy Benchmarks: Convex Hull → Ab-Initio Wavefunctions',
    paaQuestion: "How does GNoME rely on FermiNet's quantum Schrödinger equations to verify whether 2.2 million new crystals will decompose?",
    story: "When GNoME invents millions of brand-new crystal recipes on a computer, scientists face a vital question: would this crystal actually hold together in the real world, or would it crumble and decompose into rust or powder? To be certain before spending time synthesizing them, researchers need to measure the quantum bond strengths holding every electron in place. FermiNet's ability to solve fundamental quantum equations from first principles provides the ultimate verification test to prove whether a computer-designed crystal will stay stable."
  },

  // --- From GraphCast ---
  {
    id: 'graphcast_flood',
    from: 'graphcast',
    to: 'flood_hub',
    connectionType: 'data_cascade',
    sharedGene: 'Atmospheric Dynamics → Hydrological Watershed Runoff',
    paaQuestion: "How do GraphCast's 10-day global weather forecasts feed directly into Flood Hub's life-saving river alerts?",
    story: "GraphCast predicts major atmospheric rainstorms and tropical cyclones up to 10 days before they make landfall. But a rainfall forecast alone doesn't tell a rural family whether their local river is going to burst its banks. Flood Hub takes GraphCast's fine-grained precipitation predictions and routes them through digital elevation maps and river basin physics, delivering life-saving flood warnings to over 700 million people across 80 countries days before floodwaters rise."
  },
  {
    id: 'graphcast_wildfire',
    from: 'graphcast',
    to: 'wildfire',
    connectionType: 'data_cascade',
    sharedGene: 'Atmospheric Wind Vectors → Ground Thermal Fire Lines',
    paaQuestion: "How do GraphCast's 60-second wind and humidity vectors help Fire AI predict which way a wildfire will spread?",
    story: "Wildfires don't just follow the dry ground—they are driven forward by shifting winds and dry air. GraphCast models how planetary air currents flow and evolve at global resolution every few minutes. Fire AI pairs these wind velocity and humidity predictions directly with 15-minute satellite heat scans, helping firefighters anticipate exactly which canyons and neighborhoods a wildfire will threaten next."
  },
  {
    id: 'graphcast_bioacoustics',
    from: 'graphcast',
    to: 'bioacoustics',
    connectionType: 'climate_impact',
    sharedGene: 'Planetary Meteorological Shifts → Ecosystem Acoustic Monitoring',
    paaQuestion: "How do GraphCast's planetary drought and heatwave forecasts guide Perch's acoustic monitoring of rainforest wildlife?",
    story: "As climate change accelerates heatwaves and drying trends across the planet, wildlife species are forced to migrate to survive. GraphCast tracks long-term drought corridors and shifting rainfall patterns worldwide. Ecologists use these planetary climate forecasts to deploy Perch acoustic listening arrays in the forests most threatened by extreme weather, listening to how bird, primate, and frog populations relocate or decline in real time."
  },

  // --- From Flood Hub ---
  {
    id: 'flood_wildfire',
    from: 'flood_hub',
    to: 'wildfire',
    connectionType: 'humanitarian_alert',
    sharedGene: 'Crisis AI Infrastructure: Google Maps & Android Emergency Broadcasting',
    paaQuestion: "How does Flood Hub's emergency alerting infrastructure share real-time Google Maps evacuations with Fire AI?",
    story: "Both floods and wildfires require instant, clear alerts when lives are on the line. Flood Hub and Fire AI share Google's emergency broadcasting system, which turns complex satellite data and AI forecasts into clear evacuation boundaries on Google Maps and urgent alerts on Android phones. By sharing this humanitarian pipeline, both tools ensure people receive clear, reliable safety instructions without confusing technical jargon."
  },
  {
    id: 'flood_bioacoustics',
    from: 'flood_hub',
    to: 'bioacoustics',
    connectionType: 'ecology_hydrology',
    sharedGene: 'Hydrological Discharge → Riparian Ecosystem Preservation',
    paaQuestion: "How do Flood Hub's river watershed runoff models guide Perch's acoustic sensors to protect wetland ecosystems?",
    story: "Natural wetlands and coastal mangroves act like giant sponges that absorb floodwaters and shield human towns from dangerous storm surges. Flood Hub's models map how water flows across river basins, identifying which wetlands are under the greatest stress. Conservationists then place Perch's acoustic sensors in those exact areas to listen to bird and amphibious calls, measuring how healthy the natural ecosystem is and guiding where to restore natural flood barriers."
  },
  {
    id: 'flood_alphageometry',
    from: 'flood_hub',
    to: 'alphageometry',
    connectionType: 'formal_safety',
    sharedGene: 'Mission-Critical Reliability → Formal Verification & Reasoning',
    paaQuestion: "How does Flood Hub use AlphaGeometry's formal mathematical verification to guarantee zero errors during disaster alerts?",
    story: "When an AI system is responsible for warning 700 million people to evacuate before a disaster, false alarms or missed warnings can be catastrophic. Unlike everyday chatbots that might occasionally make mistakes, emergency systems require absolute mathematical certainty. The neuro-symbolic reasoning methods developed for AlphaGeometry—which proves complex geometry theorems step by step with zero guesswork—are being adapted into Flood Hub's safety pipeline to mathematically verify every alert before it goes live."
  },

  // --- From Fire AI (Wildfire) ---
  {
    id: 'wildfire_flood',
    from: 'wildfire',
    to: 'flood_hub',
    connectionType: 'post_disaster_coupling',
    sharedGene: 'Satellite Burn Scars → Post-Fire Mudslide Forecasting',
    paaQuestion: "How do Fire AI's satellite burn perimeters feed directly into Flood Hub's post-fire mudslide warnings?",
    story: "When a severe wildfire roars through a mountain forest, it incinerates the vegetation and leaves the soil charred into a water-repellent crust. Months later, when winter rains arrive, the unanchored soil cannot absorb water, triggering deadly mudslides and flash floods. Fire AI's satellite maps of burned areas are handed directly to Flood Hub's hydrology engine, allowing local authorities to prepare for flash floods and mudslides long before the rainy season begins."
  },
  {
    id: 'wildfire_bioacoustics',
    from: 'wildfire',
    to: 'bioacoustics',
    connectionType: 'conservation_defense',
    sharedGene: 'Thermal Infrared Surveillance → Acoustic Poaching & Chainsaw Defense',
    paaQuestion: "How does Fire AI's satellite thermal tracking combine with Perch's canopy microphones to catch illegal logging before fires ignite?",
    story: "Many destructive forest fires in tropical reserves do not start naturally—they begin with illegal logging roads and slash-and-burn clearing. By mounting Perch's solar-powered audio sensors high in the forest canopy, park rangers can automatically detect the sounds of chainsaws and vehicles miles away. This allows rangers to stop illegal land clearing before agricultural fires can ever be lit, preventing devastating wildfires before they start."
  },
  {
    id: 'wildfire_graphcast',
    from: 'wildfire',
    to: 'graphcast',
    connectionType: 'meteorological_feedback',
    sharedGene: 'Wildfire Smoke Pyrocumulonimbus → Global Atmospheric Feedback',
    paaQuestion: "How do Fire AI's real-time wildfire smoke perimeters feed back into GraphCast's global weather forecasts?",
    story: "Huge wildfires actually create their own weather systems. Intense heat pumps giant smoke clouds high into the stratosphere, blocking sunlight and changing regional wind patterns. By feeding Fire AI's real-time fire maps and smoke volumes back into GraphCast, the global weather model can account for the cooling effect of smoke plumes and predict weather changes caused by active fires."
  },

  // --- From Autonomous Fusion ---
  {
    id: 'fusion_alphageometry',
    from: 'fusion',
    to: 'alphageometry',
    connectionType: 'search_reasoning',
    sharedGene: 'Infinite State Space Search: Tokamak Plasma → Olympiad Proofs',
    paaQuestion: "How does stabilizing 100,000,000°C plasma in Autonomous Fusion connect with solving Olympiad geometry in AlphaGeometry?",
    story: "Both challenges require exploring an astronomically huge maze of possibilities without human help. Inside a fusion reactor, magnetic coils must make thousands of rapid adjustments per second to prevent turbulent plasma from touching the walls. In Olympiad math, an AI must search through millions of geometric shapes and lines to find an elusive proof. The reinforcement learning algorithms that learned to steer unstable fusion plasma laid the groundwork for the neuro-symbolic search engine in AlphaGeometry."
  },
  {
    id: 'fusion_gnome',
    from: 'fusion',
    to: 'gnome',
    connectionType: 'clean_energy_ecosystem',
    sharedGene: 'Magnetic Plasma Engineering → High-Entropy Alloy Materials',
    paaQuestion: "How does Autonomous Fusion's 100,000,000°C reactor rely on newly discovered crystal alloys from GNoME for its plasma walls?",
    story: "Holding an artificial star inside a reactor requires materials that do not exist in nature. The inner walls of a fusion vessel are constantly bombarded by extreme heat and high-energy particles. Traditional trial-and-error metallurgy takes decades to test a single new alloy. Autonomous Fusion relies on GNoME's discovery of 2.2 million new crystal structures to find specialized tungsten alloys and heat-resistant materials capable of enduring continuous fusion power."
  },
  {
    id: 'fusion_ferminet',
    from: 'fusion',
    to: 'ferminet',
    connectionType: 'quantum_physics',
    sharedGene: 'Turbulent Plasma Transport → Ab-Initio Multi-Electron Simulations',
    paaQuestion: "How does Autonomous Fusion use FermiNet's ab-initio quantum wavefunctions to model turbulent plasma ionization?",
    story: "At 100,000,000°C, atoms tear apart into free electrons and atomic nuclei—a turbulent, glowing soup of matter called plasma. To keep the plasma hot enough for fusion, scientists need to know exactly how much heat escapes when electrons collide. Autonomous Fusion uses FermiNet's quantum calculations to simulate electron behavior directly from fundamental physics, helping engineers design reactors that trap heat far more efficiently."
  },

  // --- From FermiNet ---
  {
    id: 'ferminet_gnome',
    from: 'ferminet',
    to: 'gnome',
    connectionType: 'first_principles',
    sharedGene: 'Fundamental Quantum Energies → Convex Hull Material Filters',
    paaQuestion: "How does FermiNet's solution to the Schrödinger equation verify thermodynamic stability for GNoME's 2.2 million new crystals?",
    story: "GNoME uses fast AI to suggest millions of exciting new materials for solar panels and batteries. But before scientists spend months attempting to make a crystal in an expensive robotics lab, they need proof that its atomic bonds will stay glued together. FermiNet computes the exact quantum behavior of electrons from first principles, providing the foundational physics benchmarks that verify whether GNoME's AI-generated crystals are truly stable."
  },
  {
    id: 'ferminet_fusion',
    from: 'ferminet',
    to: 'fusion',
    connectionType: 'clean_energy_physics',
    sharedGene: 'First-Principles Quantum Mechanics → Magnetic Confinement Simulations',
    paaQuestion: "How do FermiNet's first-principles quantum wavefunctions simulate extreme plasma confinement inside Autonomous Fusion's tokamak?",
    story: "Controlling a fusion reaction requires knowing exactly how much energy will escape when electrons collide under intense magnetic fields. Standard physics approximations often break down under such extreme conditions. FermiNet proves that neural networks can solve multi-particle quantum mechanics directly, giving fusion engineers unprecedented accuracy in predicting energy loss and keeping the plasma stable."
  },
  {
    id: 'ferminet_alphafold',
    from: 'ferminet',
    to: 'alphafold',
    connectionType: 'molecular_precision',
    sharedGene: 'Quantum Chemistry Precision → Sub-Angstrom Biomolecular Docking',
    paaQuestion: "How does FermiNet's electron-level quantum chemistry compute exact atomic bond energies to refine AlphaFold 3's drug structures?",
    story: "AlphaFold 3 predicts the 3D shapes of proteins and potential medicine molecules with stunning precision. However, when designing a life-saving drug, chemists also need to know the exact electronic forces at play—how electrons shift as a drug molecule locks onto a disease target. FermiNet's electron-level simulation takes AlphaFold's 3D shapes and computes the exact quantum bond strengths, taking drug discovery down to pure atomic physics."
  },

  // --- From Enformer ---
  {
    id: 'enformer_alphafold',
    from: 'enformer',
    to: 'alphafold',
    connectionType: 'biological_code',
    sharedGene: 'Long-Range Attention: Non-Coding Switches → 3D Molecular Complexes',
    paaQuestion: "How did Enformer's attention across 200,000 non-coding DNA letters share transformer architecture with AlphaFold 3's 3D molecular structures?",
    story: "Human DNA does not sit in a straight line; it loops and folds in 3D space inside our cells. A genetic switch located 100,000 letters away can bend around to touch a gene and cause disease. Enformer took the long-range transformer attention networks that made AlphaFold famous and adapted them to read 200,000 letters of genetic code at once, helping scientists understand how genetic mutations cause illness by disrupting 3D DNA loops."
  },
  {
    id: 'enformer_perch',
    from: 'enformer',
    to: 'bioacoustics',
    connectionType: 'representation_learning',
    sharedGene: 'High-Dimensional Biological Embeddings: DNA Bases → Rainforest Soundscapes',
    paaQuestion: "How does Enformer's attention across the human genome translate into Perch's acoustic model listening to 10,000 animal species?",
    story: "At first glance, reading the four letters of human DNA seems totally different from listening to birds in a rainforest. Yet mathematically, both are long, noisy streams of biological data where the key signal—a rare disease mutation or the faint chirp of an endangered bird—is buried under millions of background sounds. DeepMind used the same self-supervised learning techniques from Enformer to train Perch on hundreds of thousands of hours of nature recordings."
  },
  {
    id: 'enformer_alphageometry',
    from: 'enformer',
    to: 'alphageometry',
    connectionType: 'symbolic_biology',
    sharedGene: 'Biological Syntactic Grammars → Formal Axiomatic Deductions',
    paaQuestion: "How can Enformer's complex genetic regulatory circuits be verified using AlphaGeometry's formal deductive logic?",
    story: "The way human cells turn genes on and off works like an intricate electrical circuit built from biological logic gates. Verifying that an AI has truly understood these circuits requires rigorous step-by-step reasoning. Researchers are connecting Enformer's predictions of gene regulation with the symbolic logic of AlphaGeometry, aiming to mathematically verify how genetic circuits function before testing synthetic cellular therapies."
  },

  // --- From AlphaGeometry ---
  {
    id: 'alphageometry_ferminet',
    from: 'alphageometry',
    to: 'ferminet',
    connectionType: 'mathematical_foundations',
    sharedGene: 'Formal Theorem Proving → Quantum Wavefunction Antisymmetry Constraints',
    paaQuestion: "How does AlphaGeometry's formal theorem proving verify that neural wavefunctions in FermiNet strictly obey quantum symmetry?",
    story: "In quantum physics, electrons follow a strict rule called the Pauli exclusion principle: two identical electrons can never occupy the exact same state. If an AI violates this fundamental symmetry, its chemical simulations become meaningless. AlphaGeometry proved that neural networks can be paired with strict symbolic logic to guarantee mathematical accuracy, allowing scientists to enforce strict quantum symmetry rules on FermiNet's neural wavefunctions."
  },
  {
    id: 'alphageometry_fusion',
    from: 'alphageometry',
    to: 'fusion',
    connectionType: 'provable_safety',
    sharedGene: 'Neuro-Symbolic Deductions → Provably Stable Plasma Controllers',
    paaQuestion: "How can AlphaGeometry's neuro-symbolic logic mathematically guarantee that Autonomous Fusion's plasma controllers never breach reactor walls?",
    story: "Neural networks are fantastic at controlling complex machines like fusion reactors, but standard AI can occasionally make unpredictable choices in unusual situations. With plasma at 100,000,000°C, a stray burst could damage the reactor walls. By combining AlphaGeometry's formal mathematical logic with neural control, engineers can build safety boundaries that mathematically guarantee the AI will never steer the plasma into the reactor walls."
  },
  {
    id: 'alphageometry_alphafold',
    from: 'alphageometry',
    to: 'alphafold',
    connectionType: 'geometric_intuition',
    sharedGene: 'Synthetic Diagram Constructions → Biomolecular Coordinate Manifolds',
    paaQuestion: "How can AlphaGeometry's synthetic proof engine prove strict physical boundary laws on AlphaFold 3's protein docking pockets?",
    story: "AlphaGeometry mastered math by generating 100 million synthetic geometry problems and proving them step by step with absolute rigor. Researchers are now using these synthetic proof methods to verify AlphaFold 3's predictions—formally proving that new medicine molecules physically fit into disease binding pockets without violating the strict geometric laws of atomic physics."
  },

  // --- From Perch (Bioacoustics) ---
  {
    id: 'bioacoustics_wildfire',
    from: 'bioacoustics',
    to: 'wildfire',
    connectionType: 'early_detection',
    sharedGene: 'Acoustic Canopy Listening → Satellite Thermal Fire Mapping',
    paaQuestion: "How do Perch's canopy microphones detect illegal logging before fires ignite, collaborating with Fire AI's satellite thermal tracking?",
    story: "In vast rainforests, satellites often cannot spot a fire until it has grown large enough to pierce the treetop canopy. Perch's audio sensors placed in the canopy listen for the sounds of chainsaws, vehicle engines, and the faint crackle of early flames. By alerting rangers hours before a fire spreads, acoustic listening stops illegal deforestation before it can ignite catastrophic wildfires."
  },
  {
    id: 'bioacoustics_flood',
    from: 'bioacoustics',
    to: 'flood_hub',
    connectionType: 'riparian_preservation',
    sharedGene: 'Soundscape Bio-Indicators → Mangrove Wetland Flood Barriers',
    paaQuestion: "How do Perch's bioacoustic soundscapes guide river wetland restoration to strengthen Flood Hub's natural flood barriers?",
    story: "Healthy wetlands, mangrove forests, and river floodplains act as giant natural sponges that soak up heavy rainfall, reducing flood damage by up to 50%. By deploying Perch to listen to the sounds of birds, frogs, and marine life, ecologists can measure the health of wetlands in real time, helping Flood Hub direct restoration projects to the areas where natural flood barriers will save the most lives."
  },
  {
    id: 'bioacoustics_enformer',
    from: 'bioacoustics',
    to: 'enformer',
    connectionType: 'biodiversity_genomics',
    sharedGene: 'Acoustic Species Identification → Environmental DNA (eDNA) Sequencing',
    paaQuestion: "How does Perch's audio species identification pair with Enformer's genomic sequence analysis of environmental DNA?",
    story: "When an animal swims in a stream or drinks water, it leaves behind microscopic traces of skin and hair known as environmental DNA (eDNA). Scientists can collect a cup of river water, sequence the DNA using models like Enformer to identify aquatic life, and combine that with Perch's canopy audio recordings. Together, they create a comprehensive census of endangered wildlife across land, air, and water without disturbing a single creature."
  }
];

// Starting questions for the opening screen ("Where do you want to explore first?")
export const STARTING_QUESTIONS = [
  {
    id: 'alphafold',
    nodeId: 'alphafold',
    question: 'How does AI predict the 3D shape of every molecule of life?',
    targetTitle: 'AlphaFold 3'
  },
  {
    id: 'gnome',
    nodeId: 'gnome',
    question: 'How did AI discover 2.2 million new materials for clean energy?',
    targetTitle: 'GNoME'
  },
  {
    id: 'graphcast',
    nodeId: 'graphcast',
    question: 'How does AI forecast global weather 10 days out in under 60 seconds?',
    targetTitle: 'GraphCast'
  },
  {
    id: 'flood_hub',
    nodeId: 'flood_hub',
    question: 'How can AI alert 700 million people before rivers flood?',
    targetTitle: 'Flood Hub'
  },
  {
    id: 'fusion',
    nodeId: 'fusion',
    question: 'How do you bottle a 100,000,000°C star on Earth using AI?',
    targetTitle: 'Autonomous Fusion'
  },
  {
    id: 'alphageometry',
    nodeId: 'alphageometry',
    question: 'Can AI solve International Mathematical Olympiad geometry without humans?',
    targetTitle: 'AlphaGeometry'
  },
  {
    id: 'bioacoustics',
    nodeId: 'bioacoustics',
    question: 'How can AI listen to rainforest soundscapes to stop illegal logging?',
    targetTitle: 'Perch (Bioacoustics)'
  },
  {
    id: 'enformer',
    nodeId: 'enformer',
    question: 'What is hiding in the 98% of human DNA that controls disease switches?',
    targetTitle: 'Enformer'
  },
  {
    id: 'ferminet',
    nodeId: 'ferminet',
    question: 'Can neural networks simulate electrons directly from fundamental quantum physics?',
    targetTitle: 'FermiNet'
  },
  {
    id: 'wildfire',
    nodeId: 'wildfire',
    question: 'How does AI track the razor-thin boundary of a wildfire in real time?',
    targetTitle: 'Fire AI (Wildfire)'
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
      paaQuestion: reverse.paaQuestion || `How does ${fromNode?.title || fromId} connect with ${toNode?.title || toId}?`,
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
    paaQuestion: `How does ${fromNode.title} connect to ${toNode.title}?`,
    story: `Both breakthroughs show how core artificial intelligence discoveries at Google transfer across completely different fields of science. While ${fromNode.title} was built to ${fromNode.subtitle.toLowerCase()} (${fromNode.summary}), the core computational innovations it pioneered—such as advanced geometric representations, spatial attention, and large-scale simulation—directly informed the tools used in ${toNode.title} to tackle ${toNode.subtitle.toLowerCase()}. In modern science, solving a hard problem in one field often provides the master key to unlocking another.`
  };
}

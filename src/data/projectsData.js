// Comprehensive dataset for Google DeepMind AI for Science Fair
// Contains full research details, researcher profiles, interactive demo configurations, and physical bridge data.

export const PROJECTS_DATA = [
  {
    id: 'alphafold',
    title: 'AlphaFold 3: The Biomolecular Universe',
    subtitle: 'Predicting the Structure and Interactions of All Life\'s Molecules',
    category: 'Biomolecular & Health',
    field: 'Biology & Medicine',
    color: '#2563EB', // Ultramarine Blue
    accentColor: '#60A5FA',
    award: 'Nobel Prize in Chemistry 2024',
    year: '2024',
    paperUrl: 'https://nature.com/articles/s41586-024-07487-w',
    demoType: 'protein_3d',
    researcher: {
      name: 'Dr. John Jumper & Demis Hassabis',
      role: 'Biomolecular Modeling Leads, Google DeepMind',
      avatar: '🧬',
      quote: "AlphaFold 3 takes us beyond proteins to the broad spectrum of molecular biology. For the first time, we can see how proteins, DNA, RNA, and small-molecule drugs interact in atomic precision.",
      affiliation: 'London, UK'
    },
    leftPanel: {
      heading: 'The 50-Year Grand Challenge',
      question: 'How do sequences of amino acids fold into functional 3D structures and bind to other molecules?',
      whyItMatters: 'Proteins are the microscopic machinery of life. Understanding their 3D shape is essential to designing targeted cancer medicines, developing malaria vaccines, and engineering plastic-eating enzymes.',
      keyPoints: [
        'Over 200 million known protein sequences had unknown 3D shapes before AlphaFold.',
        'Traditional experimental crystallography took up to 5 years and $100,000+ per single protein.',
        'AlphaFold 3 expands beyond proteins to model DNA, RNA, ligands, ions, and chemical modifications.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Biomolecular Diffusion & Evoformer',
      methodology: 'AlphaFold 3 uses an updated Evoformer module paired with a structural Diffusion Model that predicts raw atomic coordinates directly in 3D Cartesian space.',
      demoTitle: 'Interactive 3D Biomolecular Complex',
      demoDescription: 'Interact with the predicted protein-ligand binding pocket. Drag to rotate in 3D space, toggle atomic surfaces, and view hydrogen bond interactions.',
      specs: [
        { label: 'Accuracy', value: 'Atomic (<1.5 Å RMSD)' },
        { label: 'Coverage', value: '200M+ Predicted Structures' },
        { label: 'Global Users', value: '1.8M+ Biologists in 190 Countries' }
      ]
    },
    rightPanel: {
      heading: 'Real-World Social Impact',
      stats: [
        { value: '200M+', label: 'Structures freely open-sourced via EMBL-EBI' },
        { value: '30,000+', label: 'Scientific papers citing AlphaFold' },
        { value: '100x', label: 'Acceleration in drug lead discovery cycles' }
      ],
      impactPoints: [
        'Accelerating new vaccine candidates for neglected tropical diseases (Chagas, Leishmaniasis).',
        'Engineering bacterial enzymes capable of depolymerizing PET plastics in landfills.',
        'Combating antimicrobial resistance (superbugs) by identifying novel bacterial envelope targets.'
      ],
      qrInfo: 'Scan to view the live AlphaFold Server prediction portal on mobile.'
    }
  },

  {
    id: 'gnome',
    title: 'GNoME: 800 Years of Materials Discovery',
    subtitle: 'Graph Networks for Materials Exploration Expanding Stable Crystals 10x',
    category: 'Materials & Energy',
    field: 'Clean Energy & Physics',
    color: '#059669', // Emerald
    accentColor: '#34D399',
    award: 'Nature Cover Story',
    year: '2023',
    paperUrl: 'https://nature.com/articles/s41586-023-06735-9',
    demoType: 'crystal_lattice',
    researcher: {
      name: 'Dr. Ekin Dogus Cubuk & Amil Merchant',
      role: 'Materials Informatics Team, Google DeepMind',
      avatar: '💎',
      quote: "Humanity had discovered roughly 28,000 stable materials in all of history. With GNoME, we discovered 2.2 million new crystal structures, providing the blueprints for tomorrow's green technologies.",
      affiliation: 'Mountain View, CA'
    },
    leftPanel: {
      heading: 'The Clean Energy Bottleneck',
      question: 'How can we rapidly synthesize new crystal materials for solid-state batteries, solar cells, and superconductors?',
      whyItMatters: 'Every major technological transition—from the Bronze Age to the Silicon Age—has been defined by materials. Trial-and-error chemical synthesis takes decades when we urgently need greener batteries.',
      keyPoints: [
        'Before GNoME, only ~28,000 stable inorganic crystals were known to human science.',
        'Synthesizing crystals blindly in wet labs has a high failure rate and requires costly quantum DFT calculations.',
        'GNoME uses active graph neural networks to predict thermodynamic stability across the convex hull.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Active Learning on Graph Neural Networks',
      methodology: 'GNoME represents crystal lattices as periodic graphs where nodes are atoms and edges are interatomic bonds. An iterative active-learning loop tests and verifies stability.',
      demoTitle: 'Interactive Crystal Lattice Synthesizer',
      demoDescription: 'Manipulate crystal lattice vectors and substitute atomic species (Lithium, Sodium, Cobalt-free) to observe predicted thermodynamic energy stability.',
      specs: [
        { label: 'New Crystals', value: '2.2 Million' },
        { label: 'Stable Candidates', value: '380,000 on Convex Hull' },
        { label: 'Robotic Synthesis', value: '41 Verified by A-Lab' }
      ]
    },
    rightPanel: {
      heading: 'Real-World Clean Tech Impact',
      stats: [
        { value: '10x', label: 'Expansion in humanity\'s catalog of stable materials' },
        { value: '528', label: 'New potential lithium-ion conductors identified' },
        { value: '736', label: 'New potential superhard materials predicted' }
      ],
      impactPoints: [
        'Partnered with Lawrence Berkeley National Lab (A-Lab) for autonomous robotic synthesis without human intervention.',
        'Paving the way for solid-state EV batteries that charge in minutes and do not catch fire.',
        'Enabling cobalt-free, abundant sodium battery chemistries to eliminate conflict mining.'
      ],
      qrInfo: 'Scan to explore the open Materials Project database powered by GNoME.'
    }
  },

  {
    id: 'graphcast',
    title: 'GraphCast: Global Weather in Under 1 Minute',
    subtitle: '10-Day Medium-Range Weather Forecasting Outperforming Supercomputers',
    category: 'Climate & Earth',
    field: 'Atmospheric AI',
    color: '#0284C7', // Sky Blue
    accentColor: '#38BDF8',
    award: 'Science Cover Paper',
    year: '2023',
    paperUrl: 'https://science.org/doi/10.1126/science.adi2336',
    demoType: 'weather_slider',
    researcher: {
      name: 'Dr. Remi Lam & Ferran Alet',
      role: 'Atmospheric AI Research Team',
      avatar: '🌪️',
      quote: "Weather affects every community on Earth. By learning the physics of the atmosphere directly from 40 years of ECMWF data, GraphCast predicts extreme storms days earlier using 1,000x less energy.",
      affiliation: 'London, UK'
    },
    leftPanel: {
      heading: 'The Numerical Weather Ceiling',
      question: 'Can machine learning outperform decades of physics-based supercomputing in predicting global weather?',
      whyItMatters: 'Extreme weather—cyclones, heatwaves, and flash freezes—costs hundreds of billions of dollars and thousands of lives annually. Traditional supercomputers take hours on huge clusters to compute 10-day forecasts.',
      keyPoints: [
        'Numerical Weather Prediction (NWP) solves partial differential equations on hundreds of supercomputer nodes.',
        'High compute cost limits ensemble sizes and slows rapid response during developing typhoons.',
        'GraphCast predicts 1,380 meteorological variables across 37 atmospheric levels globally.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Icosahedral Multi-Mesh Graph Neural Networks',
      methodology: 'Represents the spherical Earth on an icosahedral mesh with 0.25° resolution (28km x 28km). Generates 10-day global forecasts in 60 seconds on a single Google TPU.',
      demoTitle: 'Hurricane Lee Trajectory Comparison Slider',
      demoDescription: 'Slide between traditional numerical forecasting (ECMWF HRES) and GraphCast to see how GraphCast identified Hurricane Lee\'s exact Nova Scotia landfall 9 days ahead.',
      specs: [
        { label: 'Forecast Range', value: '10 Days (6-Hour Steps)' },
        { label: 'Runtime', value: '<60 Seconds on 1 TPU' },
        { label: 'Evaluation', value: 'Beats HRES on 90%+ Metrics' }
      ]
    },
    rightPanel: {
      heading: 'Saving Lives from Extreme Climate',
      stats: [
        { value: '90.3%', label: 'Of test variables outperformed European supercomputer' },
        { value: '9 Days', label: 'Advance warning achieved for Hurricane Lee landfall' },
        { value: '1,000x', label: 'More energy efficient than traditional NWP clusters' }
      ],
      impactPoints: [
        'Weights open-sourced so developing national weather agencies can run state-of-the-art forecasts on local GPUs.',
        'Early hurricane tracking gives emergency services critical days to reinforce floodwalls and organize evacuations.',
        'Accurately forecasts deadly atmospheric rivers and agricultural frost threats.'
      ],
      qrInfo: 'Scan to see live global GraphCast meteorological runs hosted on ECMWF.'
    }
  },

  {
    id: 'fusion',
    title: 'Autonomous Fusion: Magnetic Tokamak Control',
    subtitle: 'Deep Reinforcement Learning for 100 Million °C Plasma Confinement',
    category: 'Materials & Energy',
    field: 'Clean Energy & Physics',
    color: '#EA580C', // Orange Flame
    accentColor: '#FB923C',
    award: 'Nature Publication',
    year: '2022',
    paperUrl: 'https://nature.com/articles/s41586-021-04301-9',
    demoType: 'fusion_tokamak',
    researcher: {
      name: 'Dr. Jonas Degrave & Federico Felici',
      role: 'Plasma Physics & Control Team',
      avatar: '⚡',
      quote: "Holding plasma hotter than the core of the sun in a magnetic bottle is one of physics' ultimate control challenges. Reinforcement learning allowed us to synthesize magnetic shapes never before achieved.",
      affiliation: 'EPFL Lausanne & DeepMind'
    },
    leftPanel: {
      heading: 'Taming the Power of the Sun',
      question: 'How can we sculpt and stabilize turbulent 100,000,000 °C plasma inside a magnetic tokamak chamber?',
      whyItMatters: 'Nuclear fusion produces clean, carbon-free, baseload electricity using ordinary seawater as fuel, with zero greenhouse emissions and zero long-lived nuclear waste.',
      keyPoints: [
        'Tokamak plasma is unstable, conductive, and turbulent: a minor perturbation extinguishes the reaction in milliseconds.',
        'Traditional controllers required separate hand-tuned control loops for position, elongation, and current.',
        'Testing advanced plasma shapes took physicists months of engineering calculations.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Non-Linear Deep RL Multi-Coil Actuation',
      methodology: 'Trained in accurate physics simulations of the Swiss Plasma Center\'s TCV tokamak. Observes 90 sensor channels 10,000 times per second and dynamically modulates 19 magnetic coils.',
      demoTitle: 'Interactive Tokamak Magnetic Plasma Controller',
      demoDescription: 'Adjust the magnetic coil currents in real time to stabilize the turbulent plasma ring, prevent wall contact, and create exotic snowflake and elongated droplet configurations.',
      specs: [
        { label: 'Control Frequency', value: '10,000 Hz (0.1ms Loop)' },
        { label: 'Actuator Coils', value: '19 Independent Magnets' },
        { label: 'Core Temp', value: '100,000,000 °C' }
      ]
    },
    rightPanel: {
      heading: 'The Path to Commercial Fusion Energy',
      stats: [
        { value: '100M °C', label: 'Plasma successfully stabilized in real hardware' },
        { value: 'Zero', label: 'Long-lived radioactive waste produced' },
        { value: '19', label: 'Magnetic coils coordinated by a single neural network' }
      ],
      impactPoints: [
        'Demonstrated live on the physical TCV tokamak at the Swiss Plasma Center (EPFL).',
        'Enabled novel configurations like "droplet" dual-plasmas within a single vacuum vessel.',
        'Accelerating control systems for international mega-projects like ITER and UK STEP.'
      ],
      qrInfo: 'Scan to watch the EPFL live plasma discharge video controlled by DeepMind.'
    }
  },

  {
    id: 'flood_hub',
    title: 'Flood Hub: AI Early Warning for 700M+ People',
    subtitle: 'Ungauged Riverine Flood Forecasting up to 7 Days in Advance',
    category: 'Climate & Earth',
    field: 'Humanitarian AI',
    color: '#0891B2', // Cyan
    accentColor: '#22D3EE',
    award: 'Google Impact Challenge',
    year: '2024',
    paperUrl: 'https://nature.com/articles/s41586-024-07145-1',
    demoType: 'flood_timeline',
    researcher: {
      name: 'Yossi Matias & Sella Nevo',
      role: 'Google Flood Forecasting Initiative',
      avatar: '🌊',
      quote: "Floods are the most common and devastating natural disaster on the planet. By generalizing machine learning across ungauged rivers, we are delivering reliable life-saving alerts to 700 million people.",
      affiliation: 'Tel Aviv & Global'
    },
    leftPanel: {
      heading: 'The Global Hydrology Data Gap',
      question: 'How do you accurately predict river floods in vulnerable regions where physical water gauges do not exist?',
      whyItMatters: 'Developing countries in Africa, South Asia, and Latin America suffer disproportionate casualties because most river basins have zero sensor coverage.',
      keyPoints: [
        'Floods cause over $50B in damage and threaten millions of families each year.',
        'Physical watershed modeling in ungauged river basins was historically considered an unsolved problem.',
        'Even a 24-hour advance warning can reduce flood damage and casualties by 30-50%.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Watershed LSTMs & Digital Elevation Modeling',
      methodology: 'Long Short-Term Memory networks trained on satellite precipitation radar, soil permeability, and digital elevation models (DEMs). Generalizes to river basins with zero historical streamflow gauges.',
      demoTitle: 'Interactive River Discharge & Alert Simulator',
      demoDescription: 'Simulate an extreme precipitation surge upstream. Watch the AI model predict flood crest levels 5 days before water reaches populated riverfront villages.',
      specs: [
        { label: 'Global Reach', value: '700M+ People Protected' },
        { label: 'Countries Covered', value: '80+ Nations' },
        { label: 'Lead Time', value: 'Up to 7 Days in Advance' }
      ]
    },
    rightPanel: {
      heading: 'Saving Lives Across 80+ Nations',
      stats: [
        { value: '700M+', label: 'Vulnerable residents covered by early alerts' },
        { value: '80+', label: 'Countries with free Flood Hub alerts live' },
        { value: '5 Days', label: 'Average lead time before riverbanks breach' }
      ],
      impactPoints: [
        'Direct humanitarian notifications via Google Search, Google Maps, and Android Push notifications.',
        'Official operational partnerships with the UN, Red Cross, and national disaster management agencies.',
        'Allows farmers to harvest crops early and families to safeguard livestock and clean water.'
      ],
      qrInfo: 'Scan to view the live interactive global Flood Hub map in your browser.'
    }
  },

  {
    id: 'enformer',
    title: 'Enformer: Reading the Non-Coding Genome',
    subtitle: 'Predicting Gene Expression and Variant Effects Across 200,000 Base Pairs',
    category: 'Biomolecular & Health',
    field: 'Genomics & Healthcare',
    color: '#7C3AED', // Purple
    accentColor: '#C084FC',
    award: 'Nature Methods Paper',
    year: '2021',
    paperUrl: 'https://nature.com/articles/s41592-021-01252-x',
    demoType: 'dna_sequence',
    researcher: {
      name: 'Dr. Ziga Avsec & Vikram Agarwal',
      role: 'Genomics Research Team',
      avatar: '🔬',
      quote: "98% of human DNA is non-coding, containing the master regulatory switches of life. Enformer allows us to predict how distant genetic mutations alter gene expression in health and disease.",
      affiliation: 'London & California'
    },
    leftPanel: {
      heading: 'The Dark Matter of the Human Genome',
      question: 'How do distant genetic mutations in non-coding DNA turn genes on or off and trigger hereditary disease?',
      whyItMatters: 'While the human genome project mapped the 3 billion letters of DNA, over 98% does not code for proteins. Most disease-associated mutations lie within these mysterious non-coding switches.',
      keyPoints: [
        'DNA loops in 3D space: an enhancer switch 100,000 base pairs away can touch a distant gene promoter.',
        'Previous convolutional models had narrow receptive fields (~20,000 base pairs) and missed long-range regulation.',
        'Enformer expands the receptive field tenfold to 200,000 base pairs of DNA context.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Long-Range Transformer Attention on DNA',
      methodology: 'Combines convolutional layers with self-attention Transformer blocks to capture long-range genetic interactions across 200kb of DNA. Predicts thousands of epigenetic tracks in human and mouse cells.',
      demoTitle: 'Interactive DNA Regulatory Switch Explorer',
      demoDescription: 'Introduce point mutations (single nucleotide polymorphisms) into non-coding DNA to see the predicted impact on downstream gene expression levels.',
      specs: [
        { label: 'Context Window', value: '200,000 Base Pairs' },
        { label: 'Tracks Predicted', value: '7,000+ Epigenetic Targets' },
        { label: 'Species Modeled', value: 'Human & Mouse Genomes' }
      ]
    },
    rightPanel: {
      heading: 'Unlocking Precision Medicine',
      stats: [
        { value: '98%', label: 'Of the human genome unlocked for AI analysis' },
        { value: '10x', label: 'Larger context window than previous genomic models' },
        { value: '7,000+', label: 'Cell-type specific epigenetic signals predicted' }
      ],
      impactPoints: [
        'Helps clinicians interpret rare disease variants found in whole-genome sequencing.',
        'Assisting oncologists in identifying non-coding driver mutations in cancer tumors.',
        'Aiding synthetic biology teams in designing targeted gene therapies with synthetic promoters.'
      ],
      qrInfo: 'Scan to test DNA sequences on the Enformer Colab notebook.'
    }
  },

  {
    id: 'wildfire',
    title: 'Fire AI: Real-Time Wildfire Tracking',
    subtitle: 'Satellite Thermal Infrared Boundary Mapping for Frontline Firefighters',
    category: 'Climate & Earth',
    field: 'Earth Observation',
    color: '#DC2626', // Red
    accentColor: '#F87171',
    award: 'USFS & Global Partner Deployment',
    year: '2024',
    paperUrl: 'https://blog.google/technology/ai/wildfire-boundary-tracking-satellite-ai/',
    demoType: 'fire_satellite',
    researcher: {
      name: 'Dr. Clara O\'Connor & Earth Observation Team',
      role: 'Environmental AI Specialists',
      avatar: '🔥',
      quote: "Wildfires move fast and smoke blinds traditional aircraft. Our AI uses satellite thermal infrared sensors to map active fire perimeters every 15 minutes, giving firefighters and communities live situational clarity.",
      affiliation: 'California & Global'
    },
    leftPanel: {
      heading: 'The Fog of Wildfire',
      question: 'How do you track the exact boundary of a fast-moving wildfire when smoke plumes blind ground vision?',
      whyItMatters: 'Climate-driven megafires can spread at over 10 km/h. When communities evacuate, knowing whether a fire has jumped a highway saves lives.',
      keyPoints: [
        'Dense smoke completely blocks visual light cameras from spotting the ground fire edge.',
        'Incident commanders traditionally relied on once-per-night aircraft infrared flights.',
        'Geostationary satellites monitor Earth continuously, but raw thermal data is noisy with false alarms.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Multi-Spectral Thermal Deep Neural Networks',
      methodology: 'Processes multi-band thermal infrared streams from NOAA GOES and NASA satellites. Filters out solar reflection, hot industrial chimneys, and rock glint to extract verified fire perimeters.',
      demoTitle: 'Thermal Infrared vs Visible Satellite Viewer',
      demoDescription: 'Toggle between visible light (opaque smoke plume) and thermal infrared AI processing to reveal the blazing fire line and forward-spreading embers.',
      specs: [
        { label: 'Update Cadence', value: 'Every 15 Minutes' },
        { label: 'Sensors', value: 'NOAA GOES-16 & 18 / Himawari' },
        { label: 'Latency', value: 'Near Real-Time Processing' }
      ]
    },
    rightPanel: {
      heading: 'Protecting Frontline Crews & Citizens',
      stats: [
        { value: '15 Min', label: 'Refresh rate of live satellite fire perimeters' },
        { value: '40+', label: 'Countries with live wildfire maps on Google' },
        { value: '100M+', label: 'Residents with access to real-time evacuation boundaries' }
      ],
      impactPoints: [
        'Displayed directly on Google Maps and Google Search to guide safe evacuation routes.',
        'Partnered with the National Interagency Fire Center (NIFC) and California Fire (CAL FIRE).',
        'Assists post-fire erosion analysis to predict catastrophic winter mudslides.'
      ],
      qrInfo: 'Scan to view active wildfire perimeters on Google Maps.'
    }
  },

  {
    id: 'ferminet',
    title: 'FermiNet: Quantum Mechanics from Scratch',
    subtitle: 'Solving the Many-Electron Schrödinger Equation with Neural Wavefunctions',
    category: 'Materials & Energy',
    field: 'Quantum Physics',
    color: '#6D28D9', // Deep Violet
    accentColor: '#A78BFA',
    award: 'Physical Review Research Publication',
    year: '2020',
    paperUrl: 'https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.2.033429',
    demoType: 'quantum_orbital',
    researcher: {
      name: 'Dr. David Pfau & James Spencer',
      role: 'Quantum Foundations Team',
      avatar: '⚛️',
      quote: "Paul Dirac stated in 1929 that the fundamental laws of chemistry were completely known, but the equations were too complex to solve. FermiNet solves the Schrödinger equation directly from first principles.",
      affiliation: 'London, UK'
    },
    leftPanel: {
      heading: 'The Quantum Exponential Wall',
      question: 'Can neural networks directly solve the fundamental Schrödinger equation for complex chemical reactions?',
      whyItMatters: 'If we can simulate chemistry from fundamental physics rather than lab experiments, we can design green industrial catalysts to capture carbon and synthesize fertilizer using 90% less energy.',
      keyPoints: [
        'Electrons interact simultaneously with every other electron: computational cost grows exponentially with atomic number.',
        'Electrons are fermions: swapping two electrons must flip the mathematical sign of the wavefunction (Pauli exclusion principle).',
        'Standard approximations (like DFT) break down on bond-breaking, transition metals, and complex catalyst complexes.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Antisymmetric Neural Wavefunctions (FermiNet)',
      methodology: 'Builds an antisymmetric deep neural network using Slater-determinant multi-tensors. Uses Variational Quantum Monte Carlo (VMC) to minimize energy directly from first principles without any training data.',
      demoTitle: 'Interactive Electron Density Cloud Visualizer',
      demoDescription: 'Adjust electron orbital states and nuclear charge to see how the neural wavefunction accurately reproduces electron-electron cusps and quantum nodes.',
      specs: [
        { label: 'Training Data', value: 'Zero (Learns from First Principles)' },
        { label: 'Precision', value: 'Chemical Accuracy (<1 kcal/mol)' },
        { label: 'Physical Law', value: 'Strict Fermionic Antisymmetry' }
      ]
    },
    rightPanel: {
      heading: 'The Future of Computational Chemistry',
      stats: [
        { value: 'Zero', label: 'Experimental training data needed to compute energies' },
        { value: '<1 kcal/mol', label: 'Chemical precision benchmark reached on complex molecules' },
        { value: '100%', label: 'Strict adherence to quantum mechanical symmetry' }
      ],
      impactPoints: [
        'Designing enzyme-mimicking catalysts to replace the energy-intensive Haber-Bosch fertilizer process.',
        'Simulating molecular carbon capture compounds for direct air capture facilities.',
        'Evaluating high-temperature superconductor candidate structures.'
      ],
      qrInfo: 'Scan to inspect the open-source FermiNet codebase on GitHub.'
    }
  },

  {
    id: 'alphageometry',
    title: 'AlphaGeometry: Olympiad-Level Reasoning',
    subtitle: 'Neuro-Symbolic AI Discovering Mathematical Proofs at Olympiad Silver Level',
    category: 'Logic & Mathematics',
    field: 'Formal Mathematics',
    color: '#D97706', // Amber Gold
    accentColor: '#FBBF24',
    award: 'Nature Paper & IMO Silver 2024',
    year: '2024',
    paperUrl: 'https://nature.com/articles/s41586-023-06747-5',
    demoType: 'geometry_proof',
    researcher: {
      name: 'Dr. Trieu H. Trinh & Thang Luong',
      role: 'Formal Reasoning Team',
      avatar: '📐',
      quote: "Solving complex geometry problems requires intuitive creativity to add auxiliary points and rigorous deductive logic to prove the result. AlphaGeometry marries both in a neuro-symbolic co-pilot.",
      affiliation: 'Google DeepMind'
    },
    leftPanel: {
      heading: 'The Mathematical Intuition Dilemma',
      question: 'How do you teach AI to invent creative proof steps without hallucinating false mathematical deductions?',
      whyItMatters: 'Large language models often make subtle reasoning errors. Pure symbolic engines are logically sound, but cannot intuitively guess which auxiliary lines to draw in a complex diagram.',
      keyPoints: [
        'The International Mathematical Olympiad (IMO) is the pinnacle competition for young mathematical minds.',
        'Geometry proofs require adding new constructions (circles, bisectors) that do not exist in the initial diagram.',
        'Human mathematical training data is tiny: only a few hundred historical IMO geometry problems exist.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Neuro-Symbolic Co-Pilot & 100M Synthetic Proofs',
      methodology: 'Pairs a neural language model (which proposes creative auxiliary constructions) with a symbolic deductive engine (which derives axiomatic theorems). Trained on 100 million synthetically generated theorems.',
      demoTitle: 'Step-by-Step Geometry Proof Visualizer',
      demoDescription: 'Step through an IMO geometry theorem. Watch the neural model introduce an auxiliary circumcircle, allowing the symbolic engine to deduce the solution in 4 formal steps.',
      specs: [
        { label: 'IMO Benchmark', value: 'Solved 25 of 30 Olympiad Problems' },
        { label: 'Synthetic Proofs', value: '100 Million Generated' },
        { label: 'Formal Logic', value: '100% Axiomatic Verification' }
      ]
    },
    rightPanel: {
      heading: 'Advancing Verifiable Scientific Truth',
      stats: [
        { value: '25/30', label: 'IMO problems solved within official time limits' },
        { value: 'Silver', label: 'Medal level achieved on the 2024 Olympiad' },
        { value: '100M', label: 'Synthetic proofs synthesized without human demonstration' }
      ],
      impactPoints: [
        'Pairing with AlphaProof to formalize proofs in the Lean computer language.',
        'Formally verifying safety-critical software in aerospace, autonomous driving, and cryptography.',
        'Serving as an AI research collaborator for professional human mathematicians.'
      ],
      qrInfo: 'Scan to explore the open AlphaGeometry code repository.'
    }
  },

  {
    id: 'bioacoustics',
    title: 'Perch: AI Listening to Earth\'s Wildlife',
    subtitle: 'Global Bioacoustic Foundation Models for Ecosystem Preservation',
    category: 'Climate & Earth',
    field: 'Ecology & Biodiversity',
    color: '#047857', // Deep Forest Green
    accentColor: '#10B981',
    award: 'Global Conservation Deployments',
    year: '2023',
    paperUrl: 'https://blog.google/technology/ai/bioacoustics-perch-biodiversity-monitoring/',
    demoType: 'bioacoustics_demo',
    researcher: {
      name: 'Dr. Tom Denton & Conservation AI Team',
      role: 'Bioacoustics Lead',
      avatar: '🦜',
      quote: "Wild animals are vocal: birds sing, frogs croak, snapping shrimp crackle. By training AI to listen to forest soundscapes, we can track endangered wildlife and detect illegal logging in real time.",
      affiliation: 'California & Global'
    },
    leftPanel: {
      heading: 'The Silent Biodiversity Crisis',
      question: 'How do you monitor endangered wildlife across millions of hectares of dense jungle where animals cannot be seen?',
      whyItMatters: 'Global wildlife populations have declined by 69% over 50 years. Human ecologists cannot manually listen to petabytes of acoustic recorder audio collected from wilderness canopies.',
      keyPoints: [
        'Passive acoustic recorders run for months, generating thousands of hours of jungle audio.',
        'Torrential rain, tropical wind, and insects mask rare animal calls in complex audio spectrograms.',
        'Perch is a self-supervised foundation model trained on over 10,000 species worldwide.'
      ]
    },
    centerPanel: {
      heading: 'AI Method: Self-Supervised Acoustic Spectrogram Embeddings',
      methodology: 'Converts audio into 2D frequency spectrograms and extracts invariant acoustic representations. Learns to identify rare endangered species with as few as 5 recorded vocalization samples.',
      demoTitle: 'Interactive Jungle Spectrogram Audio Analyzer',
      demoDescription: 'Play multi-layer forest soundscapes. See the AI isolate overlapping bird calls, distinguish endangered species from insect chatter, and identify poacher chainsaw signatures.',
      specs: [
        { label: 'Species Catalog', value: '10,000+ Global Species' },
        { label: 'Few-Shot Learning', value: 'Accurate with 5 Audio Samples' },
        { label: 'Acoustic Defense', value: 'Detects Chainsaws & Gunshots' }
      ]
    },
    rightPanel: {
      heading: 'Protecting Earth\'s Fragile Ecosystems',
      stats: [
        { value: '10,000+', label: 'Bird, mammal, and amphibian species cataloged' },
        { value: '50+', label: 'Protected nature reserves using bioacoustics AI' },
        { value: 'Real-Time', label: 'Acoustic alerts dispatched to anti-poaching rangers' }
      ],
      impactPoints: [
        'Protecting the critically endangered Hawaiian honeycreepers from avian malaria zones.',
        'Listening to restored coral reefs: crackling snapping shrimp sounds indicate marine life return.',
        'Connected canopy microphones alert park rangers within minutes of illegal chainsaw activity.'
      ],
      qrInfo: 'Scan to listen to wild rainforest soundscapes on the Perch portal.'
    }
  }
];

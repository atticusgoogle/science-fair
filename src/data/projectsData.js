// Comprehensive dataset for Google DeepMind AI for Science Fair
// Contains full research details, researcher profiles, interactive demo configurations, and physical bridge data.

export const PROJECTS_DATA = [
  {
    id: 'alphafold',
    title: 'AlphaFold 3: The Biomolecular Universe',
    subtitle: 'Predicting the 3D Shape and Interactions of All Life\'s Molecules',
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
      heading: 'The 50-Year Grand Challenge in Biology',
      question: 'How do flat chains of biological code fold into 3D machines that drive all living cells?',
      whyItMatters: 'Proteins are the microscopic machinery of life—they digest food, fight viruses, and repair tissue. Knowing their exact 3D shape is the secret to designing targeted medicines, new vaccines, and plastic-eating enzymes.',
      keyPoints: [
        'Before AlphaFold, over 200 million discovered proteins had completely unknown 3D shapes.',
        'Figuring out a single protein\'s shape in a physical lab took up to 5 years and cost over $100,000.',
        'AlphaFold 3 goes beyond proteins to predict how DNA, RNA, and medicines physically dock together.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: 3D Molecular Sculpting',
      methodology: 'AlphaFold 3 works like an AI sculptor: it starts with a fuzzy cloud of atoms (similar to how image-generating AI starts with visual static) and gradually refines every atom into its exact 3D position, predicting how proteins, DNA, and medicines snap together.',
      demoTitle: 'Interactive 3D Molecular Complex',
      demoDescription: 'Rotate this molecular model in 3D to see how a drug molecule (the colored cluster) locks into a protein\'s binding pocket like a key into a lock.',
      specs: [
        { label: 'Detail Level', value: 'Atomic Precision (<1.5 Å)' },
        { label: 'Catalog Size', value: '200M+ 3D Structures' },
        { label: 'Global Reach', value: '2M+ Scientists in 190 Countries' }
      ]
    },
    rightPanel: {
      heading: 'Real-World Healthcare Impact',
      stats: [
        { value: '200M+', label: 'Protein structures freely open to all global scientists' },
        { value: '30,000+', label: 'Scientific research studies powered by AlphaFold' },
        { value: '100x', label: 'Speedup in designing early drug candidates' }
      ],
      impactPoints: [
        'Accelerating new vaccine candidates for neglected tropical diseases like Chagas and Leishmaniasis.',
        'Engineering plastic-eating bacterial enzymes that can digest landfill waste in hours.',
        'Uncovering vulnerabilities in drug-resistant superbugs to help create new antibiotics.'
      ],
      qrInfo: 'Scan to view the live AlphaFold Server prediction portal on mobile.'
    }
  },

  {
    id: 'gnome',
    title: 'GNoME: 800 Years of Materials Discovery',
    subtitle: 'Discovering 2.2 Million New Crystal Materials to Power Green Technology',
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
      question: 'How can we discover new crystal materials fast enough to power the green transition?',
      whyItMatters: 'Every technological leap—from the Bronze Age to silicon chips—depends on finding new materials. Trial-and-error chemistry in physical labs takes decades, but we urgently need safer electric car batteries and cheaper solar panels today.',
      keyPoints: [
        'In all of human history, scientists had only discovered roughly 28,000 stable crystal materials.',
        'Synthesizing new materials blindly in a lab is slow, expensive, and fails most of the time.',
        'GNoME uses AI to test millions of atomic recipes on a computer in months rather than centuries.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: An AI Chemist for Green Materials',
      methodology: 'GNoME treats materials like atomic recipes. The AI tests billions of combinations of elements, predicts which crystals will be strong and stable enough to survive in the real world, and sends the most promising blueprints to robotic labs to cook.',
      demoTitle: 'Interactive Crystal Synthesizer',
      demoDescription: 'Rotate the crystal lattice to see how atoms arrange into repeating 3D patterns. GNoME evaluates whether this atomic arrangement will stay stable under heat and pressure.',
      specs: [
        { label: 'New Crystals Found', value: '2.2 Million' },
        { label: 'Super-Stable Candidates', value: '380,000 Ready for Labs' },
        { label: 'Robotically Made', value: '41 Verified by Berkeley A-Lab' }
      ]
    },
    rightPanel: {
      heading: 'Real-World Clean Tech Impact',
      stats: [
        { value: '10x', label: 'Expansion in humanity’s total catalog of stable materials' },
        { value: '528', label: 'New potential lithium-ion battery conductors identified' },
        { value: '800 Years', label: 'Worth of laboratory materials discovery achieved in months' }
      ],
      impactPoints: [
        'Partnered with Lawrence Berkeley National Lab, where an autonomous robot synthesized 41 of GNoME\'s predicted materials with zero human hands.',
        'Designing next-generation solid-state EV batteries that charge in minutes and will not catch fire.',
        'Developing abundant sodium battery chemistries to replace rare, conflict-mined cobalt.'
      ],
      qrInfo: 'Scan to explore the open Materials Project database powered by GNoME.'
    }
  },

  {
    id: 'graphcast',
    title: 'GraphCast: Global Weather in Under 1 Minute',
    subtitle: '10-Day Global Weather Forecasts in Under 60 Seconds',
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
      heading: 'The Supercomputer Speed Limit',
      question: 'Can AI forecast planetary weather faster and more accurately than giant supercomputers?',
      whyItMatters: 'Extreme weather—hurricanes, floods, and deadly heatwaves—threatens millions of families each year. Traditional weather supercomputers take hours on hundreds of machines to calculate a single 10-day forecast, which can delay emergency evacuations.',
      keyPoints: [
        'Traditional forecasting relies on solving massive physics equations on football-field-sized computer clusters.',
        'High computing costs mean forecasts cannot be refreshed as quickly as storms evolve.',
        'GraphCast tracks over 1,300 atmospheric variables at 37 altitudes across the whole globe simultaneously.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: Learning Weather from 40 Years of Climate Data',
      methodology: 'Instead of calculating fluid physics equations step-by-step on room-sized supercomputers, GraphCast studied 40 years of global satellite weather history. It predicts temperature, wind, and storm tracks across the entire planet 10 days ahead in under one minute.',
      demoTitle: 'Hurricane Lee Trajectory Comparison Slider',
      demoDescription: 'Drag the slider to compare traditional European supercomputer predictions against GraphCast, which pinpointed Hurricane Lee’s landfall 9 days ahead of time.',
      specs: [
        { label: 'Forecast Range', value: '10 Days Ahead (6-Hour Steps)' },
        { label: 'Calculation Time', value: '<60 Seconds on 1 TPU Chip' },
        { label: 'Supercomputer Matchup', value: 'Beats Top European System on 90%+ Metrics' }
      ]
    },
    rightPanel: {
      heading: 'Saving Lives from Extreme Weather',
      stats: [
        { value: '90.3%', label: 'Of test weather variables outperformed European supercomputer' },
        { value: '9 Days', label: 'Advance warning achieved for Hurricane Lee landfall' },
        { value: '1,000x', label: 'More energy-efficient than traditional supercomputer runs' }
      ],
      impactPoints: [
        'Open-sourced freely so meteorologists in developing countries can run world-class forecasts on inexpensive hardware.',
        'Gives emergency crews days of extra warning to reinforce flood barriers and order evacuations ahead of category 5 storms.',
        'Accurately forecasts deadly atmospheric rivers and agricultural frost threats weeks in advance.'
      ],
      qrInfo: 'Scan to see live global GraphCast meteorological runs hosted on ECMWF.'
    }
  },

  {
    id: 'fusion',
    title: 'Autonomous Fusion: Magnetic Tokamak Control',
    subtitle: 'An AI Autopilot for Bottling Clean Fusion Energy Hotter Than the Sun',
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
      question: 'How do you hold a 100,000,000°C star inside a magnetic chamber without it touching the walls?',
      whyItMatters: 'Nuclear fusion produces limitless clean energy from water with zero greenhouse gases and zero long-lived radioactive waste. But the burning fuel (plasma) is hotter than the core of the sun and will melt any container if it touches the walls.',
      keyPoints: [
        'Fusion plasma is intensely hot, turbulent, and wriggles violently in fractions of a millisecond.',
        'Human engineers previously had to tune dozens of separate control systems by hand.',
        'Testing new plasma shapes previously took physicists months of slow trial calculations.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: Superhuman Magnetic Reflexes',
      methodology: 'Fusion creates clean energy by trapping star-hot gas inside magnetic fields. Because 100,000,000°C plasma wriggles and escapes like a wild beast, the AI acts as an ultra-fast autopilot—reading 90 sensors and adjusting 19 powerful magnets 10,000 times a second to keep the reaction stable.',
      demoTitle: 'Interactive Tokamak Magnetic Plasma Controller',
      demoDescription: 'Adjust magnetic coil controls in real time to shape and stabilize the turbulent plasma ring, keeping it floating safely away from the chamber walls.',
      specs: [
        { label: 'Reaction Speed', value: '10,000 Adjustments per Second' },
        { label: 'Magnets Controlled', value: '19 Independent Coils' },
        { label: 'Core Temperature', value: '100 Million °C (Hotter than Sun)' }
      ]
    },
    rightPanel: {
      heading: 'The Path to Abundant Clean Energy',
      stats: [
        { value: '100M °C', label: 'Plasma successfully stabilized in live reactor hardware' },
        { value: 'Zero', label: 'Long-lived radioactive waste produced' },
        { value: '19', label: 'Magnetic coils coordinated in real time by one neural network' }
      ],
      impactPoints: [
        'Tested live on the physical Tokamak reactor at the Swiss Plasma Center (EPFL) with zero human intervention.',
        'Allowed scientists to sculpt exotic plasma configurations like "droplets" never before achieved.',
        'Accelerating commercial fusion reactors to provide 24/7 carbon-free power for global electricity grids.'
      ],
      qrInfo: 'Scan to watch the EPFL live plasma discharge video controlled by DeepMind.'
    }
  },

  {
    id: 'flood_hub',
    title: 'Flood Hub: AI Early Warning for 700M+ People',
    subtitle: 'Free AI Flood Warnings for 700 Million Vulnerable People',
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
      heading: 'The Global River Data Blindspot',
      question: 'How do you predict river floods in vulnerable communities where physical water gauges do not exist?',
      whyItMatters: 'Floods cause tens of billions of dollars in damage and displace millions of families every year. Developing countries in Africa, Asia, and Latin America suffer the most because their rivers lack expensive physical monitoring sensors.',
      keyPoints: [
        'Floods are the world\'s most frequent and devastating natural disaster.',
        'Building and maintaining physical water level gauges along every river basin is too expensive for many nations.',
        'Even a 24-hour advance warning can reduce flood damage and casualties by 30% to 50%.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: Satellite-Guided Flood Forecasts',
      methodology: 'Most rivers in developing countries have no physical sensors measuring water flow. Google\'s AI analyzes satellite rainfall radar, terrain elevation, and soil absorption to calculate where rainwater will pool, warning vulnerable communities up to 7 days before rivers breach their banks.',
      demoTitle: 'Interactive River Discharge & Alert Simulator',
      demoDescription: 'Simulate an extreme rainstorm upstream. Watch the AI model predict flood crest levels days before the surge reaches populated downstream towns.',
      specs: [
        { label: 'People Protected', value: '700M+ Residents' },
        { label: 'Global Coverage', value: '80+ Countries' },
        { label: 'Advance Warning', value: 'Up to 7 Days Lead Time' }
      ]
    },
    rightPanel: {
      heading: 'Saving Lives Across 80+ Nations',
      stats: [
        { value: '700M+', label: 'Vulnerable residents covered by free early flood alerts' },
        { value: '80+', label: 'Countries with live operational flood warnings' },
        { value: '5 Days', label: 'Average advance warning before riverbanks overflow' }
      ],
      impactPoints: [
        'Sends life-saving notifications directly to mobile phones via Google Search, Google Maps, and Android alerts.',
        'Official operational partner with the United Nations and the International Red Cross for disaster response.',
        'Gives farmers time to harvest crops early and families time to move children, livestock, and drinking water to safety.'
      ],
      qrInfo: 'Scan to view the live interactive global Flood Hub map in your browser.'
    }
  },

  {
    id: 'enformer',
    title: 'Enformer: Reading the Non-Coding Genome',
    subtitle: 'Decoding the 98% of Human DNA that Controls Disease Switches',
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
      question: 'How do distant genetic mutations in non-coding DNA turn genes on or off and cause disease?',
      whyItMatters: 'While the Human Genome Project mapped our 3 billion letters of DNA, over 98% of it does not code for proteins. Most hereditary diseases and cancers are caused by typos hidden in these mysterious non-coding \'control switches.\'',
      keyPoints: [
        'DNA loops and folds in 3D space: a switch 100,000 letters away can bend over and activate a disease gene.',
        'Earlier AI models could only read short snippets of DNA, missing long-distance genetic connections.',
        'Enformer can read 200,000 letters of genetic context at once—like reading an entire book chapter instead of a sentence.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: Reading Long-Distance DNA Switches',
      methodology: 'Only 2% of human DNA contains genes that build proteins—the other 98% is a vast control room of genetic switches. Enformer reads up to 200,000 letters of DNA at once to spot which distant genetic typos turn disease genes on or off.',
      demoTitle: 'Interactive DNA Regulatory Switch Explorer',
      demoDescription: 'Introduce small genetic mutations into non-coding DNA to see how the AI predicts whether a distant disease gene will turn on, dim down, or turn off.',
      specs: [
        { label: 'Reading Window', value: '200,000 Letters of DNA' },
        { label: 'Biological Signals', value: '7,000+ Cell-Specific Targets' },
        { label: 'Genome Coverage', value: 'Human & Mouse Genomes' }
      ]
    },
    rightPanel: {
      heading: 'Unlocking Precision Medicine',
      stats: [
        { value: '98%', label: 'Of the human genome unlocked for AI medical analysis' },
        { value: '10x', label: 'Longer reading window than previous genetic AI models' },
        { value: '7,000+', label: 'Cell-specific genetic control signals accurately predicted' }
      ],
      impactPoints: [
        'Helps doctors interpret mysterious rare disease variants found in patient DNA tests.',
        'Assisting cancer researchers in identifying hidden non-coding mutations that cause tumors to grow.',
        'Aiding biotechnology teams in designing targeted gene therapies that only turn on inside diseased cells.'
      ],
      qrInfo: 'Scan to test DNA sequences on the Enformer Colab notebook.'
    }
  },

  {
    id: 'wildfire',
    title: 'Fire AI: Real-Time Wildfire Tracking',
    subtitle: 'Live Satellite Wildfire Boundary Tracking for Communities and Firefighters',
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
      question: 'How do you track the exact boundary of a fast-moving wildfire when smoke blinds all cameras?',
      whyItMatters: 'Climate-driven megafires can spread at over 10 km/h. During sudden evacuations, knowing whether a fire has jumped a river or highway can be the difference between life and death.',
      keyPoints: [
        'Thick smoke plumes completely blind standard optical satellite cameras and airplanes.',
        'Fire chiefs traditionally had to wait for once-per-night aircraft flyovers to see the fire perimeter.',
        'Weather satellites monitor Earth continuously, but raw heat data is full of false alarms from hot rocks and factories.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: Seeing Heat Boundaries Through Smoke from Space',
      methodology: 'Wildfires produce thick plumes of smoke that blind airplanes and regular cameras. Google\'s AI reads heat-sensing infrared data from space satellites, filters out false alarms like hot sunlit rocks or factory chimneys, and draws the true fire perimeter every 15 minutes.',
      demoTitle: 'Thermal Infrared vs Visible Satellite Viewer',
      demoDescription: 'Toggle between visible light (opaque smoke plume) and thermal infrared AI processing to reveal the blazing fire front and dangerous spreading embers.',
      specs: [
        { label: 'Update Frequency', value: 'Every 15 Minutes' },
        { label: 'Satellite Feeds', value: 'NOAA GOES & NASA Space Sensors' },
        { label: 'Processing Speed', value: 'Near Real-Time Global Mapping' }
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
        'Displayed directly on Google Maps and Search to help families find safe, unblocked evacuation routes.',
        'Used directly by California Fire (CAL FIRE) and national agencies to direct firefighting aircraft.',
        'Helps forecast post-fire soil erosion to prevent deadly mudslides during winter rainstorms.'
      ],
      qrInfo: 'Scan to view active wildfire perimeters on Google Maps.'
    }
  },

  {
    id: 'ferminet',
    title: 'FermiNet: Quantum Mechanics from Scratch',
    subtitle: 'Simulating Chemistry Directly from Fundamental Quantum Physics',
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
      heading: 'The Quantum Mystery of Chemistry',
      question: 'Can neural networks calculate the behavior of electrons directly from the laws of physics?',
      whyItMatters: 'If we can simulate chemistry with complete accuracy on computers instead of in physical beakers, scientists can design better materials to capture greenhouse gases and invent greener fertilizers using 90% less energy.',
      keyPoints: [
        'Electrons in a molecule constantly repel each other, making the math exponentially harder for every added atom.',
        'Quantum laws dictate that swapping any two electrons changes the sign of the equation (the Pauli Exclusion Principle).',
        'Approximations often fail when chemical bonds are forming or breaking in industrial catalysts.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: Simulating Electrons from Pure Quantum Rules',
      methodology: 'In 1929, physicists proved that fundamental equations describe all of chemistry, but solving them for more than a couple of electrons was mathematically impossible. FermiNet teaches a neural network the strict rules of quantum mechanics from scratch, simulating molecular bonds accurately without needing any laboratory measurements.',
      demoTitle: 'Interactive Electron Density Cloud Visualizer',
      demoDescription: 'Adjust electron orbital energy and nuclear charge to see how the quantum electron cloud shapes the chemical bonds that hold all matter together.',
      specs: [
        { label: 'Laboratory Data Needed', value: 'Zero (Learns from Pure Physics)' },
        { label: 'Calculation Accuracy', value: 'Chemical Precision (<1 kcal/mol)' },
        { label: 'Physical Law Adherence', value: '100% Strict Quantum Mechanics' }
      ]
    },
    rightPanel: {
      heading: 'The Future of Clean Chemistry',
      stats: [
        { value: 'Zero', label: 'Lab training data needed to calculate molecular energies' },
        { value: '<1 kcal/mol', label: 'Gold-standard chemical precision reached on complex molecules' },
        { value: '100%', label: 'Strict adherence to quantum mechanical symmetry' }
      ],
      impactPoints: [
        'Designing synthetic catalysts to replace the 100-year-old Haber-Bosch process, which consumes 2% of the world\'s energy making fertilizer.',
        'Simulating novel sponge-like materials that trap carbon dioxide directly from the atmosphere.',
        'Screening candidate chemical compounds for high-temperature room-temperature superconductors.'
      ],
      qrInfo: 'Scan to inspect the open-source FermiNet codebase on GitHub.'
    }
  },

  {
    id: 'alphageometry',
    title: 'AlphaGeometry: Olympiad-Level Reasoning',
    subtitle: 'Solving Complex Mathematical Olympiad Proofs with Creative AI Reasoning',
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
      heading: 'The Challenge of Mathematical Intuition',
      question: 'How do you teach AI to invent creative mathematical ideas without making logical mistakes?',
      whyItMatters: 'Most modern AI language models can make careless mistakes or invent false facts. Advanced geometry requires both creative intuition (guessing which new line or circle to draw) and airtight logic (proving every step beyond any doubt).',
      keyPoints: [
        'The International Mathematical Olympiad (IMO) is the most prestigious math competition for top young human minds.',
        'Hard geometry proofs require drawing new helper lines and circles that were not in the original puzzle.',
        'Very little human math training data exists—only a few hundred historical Olympiad geometry problems.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: Combining Creative Intuition with Strict Logic',
      methodology: 'Solving advanced geometry requires two modes of thinking: a creative spark (like guessing to draw a helper circle or line) and strict, step-by-step logic (proving why the steps are true). AlphaGeometry pairs a creative AI that suggests helpful lines with a rigorous logic engine that checks each deduction, solving Olympiad math problems at a silver-medal human level.',
      demoTitle: 'Step-by-Step Geometry Proof Visualizer',
      demoDescription: 'Step through an Olympiad geometry theorem. Watch the AI introduce a new helper circle, allowing its logic engine to prove the theorem in 4 clear, verified steps.',
      specs: [
        { label: 'Olympiad Benchmark', value: 'Solved 25 of 30 Problems (Silver Level)' },
        { label: 'Training Method', value: '100 Million Synthesized Proofs' },
        { label: 'Proof Accuracy', value: '100% Mathematically Verified' }
      ]
    },
    rightPanel: {
      heading: 'Building AI That Cannot Hallucinate',
      stats: [
        { value: '25/30', label: 'Olympiad problems solved within official time limits' },
        { value: 'Silver', label: 'Medal level achieved on the world championship exam' },
        { value: '100M', label: 'Synthetic proofs synthesized without human demonstration' }
      ],
      impactPoints: [
        'Teamed up with AlphaProof to solve complex algebra and number theory in formal computer proof languages.',
        'Verifying safety-critical computer code for aerospace flight controls, self-driving cars, and cryptography.',
        'Serving as an untiring research collaborator for human mathematicians tackling open problems.'
      ],
      qrInfo: 'Scan to explore the open AlphaGeometry code repository.'
    }
  },

  {
    id: 'bioacoustics',
    title: 'Perch: AI Listening to Earth\'s Wildlife',
    subtitle: 'Listening to Nature\'s Audio to Protect 10,000 Species and Stop Deforestation',
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
      question: 'How do you protect wildlife across millions of acres of dense jungle where animals are heard but not seen?',
      whyItMatters: 'Global wildlife populations have declined significantly over the past 50 years. Human biologists cannot manually listen to millions of hours of jungle audio recorded by microphones hidden in rainforest canopies.',
      keyPoints: [
        'Autonomous microphones run for months in remote jungles, collecting petabytes of sound recordings.',
        'Tropical rainstorms, insects, and wind often drown out the faint chirps of endangered species.',
        'Perch is trained on over 10,000 bird, frog, and mammal species from all across the planet.'
      ]
    },
    centerPanel: {
      heading: 'How the AI Works: Listening to Nature\'s Audio Fingerprints',
      methodology: 'Hidden deep in rainforest canopies, wild birds and animals are much easier to hear than to see. Perch turns jungle audio into visual \'sound pictures\' and learns the unique acoustic fingerprint of over 10,000 species. It can identify a rare animal call even through heavy rain, and alerts rangers if it hears an illegal chainsaw.',
      demoTitle: 'Interactive Jungle Spectrogram Audio Analyzer',
      demoDescription: 'Play multi-layered forest recordings. See how the AI isolates overlapping bird calls, detects endangered species, and picks out the sound of illegal chainsaws.',
      specs: [
        { label: 'Species Catalog', value: '10,000+ Birds, Frogs, & Mammals' },
        { label: 'Learning Speed', value: 'Recognizes Rare Species from 5 Audio Clips' },
        { label: 'Canopy Defense', value: 'Instantly Detects Chainsaws & Gunshots' }
      ]
    },
    rightPanel: {
      heading: 'Protecting Earth\'s Fragile Wildlife',
      stats: [
        { value: '10,000+', label: 'Bird, mammal, and amphibian species cataloged' },
        { value: '50+', label: 'Protected nature reserves using bioacoustics AI' },
        { value: 'Real-Time', label: 'Acoustic alerts sent to anti-poaching rangers' }
      ],
      impactPoints: [
        'Protecting critically endangered Hawaiian honeycreeper birds by tracking safe havens from mosquito-borne avian malaria.',
        'Monitoring ocean coral reef recovery: underwater microphone recordings of snapping shrimp reveal returning marine life.',
        'Alerts park rangers within minutes when chainsaws or gunshots are heard in protected wilderness zones.'
      ],
      qrInfo: 'Scan to listen to wild rainforest soundscapes on the Perch portal.'
    }
  }
];

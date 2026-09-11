// Comprehensive interactive scientific knowledge base for all 10 Google DeepMind / Google Research papers.
// Translates high-level academic Nature / Science papers into clear, intuitive, grounded explanations.

export const PAPER_KNOWLEDGE_BASE = {
  alphafold: {
    paperTitle: "Accurate structure prediction of biomolecular interactions with AlphaFold 3",
    journal: "Nature (May 2024)",
    researchers: "Dr. John Jumper & Demis Hassabis (Nobel Prize in Chemistry 2024)",
    simpleSummary: "AlphaFold 3 predicts how proteins, DNA, RNA, and drug molecules fit together in 3D with atomic precision, solving a 50-year-old grand challenge in biology in seconds instead of years.",
    analogy: "Think of your body's molecules like millions of intricate microscopic keys and locks. For 50 years, scientists had the 2D alphabet of the key, but couldn't guess its 3D shape without years of expensive X-ray photography. AlphaFold 3 acts like a master 3D lock-maker that can look at any string of letters and instantly fold it into the exact 3D key that unlocks new medicines.",
    suggestedQuestions: [
      "Can you explain AlphaFold 3 like I'm 12 years old?",
      "Why did this win the 2024 Nobel Prize in Chemistry?",
      "What is a 'ligand' and why does drug binding matter?",
      "How does it work differently from traditional lab crystallography?",
      "Can AlphaFold design new enzymes to eat plastic?"
    ],
    faqs: [
      {
        keywords: ["12", "simple", "child", "kid", "eli5", "plain", "basic"],
        question: "Explain AlphaFold 3 like I'm 12 years old",
        plainAnswer: "Imagine you have a long piece of paper with a secret message written in 20 letters. In biology, that strip is called a protein sequence.\n\nInside your cells, that strip doesn't stay flat—it twists and folds into an origami machine. If it folds one way, it digests your breakfast; if it folds another, it fights off the flu. But figuring out how it folded used to take human scientists up to **5 years and $100,000** for just one single protein!\n\nAlphaFold 3 is an AI that learned the physical rules of origami. You type in the sequence, and in **less than 2 minutes**, it shows you the exact 3D shape on your screen down to the single atom. It's like having a superpower to see the microscopic machinery of all living things.",
        technicalAnswer: "AlphaFold 3 extends beyond single-chain proteins to model joint complexes of proteins, nucleic acids (DNA/RNA), post-translational modifications, and small-molecule ligands. It replaces AlphaFold 2's structural module with a structural Diffusion Model that operates directly on 3D Cartesian coordinates, achieving RMSD accuracies under 1.5 Å."
      },
      {
        keywords: ["nobel", "prize", "chemistry", "award", "jumper", "hassabis"],
        question: "Why did AlphaFold win the 2024 Nobel Prize in Chemistry?",
        plainAnswer: "Dr. John Jumper and Demis Hassabis won the **2024 Nobel Prize in Chemistry** because they solved a problem that stumped biology for more than 50 years: the **Protein Folding Problem**.\n\nSince Christian Anfinsen's Nobel in 1972, scientists knew that a protein's 1D code determined its 3D shape, but calculating that shape mathematically was considered impossible because there are more possible fold configurations than atoms in the universe ($10^{300}$ possibilities!).\n\nAlphaFold didn't just solve one protein—it predicted the 3D structure of almost **all 200 million known proteins** and freely open-sourced them to over 2 million biologists worldwide, speeding up biological discovery by decades.",
        technicalAnswer: "The Royal Swedish Academy of Sciences awarded the 2024 Nobel Prize in Chemistry to Demis Hassabis and John M. Jumper 'for protein structure prediction.' AlphaFold demonstrated that deep neural architectures leveraging evolutionary co-variance (Evoformer) and invariant coordinate transformations could match experimental synchrotron crystallography accuracy."
      },
      {
        keywords: ["ligand", "drug", "bind", "medicine", "pharmaceutical", "pocket"],
        question: "What is a ligand and why does binding matter?",
        plainAnswer: "A **ligand** is simply a small molecule that docks into a protein—just like a key sliding into a keyhole.\n\nAlmost all medicines you take (from aspirin to life-saving cancer drugs) are ligands. They work by finding a specific malfunctioning protein inside a virus, bacteria, or tumor cell, and plugging into its active pocket to turn it off.\n\nBefore AlphaFold 3, AI could only predict the protein, not the ligand. AlphaFold 3 can predict the protein AND the drug together, allowing pharmaceutical chemists to test millions of drug candidates on a computer before ever mixing chemicals in a beaker.",
        technicalAnswer: "Ligands are non-polymeric chemical compounds, ions, or small-molecule drugs that bind to macromolecular receptor pockets. AlphaFold 3 incorporates generalized chemical descriptions via a unified Pair Representation and Diffusion Head, predicting cross-interface binding affinities and coordinate placements with higher accuracy than specialized docking tools like AutoDock Vina."
      },
      {
        keywords: ["traditional", "crystallography", "x-ray", "cryo-em", "lab", "experiment", "cost"],
        question: "How does it compare to traditional experimental crystallography?",
        plainAnswer: "Traditional structural biology relied on two main methods: **X-ray Crystallography** and **Cryo-Electron Microscopy (Cryo-EM)**.\n\nBoth require growing a perfect microscopic crystal of the protein (which can take months or fail completely), freezing it near absolute zero, and zapping it with multi-million-dollar synchrotron radiation. A single structure took **1 to 5 years and cost $50,000 to $200,000**.\n\nAlphaFold 3 predicts these structures on standard Google Cloud TPUs in **under 2 minutes** at virtually zero marginal cost, enabling high-throughput computational screening.",
        technicalAnswer: "Experimental crystallography requires physical protein expression, purification, and crystallization, with failure rates exceeding 70% for membrane proteins and disordered domains. AlphaFold 3 computes pairwise residue representations through an invariant diffusion module, predicting full atom coordinates with confidence metrics (pLDDT and PAE) calibrated against physical experimental coordinates."
      },
      {
        keywords: ["plastic", "enzyme", "environment", "pollution", "disease", "vaccine", "application"],
        question: "Can AlphaFold design new enzymes to eat plastic or cure diseases?",
        plainAnswer: "Yes! In fact, researchers are already doing this right now:\n\n1. **Plastic-Eating Enzymes**: Teams at the University of Portsmouth used AlphaFold to re-engineer bacterial enzymes (PETase) that can break down polyethylene plastic bottles into basic organic nutrients in hours instead of centuries.\n2. **Malaria & Neglected Diseases**: Researchers at Oxford and the Carter Center are using it to design vaccines for tropical parasitic diseases that infect hundreds of millions of people.\n3. **Antibiotic Resistance**: It's helping uncover new weak points in the outer membrane of drug-resistant superbugs.",
        technicalAnswer: "AlphaFold's predicted binding interfaces allow rational computational protein design. By inverting the forward diffusion score network or using AlphaFold with MPNN, synthetic biologists design de novo catalytic pockets with targeted active site geometry for polyester hydrolysis (PETase/MHETase) and conformational epitope stabilization for subunit vaccines."
      }
    ]
  },

  gnome: {
    paperTitle: "Scaling deep learning for materials discovery (GNoME)",
    journal: "Nature (November 2023)",
    researchers: "Dr. Ekin Dogus Cubuk & Materials Exploration Team, Google DeepMind",
    simpleSummary: "GNoME (Graph Networks for Materials Exploration) expanded humanity's known stable crystalline materials from 48,000 to over 420,000—delivering the equivalent of 800 years of materials science in a single year.",
    analogy: "Imagine human civilization spent 5,000 years discovering 48,000 cooking recipes that don't spoil (like steel, bronze, and battery cathodes). GNoME is an AI master chef that understood the quantum rules of how ingredients stick together, tested billions of recipe combinations in virtual ovens, and found 380,000 brand new recipes that are guaranteed never to spoil.",
    suggestedQuestions: [
      "Can GNoME make cheaper and longer-lasting EV batteries?",
      "How did it discover 800 years of crystals in one year?",
      "What does 'thermodynamic stability' mean?",
      "Have physical labs actually synthesized any of these materials?",
      "How does GNoME help with clean energy and superconductors?"
    ],
    faqs: [
      {
        keywords: ["battery", "ev", "lithium", "sodium", "energy", "storage", "car"],
        question: "Can GNoME make cheaper and longer-lasting EV batteries?",
        plainAnswer: "Yes! That's one of GNoME's biggest breakthroughs.\n\nCurrent electric vehicles rely heavily on expensive, rare minerals like Lithium and Cobalt. GNoME discovered **528 new candidate lithium-ion battery conductors** and dozens of **sodium-ion crystal structures**.\n\nSodium comes from ordinary table salt and is thousands of times cheaper and more abundant than lithium. If batteries can use GNoME's newly discovered sodium crystal lattices, EV batteries could become dramatically cheaper and safer.",
        technicalAnswer: "GNoME discovered 528 potential lithium-ion solid-state conductors and over 2,000 layered intercalation compounds. By evaluating ionic diffusion pathways and hull distances ($\Delta E_{\text{hull}} < 0$ meV/atom), these materials offer higher energy densities and non-flammable solid electrolyte alternatives to liquid carbonate electrolytes."
      },
      {
        keywords: ["800", "years", "speed", "acceleration", "discovery", "rate"],
        question: "How did it discover 800 years of crystals in one year?",
        plainAnswer: "Before GNoME, human materials scientists discovered about **60 new stable crystals per year** using trial-and-error laboratory synthesis.\n\nIn total, all of human history had documented roughly **48,000 stable materials** in the Inorganic Crystal Structure Database (ICSD).\n\nGNoME synthesized and verified **380,000 new stable crystalline materials** in just 12 months. At the traditional human pace of 60 per year, discovering that many would have taken more than **800 years** of continuous laboratory effort!",
        technicalAnswer: "GNoME utilized an active-learning feedback loop combining Graph Neural Networks (GNNs) with Density Functional Theory (DFT) calculations. Generating candidate structures through symmetry-constrained compositional mutation and validating them via quantum DFT allowed the model's accuracy to scale from 50% to over 80% stable hit rates."
      },
      {
        keywords: ["stable", "hull", "convex", "energy", "crystals", "thermodynamic"],
        question: "What makes a crystal structure 'stable'?",
        plainAnswer: "A crystal is stable if the atoms are happier sticking together in that shape than separating into other substances.\n\nIn physics, this is measured by **energy**. Just like a ball rolling downhill stops at the lowest point, atoms want to settle into their lowest possible energy state. If the crystal's energy is on the 'Convex Hull' (the lowest energy boundary), it won't decay, rust, or decompose spontaneously. GNoME proved all 380,000 materials sit comfortably below this stability threshold.",
        technicalAnswer: "Stability is evaluated relative to the thermodynamic convex hull ($\Delta E_{\text{hull}}$). A compound is considered thermodynamically stable if its formation energy lies on the lower convex envelope of competing phases, or metastable if $\Delta E_{\text{hull}} \le 30$ meV/atom, representing accessible synthesized phases."
      },
      {
        keywords: ["physical", "lab", "berkeley", "a-lab", "synthesized", "real", "touch"],
        question: "Have physical labs actually synthesized any of these materials?",
        plainAnswer: "Yes! In a companion paper published in *Nature* by Lawrence Berkeley National Laboratory, an autonomous robotic laboratory called **A-Lab** took GNoME's digital predictions and autonomously created **41 brand new materials in physical test tubes** with zero human intervention!\n\nIndependent research teams around the world have also synthesized and confirmed dozens of GNoME's predicted crystals.",
        technicalAnswer: "Collaborative research with UC Berkeley and LBNL deployed an autonomous synthesis robot ('A-Lab') that used GNoME crystal blueprints. Across 58 attempted target compositions, A-Lab successfully synthesized 41 novel materials (a 71% autonomous synthesis success rate), confirming GNoME's predictive thermodynamic validity."
      }
    ]
  },

  graphcast: {
    paperTitle: "Learning skillful medium-range global weather forecasting (GraphCast)",
    journal: "Science (December 2023)",
    researchers: "Dr. Remi Lam & Weather AI Team, Google DeepMind",
    simpleSummary: "GraphCast predicts 10-day global weather across 1 million grid points in under 60 seconds on a single TPU, outperforming the European Centre (ECMWF) supercomputer on 90% of atmospheric variables.",
    analogy: "Imagine predicting global weather like calculating the ripples in an ocean with billions of drops of water. Traditional weather supercomputers spend 2 hours dividing the sky into mathematical boxes and solving complex fluid dynamic differential equations on thousands of computer processors. GraphCast is like an experienced pilot who spent decades studying 40 years of historical satellite records—it can look at the current sky and instantly 'see' where every storm and wind will move over the next 10 days in 45 seconds.",
    suggestedQuestions: [
      "How is GraphCast so much faster than a weather supercomputer?",
      "Did GraphCast really predict Hurricane Otis before anyone else?",
      "What does '0.25 degree resolution' actually mean?",
      "Can it predict extreme heatwaves and flash floods?",
      "Does this mean supercomputers are obsolete?"
    ],
    faqs: [
      {
        keywords: ["faster", "speed", "supercomputer", "seconds", "hours", "energy"],
        question: "How is GraphCast so much faster than a weather supercomputer?",
        plainAnswer: "Traditional numerical weather prediction (NWP) uses supercomputers with thousands of CPUs running for **2 to 3 hours**, consuming hundreds of kilowatt-hours of electricity to solve differential calculus equations.\n\nGraphCast does not solve equations from scratch every time. It uses a **Graph Neural Network (GNN)** that has already learned the patterns of fluid motion from 40 years of historical European satellite data (ERA5). Once trained, generating a full 10-day global forecast takes **under 60 seconds on a single Google TPU v4 chip**, using roughly **1,000x less electricity**.",
        technicalAnswer: "Numerical NWP integrates Navier-Stokes fluid equations over discrete grids using High-Performance Computing clusters (HRES). GraphCast implements an Encode-Process-Decode architecture on an icosahedral multi-mesh graph (6 levels of refinement). Inference requires a single forward auto-regressive pass over 37 atmospheric vertical pressure levels in 45 seconds."
      },
      {
        keywords: ["otis", "hurricane", "cyclone", "storm", "track", "landfall"],
        question: "Did GraphCast really predict Hurricane Otis before anyone else?",
        plainAnswer: "Yes. In October 2023, Hurricane Otis exploded from a weak tropical storm into a catastrophic Category 5 hurricane in just 12 hours before slamming into Acapulco, Mexico.\n\nMost traditional supercomputer models predicted Otis would stay out at sea or make landfall as a mild storm. GraphCast correctly predicted that Otis would hit the coast of Acapulco days in advance. It also accurately forecasted the landfall of Hurricane Lee in Nova Scotia three full days before standard systems.",
        technicalAnswer: "During active evaluation in late 2023, GraphCast was run operationally alongside ECMWF models. It tracked the rapid intensification and track trajectory of Hurricane Otis with higher geographic precision, accurately capturing coastal landfall hours before operational numerical consensus caught up."
      },
      {
        keywords: ["resolution", "degree", "0.25", "grid", "points", "km"],
        question: "What does '0.25 degree resolution' actually mean?",
        plainAnswer: "Resolution is how sharp the weather map is!\n\n0.25 degrees corresponds to a grid box of approximately **28 kilometers by 28 kilometers (about 17 x 17 miles)** at the equator. GraphCast calculates weather variables across **1,038,240 grid points covering the entire globe**, at **37 different heights** up into the stratosphere (from sea level to 30 km high).",
        technicalAnswer: "0.25° equiangular latitude-longitude resolution corresponds to $721 \times 1440$ spatial surface points. Across 37 pressure levels and 6 surface variables (temperature, geopotential, u/v wind components, specific humidity), GraphCast predicts over 160 million output states per timestep."
      }
    ]
  },

  fusion: {
    paperTitle: "Magnetic control of tokamak plasmas through deep reinforcement learning",
    journal: "Nature (February 2022)",
    researchers: "Dr. Jonas Degrave & Swiss Plasma Center / Google DeepMind",
    simpleSummary: "Autonomous reinforcement learning controls 19 magnetic coils 10,000 times per second to shape and contain a 100,000,000 °C star inside the TCV tokamak reactor in Switzerland without melting the container.",
    analogy: "Containing fusion plasma is like trying to squeeze a wriggling, superheated balloon of lightning using only invisible magnetic fingers. If the lightning touches the steel walls for even a fraction of a millisecond, it will instantly quench the reaction and damage the reactor. Human engineers previously had to spend months designing rigid math controllers for just one shape; our AI learns to manipulate all 19 magnetic coils simultaneously, adjusting 10,000 times every second like a world-class robotic juggler.",
    suggestedQuestions: [
      "Why is plasma at 100 million degrees and why doesn't it melt the reactor?",
      "How does reinforcement learning control the magnetic coils?",
      "What is a 'tokamak' and how does fusion make clean energy?",
      "Can AI-controlled fusion give the world limitless power?",
      "What shapes can the AI create with the plasma?"
    ],
    faqs: [
      {
        keywords: ["melt", "100", "million", "temperature", "hot", "sun", "star", "coils"],
        question: "How can plasma be 100 million degrees without melting the reactor?",
        plainAnswer: "Inside a fusion reactor, the gas is heated to **100,000,000 °C**—which is about **6 times hotter than the center of the Sun**! At that temperature, atoms smash together and fuse, releasing clean energy.\n\nNo physical material on Earth could survive touching it. So scientists use **magnetic confinement**: supercooled magnetic coils generate powerful invisible magnetic fields that hold the plasma floating suspended in a vacuum donut, never physically touching the steel reactor walls.",
        technicalAnswer: "Tokamak confinement relies on toroidal and poloidal magnetic fields creating helical flux surfaces that isolate the high-beta plasma core from the vessel divertor. The plasma boundary (separatrix) is governed by MHD (magnetohydrodynamic) equilibrium equations, actively manipulated by 19 independent magnetic actuator coils."
      },
      {
        keywords: ["reinforcement", "learning", "rl", "ai", "control", "10000", "second", "coils"],
        question: "How does reinforcement learning control the plasma in real time?",
        plainAnswer: "Plasma is turbulent, chaotic, and changes shape in microseconds.\n\nPreviously, engineers designed separate computer controllers for the plasma position, current, and shape. DeepMind trained a single **Deep Reinforcement Learning neural network** inside a computer physics simulation of the reactor. The AI learned through millions of trial-and-error runs which combination of coil voltages kept the plasma stable.\n\nOnce loaded into the physical TCV reactor in Lausanne, Switzerland, the AI measured the magnetic sensors and commanded all 19 coils **10,000 times every second (every 100 microseconds)** with zero human intervention.",
        technicalAnswer: "The control architecture uses actor-critic RL trained on a simulated tokamak environment (FGS). The neural network outputs 19 continuous coil voltage commands at 10 kHz based on 92 magnetic diagnostic measurements, maintaining plasma elongation, triangularity, and vertical position stability without manual PID tuning."
      },
      {
        keywords: ["shapes", "snowflake", "droplet", "elongation", "geometry"],
        question: "What unique shapes can the AI create?",
        plainAnswer: "The AI easily created standard tokamak shapes, but also unlocked advanced experimental geometries that human controllers struggled with: such as **'Snowflake'** (which spreads heat over multiple exhaust points) and **'Droplets'** (where two separate plasma cores are sustained simultaneously inside the same chamber).",
        technicalAnswer: "The agent demonstrated non-conventional configurations including negative triangularity, doublet configurations (simultaneously controlling two separate plasma currents in one vacuum vessel), and high-order null divertor geometries (snowflake divertor), optimizing heat exhaust dissipation."
      }
    ]
  },

  flood_hub: {
    paperTitle: "Global river flood forecasting with machine learning",
    journal: "Nature (March 2024)",
    researchers: "Dr. Yossi Matias & Global Hydrology Team, Google Research",
    simpleSummary: "Flood Hub models river discharges and predicts catastrophic river floods up to 7 days in advance across 80 countries, safeguarding over 700 million people without needing physical river sensors.",
    analogy: "Imagine an umbrella that opens a week before the rain even starts. In rich nations, rivers have thousands of expensive electronic depth sensors. In developing nations, rivers have almost none, leaving villages blind to tidal waves and river crests. Flood Hub uses satellites to watch the entire continent's rainfall and soil wetness, then mentally simulates how trillions of drops will trickle through mountains and valleys to warn villagers a full week before the river overflows.",
    suggestedQuestions: [
      "How can Flood Hub predict river floods without physical sensors on the river?",
      "How do regular villagers and emergency crews receive the warnings?",
      "How many countries and people are protected by this system?",
      "Why did traditional flood prediction only give 1 to 2 days warning?",
      "Is Flood Hub free for everyone to use?"
    ],
    faqs: [
      {
        keywords: ["sensor", "gauges", "ungauged", "satellite", "predict", "without"],
        question: "How can Flood Hub forecast floods without physical river sensors?",
        plainAnswer: "Most developing countries have 'ungauged' rivers—meaning there are no electronic sensors in the water to report river depth.\n\nFlood Hub solves this using **global satellite observation and AI**. It takes satellite weather data (rainfall, temperature, snowmelt, and soil moisture) and topographic elevation maps. Its Long Short-Term Memory (LSTM) neural networks have learned how soil absorbs water and how gravity channels rainwater into riverbeds, predicting the river's water level 7 days before it crests.",
        technicalAnswer: "Flood Hub employs an ensemble of rainfall-runoff LSTM models trained on global catchment characteristics and meteorological reanalysis (ERA5). The hydrologic model simulates basin-wide soil infiltration, baseflow, and surface runoff, passing predicted discharges into a spatial inundation hydraulic model calibrated via SAR (Synthetic Aperture Radar) satellite imagery."
      },
      {
        keywords: ["people", "countries", "coverage", "alert", "notification", "mobile"],
        question: "How do frontline communities receive the flood alerts?",
        plainAnswer: "Alerts are distributed directly through **Google Search, Google Maps, and Android notifications** in over 40 local languages. If you live in an area at risk, you receive a critical notification on your smartphone: *'Severe flooding expected along the Brahmaputra River in 4 days.'*\n\nGoogle also partners with international disaster agencies like the Red Cross, Red Crescent, and the United Nations to coordinate early evacuations and food supplies.",
        technicalAnswer: "Flood alerts are broadcast via the Google Public Alerts infrastructure, Web API endpoints, and direct integrations with national hydrometeorological agencies and the International Federation of Red Cross (IFRC), enabling anticipatory disaster financing and pre-emptive evacuation routing."
      }
    ]
  },

  enformer: {
    paperTitle: "Effective gene expression prediction from sequence by integrating long-range interactions",
    journal: "Nature Methods (December 2021)",
    researchers: "Dr. Ziga Avsec & Genomics AI Team, Google DeepMind",
    simpleSummary: "Enformer reads human DNA sequences across a massive 100,000-base-pair window to understand how mutations in 'dark DNA' turn genes on or off, unlocking the causes of complex genetic diseases.",
    analogy: "Imagine your DNA is a 3-billion-letter manual. For years, scientists only read the words that directly spell out proteins (only 2% of the book!). The other 98% was called 'dark matter DNA'. It turns out that dark DNA is full of master volume knobs and light switches that control the protein words from thousands of letters away. Enformer has an ultrawide magnifying glass that can see the switch and the lightbulb simultaneously.",
    suggestedQuestions: [
      "What is 'dark DNA' and why is 98% of our genome not genes?",
      "How does Enformer read 100,000 DNA letters at the same time?",
      "Can this help doctors diagnose rare genetic diseases?",
      "What is the difference between an enhancer and a promoter?",
      "Why did older AI models struggle with long-range DNA?"
    ],
    faqs: [
      {
        keywords: ["dark", "dna", "98", "non-coding", "genome", "switches"],
        question: "What is 'dark DNA' and why does 98% of our genome not code for proteins?",
        plainAnswer: "Only **2% of human DNA** codes directly for the proteins that make up your skin, hair, and blood cells. The remaining **98%** used to be called 'junk DNA' or 'dark DNA'.\n\nScientists discovered that this 98% is actually the regulatory computer code of life: it acts like billions of dimmer switches (called enhancers and promoters) that tell cells *when*, *where*, and *how much* of a protein to manufacture. When one of these dimmer switches has a tiny typo, it can lead to cancers, autoimmune disorders, or diabetes.",
        technicalAnswer: "Non-coding DNA contains cis-regulatory elements (enhancers, silencers, insulators, and promoters). Genome-wide association studies (GWAS) show that over 90% of disease-associated variants reside in non-coding regions, functioning by altering transcription factor binding motifs rather than amino acid sequences."
      },
      {
        keywords: ["100000", "window", "transformer", "attention", "letters", "base", "pairs"],
        question: "How does Enformer read 100,000 letters at once?",
        plainAnswer: "Previous AI models could only look at about 20,000 DNA letters at a time. But in human cells, an enhancer switch can be located **100,000 base pairs away** from the gene it controls!\n\nEnformer uses a specialized **Transformer architecture** (similar to modern language models) with self-attention. This allows it to look across a huge 100,000-letter span and mathematically calculate how distant genetic letters loop around in 3D space to touch and activate gene promoters.",
        technicalAnswer: "Enformer combines convolutional layers for local motif extraction with 11 self-attention Transformer layers spanning a 196,608 base pair receptive field. This enables attention heads to model distal chromatin loops and enhancer-promoter interactions, yielding an 80% improvement in gene expression variant effect prediction."
      }
    ]
  },

  wildfire: {
    paperTitle: "Real-time satellite thermal infrared wildfire perimeter mapping",
    journal: "Google Research & USFS Partnership (2024)",
    researchers: "Dr. Clara O'Connor & Earth Observation Team",
    simpleSummary: "Fire AI synthesizes geostationary thermal infrared satellite streams to track fast-moving wildfire perimeters every 15 minutes, cutting through opaque smoke plumes to guide frontline firefighters.",
    analogy: "When a massive wildfire burns, it generates a suffocating chimney of dense black smoke that makes it impossible for aircraft or standard satellites to see where the fire line actually is. It's like driving through a blinding blizzard at night. Fire AI uses thermal infrared night-vision goggles from space that ignore smoke completely, seeing only the blazing heat of the ground to draw an exact boundary line every 15 minutes.",
    suggestedQuestions: [
      "Why does smoke blind regular satellite cameras but not thermal infrared?",
      "How does AI tell the difference between a real fire and a hot factory chimney?",
      "What is a 'spot fire' and how do embers spread fires?",
      "How quickly do frontline firefighters receive the perimeter map?",
      "How is this displayed on Google Maps for the public?"
    ],
    faqs: [
      {
        keywords: ["smoke", "pierce", "infrared", "thermal", "camera", "blind", "visible"],
        question: "Why does smoke blind visible cameras but not thermal infrared?",
        plainAnswer: "Visible light has very short wavelengths (about 0.5 micrometers), which scatter violently when they hit airborne smoke particles, making smoke look completely opaque like a solid grey cloud.\n\n**Thermal infrared radiation** has much longer wavelengths (between 3.9 and 11 micrometers). These long waves pass right through the smoke particles without scattering! By tuning satellite sensors to thermal infrared, Fire AI 'sees' the ground as if the smoke wasn't even there.",
        technicalAnswer: "Optical scattering in smoke obeys Rayleigh and Mie regimes where cross-sections scale inversely with wavelength ($\sim \lambda^{-4}$ to $\lambda^{-1}$). At 3.9 µm (mid-wave IR) and 10.8 µm (thermal IR), atmospheric optical depth through aerosol columns is orders of magnitude lower than visible spectrum 0.64 µm, enabling direct ground radiance detection."
      },
      {
        keywords: ["spot", "embers", "spread", "danger", "jump", "wind"],
        question: "What is a 'spot fire' and why is it so dangerous?",
        plainAnswer: "A **spot fire** happens when strong winds pick up burning twigs and pine needles (embers) and blow them miles ahead of the main fire line, igniting new fires across rivers and highways.\n\nSpot fires are the #1 reason firefighters get trapped and neighborhoods burn. Fire AI continuously scans the surrounding forest and places blinking alert markers whenever new hotspots appear ahead of the perimeter.",
        technicalAnswer: "Fire AI utilizes contextual spatial filtering to detect isolated high-temperature sub-pixel thermal anomalies beyond the contiguous flaming front, classifying them as candidate spot fire ignitions caused by convective firebrand transport before human aerial reconnaissance can report them."
      }
    ]
  },

  ferminet: {
    paperTitle: "Ab-initio solution of the many-electron Schrödinger equation with deep neural networks (FermiNet)",
    journal: "Physical Review Research (October 2020)",
    researchers: "Dr. David Pfau & Quantum Chemistry Team, Google DeepMind",
    simpleSummary: "FermiNet computes exact quantum molecular wavefunctions from pure first principles, solving the multi-electron Schrödinger equation with sub-millihartree precision without needing any experimental lab measurements.",
    analogy: "Electrons are not tiny billiard balls orbiting a nucleus; they are spooky quantum probability clouds that constantly dance and repel each other. When two identical electrons trade places, their quantum wave must flip upside down (a rule called the Pauli exclusion principle). FermiNet is a neural network designed with this symmetry built into its mathematical DNA, letting it calculate the exact quantum glue that holds chemical molecules together.",
    suggestedQuestions: [
      "What is the Schrödinger equation and why is it so hard to solve?",
      "What does 'antisymmetric wavefunction' mean?",
      "Why does chemistry need sub-millihartree precision?",
      "How does FermiNet help discover new battery catalysts and medicines?",
      "How does it compare to Hartree-Fock or Density Functional Theory?"
    ],
    faqs: [
      {
        keywords: ["schrodinger", "equation", "quantum", "first", "principles", "hard"],
        question: "What is the Schrödinger equation and why is it so hard to solve?",
        plainAnswer: "The **Schrödinger equation** is the fundamental equation of quantum physics. Written in 1926, it describes the exact behavior of all electrons, atoms, and chemical reactions in the universe.\n\nPaul Dirac, the Nobel Prize-winning physicist, famously observed that while the laws for all of chemistry are completely known, the equations are far too complicated to actually solve! For every electron you add to an atom, the math complexity explodes exponentially ($3^N$). Even the world's greatest supercomputers couldn't calculate exact solutions for molecules larger than hydrogen or helium without making crude approximations.",
        technicalAnswer: "The electronic Schrödinger equation $\hat{H}\Psi = E\Psi$ in $3N$-dimensional configuration space suffers from the curse of dimensionality. Electron correlation energy requires intractable multiconfigurational wavefunctions (Full CI). FermiNet uses deep neural networks as a variational Ansatz optimized via Variational Quantum Monte Carlo (VMC)."
      },
      {
        keywords: ["antisymmetric", "pauli", "exclusion", "fermion", "sign"],
        question: "What does 'antisymmetric wavefunction' mean?",
        plainAnswer: "Electrons belong to a family of quantum particles called **fermions**. They obey a fundamental rule of nature called the **Pauli Exclusion Principle**: no two electrons can ever exist in the exact same quantum state at the same time.\n\nMathematically, if you swap the coordinates of any two electrons, the wavefunction must flip its algebraic sign (from $+$ to $-$). FermiNet was the first neural network specifically built to enforce this mathematical anti-symmetry automatically for any number of interacting electrons.",
        technicalAnswer: "FermiNet's architecture uses multi-determinant neural networks where each determinant is composed of generalized single-electron orbitals that depend on the coordinates of all other electrons: $\psi_i(\mathbf{r}_j; \{\mathbf{r}_{k \neq j}\})$, satisfying the Slater determinant antisymmetry requirement while capturing dynamic electron-electron correlation directly."
      }
    ]
  },

  alphageometry: {
    paperTitle: "Solving olympiad geometry without human demonstrations (AlphaGeometry)",
    journal: "Nature (January 2024)",
    researchers: "Dr. Trieu Trinh & Symbolic AI Team, Google DeepMind",
    simpleSummary: "AlphaGeometry combines a neural language model with a formal deduction engine to solve 25 of 30 International Mathematical Olympiad geometry problems, achieving the skill level of a human gold medalist.",
    analogy: "Imagine solving a tricky geometry puzzle where you have a triangle and need to prove two angles are identical. A human mathematician often has an 'artistic flash of inspiration' to draw a secret dotted helper line (like connecting two corners). Once that line is drawn, strict logical rules take over to prove the theorem. AlphaGeometry pairs an intuitive creative neural network (the artist that dreams up the helper lines) with a strict computer deduction engine (the rigorous judge that verifies every mathematical step).",
    suggestedQuestions: [
      "How does AlphaGeometry combine neural intuition with symbolic logic?",
      "What is an 'auxiliary construction' in geometry?",
      "How did it train without using human homework or textbooks?",
      "Did it really perform at the level of an Olympiad gold medalist?",
      "Could this lead to AI proving new unsolved math conjectures?"
    ],
    faqs: [
      {
        keywords: ["intuition", "symbolic", "neuro-symbolic", "logic", "how", "works", "combine"],
        question: "How does AlphaGeometry combine intuition with symbolic logic?",
        plainAnswer: "Human mathematicians solve hard geometry problems using two different mental gears:\n\n1. **Fast Intuition**: Thinking 'Hey, what if I draw a circle through points A and B?'\n2. **Slow Deductive Logic**: Methodically applying established axioms step-by-step.\n\nAlphaGeometry pairs these two exact systems together:\n- A **Neural Language Model** acts as the intuitive right brain: it looks at the geometry diagram and suggests creative auxiliary lines or points.\n- A **Computer Symbolic Deduction Engine** acts as the left brain: it uses formal logic to test the theorem and ensure there are zero mathematical errors or hallucinations.",
        technicalAnswer: "AlphaGeometry is a neuro-symbolic framework coupling a Transformer-based neural model with a symbolic deduction engine (algebraic deduction and DD/AR engines). The symbolic engine conducts forward-chaining deduction; when progress halts, the language model predicts auxiliary geometric elements (points, lines, circles) to restart deductive derivation."
      },
      {
        keywords: ["olympiad", "imo", "gold", "human", "benchmark", "score", "25"],
        question: "How does 25 out of 30 compare to human Olympiad contestants?",
        plainAnswer: "The International Mathematical Olympiad (IMO) is the most prestigious high school competition in the world. Its geometry problems require intense mathematical creativity and multi-page formal proofs.\n\nAcross 30 historical Olympiad geometry problems:\n- The previous state-of-the-art computer program could only solve **10**.\n- Average human bronze medalists solve **19.3**.\n- Average human **gold medalists solve 25.9**.\n\nAlphaGeometry solved **25 out of 30**, performing on par with the world's most brilliant human math students with zero human coaching!",
        technicalAnswer: "Evaluated on the IMO-AG-30 benchmark compiled from 2000 to 2022 IMO competitions under standard IMO time limits, AlphaGeometry solved 25 problems within the allotted time, significantly exceeding Wu's method (10 problems) and reaching the 25.9 mean score of human IMO gold medalists."
      }
    ]
  },

  bioacoustics: {
    paperTitle: "Bioacoustic monitoring of animal populations and endangered species with deep embeddings (Perch)",
    journal: "Google Research & Global Conservation Partners (2024)",
    researchers: "Dr. Tom Denton & Bioacoustics Conservation Team",
    simpleSummary: "Perch transforms thousands of hours of noisy rainforest audio into automated biodiversity monitoring, identifying more than 10,000 species of birds, frogs, and mammals from distant chirps in dense canopies.",
    analogy: "Trying to count endangered birds by walking through a dense tropical rainforest is like trying to find a needle in a haystack—birds fly away the moment they hear human footsteps, and thick leaves hide everything. But birds constantly sing. Perch is like an expert birdwatcher with superhuman hearing stationed in 1,000 treetops at once, listening through roaring tropical rainstorms and instantly recognizing the unique voice of every endangered creature.",
    suggestedQuestions: [
      "How does Perch distinguish bird chirps through loud wind and rainstorms?",
      "How many species can it identify?",
      "Why is bioacoustic audio better than camera traps for wildlife conservation?",
      "Can citizen scientists and birders use this in their backyard?",
      "How is this helping protect endangered species in Hawaii and the Amazon?"
    ],
    faqs: [
      {
        keywords: ["sound", "audio", "rain", "noise", "spectrogram", "hearing", "chirp"],
        question: "How can it detect tiny chirps through roaring wind and rainfall?",
        plainAnswer: "Perch converts raw sound waves into visual pictures of sound called **spectrograms** (visual graphs showing frequency and pitch over time).\n\nEven when human ears are overwhelmed by rain or diesel generators, an animal's chirp has a distinct mathematical fingerprint on the spectrogram. Perch was trained on millions of audio samples to ignore background drone frequencies and lock onto the harmonic signature of animal vocalizations.",
        technicalAnswer: "Perch converts continuous raw audio into mel-scale log-magnitude spectrograms, passing them through an EfficientNet convolutional architecture trained with multi-species contrastive loss. The resulting high-dimensional embeddings cluster distinct vocalization repertoires even in low signal-to-noise ratio (SNR) acoustic environments."
      },
      {
        keywords: ["species", "10000", "coverage", "animals", "birds", "frogs"],
        question: "How many species does Perch catalog?",
        plainAnswer: "Perch can identify over **10,000 species of birds, amphibians, and mammals** across 6 continents. It is already deployed in the Hawaiian rainforests tracking critically endangered honeycreepers, in the Amazon basin cataloging canopy primates, and in the boreal forests of Canada.",
        technicalAnswer: "Trained on global bioacoustic repositories including Xeno-Canto and Macaulay Library datasets, Perch supports zero-shot and few-shot fine-tuning for regional species inventories, processing over 10,000 taxonomic classes with calibrated confidence scores."
      }
    ]
  }
};

/**
 * Intelligent scientific answer generator that synthesizes answers for custom queries
 * grounded in the specific paper data.
 */
export function queryPaperKnowledge(projectId, userQuestion, mode = 'plain') {
  const project = PAPER_KNOWLEDGE_BASE[projectId];
  if (!project) {
    return "I am ready to answer your questions about this scientific research paper. What would you like to know?";
  }

  const query = userQuestion.toLowerCase().trim();

  // 1. Direct FAQ keyword matching
  for (const faq of project.faqs) {
    if (faq.keywords.some(kw => query.includes(kw))) {
      return mode === 'technical' && faq.technicalAnswer ? faq.technicalAnswer : faq.plainAnswer;
    }
  }

  // 2. Check for general intent keywords
  if (query.includes("analogy") || query.includes("metaphor") || query.includes("think of")) {
    return project.analogy;
  }

  if (query.includes("what is") || query.includes("summary") || query.includes("overview") || query.includes("about")) {
    return `${project.simpleSummary}\n\n**Here's an easy way to picture it:**\n${project.analogy}`;
  }

  if (query.includes("who") || query.includes("author") || query.includes("researcher") || query.includes("team")) {
    return `This research was led by **${project.researchers}** and published in ***${project.journal}*** under the title *"${project.paperTitle}"*.`;
  }

  if (query.includes("12") || query.includes("simple") || query.includes("kid") || query.includes("eli5")) {
    const eli5 = project.faqs[0];
    return eli5 ? (mode === 'technical' ? eli5.technicalAnswer : eli5.plainAnswer) : project.analogy;
  }

  // 3. Dynamic contextual synthesis based on the paper's facts
  const response = `Regarding **"${userQuestion}"** in *${project.paperTitle}*:\n\n${project.simpleSummary}\n\n**Key Insight:**\n${project.analogy}\n\nFeel free to ask me to explain any specific term or how our results compare to traditional experiments!`;

  return response;
}

/**
 * Live Gemini API caller for open-ended conversation when an API key is available.
 */
export async function askGeminiAPI({ apiKey, projectId, projectData, userQuestion, conversationHistory = [], mode = 'plain' }) {
  const kb = PAPER_KNOWLEDGE_BASE[projectId] || {};

  const systemInstruction = `You are the lead author and scientific communicator for the research paper: "${projectData.title}" (${projectData.subtitle}), published in Nature/Science by ${projectData.researcher.name} (${projectData.award || 'Google DeepMind'}).

Your role is to explain this actual research paper to science fair attendees, students, and curious researchers in an understandable, engaging, and vivid way.

Core Principles:
1. Ground your answers strictly in this paper's actual methodology (${projectData.centerPanel.methodology}), metrics, and real-world impact (${projectData.rightPanel.impactPoints.join('; ')}).
2. TONE: ${mode === 'technical' ? 'Provide deep technical rigor, citing specific mathematical and neural architectures with precise scientific terminology.' : 'Warm, clear, and relatable. Use vivid everyday analogies (like Richard Feynman). Explain jargon before using it. Never be condescending.'}
3. Answer length: 2-3 focused paragraphs or crisp bullet points.
4. If asked to explain like a 12-year-old or for a simple analogy, use the paper's established analogy: ${kb.analogy || 'Use an everyday physical analogy.'}
5. You can reference Dr. ${projectData.researcher.name.split('&')[0].trim()}'s perspective: "${projectData.researcher.quote}"`;

  const contents = [
    ...conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })),
    {
      role: 'user',
      parts: [{ text: userQuestion }]
    }
  ];

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!replyText) {
    throw new Error('Empty response from model');
  }

  return replyText;
}

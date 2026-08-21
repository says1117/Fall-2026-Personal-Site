/* ===========================================================================
   data.js — the only file you need to edit.

   PROFILE  = the header (name, tagline, contact links)
   TABS     = an array of tabs. Add a tab by copying one object and editing it.

   Every entry uses the SAME shape. Every field is optional — leave out what
   you don't need and the layout adjusts.

   {
     title:    'Big line',                       // required-ish
     subtitle: 'Second line (org, school, ...)',
     meta:     'Right-aligned date or location',
     tags:     ['Chip', 'Chip'],                 // renders as pill chips
     links:    [{ label: 'GitHub', url: '...' }],
     points:   ['Bullet one', 'Bullet two'],
   }
   =========================================================================== */

const PROFILE = {
  firstName: 'Steven',
  lastName: 'Yodice-Smith',
  tagline:
    'Computer Science @ UCF. I am passionate about build systems that convert real world problems into software integrated solutions.',
  kicker: 'Orlando, FL · Software Engineer',
  links: [
    { label: 'Email', url: 'mailto:saysschool4321@gmail.com', text: 'saysschool4321@gmail.com' },
    { label: 'Phone', url: 'tel:+14079136050', text: '407-913-6050' },
    { label: 'GitHub', url: 'https://github.com/says1117', text: 'says1117' },
    { label: 'LinkedIn', url: 'http://www.linkedin.com/in/stevenyodice-smith', text: 'stevenyodice-smith' },
  ],
  // Drop a PDF next to index.html and this button appears in the header.
  resume: { label: 'Résumé', url: 'Steven_Resume.pdf' },
};

const TABS = [
  /* ---------------------------------------------------------------- TAB 1 */
  {
    id: 'experience',
    label: 'Experience',
    note: 'Where I have shipped work on a team.',
    entries: [
      {
        title: 'Incoming Software Engineer Intern',
        subtitle: 'Limbitless Solutions',
        meta: 'August 2026 — Present',
      },
      {
        title: 'Undergraduate Research Assistant',
        subtitle: '',
        meta: 'August 2026 — Present',
        tags: ['C, C++'],
        links: [{label: 'Website', url: 'http://genome.ucf.edu/index.php'}],
        points: [
          '',
        ],
      },
      {
        title: 'Software Engineer Intern',
        subtitle: 'METIL: Institute for Simulations and Training',
        meta: 'May 2026 — July 2026',
        tags: ['Unity', 'C#', 'MediaPipe', 'Computer Vision'],
        links: [{label: 'GitHub', url: 'https://github.com/KahlenHernani/3d_Model_Viewer'}],
        points: [
          'Contributed to KCNSC with a 3-person team, building a Unity application that converts webcam hand landmarks into gesture-based 3D model controls.',
          'Implemented real-time gesture recognition with MediaPipe, detecting pinch and multi-hand poses to drive rotation, zoom, and explode/reset actions.',
          'Built a jitter-free camera rotation and zoom system in Unity (C#) that translates live gesture data into smooth model manipulation.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- TAB 2 */
  {
    id: 'projects',
    label: 'Projects',
    note: 'Things I built because I wanted them to exist.',
    entries: [
      {
        title: 'Open Source Contributions',
        subtitle: 'NVIDIA RAFT · Kubernetes · PyTorch · Cloudflare workerd',
        tags: ['C++', 'CUDA', 'TypeScript', 'Python', 'Go'],
        links: [{ label: 'GitHub', url: 'https://github.com/says1117' }],
        points: [
          'Fixed a cross-GPU CI flake in NVIDIA RAFT’s Lanczos eigensolver, rebuilding its tests around property-based eigenpair validity checks.',
          'Resolved a security gap in Kubernetes’ kubelet exec/run routes that let stale UIDs resolve to the wrong pod.',
          'Eliminated a file-descriptor leak in PyTorch’s elastic c10d rendezvous that exhausted the process’s open-file limit.',
          'Corrected a Node.js Buffer API compatibility bug across 7 encoding methods in Cloudflare’s workerd runtime.',
        ],
      },
      {
        title: 'AutoBot',
        subtitle: 'AI-Integrated Robotics harnessed using Grok',
        tags: ['Python', 'C++', 'CUDA', 'YAML', 'Bash', 'Dockerfile'],
        meta: 'In Progess :)',
        points: [
          'Architected a dual-system agent stack pairing an LLM reasoning layer (xAI Grok) with learned control policies, using structured function calling for skill dispatch and closed-loop replanning on failure.',
          'Trained PPO reinforcement learning policies in NVIDIA Isaac Sim / Isaac Lab across thousands of GPU-parallel physics environments with domain randomization for robustness.',
        ],
      },
      {
        title: 'Remote Agent Orchestration',
        subtitle: 'Computer session remotely optimized by agents',
        tags: ['TypeScript', 'Python'],
        links: [{ label: 'GitHub', url: 'https://github.com/says1117/Remote-Agent-Orchestration' }],
        points: [
          'Designed a Gemini-powered multi-agent orchestrator on Google ADK and Cloud Run, routing Pub/Sub telemetry into a Next.js companion app for remote PC diagnosis, approval, and rollback.',
          'Built a repo-aware prompt optimizer that compiles raw requests into scoped coding briefs for an on-host Antigravity agent.',
        ],
      },
      {
        title: 'HEAL',
        subtitle: 'Partition-tolerant EHR platform with clinical ML',
        tags: ['Rust', 'Python', 'PyTorch', 'TypeScript', 'React', 'Kubernetes'],
        points: [
          'Built a Rust EHR backend with delta-state CRDTs and gossip sync, achieving 100% write availability through simulated network partitions.',
          'Trained a calibrated PyTorch model for patient readmission risk and lab-trend drift detection on synthetic data.',
          'Built a RAG clinical assistant with patient-isolated retrieval and cited, hallucination-resistant responses.',
          'Connected a React frontend to 5 microservices via a TypeScript/Fastify gateway, deployed on Kubernetes.',
        ],
      },
      {
        title: 'Flowstate',
        subtitle: 'Live status Crpyto tracking',
        tags: ['Go', 'Python', 'LightGBM', 'Websocket'],

        points: [
          'Ingested live Coinbase L2 order book data over WebSocket with lossless gzip storage and crossed-book integrity validation',
          'Built shared Go feature pipeline across research and live inference to eliminate train/serve skew',
          'Implemented risk engine with fractional Kelly sizing, ATR stops, equity caps, and a drawdown circuit breaker'
        ],
      },
      {
        title: 'DayTrader Engine',
        subtitle: 'Algorithmic NASDAQ trader / data collector',
        tags: ['Python', 'FastAPI', 'SQLite', 'Alpaca API'],
        points: [
          'Validated Opening Range Breakout strategy across 9 half-year periods (2022–2026) achieving +5.4% compounded return and 1.19 profit factor',
          'Built event-driven backtester reusing production code with no lookahead bias and slippage modeling',
          'Integrated Alpaca API for bracket orders, auto-scheduled execution, and PDT-compliant risk management'
        ],
      },
      {
        title: 'Collaborative Code Editor',
        subtitle: 'Real-time Team-based IDE',
        tags: ['React', 'TypeScript','Node.js', 'Socket.io', 'Docker', 'Kubernetes'],
        links: [{label: 'GitHub', url: 'https://github.com/says1117/Collaborative-Compiler'}],
        points: [
          'Built real-time collaborative code editor with WebSocket synchronization supporting multi-user editing with <50ms latency',
          'Implemented operational transforms using Yjs for conflict-free concurrent edits across distributed clients',
          'Developed full-stack TypeScript app with React + Monaco Editor and Node.js + Socket.io backend',
          'Integrated Redis for session persistence and PostgreSQL for storage, deployed via Docker + Kubernetes'
        ]
      },
      {
        title: 'VAST — Visual ASL Speech Translator',
        subtitle: 'Real-time ASL interpreter, webcam to spoken word',
        tags: ['Python', 'PyTorch', 'MediaPipe', 'OpenCV'],
        links: [{ label: 'GitHub', url: 'https://github.com/says1117/ASL-to-TTS'}],
        points: [
          'Led a 3-person team to build a real-time ASL interpreter with a 4-layer PyTorch neural network achieving 70%+ confidence on 63 hand landmarks.',
          'Developed a hand tracking pipeline with OpenCV and MediaPipe, normalizing wrist-relative coordinates for accurate live webcam sign detection.',
          'Integrated Google Gemini 2.5 Flash for AI-assisted word reconstruction and the ElevenLabs TTS API for natural speech output with threaded audio playback.',
          'Implemented a 20-frame debouncing system to stabilize gesture input, enabling reliable word-building and single-letter vocalization modes.',
        ],
      },
      {
        title: 'KeyCursor',
        subtitle: 'Real-time ASL interpreter, webcam to spoken word',
        tags: ['Python', 'Pynput', 'Pycairo'],
        links: [{ label: 'GitHub', url: 'https://github.com/mwhroom/KeyCursor'}],
        points: [
          'Developed Vim keyboard-driven cursor system enabling mouse-free navigation and interaction',
          'Implemented global keyboard listeners using pynput to capture and process real-time input events',
          'Designed graphical overlays and cursor rendering with pycairo for visual feedback and precision control',
          'Collaborated within a 5-member agile team using Git for version control and coordinated feature integration',
          'Engineered cross-platform compatibility across Windows and Linux environments through modular system abstraction'
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- TAB 3 */
  {
    id: 'education',
    label: 'Education',
    entries: [
      {
        title: 'University of Central Florida',
        subtitle: 'B.S. Computer Science · 3.95 GPA',
        meta: 'Aug. 2025 — May 2028',
        tags: ['Orlando, FL'],
      },
      {
        title: 'Valencia College',
        subtitle: 'Associate in Arts · 4.0 GPA',
        meta: 'Aug. 2022 — May 2025',
        tags: ['Orlando, FL'],
      },
      {
        title: 'Relevant Coursework',
        tags: [
          'Data Structures & Algorithms',
          'Advanced Data Structures & Algorithms',
          'Object-Oriented Programming',
          'System Software',
          'Web Development',
          'Computer Architecture',
          'Algorithms for Machine Learning',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- TAB 4 */
  {
    id: 'skills',
    label: 'Skills',
    entries: [
      {
        title: 'Languages',
        tags: ['Java', 'Python', 'C', 'C++', 'TypeScript', 'JavaScript', 'HTML/CSS', 'C# (Unity)', 'Go', 'Rust'],
      },
      {
        title: 'Developer Tools',
        tags: ['Git/GitHub', 'VS Code', 'Docker', 'Kubernetes', 'CLion', 'PyCharm', 'IntelliJ', 'Vercel', 'Anaconda',
          'Isaac Sim'
        ],
      },
      {
        title: 'Libraries & Frameworks',
        tags: [
          'React', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL', 'Redis', 'Pynput', 'Pycairo',
          'PyTorch', 'Scikit-learn', 'OpenCV', 'MediaPipe', 'NumPy', 'Pandas', 'Matplotlib',
          'TensorFlow', 'Seaborn', 'cuDNN'
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------------
     ADD A NEW TAB: uncomment, rename, done. It appears in the tab bar
     automatically and gets its own #hash URL.

  {
    id: 'writing',
    label: 'Writing',
    note: 'Optional one-line description under the heading.',
    entries: [
      {
        title: 'Post title',
        subtitle: 'Where it was published',
        meta: '2026',
        tags: ['Tag'],
        links: [{ label: 'Read', url: 'https://example.com' }],
        points: ['A line about it.'],
      },
    ],
  },
  ------------------------------------------------------------------------ */
];

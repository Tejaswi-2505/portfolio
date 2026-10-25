import { useState, useEffect } from 'react'
import photo from './assets/photo.jpg'
import './index.css'

// ── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: 'Hospital RAG Chatbot with Graph Intelligence',
    subtitle: 'Ask any question about hospital data — in plain English',
    liveUrl: 'http://35.175.226.154:8501/',
    dataset: 'Custom clinical dataset with 10,000+ patient visits, 9,649 patients, 500 physicians across 30 hospitals — stored in a graph database (Neo4j).',
    description: `Imagine being able to ask a hospital's entire database a question like "How many emergency visits happened this year?" or "Which doctors have the best patient reviews?" — and getting an instant, accurate answer in plain English, no technical knowledge needed.

That's exactly what this system does. It's a smart chatbot built on top of real hospital data that understands natural language and finds the right answer from two sources: structured records (like a super-powered spreadsheet) and patient review text (like reading through thousands of reviews at once).

The system was designed and deployed as a real, working application — not just a prototype. It handles thousands of users simultaneously and has been measured at 92% response accuracy.`,
    whatItDoes: [
      'Answers questions about patients, doctors, hospitals, and billing in plain English',
      'Reads and understands thousands of patient reviews to answer experience-based questions',
      'Tells you real-time hospital wait times and which hospital has the shortest queue',
      'Runs 24/7 on the cloud with 99.9% uptime',
    ],
    techStack: [
      { name: 'Python', desc: 'Core programming language' },
      { name: 'GPT-4', desc: 'The AI brain that understands and answers questions' },
      { name: 'LangChain', desc: 'Connects the AI to the database and tools' },
      { name: 'Neo4j', desc: 'Graph database storing hospital relationships' },
      { name: 'FastAPI', desc: 'High-speed web server handling requests' },
      { name: 'Streamlit', desc: 'The chat interface you interact with' },
      { name: 'Docker', desc: 'Packages everything so it runs anywhere' },
      { name: 'AWS EC2', desc: 'Cloud server hosting the live application' },
    ],
    metrics: [
      { label: 'Response Accuracy', value: '92%' },
      { label: 'Patient Records', value: '10K+' },
      { label: 'Query Latency Reduced', value: '75%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    color: 'from-blue-600 to-indigo-700',
    icon: '🏥',
    tag: 'AI Chatbot · Live Demo',
  },
  {
    id: 2,
    title: 'Turbofan Engine Predictive Maintenance',
    subtitle: 'Predicting engine failure before it happens — using NASA data',
    liveUrl: 'http://54.93.88.178:8501/',
    dataset: 'NASA CMAPSS (Commercial Modular Aero-Propulsion System Simulation) dataset — 709 training engines, about 160,000 engine cycles, 21 sensors per engine cycle, across all four FD001–FD004 subsets.',
    description: `Every machine has a lifespan — but knowing exactly when it will fail is the difference between a planned maintenance stop and a costly breakdown. This project answers one critical question: "How many more operating cycles does this engine have before it needs maintenance?"

Using real NASA turbofan engine data, two AI models were trained and compared. Think of each engine like a patient whose vitals (21 sensors) are monitored every cycle. By engineering 45 rolling-window features and analyzing patterns across thousands of past engine life cycles, the models learned to predict how much life remains.

The winning model (LSTM — a type of AI that learns from sequences over time) achieved significantly better accuracy than the XGBoost baseline, and was deployed as TensorFlow Lite on AWS Lambda behind a live cloud-based Streamlit dashboard where you can select any engine, see its sensor trends, and get an instant health prediction.`,
    whatItDoes: [
      'Predicts Remaining Useful Life (RUL) of engines in cycles',
      'Shows real-time sensor trend charts for any engine',
      'Color-coded health status: Green (healthy), Yellow (warning), Red (critical)',
      'Fleet overview — monitor 20 engines at once on a single dashboard',
      'Compares two AI models (XGBoost vs LSTM) side-by-side with proof',
    ],
    techStack: [
      { name: 'Python', desc: 'Core programming language' },
      { name: 'LSTM (TensorFlow)', desc: 'Deep learning model that learns degradation patterns over time' },
      { name: 'XGBoost', desc: 'Decision-tree model used as a comparison benchmark' },
      { name: 'TensorFlow Lite', desc: 'Compressed model format deployed for fast inference' },
      { name: 'AWS Lambda', desc: 'Serverless function that runs predictions on demand' },
      { name: 'API Gateway', desc: 'Secure endpoint connecting the dashboard to the AI' },
      { name: 'Streamlit', desc: 'Interactive dashboard with a live RUL gauge and fleet monitoring' },
    ],
    metrics: [
      { label: 'LSTM RMSE', value: '13.17 cycles' },
      { label: 'XGBoost RMSE', value: '19.19 cycles' },
      { label: 'NASA Score (LSTM)', value: '9,230' },
      { label: 'Sensors Monitored', value: '21' },
    ],
    color: 'from-rose-600 to-orange-600',
    icon: '✈️',
    tag: 'Predictive Maintenance · Live Demo',
  },
]

const publications = [
  {
    title: 'Production Route Optimisation with Data Mining',
    venue: 'Medium article',
    href: 'https://medium.com/@tejaswibagepally/i-turned-a-classroom-game-into-a-manufacturing-optimisation-pipeline-and-found-a-paradox-1ae36d0c96b7',
    desc: 'Mined association rules (Apriori) from PCB production transactions and ran A* route search over the process network — uncovering a Braess-type paradox where a cost-saving shortcut would ship 1 in 3 boards defective.',
    icon: '📝',
  },
  {
    title: 'Multilingual OCR Converter (English, Telugu, Hindi)',
    venue: 'IEEE ICCCI 2023 · IEEE Xplore',
    href: 'https://doi.org/10.1109/ICCCI56745.2023.10128201',
    desc: 'Published research paper on an OCR system supporting multiple Indian languages.',
    icon: '📄',
  },
]

const skills = {
  'Programming': ['Python', 'SQL', 'R', 'Java'],
  'Machine Learning': ['TensorFlow', 'XGBoost', 'LSTM Networks', 'Time-Series Modelling', 'Feature Engineering', 'Model Evaluation', 'EDA'],
  'Generative AI (Concepts)': ['LLMs', 'Retrieval-Augmented Generation', 'Embeddings', 'Fine-Tuning'],
  'Cloud & Data': ['AWS Redshift', 'AWS Glue', 'Amazon RDS', 'S3', 'Lambda', 'DynamoDB', 'CloudWatch', 'ETL', 'Data Migration'],
  'Tools & Deployment': ['CI/CD', 'TensorFlow Lite', 'Streamlit'],
}

const experience = [
  {
    role: 'Associate Engineer — Data Engineering, AWS',
    company: 'Virtusa, Hyderabad',
    period: '01/2024 – 09/2025',
    bullets: [
      'Project: Data warehouse migration to AWS for City National Bank (USA); team of 3–5.',
      "Traced the data lineage of the bank's legacy reporting views back to their source tables.",
      'Migrated reporting tables and views from Amazon RDS to Redshift, rebuilding SQL logic and validating parity.',
      'Built and enhanced AWS Glue ETL jobs loading data into Redshift according to reporting business logic.',
      'Refactored slow Redshift views with CTEs and restructured joins to reduce query runtimes for reporting.',
      'Monitored Glue jobs with Amazon CloudWatch and maintained CI/CD pipelines that automated deployments.',
      'Built an internal serverless proof of concept (S3, Lambda, DynamoDB) handling tens of thousands of records/day.',
    ],
  },
  {
    role: 'Intern',
    company: 'Virtusa',
    period: '01/2023 – 04/2023',
    bullets: [
      'Hands-on work with AWS compute, storage, networking and security services.',
      'Supported cloud learning labs.',
    ],
  },
]

// ── Components ────────────────────────────────────────────────────────────────

function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false)
  const links = ['About', 'Projects', 'Experience', 'Skills', 'Contact']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b ${dark ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'} backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <span className={`font-bold text-lg ${dark ? 'text-white' : 'text-gray-900'}`}>
          Tejaswi Bagepally
        </span>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`text-sm font-medium transition-colors ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {l}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-full transition-colors ${dark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            aria-label="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <span className={`block w-6 h-0.5 mb-1.5 ${dark ? 'bg-white' : 'bg-gray-900'}`}></span>
          <span className={`block w-6 h-0.5 mb-1.5 ${dark ? 'bg-white' : 'bg-gray-900'}`}></span>
          <span className={`block w-6 h-0.5 ${dark ? 'bg-white' : 'bg-gray-900'}`}></span>
        </button>
      </div>
      {open && (
        <div className={`md:hidden px-4 pb-4 ${dark ? 'bg-gray-900' : 'bg-white'}`}>
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {l}
            </a>
          ))}
          <button onClick={() => setDark(!dark)} className="mt-2 text-sm">
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  )
}

function Hero({ dark }) {
  return (
    <section className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-40 scale-105"></div>
            <img
              src={photo}
              alt="Tejaswi Bagepally"
              className="relative w-44 h-44 rounded-full object-cover border-4 border-white shadow-2xl"
              style={{ objectPosition: '50% 12%' }}
            />
          </div>
        </div>
        <div className="text-center md:text-left">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
            M.Eng. Applied AI · Deggendorf Institute of Technology · Lappersdorf, Germany
          </p>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
            Tejaswi Bagepally
          </h1>
          <p className={`text-xl md:text-2xl font-medium mb-6 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
            Data & ML Engineer
          </p>
          <p className={`text-base leading-relaxed max-w-2xl mb-8 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Master's student in Applied AI with nearly two years of production AWS data engineering for a US banking client (Glue, Redshift, CloudWatch, CI/CD) and hands-on ML deployment (LSTM, XGBoost, TensorFlow Lite on Lambda).
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="#projects" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg">
              View Projects
            </a>
            <a href="/Tejaswi_Bagepally_Resume.pdf" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded-full font-semibold text-sm border transition ${dark ? 'border-gray-600 text-gray-300 hover:border-gray-400' : 'border-gray-300 text-gray-700 hover:border-gray-500'}`}>
              Download Resume
            </a>
            <a href="mailto:tejaswibagepally@gmail.com" className={`px-6 py-3 rounded-full font-semibold text-sm border transition ${dark ? 'border-gray-600 text-gray-300 hover:border-gray-400' : 'border-gray-300 text-gray-700 hover:border-gray-500'}`}>
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function About({ dark }) {
  const certs = [
    { name: 'AWS Certified Solutions Architect – Associate', icon: '☁️' },
    { name: 'AWS Certified Data Engineer – Associate', icon: '🗄️' },
    { name: 'AWS Certified AI Practitioner', icon: '🤖' },
  ]
  return (
    <section id="about" className={`py-20 px-4 ${dark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${dark ? 'text-white' : 'text-gray-900'}`}>About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className={`text-base leading-relaxed mb-4 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm a Master's student in Applied AI for Digital Production Management at Deggendorf Institute of Technology, building on nearly two years as an Associate Engineer in AWS data engineering at Virtusa, where I worked on a data warehouse migration for City National Bank (USA) — tracing data lineage, migrating RDS reporting views to Redshift, and building Glue ETL pipelines monitored with CloudWatch and CI/CD.
            </p>
            <p className={`text-base leading-relaxed mb-4 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              Alongside production data engineering, I build and deploy machine learning systems end to end — from LSTM and XGBoost models for time-series prediction to TensorFlow Lite deployments on AWS Lambda and live Streamlit dashboards. I'm AWS triple-certified (Solutions Architect, Data Engineer, AI Practitioner) and have a published IEEE paper on multilingual OCR.
            </p>
            <p className={`text-base leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm fluent in English, Hindi, and Telugu, and am actively improving my German (A2) while based in Lappersdorf, Germany.
            </p>
          </div>
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-800'}`}>Education</h3>
            <div className={`rounded-xl p-5 mb-4 border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
              <p className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Deggendorf Institute of Technology</p>
              <p className={`text-sm ${dark ? 'text-blue-400' : 'text-blue-600'}`}>M.Eng. Applied AI for Digital Production Management</p>
              <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>10/2025 – Present · Germany</p>
              <p className={`text-sm mt-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Machine Learning & Deep Learning · Advanced Statistical Methods & Optimisation · Data Management · Advanced Intelligent Systems</p>
            </div>
            <div className={`rounded-xl p-5 mb-6 border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
              <p className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>MLR Institute of Technology</p>
              <p className={`text-sm ${dark ? 'text-blue-400' : 'text-blue-600'}`}>B.Tech Computer Science Engineering (German grade: 2.02)</p>
              <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>08/2019 – 08/2023 · Hyderabad, India</p>
            </div>
            <h3 className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-800'}`}>Certifications</h3>
            <div className="space-y-3">
              {certs.map(c => (
                <div key={c.name} className={`flex items-center gap-3 rounded-xl p-4 border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
                  <span className="text-2xl">{c.icon}</span>
                  <span className={`text-sm font-medium ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, dark }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`rounded-2xl overflow-hidden border shadow-lg transition-all hover:shadow-xl ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Header gradient bar */}
      <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>

      <div className="p-6 md:p-8">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{project.icon}</span>
            <div>
              <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${dark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                {project.tag}
              </span>
            </div>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${project.color} text-white hover:opacity-90 transition shadow-md`}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block"></span>
              Live Demo
            </a>
          )}
        </div>

        <h3 className={`text-xl md:text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        <p className={`text-base mb-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          {project.subtitle}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {project.metrics.map(m => (
            <div key={m.label} className={`rounded-xl p-3 text-center ${dark ? 'bg-gray-700/60' : 'bg-gray-50'}`}>
              <p className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{m.value}</p>
              <p className={`text-xs mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className={`rounded-xl p-4 mb-5 ${dark ? 'bg-gray-700/40' : 'bg-gray-50'}`}>
          <p className={`text-sm leading-relaxed whitespace-pre-line ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
            {project.description}
          </p>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`text-sm font-medium mb-4 flex items-center gap-1 transition-colors ${dark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
        >
          {expanded ? '▲ Show less' : '▼ Show more details'}
        </button>

        {expanded && (
          <div className="space-y-6">
            {/* Dataset */}
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                📦 Data Source
              </h4>
              <p className={`text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                {project.dataset}
              </p>
            </div>

            {/* What it does */}
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                ✅ What It Does
              </h4>
              <ul className="space-y-2">
                {project.whatItDoes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-r ${project.color}`}></span>
                    <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                🛠️ Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(t => (
                  <div
                    key={t.name}
                    className={`group relative px-3 py-1.5 rounded-full text-xs font-semibold cursor-default transition-all ${dark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {t.name}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs w-48 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg ${dark ? 'bg-gray-900 text-gray-200' : 'bg-gray-800 text-white'}`}>
                      {t.desc}
                    </div>
                  </div>
                ))}
              </div>
              <p className={`text-xs mt-2 italic ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                Hover over each technology to learn what it does
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Projects({ dark }) {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className={`text-3xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Projects</h2>
          <p className={`text-base max-w-2xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Two end-to-end AI systems with live demos you can interact with right now. Click "Show more details" on any card to dive deeper.
          </p>
        </div>
        <div className="space-y-8">
          {projects.map(p => <ProjectCard key={p.id} project={p} dark={dark} />)}
        </div>
      </div>
    </section>
  )
}

function Experience({ dark }) {
  return (
    <section id="experience" className={`py-20 px-4 ${dark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-14 ${dark ? 'text-white' : 'text-gray-900'}`}>Experience</h2>
        <div className="relative">
          <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${dark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className="space-y-10 pl-12">
            {experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-9 w-4 h-4 rounded-full border-2 mt-1 ${dark ? 'bg-gray-900 border-blue-500' : 'bg-white border-blue-500'}`}></div>
                <div className={`rounded-xl p-6 border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className={`font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                      <p className={`text-sm ${dark ? 'text-blue-400' : 'text-blue-600'}`}>{exp.company}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${dark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1 flex-shrink-0">›</span>
                        <span className={`text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Publications({ dark }) {
  return (
    <section id="publications" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-14 ${dark ? 'text-white' : 'text-gray-900'}`}>Publications & Writing</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {publications.map(p => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5 ${dark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <h3 className={`font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h3>
                  <p className={`text-sm ${dark ? 'text-blue-400' : 'text-blue-600'}`}>{p.venue}</p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills({ dark }) {
  return (
    <section id="skills" className={`py-20 px-4 ${dark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-14 ${dark ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={`rounded-xl p-6 border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
              <h3 className={`font-semibold text-sm uppercase tracking-wider mb-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${dark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ dark }) {
  const links = [
    {
      label: 'Email',
      value: 'tejaswibagepally@gmail.com',
      href: 'mailto:tejaswibagepally@gmail.com',
      icon: '✉️',
    },
    {
      label: 'LinkedIn',
      value: 'tejaswi-bagepalli',
      href: 'https://www.linkedin.com/in/tejaswi-bagepalli-553a60202',
      icon: '💼',
    },
    {
      label: 'GitHub',
      value: 'Tejaswi-2505',
      href: 'https://github.com/Tejaswi-2505',
      icon: '🐙',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h2>
        <p className={`text-base mb-12 max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Master's student in Applied AI, based in Lappersdorf, Germany. Open to opportunities in data engineering and ML. Let's connect.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 ${dark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}
            >
              <span className="text-4xl">{l.icon}</span>
              <span className={`text-sm font-bold uppercase tracking-wider ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{l.label}</span>
              <span className={`text-sm break-all ${dark ? 'text-blue-400' : 'text-blue-600'}`}>{l.value}</span>
            </a>
          ))}
        </div>
        <a
          href="/Tejaswi_Bagepally_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg"
        >
          Download Resume (PDF)
        </a>
      </div>
    </section>
  )
}

function Footer({ dark }) {
  return (
    <footer className={`py-8 text-center text-sm ${dark ? 'text-gray-500 border-t border-gray-800' : 'text-gray-400 border-t border-gray-200'}`}>
      <p>Built by Tejaswi Bagepally · {new Date().getFullYear()}</p>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(prefersDark)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-gray-900' : 'bg-white'}`}>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero dark={dark} />
        <About dark={dark} />
        <Projects dark={dark} />
        <Experience dark={dark} />
        <Publications dark={dark} />
        <Skills dark={dark} />
        <Contact dark={dark} />
      </main>
      <Footer dark={dark} />
    </div>
  )
}

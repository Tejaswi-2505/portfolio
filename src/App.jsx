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
    description: `A smart chatbot built on top of real hospital data that understands natural language and finds the right answer from two sources: structured records and patient review text.

Deployed as a real, working application — not just a prototype. It handles thousands of users simultaneously and has been measured at 92% response accuracy.`,
    whatItDoes: [
      'Answers questions about patients, doctors, hospitals, and billing in plain English',
      'Reads thousands of patient reviews to answer experience-based questions',
      'Reports real-time hospital wait times and shortest queues',
      'Runs 24/7 on the cloud with 99.9% uptime',
    ],
    techStack: ['Python', 'GPT-4', 'LangChain', 'Neo4j', 'FastAPI', 'Streamlit', 'Docker', 'AWS EC2'],
    metrics: [
      { label: 'Accuracy', value: '92%' },
      { label: 'Records', value: '10K+' },
      { label: 'Latency ↓', value: '75%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    accent: 'teal',
    icon: '🏥',
    tag: 'AI Chatbot · Live Demo',
  },
  {
    id: 2,
    title: 'Turbofan Engine Predictive Maintenance',
    subtitle: 'Predicting engine failure before it happens — using NASA data',
    liveUrl: 'http://54.93.88.178:8501/',
    dataset: 'NASA CMAPSS dataset — 709 training engines, ~160,000 engine cycles, 21 sensors per cycle, across all four FD001–FD004 subsets.',
    description: `Answers one critical question: "How many more operating cycles does this engine have before it needs maintenance?"

45 rolling-window features were engineered across 21 sensors per cycle. The winning LSTM model beat the XGBoost baseline and was deployed as TensorFlow Lite on AWS Lambda behind a live Streamlit dashboard with a real-time RUL gauge and fleet monitoring for 20 engines.`,
    whatItDoes: [
      'Predicts Remaining Useful Life (RUL) of engines in cycles',
      'Shows real-time sensor trend charts for any engine',
      'Color-coded health status: green / yellow / red',
      'Fleet overview — monitor 20 engines at once',
    ],
    techStack: ['Python', 'LSTM (TensorFlow)', 'XGBoost', 'TensorFlow Lite', 'AWS Lambda', 'API Gateway', 'Streamlit'],
    metrics: [
      { label: 'LSTM RMSE', value: '13.17' },
      { label: 'XGB RMSE', value: '19.19' },
      { label: 'NASA Score', value: '9,230' },
      { label: 'Sensors', value: '21' },
    ],
    accent: 'amber',
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

const skills = [
  { category: 'Programming', items: ['Python', 'SQL', 'R', 'Java'], accent: 'teal' },
  { category: 'Machine Learning', items: ['TensorFlow', 'XGBoost', 'LSTM Networks', 'Time-Series Modelling', 'Feature Engineering', 'EDA'], accent: 'amber' },
  { category: 'Generative AI (Concepts)', items: ['LLMs', 'RAG', 'Embeddings', 'Fine-Tuning'], accent: 'rose' },
  { category: 'Cloud & Data', items: ['Redshift', 'Glue', 'RDS', 'S3', 'Lambda', 'DynamoDB', 'CloudWatch', 'ETL'], accent: 'teal' },
  { category: 'Tools & Deployment', items: ['CI/CD', 'TensorFlow Lite', 'Streamlit'], accent: 'amber' },
]

const experience = [
  {
    role: 'Associate Engineer — Data Engineering, AWS',
    company: 'Virtusa, Hyderabad',
    period: '01/2024 – 09/2025',
    bullets: [
      'Project: Data warehouse migration to AWS for City National Bank (USA); team of 3–5.',
      "Traced data lineage of the bank's legacy reporting views back to their source tables.",
      'Migrated reporting tables and views from Amazon RDS to Redshift, rebuilding SQL logic and validating parity.',
      'Built and enhanced AWS Glue ETL jobs loading data into Redshift according to reporting business logic.',
      'Refactored slow Redshift views with CTEs and restructured joins to reduce query runtimes.',
      'Monitored Glue jobs with CloudWatch and maintained CI/CD pipelines that automated deployments.',
      'Built an internal serverless PoC (S3, Lambda, DynamoDB) handling tens of thousands of records/day.',
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

const navLinks = ['Intro', 'About', 'Projects', 'Experience', 'Publications', 'Skills', 'Contact']

const accentMap = {
  teal: { ring: 'border-teal-500', text: 'text-teal-400', textLight: 'text-teal-600', bg: 'bg-teal-500', bgSoft: 'bg-teal-500/10', grad: 'from-teal-500 to-emerald-500' },
  amber: { ring: 'border-amber-500', text: 'text-amber-400', textLight: 'text-amber-600', bg: 'bg-amber-500', bgSoft: 'bg-amber-500/10', grad: 'from-amber-500 to-orange-500' },
  rose: { ring: 'border-rose-500', text: 'text-rose-400', textLight: 'text-rose-600', bg: 'bg-rose-500', bgSoft: 'bg-rose-500/10', grad: 'from-rose-500 to-pink-500' },
}

// ── Layout chrome ────────────────────────────────────────────────────────────

function SectionHeading({ dark, eyebrow, title }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-500 to-amber-500 flex-shrink-0"></span>
      <div>
        {eyebrow && <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-1 ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{eyebrow}</p>}
        <h2 className={`text-2xl md:text-3xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      </div>
    </div>
  )
}

function Sidebar({ dark, setDark, mobileOpen, setMobileOpen }) {
  const social = [
    { label: 'Email', href: 'mailto:tejaswibagepally@gmail.com', icon: '✉️' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tejaswi-bagepalli-553a60202', icon: '💼' },
    { label: 'GitHub', href: 'https://github.com/Tejaswi-2505', icon: '🐙' },
  ]

  const content = (
    <div className={`flex flex-col h-full px-6 py-8 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="flex items-center gap-3 mb-1">
        <img
          src={photo}
          alt="Tejaswi Bagepally"
          className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-lg"
          style={{ objectPosition: '50% 12%' }}
        />
        <div>
          <p className={`font-bold leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>Tejaswi<br/>Bagepally</p>
        </div>
      </div>
      <p className={`text-xs mt-3 mb-8 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Data & ML Engineer</p>

      <nav className="flex flex-col gap-1 mb-auto">
        {navLinks.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
            className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${dark ? 'text-slate-300 hover:bg-slate-800 hover:text-teal-400' : 'text-slate-600 hover:bg-slate-200 hover:text-teal-600'}`}
          >
            {l}
          </a>
        ))}
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-700/20">
        <div className="flex gap-2 mb-4">
          {social.map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              title={s.label}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-base transition-colors ${dark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}
            >
              {s.icon}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${dark ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
            aria-label="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
        <a
          href="/Tejaswi_Bagepally_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-md"
        >
          Download Resume
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className={`hidden md:block fixed left-0 top-0 bottom-0 w-64 border-r ${dark ? 'border-slate-800' : 'border-slate-200'} z-40`}>
        {content}
      </aside>

      {/* Mobile top bar */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 border-b ${dark ? 'bg-slate-900/95 border-slate-800' : 'bg-slate-50/95 border-slate-200'} backdrop-blur-sm`}>
        <span className={`font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Tejaswi Bagepally</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          <span className={`block w-6 h-0.5 mb-1.5 ${dark ? 'bg-white' : 'bg-slate-900'}`}></span>
          <span className={`block w-6 h-0.5 mb-1.5 ${dark ? 'bg-white' : 'bg-slate-900'}`}></span>
          <span className={`block w-6 h-0.5 ${dark ? 'bg-white' : 'bg-slate-900'}`}></span>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 z-40">
          {content}
        </div>
      )}
    </>
  )
}

function Intro({ dark }) {
  return (
    <section id="intro" className="pt-28 md:pt-20 pb-16">
      <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${dark ? 'text-amber-400' : 'text-amber-600'}`}>
        M.Eng. Applied AI · Deggendorf Institute of Technology
      </p>
      <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-[1.1] ${dark ? 'text-white' : 'text-slate-900'}`}>
        Hi, I'm Tejaswi.<br/>
        <span className="bg-gradient-to-r from-teal-500 to-amber-500 bg-clip-text text-transparent">I build AI systems that ship.</span>
      </h1>
      <p className={`text-lg leading-relaxed max-w-2xl mb-8 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        Master's student in Applied AI with nearly two years of production AWS data engineering for a US banking client (Glue, Redshift, CloudWatch, CI/CD) and hands-on ML deployment (LSTM, XGBoost, TensorFlow Lite on Lambda). Based in Lappersdorf, Germany.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="#projects" className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg">
          View Projects →
        </a>
        <a href="#contact" className={`px-6 py-3 rounded-lg font-semibold text-sm border transition ${dark ? 'border-slate-700 text-slate-300 hover:border-slate-500' : 'border-slate-300 text-slate-700 hover:border-slate-500'}`}>
          Get In Touch
        </a>
      </div>
    </section>
  )
}

function About({ dark }) {
  const certs = ['AWS Certified Solutions Architect – Associate', 'AWS Certified Data Engineer – Associate', 'AWS Certified AI Practitioner']
  return (
    <section id="about" className="py-16">
      <SectionHeading dark={dark} eyebrow="Background" title="About Me" />
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-3 space-y-4">
          <p className={`text-base leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
            I'm a Master's student in Applied AI for Digital Production Management at Deggendorf Institute of Technology, building on nearly two years as an Associate Engineer in AWS data engineering at Virtusa, where I worked on a data warehouse migration for City National Bank (USA) — tracing data lineage, migrating RDS reporting views to Redshift, and building Glue ETL pipelines monitored with CloudWatch and CI/CD.
          </p>
          <p className={`text-base leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
            Alongside production data engineering, I build and deploy machine learning systems end to end — from LSTM and XGBoost models for time-series prediction to TensorFlow Lite deployments on AWS Lambda and live Streamlit dashboards. I'm AWS triple-certified and have a published IEEE paper on multilingual OCR.
          </p>
          <p className={`text-base leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
            Fluent in English, Hindi, and Telugu; actively improving German (A2).
          </p>
        </div>
        <div className="md:col-span-2 space-y-5">
          <div className={`rounded-xl p-5 border-l-4 border-teal-500 ${dark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
            <p className={`font-bold text-sm ${dark ? 'text-white' : 'text-slate-900'}`}>Deggendorf Institute of Technology</p>
            <p className={`text-sm ${dark ? 'text-teal-400' : 'text-teal-600'}`}>M.Eng. Applied AI for Digital Production Management</p>
            <p className={`text-xs mt-1 ${dark ? 'text-slate-500' : 'text-slate-500'}`}>10/2025 – Present</p>
          </div>
          <div className={`rounded-xl p-5 border-l-4 border-amber-500 ${dark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
            <p className={`font-bold text-sm ${dark ? 'text-white' : 'text-slate-900'}`}>MLR Institute of Technology</p>
            <p className={`text-sm ${dark ? 'text-amber-400' : 'text-amber-600'}`}>B.Tech CSE · grade 2.02</p>
            <p className={`text-xs mt-1 ${dark ? 'text-slate-500' : 'text-slate-500'}`}>08/2019 – 08/2023 · Hyderabad</p>
          </div>
          <div className="space-y-2">
            {certs.map(c => (
              <div key={c} className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg ${dark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                <span className="text-teal-400">✓</span>{c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, dark }) {
  const [expanded, setExpanded] = useState(false)
  const a = accentMap[project.accent]

  return (
    <div className={`rounded-2xl border-t-4 ${a.ring} border-x border-b overflow-hidden shadow-sm hover:shadow-xl transition-shadow ${dark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="text-3xl">{project.icon}</span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full text-white bg-gradient-to-r ${a.grad} hover:opacity-90 transition flex items-center gap-1.5`}
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>Live Demo
            </a>
          )}
        </div>
        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${a.text}`}>{project.tag}</p>
        <h3 className={`text-lg font-bold mb-1 ${dark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
        <p className={`text-sm mb-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{project.subtitle}</p>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {project.metrics.map(m => (
            <div key={m.label} className={`rounded-lg py-2 text-center ${a.bgSoft}`}>
              <p className={`text-sm font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{m.value}</p>
              <p className={`text-[10px] mt-0.5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{m.label}</p>
            </div>
          ))}
        </div>

        <p className={`text-sm leading-relaxed whitespace-pre-line mb-4 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map(t => (
            <span key={t} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${dark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`text-xs font-semibold ${a.text}`}
        >
          {expanded ? '▲ Less' : '▼ What it does & data source'}
        </button>

        {expanded && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Data Source</h4>
              <p className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{project.dataset}</p>
            </div>
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>What It Does</h4>
              <ul className="space-y-1.5">
                {project.whatItDoes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.bg}`}></span>
                    <span className={`text-sm ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Projects({ dark }) {
  return (
    <section id="projects" className="py-16">
      <SectionHeading dark={dark} eyebrow="Selected Work" title="Projects" />
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p => <ProjectCard key={p.id} project={p} dark={dark} />)}
      </div>
    </section>
  )
}

function Experience({ dark }) {
  return (
    <section id="experience" className="py-16">
      <SectionHeading dark={dark} eyebrow="Career" title="Experience" />
      <div className="space-y-5">
        {experience.map((exp, i) => (
          <div key={i} className={`rounded-xl p-6 flex gap-5 ${dark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${dark ? 'bg-slate-700 text-teal-400' : 'bg-white text-teal-600 shadow-sm'}`}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className={`font-bold text-base ${dark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                  <p className={`text-sm ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{exp.company}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${dark ? 'bg-slate-700 text-slate-300' : 'bg-white text-slate-600 shadow-sm'}`}>
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-1.5">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1 flex-shrink-0">›</span>
                    <span className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Publications({ dark }) {
  return (
    <section id="publications" className="py-16">
      <SectionHeading dark={dark} eyebrow="Writing" title="Publications" />
      <div className="space-y-4">
        {publications.map(p => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-start gap-4 rounded-xl p-5 transition-all hover:-translate-y-0.5 ${dark ? 'bg-slate-800/60 hover:bg-slate-800' : 'bg-slate-50 hover:bg-slate-100'}`}
          >
            <span className="text-2xl flex-shrink-0">{p.icon}</span>
            <div>
              <h3 className={`font-bold text-sm ${dark ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
              <p className={`text-xs mb-1.5 ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{p.venue}</p>
              <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function Skills({ dark }) {
  return (
    <section id="skills" className="py-16">
      <SectionHeading dark={dark} eyebrow="Toolbox" title="Technical Skills" />
      <div className="space-y-4">
        {skills.map(group => {
          const a = accentMap[group.accent]
          return (
            <div key={group.category} className="flex flex-col md:flex-row md:items-center gap-3">
              <span className={`text-xs font-bold uppercase tracking-wider w-44 flex-shrink-0 ${a.text}`}>{group.category}</span>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span key={skill} className={`text-sm font-medium px-3 py-1.5 rounded-lg ${a.bgSoft} ${dark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Contact({ dark }) {
  const links = [
    { label: 'Email', value: 'tejaswibagepally@gmail.com', href: 'mailto:tejaswibagepally@gmail.com', icon: '✉️' },
    { label: 'LinkedIn', value: 'tejaswi-bagepalli', href: 'https://www.linkedin.com/in/tejaswi-bagepalli-553a60202', icon: '💼' },
    { label: 'GitHub', value: 'Tejaswi-2505', href: 'https://github.com/Tejaswi-2505', icon: '🐙' },
  ]

  return (
    <section id="contact" className="py-16 pb-24">
      <SectionHeading dark={dark} eyebrow="Say Hello" title="Get In Touch" />
      <p className={`text-base mb-8 max-w-xl ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        Master's student in Applied AI, open to opportunities in data engineering and ML. Let's connect.
      </p>
      <div className="flex flex-col gap-3 max-w-md">
        {links.map(l => (
          <a
            key={l.label}
            href={l.href}
            target={l.label !== 'Email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:-translate-y-0.5 ${dark ? 'bg-slate-800/60 hover:bg-slate-800' : 'bg-slate-50 hover:bg-slate-100'}`}
          >
            <span className="text-2xl">{l.icon}</span>
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-slate-500' : 'text-slate-500'}`}>{l.label}</p>
              <p className={`text-sm font-medium ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{l.value}</p>
            </div>
          </a>
        ))}
      </div>
      <p className={`text-xs mt-10 ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
        Built by Tejaswi Bagepally · {new Date().getFullYear()}
      </p>
    </section>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(prefersDark)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-slate-950' : 'bg-white'}`}>
      <Sidebar dark={dark} setDark={setDark} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="md:ml-64 px-6 md:px-14 max-w-4xl">
        <Intro dark={dark} />
        <About dark={dark} />
        <Projects dark={dark} />
        <Experience dark={dark} />
        <Publications dark={dark} />
        <Skills dark={dark} />
        <Contact dark={dark} />
      </main>
    </div>
  )
}

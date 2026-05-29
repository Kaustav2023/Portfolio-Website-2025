import React, { useState, useEffect, useRef } from 'react';
import {
  Code, Brain, Database, Terminal,
  ExternalLink, Github, Linkedin, Mail,
  Briefcase, GraduationCap,
  Award, ChevronRight, Download, BookOpen, Cpu, Cloud,
  MessageCircle, X, Send, Sparkles,
  ArrowUpRight, Menu, Shield, Bot, BarChart3,
  Layers, Zap, FileText, Play, MousePointer
} from 'lucide-react';

/* ============================================================
   CONSTANTS & CONFIG
   ============================================================ */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const PORTFOLIO_CONTEXT = `
You are the AI assistant for Kaustav Dey's portfolio. You speak in the first person as if you are Kaustav's digital twin.
Context:
- Role: AI/ML Engineer at NexDev IT Solutions
- Profile: AI/ML Engineer experienced in building production-grade AI systems including fraud detection engines, RAG pipelines, document intelligence systems, and multi-agent AI workflows.
- Current Work: Architected a production-grade real-time Fraud Detection System using hybrid Rule Engine + XGBoost pipelines, achieving 96.2% ROC-AUC and 90.5% fraud recall across 111K+ e-commerce transactions. Built resume content extraction system without LLM dependency.
- Tech Stack: Python, SQL, LangChain, CrewAI, TensorFlow, PyTorch, Pandas, NumPy, Scikit-Learn, RAG Systems, Llama 3, Vector DBs, FAISS, Redis, PostgreSQL, gRPC, Docker, AWS, Azure MLOps, Hugging Face, Power BI, GraphRAG.
- Experience:
  1. NexDev IT Solutions (AI/ML Engineer, Jan 2026 - Present): Architected fraud detection with 96.2% ROC-AUC, built Redis-backed ML infrastructure with gRPC microservices, created topology-aware resume parser without LLM dependency.
  2. NoBroker (Data Research Intern, Nov 2024 - May 2025): Built Python web scrapers (80% productivity boost), automated data pipelines, competitive research.
  3. Intellipaat (Data Science Intern, Aug 2023 - Nov 2024): Optimized fraud detection (30% accuracy boost) using Random Forests, built LSTM RNNs for churn prediction (85% accuracy).
- Education: B.Tech in CSE from Techno Main Salt Lake (GPA 8.52, 2019-2023).
- Featured Projects: RAG-Powered Document Q&A (Groq/Llama3.1), Multi-Agent AI Research Analyst (CrewAI), Meta Kaggler, Netflix Recommender.
- Stats: 30+ Projects, 3+ Years Experience, 1507 LeetCode Rating.
- Certifications: IIT Roorkee Advanced Data Science & AI, AI Agents Intensive with Google.
- Tone: Professional, enthusiastic, technically precise but accessible.
- Goal: Encourage recruiters and collaborators to get in touch via email (kaustavdey2015@gmail.com).

IMPORTANT INSTRUCTIONS:
- Keep ALL responses under 3 sentences maximum
- Be concise and natural
- Never write long paragraphs
`;

/* ============================================================
   UTILITY: Intersection Observer Reveal
   ============================================================ */
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ============================================================
   UTILITY: Animated Counter
   ============================================================ */
const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();
        const numericTarget = parseFloat(target);

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * numericTarget));
          if (progress < 1) requestAnimationFrame(animate);
          else setCount(numericTarget);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ============================================================
   NAVBAR
   ============================================================ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ['Home', 'About', 'Experience', 'Projects', 'Certifications', 'Articles', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '-1px' }}>
            KD
          </span>
          <span style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--accent)', letterSpacing: '-1px' }}>
            .
          </span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden lg:flex">
          {links.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color 0.3s ease',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden lg:flex"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 24px',
            background: 'var(--accent)',
            color: '#000',
            borderRadius: 50,
            fontSize: 14,
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.target.style.background = '#e0ff66'; e.target.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.target.style.background = 'var(--accent)'; e.target.style.transform = 'scale(1)'; }}
        >
          Hire Me
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
        >
          {mobileOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {links.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)', padding: '8px 0' }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              background: 'var(--accent)',
              color: '#000',
              borderRadius: 50,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

/* ============================================================
   HERO SECTION
   ============================================================ */
const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      id="home"
      className="grid-pattern"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
        paddingBottom: 40,
      }}
    >
      {/* Background Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(200, 255, 0, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        transition: 'transform 0.3s ease-out',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(200, 255, 0, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 60, alignItems: 'center' }} className="lg:!grid-cols-[1fr_auto]">

          {/* Left Content */}
          <div style={{ maxWidth: 680 }}>
            <Reveal>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  background: 'rgba(200, 255, 0, 0.08)',
                  border: '1px solid rgba(200, 255, 0, 0.2)',
                  borderRadius: 50,
                  marginBottom: 24,
                }}
              >
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 12px var(--accent)',
                }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.5px' }}>
                  Available for Opportunities
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.08,
                  marginBottom: 24,
                  letterSpacing: '-2px',
                }}
              >
                Building{' '}
                <span className="gradient-text">Production-Grade</span>
                <br />
                AI Systems That
                <br />
                <span style={{ color: 'var(--accent)' }}>Drive Real Impact</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 36, maxWidth: 560 }}>
                AI/ML Engineer specializing in fraud detection engines with <span style={{color: '#fff', fontWeight: 600}}>96.2% ROC-AUC</span>, intelligent RAG pipelines, and multi-agent AI workflows. 
                I architect scalable systems that transform complex data into actionable intelligence.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
                <a
                  href="#projects"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 28px',
                    background: 'var(--accent)',
                    color: '#000',
                    borderRadius: 50,
                    fontSize: 15,
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    border: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e0ff66'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(200, 255, 0, 0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <Play size={16} fill="#000" /> View My Work
                </a>
                <a
                  href="mailto:kaustavdey2015@gmail.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 28px',
                    background: 'transparent',
                    color: '#fff',
                    borderRadius: 50,
                    fontSize: 15,
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.15)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; }}
                >
                  <Mail size={16} /> Get in Touch
                </a>
              </div>
            </Reveal>

            {/* Quick Stats */}
            <Reveal delay={400}>
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                {[
                  { value: '96.2%', label: 'ROC-AUC Score' },
                  { value: '30+', label: 'Projects Shipped' },
                  { value: '3+', label: 'Years Experience' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right - Profile Image with Blob */}
          <Reveal delay={200} className="hidden lg:block">
            <div style={{ position: 'relative', width: 420, height: 480 }}>
              {/* Blob Background */}
              <div
                className="blob"
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 10,
                  width: 380,
                  height: 420,
                  background: 'var(--accent)',
                  opacity: 0.85,
                  zIndex: 0,
                }}
              />

              {/* Profile Image */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                width: 380,
                height: 460,
                overflow: 'hidden',
                borderRadius: '0 0 200px 200px',
                marginLeft: 10,
              }}>
                <img
                  src="/images/profile.png"
                  alt="Kaustav Dey — AI/ML Engineer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    filter: 'contrast(1.05)',
                  }}
                />
              </div>

              {/* Floating Badge: AI/ML Engineer */}
              <div
                className="glass animate-float"
                style={{
                  position: 'absolute',
                  top: 40,
                  right: -20,
                  padding: '10px 18px',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 2,
                  animationDelay: '0s',
                }}
              >
                <Brain size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>AI/ML Engineer</span>
              </div>

              {/* Floating Badge: Fraud Detection */}
              <div
                className="glass animate-float"
                style={{
                  position: 'absolute',
                  bottom: 100,
                  right: -30,
                  padding: '10px 18px',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 2,
                  animationDelay: '1s',
                }}
              >
                <Shield size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Fraud Detection</span>
              </div>

              {/* Floating Badge: RAG Systems */}
              <div
                className="glass animate-float"
                style={{
                  position: 'absolute',
                  bottom: 180,
                  left: -40,
                  padding: '10px 18px',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 2,
                  animationDelay: '2s',
                }}
              >
                <Database size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>RAG Systems</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SKILLS MARQUEE
   ============================================================ */
const SkillsMarquee = () => {
  const skills = [
    { icon: <Terminal size={16} />, name: 'Python' },
    { icon: <Brain size={16} />, name: 'Machine Learning' },
    { icon: <Layers size={16} />, name: 'Deep Learning' },
    { icon: <Database size={16} />, name: 'RAG Systems' },
    { icon: <Bot size={16} />, name: 'Multi-Agent AI' },
    { icon: <Code size={16} />, name: 'LangChain' },
    { icon: <Cpu size={16} />, name: 'CrewAI' },
    { icon: <Shield size={16} />, name: 'Fraud Detection' },
    { icon: <Cloud size={16} />, name: 'AWS / Azure' },
    { icon: <BarChart3 size={16} />, name: 'TensorFlow' },
    { icon: <Zap size={16} />, name: 'PyTorch' },
    { icon: <FileText size={16} />, name: 'NLP' },
  ];

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <div className="marquee-container">
        <div className="marquee-content">
          {[...skills, ...skills].map((skill, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginRight: 48,
                color: 'var(--text-secondary)',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              <span style={{ color: 'var(--accent)', display: 'flex' }}>{skill.icon}</span>
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ABOUT SECTION
   ============================================================ */
const About = () => {
  return (
    <section id="about" style={{ padding: '120px 0', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 80, alignItems: 'center' }} className="lg:!grid-cols-[400px_1fr]">

          {/* Left - Image */}
          <Reveal className="hidden lg:block">
            <div style={{ position: 'relative' }}>
              <div
                className="blob"
                style={{
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  width: 360,
                  height: 400,
                  background: 'var(--accent)',
                  opacity: 0.12,
                  zIndex: 0,
                }}
              />
              <div style={{
                position: 'relative',
                zIndex: 1,
                width: 360,
                height: 400,
                borderRadius: 24,
                overflow: 'hidden',
                border: '2px solid var(--border)',
              }}>
                <img
                  src="/images/picture2.png"
                  alt="Kaustav Dey"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
              {/* Experience Badge */}
              <div
                className="glass animate-pulse-glow"
                style={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  padding: '16px 24px',
                  borderRadius: 16,
                  zIndex: 2,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>3+</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>Years Exp.</div>
              </div>
            </div>
          </Reveal>

          {/* Right - Content */}
          <div>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  About Me
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: '-1px' }}>
                The Engineer Behind
                <br />
                <span style={{ color: 'var(--accent)' }}>the Intelligence</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                I'm Kaustav Dey — an AI/ML Engineer who thrives at the intersection of research and production. My work focuses on building 
                systems that don't just work in notebooks but scale in the real world. From architecting a <strong style={{color: '#fff'}}>fraud detection engine 
                processing 111K+ transactions</strong> with 96.2% ROC-AUC, to designing <strong style={{color: '#fff'}}>topology-aware document parsers</strong> that 
                eliminate LLM dependency — I engineer AI that is fast, reliable, and cost-effective.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 36 }}>
                With a B.Tech in Computer Science from Techno Main Salt Lake (8.52 CGPA) and certifications from 
                <strong style={{color: '#fff'}}> IIT Roorkee</strong> and <strong style={{color: '#fff'}}>Google's AI Agents program</strong>, I combine strong academic 
                foundations with hands-on production experience across LangChain, CrewAI, Redis, PostgreSQL, and cloud-native ML infrastructure.
              </p>
            </Reveal>

            {/* Stats Row */}
            <Reveal delay={400}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="sm:!grid-cols-3 !grid-cols-1">
                {[
                  { value: '96.2%', label: 'ROC-AUC', sub: 'Fraud Detection' },
                  { value: '30+', label: 'Projects', sub: 'Built & Shipped' },
                  { value: '1507', label: 'LeetCode', sub: 'Rating' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="card"
                    style={{
                      padding: '20px 16px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 14, color: '#fff', fontWeight: 600, marginTop: 4 }}>{stat.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Resume Download */}
            <Reveal delay={500}>
              <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a
                  href="https://drive.google.com/file/d/1feCKsLwT121xU49SCNHtKa7goeLE4vGh/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    background: 'var(--accent)',
                    color: '#000',
                    borderRadius: 50,
                    fontSize: 14,
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e0ff66'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Download size={16} /> Download Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/imkd/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    borderRadius: 50,
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <Linkedin size={16} /> LinkedIn Profile
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SERVICES / EXPERTISE SECTION
   ============================================================ */
const Services = () => {
  const services = [
    {
      icon: <Shield size={28} />,
      title: 'AI Systems Engineering',
      description: 'Production-grade fraud detection engines, real-time ML pipelines with Redis-backed feature stores, and gRPC microservices for fault-tolerant inference at scale.',
      tags: ['XGBoost', 'Redis', 'gRPC', 'PostgreSQL'],
    },
    {
      icon: <Database size={28} />,
      title: 'Intelligent Document AI',
      description: 'RAG-powered Q&A systems using LangChain and FAISS, topology-aware document parsers, and context-aware chatbots that reduce response time by 30%.',
      tags: ['LangChain', 'FAISS', 'Llama 3.1', 'RAG'],
    },
    {
      icon: <Bot size={28} />,
      title: 'Multi-Agent AI Workflows',
      description: 'Orchestrating specialized AI agents for end-to-end market intelligence — from automated research and summarization to strategic SWOT analysis.',
      tags: ['CrewAI', 'LangChain', 'Groq', 'Agents'],
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Data Science & Analytics',
      description: 'Deep learning models for churn prediction (85% accuracy), fraud detection optimization (30% accuracy boost), and interactive Power BI dashboards for data storytelling.',
      tags: ['TensorFlow', 'PyTorch', 'Power BI', 'Scikit-Learn'],
    },
  ];

  return (
    <section style={{ padding: '120px 0', background: 'rgba(17, 17, 17, 0.4)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Expertise
              </span>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>
              What I Bring to the <span style={{ color: 'var(--accent)' }}>Table</span>
            </h2>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {services.map((service, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className="card"
                style={{ padding: 32, height: '100%', display: 'flex', flexDirection: 'column', cursor: 'default' }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(200, 255, 0, 0.08)',
                  border: '1px solid rgba(200, 255, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  marginBottom: 20,
                }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12, fontFamily: 'var(--font-display)' }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                  {service.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {service.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--accent)',
                        background: 'rgba(200, 255, 0, 0.06)',
                        border: '1px solid rgba(200, 255, 0, 0.1)',
                        borderRadius: 6,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   EXPERIENCE SECTION
   ============================================================ */
const Experience = () => {
  const jobs = [
    {
      company: 'NexDev IT Solutions',
      role: 'AI/ML Engineer',
      location: 'Kolkata, India',
      period: 'Jan 2026 — Present',
      current: true,
      details: [
        'Architected a production-grade real-time Fraud Detection System using hybrid Rule Engine + XGBoost pipelines, achieving 96.2% ROC-AUC and 90.5% fraud recall across 111K+ e-commerce transactions.',
        'Engineered scalable ML infrastructure with Redis-backed feature stores, PostgreSQL fallback pipelines, and gRPC microservices for fault-tolerant real-time inference.',
        'Built a topology-aware Resume Content Extraction System without LLM dependency using deterministic NLP and layout reconstruction algorithms, significantly reducing inference cost.',
      ],
    },
    {
      company: 'NoBroker',
      role: 'Data Research Intern',
      location: 'Bangalore, India',
      period: 'Nov 2024 — May 2025',
      current: false,
      details: [
        'Developed a Python web scraper to automate competitor data collection, boosting data collection productivity by 80% and supporting SEO-driven marketing strategies.',
        'Conducted competitor research, analyzed data, ensured data validity, consistency, and reliability, and delivered actionable business insights to stakeholders.',
      ],
    },
    {
      company: 'Intellipaat Software Solutions',
      role: 'Data Science Intern',
      location: 'Bangalore, India',
      period: 'Aug 2023 — Nov 2024',
      current: false,
      details: [
        'Developed Decision Trees & Random Forests for fraud detection, boosting accuracy by 30% and reducing false positives by 25%.',
        'Built deep learning models (LSTM-based RNNs) for telecom churn prediction, achieving 85% accuracy and improving customer retention by 20%.',
      ],
    },
  ];

  return (
    <section id="experience" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Career Journey
              </span>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>
              Work <span style={{ color: 'var(--accent)' }}>Experience</span>
            </h2>
          </Reveal>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: 16,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(to bottom, var(--accent), var(--border))',
          }} className="hidden md:block" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {jobs.map((job, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div style={{ display: 'flex', gap: 32 }}>
                  {/* Timeline Dot */}
                  <div className="hidden md:flex" style={{
                    flexShrink: 0,
                    width: 34,
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 28,
                  }}>
                    <div style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: job.current ? 'var(--accent)' : 'var(--bg-card)',
                      border: `2px solid ${job.current ? 'var(--accent)' : 'var(--border)'}`,
                      boxShadow: job.current ? '0 0 16px rgba(200, 255, 0, 0.4)' : 'none',
                    }} />
                  </div>

                  {/* Content Card */}
                  <div
                    className="card"
                    style={{ flex: 1, padding: 28 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                      <div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{job.role}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                          <Briefcase size={14} style={{ color: 'var(--accent)' }} />
                          <span style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 600 }}>{job.company}</span>
                          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>· {job.location}</span>
                        </div>
                      </div>
                      <span style={{
                        padding: '6px 14px',
                        background: job.current ? 'rgba(200, 255, 0, 0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${job.current ? 'rgba(200, 255, 0, 0.2)' : 'var(--border)'}`,
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: job.current ? 'var(--accent)' : 'var(--text-muted)',
                        fontFamily: 'var(--font-display)',
                        whiteSpace: 'nowrap',
                      }}>
                        {job.period}
                      </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {job.details.map((point, i) => (
                        <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                          <span style={{
                            flexShrink: 0,
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--accent)',
                            marginTop: 8,
                          }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education */}
        <Reveal delay={300}>
          <div
            className="card"
            style={{
              marginTop: 48,
              padding: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'rgba(200, 255, 0, 0.08)',
              border: '1px solid rgba(200, 255, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <GraduationCap size={24} style={{ color: 'var(--accent)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>Techno Main Salt Lake</h3>
              <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>B.Tech in Computer Science & Engineering</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 4, fontSize: 13, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                <span>📍 Kolkata, India</span>
                <span>🎓 CGPA: 8.52</span>
                <span>📅 2019 — 2023</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ============================================================
   PROJECTS SECTION
   ============================================================ */
const Projects = () => {
  const projects = [
    {
      name: 'Real-Time Fraud Detection System',
      desc: 'Production-grade fraud detection using hybrid Rule Engine + XGBoost pipelines. Achieved 96.2% ROC-AUC and 90.5% fraud recall across 111K+ e-commerce transactions with Redis-backed feature stores and gRPC microservices.',
      tags: ['XGBoost', 'Redis', 'gRPC', 'PostgreSQL'],
      link: 'https://github.com/Kaustav2023',
      featured: true,
    },
    {
      name: 'RAG-Powered Document Q&A',
      desc: 'Lightweight RAG system using LangChain, FAISS, and Groq Llama 3.1 for context-aware Q&A. Optimized text chunking and vector retrieval reduced response time by 30%.',
      tags: ['LangChain', 'FAISS', 'Groq', 'Llama 3.1'],
      link: 'https://github.com/Kaustav2023/RAG-OneShot',
      featured: true,
    },
    {
      name: 'Multi-Agent Research Analyst',
      desc: 'AI-powered research automation with CrewAI orchestrating 4 specialized agents — Researcher, Summarizer, Strategist, Presenter — for end-to-end market intelligence.',
      tags: ['CrewAI', 'LangChain', 'Groq', 'Serper.dev'],
      link: 'https://github.com/Kaustav2023/Agent-AnalytiX',
      featured: true,
    },
    {
      name: 'Resume Content Extraction System',
      desc: 'Topology-aware resume parser built without LLM dependency. Uses deterministic NLP and layout reconstruction to accurately parse complex multi-column resumes at minimal cost.',
      tags: ['NLP', 'Python', 'Layout AI'],
      link: 'https://github.com/Kaustav2023',
      featured: false,
    },
    {
      name: 'Netflix Recommender System',
      desc: 'Content-based recommendation engine analyzing viewing patterns and content metadata to deliver personalized movie and show recommendations.',
      tags: ['Scikit-Learn', 'Python', 'ML'],
      link: 'https://github.com/Kaustav2023/Netflix_Recommendation_System',
      featured: false,
    },
    {
      name: 'Multiple Disease Prediction',
      desc: 'Interactive web app predicting heart disease, diabetes, and Parkinson\'s using trained ML models with an intuitive Streamlit interface.',
      tags: ['Streamlit', 'ML', 'Healthcare'],
      link: 'https://github.com/Kaustav2023/multiple_disease_prediction_web_app',
      featured: false,
    },
  ];

  return (
    <section id="projects" style={{ padding: '120px 0', background: 'rgba(17, 17, 17, 0.4)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Portfolio
              </span>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>
              Featured <span style={{ color: 'var(--accent)' }}>Projects</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 560, margin: '16px auto 0' }}>
              Production systems, research tools, and ML applications — each built to solve real problems.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {projects.map((proj, i) => (
            <Reveal key={i} delay={i * 80}>
              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                className="card"
                style={{
                  display: 'block',
                  padding: 28,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
              >
                {proj.featured && (
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    padding: '4px 10px',
                    background: 'rgba(200, 255, 0, 0.1)',
                    border: '1px solid rgba(200, 255, 0, 0.2)',
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>
                    Featured
                  </div>
                )}

                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(200, 255, 0, 0.08)',
                  border: '1px solid rgba(200, 255, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <Code size={22} style={{ color: 'var(--accent)' }} />
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10, fontFamily: 'var(--font-display)', paddingRight: proj.featured ? 60 : 0 }}>
                  {proj.name}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {proj.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        padding: '3px 8px',
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border)',
                        borderRadius: 4,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                  View Project <ArrowUpRight size={14} />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* GitHub CTA */}
        <Reveal delay={500}>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a
              href="https://github.com/Kaustav2023"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                border: '1px solid var(--border)',
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 600,
                color: '#fff',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = '#fff'; }}
            >
              <Github size={18} /> Explore All 30+ Repositories
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ============================================================
   CERTIFICATIONS SECTION
   ============================================================ */
const Certifications = () => {
  const certs = [
    { name: 'Advanced Certification in Data Science & AI', issuer: 'IIT Roorkee (iHub DivyaSampark)', link: 'https://drive.google.com/file/d/13iNagIrZmWalp_mcg9ipP1UbuIPaSqgV/view', highlight: true },
    { name: 'AI Agents Intensive Course', issuer: 'Google', link: '#', highlight: true },
    { name: 'Complete Generative AI Course', issuer: 'Udemy', link: 'https://drive.google.com/file/d/1z9S8UVuJ8B8uqqs8pMz3UeKM91Hr57R4/view', highlight: false },
    { name: 'Getting Started with AWS Machine Learning', issuer: 'Coursera (AWS)', link: 'https://www.coursera.org/account/accomplishments/verify/N993X3QKNPQS', highlight: false },
    { name: 'Data Analytics & Visualization', issuer: 'Accenture (Forage)', link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_bjrKYc3DQmA5JGGM3_1725078565580_completion_certificate.pdf', highlight: false },
    { name: 'Tableau Training for Data Science', issuer: 'Udemy', link: 'https://www.udemy.com/certificate/UC-e675672a-2059-4c8f-aa77-ba4bdc085f8a/', highlight: false },
    { name: 'Microsoft Excel Advanced Formulas & Functions', issuer: 'Udemy', link: 'https://www.udemy.com/certificate/UC-86e3dcbe-d72e-43e1-a008-c0b14ffbedd6/', highlight: false },
    { name: 'Python Data Analysis', issuer: 'Coursera', link: 'https://www.coursera.org/account/accomplishments/verify/TZQNL834LMCX', highlight: false },
    { name: 'Introduction to Big Data', issuer: 'Coursera', link: 'https://www.coursera.org/account/accomplishments/verify/L943E9YBBX3N', highlight: false },
    { name: 'AWS Identity and Access Management', issuer: 'Coursera (AWS)', link: 'https://www.coursera.org/account/accomplishments/verify/X62Q29TLN9BJ', highlight: false },
  ];

  return (
    <section id="certifications" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Credentials
              </span>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>
              Certifications & <span style={{ color: 'var(--accent)' }}>Learning</span>
            </h2>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {certs.map((cert, i) => (
            <Reveal key={i} delay={i * 60}>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 20px',
                  textDecoration: 'none',
                  borderColor: cert.highlight ? 'rgba(200, 255, 0, 0.15)' : undefined,
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: cert.highlight ? 'rgba(200, 255, 0, 0.1)' : 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Award size={18} style={{ color: cert.highlight ? 'var(--accent)' : 'var(--text-muted)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{cert.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{cert.issuer}</div>
                </div>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ARTICLES SECTION
   ============================================================ */
const Articles = () => {
  const articles = [
    {
      title: 'Multiple Disease Prediction WebApp',
      desc: 'An interactive ML-powered application predicting heart disease, diabetes, and Parkinson\'s — bridging the gap between machine learning models and accessible healthcare tools.',
      link: 'https://medium.com/@kaustavdey2015/multiple-disease-prediction-webapp-1f603c9588ce',
      readTime: '8 min read',
    },
    {
      title: 'Zomato Sales Uncovered: Deep Analysis',
      desc: 'Power BI-driven sales dashboard analyzing Zomato\'s performance across Indian cities — transforming raw transaction data into strategic business intelligence.',
      link: 'https://medium.com/@kaustavdey2015/zomato-sales-dashboard-power-bi-aa493cf35081',
      readTime: '6 min read',
    },
  ];

  return (
    <section id="articles" style={{ padding: '120px 0', background: 'rgba(17, 17, 17, 0.4)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Writing
              </span>
              <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>
              Latest <span style={{ color: 'var(--accent)' }}>Articles</span>
            </h2>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          {articles.map((article, i) => (
            <Reveal key={i} delay={i * 100}>
              <a
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="card"
                style={{
                  display: 'block',
                  padding: 32,
                  height: '100%',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <BookOpen size={16} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Article
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    {article.readTime}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12, fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                  {article.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>
                  Read Article <ChevronRight size={16} />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   CONTACT SECTION
   ============================================================ */
const Contact = () => {
  return (
    <section id="contact" style={{ padding: '120px 0', position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(200, 255, 0, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Get in Touch
            </span>
            <div style={{ width: 32, height: 2, background: 'var(--accent)' }} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: '-1px' }}>
            Let's Build Something
            <br />
            <span style={{ color: 'var(--accent)' }}>Extraordinary Together</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Whether you have an AI challenge, a product to build, or just want to connect — my inbox is always open. Let's talk about how AI can drive your next breakthrough.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <a
            href="mailto:kaustavdey2015@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 36px',
              background: 'var(--accent)',
              color: '#000',
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 700,
              transition: 'all 0.3s ease',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e0ff66'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(200, 255, 0, 0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Mail size={18} /> Say Hello
          </a>
        </Reveal>

        {/* Social Links */}
        <Reveal delay={400}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 48 }}>
            {[
              { icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/imkd/', label: 'LinkedIn' },
              { icon: <Github size={20} />, link: 'https://github.com/Kaustav2023', label: 'GitHub' },
              { icon: <Mail size={20} />, link: 'mailto:kaustavdey2015@gmail.com', label: 'Email' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target={social.link.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={social.label}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'rgba(200, 255, 0, 0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ============================================================
   FOOTER
   ============================================================ */
const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Kaustav Dey. Crafted with purpose.
        </span>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Built with React + Vite
        </span>
      </div>
    </footer>
  );
};

/* ============================================================
   AI CHAT WIDGET
   ============================================================ */
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey! I'm Kaustav's AI twin. Ask me anything about my skills, experience, or projects! ✨" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMsg.text }] }],
          systemInstruction: { parts: [{ text: PORTFOLIO_CONTEXT }] }
        })
      });
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now. Please try again!";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "Connection error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      {isOpen && (
        <div style={{
          marginBottom: 16,
          width: 380,
          maxWidth: 'calc(100vw - 48px)',
          background: '#111',
          border: '1px solid var(--border)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeInUp 0.3s ease-out',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(200, 255, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkles size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>AI Kaustav</div>
                <div style={{ fontSize: 11, color: 'var(--accent)' }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-scrollbar" style={{ flex: 1, padding: 16, height: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  fontSize: 13,
                  lineHeight: 1.6,
                  background: msg.role === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  color: msg.role === 'user' ? '#000' : 'var(--text-secondary)',
                  fontWeight: msg.role === 'user' ? 600 : 400,
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '14px 14px 14px 4px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  gap: 4,
                }}>
                  <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                  <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                  <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my work..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '10px 16px',
                fontSize: 13,
                color: '#fff',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(200, 255, 0, 0.3)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'var(--accent)',
                border: 'none',
                cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isTyping || !input.trim() ? 0.4 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              <Send size={16} color="#000" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--accent)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(200, 255, 0, 0.25)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(200, 255, 0, 0.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(200, 255, 0, 0.25)'; }}
      >
        {isOpen ? <X size={24} color="#000" /> : <MessageCircle size={24} color="#000" />}
      </button>
    </div>
  );
};

/* ============================================================
   PARTICLE BACKGROUND
   ============================================================ */
const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const count = 30;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 3}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="animate-twinkle"
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: 'rgba(200, 255, 0, 0.3)',
            borderRadius: '50%',
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   APP ROOT
   ============================================================ */
const App = () => {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <ParticleBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <SkillsMarquee />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Certifications />
        <Articles />
        <Contact />
        <Footer />
      </div>
      <AIChatWidget />
    </div>
  );
};

export default App;

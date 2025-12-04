import React, { useState, useEffect, useRef } from 'react';
import {
    Code, Brain, Database, Terminal,
    ExternalLink, Github, Linkedin, Mail,
    Briefcase, GraduationCap,
    Award, ChevronRight, Download, BookOpen, Cpu, Layers, Cloud,
    MessageCircle, X, Send, Sparkles, RefreshCw
} from 'lucide-react';

/* --- CONSTANTS & CONFIG --- */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const PORTFOLIO_CONTEXT = `
You are the AI assistant for Kaustav Dey's portfolio. You speak in the first person as if you are Kaustav's digital twin.
Context:
- Role: Generative AI Engineer
- Tagline: Turning Data into Intelligence
- Summary: Specializing in RAG systems, Multi-Agent architectures, and scalable AI solutions. Leveraging LangChain, CrewAI, and LLMs.
- Tech Stack: Python, SQL, LangChain, CrewAI, TensorFlow, PyTorch, Pandas, NumPy, Scikit-Learn, RAG Systems, Llama 3, Vector DBs, AWS, Azure MLOps, Hugging Face, Power BI.
- Experience:
  1. NoBroker (Data Research Intern, Nov 2024 - May 2025): Built Python web scrapers (80% productivity boost), automated data pipelines, ranking 11k+ SEO pages via EDA.
  2. Intellipaat (Data Science Intern, Aug 2023 - Nov 2024): Optimized fraud detection (30% accuracy boost) using Random Forests, built LSTM RNNs for churn prediction (85% accuracy).
- Education: B.Tech in CSE from Techno Main Salt Lake (GPA 8.52, 2019-2023).
- Featured Projects: Meta Kaggler, RAG-OneShot (Groq/Llama3), Agent-AnalytiX (CrewAI), Netflix Recommender.
- Stats: 30+ Projects, 1.8 Years Experience, 1507 LeetCode Rating.
- Tone: Professional, enthusiastic, technically precise but accessible.
- Goal: Encourage recruiters and collaborators to get in touch via email (kaustavdey2015@gmail.com).

IMPORTANT INSTRUCTIONS:
- Keep ALL responses under 3 sentences maximum
- Be concise and natural
- Never write long paragraphs
`;

/* --- UTILITY COMPONENTS --- */

// 1. Twinkling Star Field Background
const StarField = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const starCount = 50;
        const newStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1 + 'px',
            delay: `${Math.random() * 3}s`,
            duration: `${Math.random() * 3 + 2}s`,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#050511]" style={{
                background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #050511 100%)'
            }}></div>

            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-twinkle opacity-20"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        animationDelay: star.delay,
                        animationDuration: star.duration,
                    }}
                />
            ))}
        </div>
    );
};

// 2. Reveal Animation Wrapper
const Reveal = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

/* --- AI COMPONENTS --- */

// 3. AI Chat Widget
const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hi! I'm Kaustav's AI Twin. Ask me anything about his skills, experience, or projects! ✨" }
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
                    contents: [{
                        parts: [{ text: userMsg.text }]
                    }],
                    systemInstruction: {
                        parts: [{ text: PORTFOLIO_CONTEXT }]
                    }
                })
            });

            const data = await response.json();
            console.log("Chat API Response:", data);
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having a bit of trouble connecting to my brain right now. Please try again later!";

            setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', text: "Connection error. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-[#0F111A]/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 p-4 flex justify-between items-center border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                            <span className="font-bold text-white">Chat with AI Kaustav</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 custom-scrollbar bg-black/20">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-purple-600 text-white rounded-br-none'
                                    : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about my projects..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isTyping || !input.trim()}
                            className="p-2 bg-purple-600 rounded-xl text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 group"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} className="group-hover:animate-bounce" />}
            </button>
        </div>
    );
};

/* --- SECTIONS --- */

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const links = ['Home', 'About', 'Resume', 'Projects', 'Certificates', 'Articles', 'Contact'];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050511]/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
            }`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="text-2xl font-bold text-white tracking-tighter">
                    KD<span className="text-purple-500">.AI</span>
                </div>
                <div className="hidden lg:flex gap-6 text-sm font-medium text-gray-300">
                    {links.map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors">
                            {item}
                        </a>
                    ))}
                </div>
                <a href="#contact" className="lg:hidden text-white font-bold">Menu</a>
            </div>
        </nav>
    );
};

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
            <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">

                {/* Profile Picture with Cosmic Portal Frame */}
                <Reveal>
                    <div className="relative mb-10 group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-spin-slow"></div>
                        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#050511] ring-2 ring-purple-500/50 shadow-2xl animate-float bg-[#050511]">
                            <img
                                src="/images/profile.png"
                                alt="Kaustav Dey"
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                        <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-orbit origin-bottom-center" style={{ transformOrigin: '50% 120px' }}></div>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-medium mb-6 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Generative AI Engineer
                    </div>
                </Reveal>

                <Reveal delay={300}>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Kaustav Dey
                    </h1>
                    <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold mb-8">
                        Turning Data into Intelligence
                    </p>
                </Reveal>

                <Reveal delay={500}>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Specializing in RAG systems, Multi-Agent architectures, and scalable AI solutions.
                        Leveraging LangChain, CrewAI, and LLMs to solve complex business problems.
                    </p>
                </Reveal>

                <Reveal delay={700} className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                    <a href="#projects" className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-lg hover:shadow-purple-500/25">
                        View Work
                    </a>
                    <a href="#contact" className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold transition-all backdrop-blur-sm">
                        Contact Me
                    </a>
                </Reveal>
            </div>
        </section>
    );
};

const TechStack = () => {
    const categories = [
        {
            title: "Languages",
            icon: <Terminal className="text-green-400 mb-2" />,
            skills: ["Python", "SQL"]
        },
        {
            title: "Frameworks",
            icon: <Cpu className="text-purple-400 mb-2" />,
            skills: ["LangChain", "CrewAI", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-Learn"]
        },
        {
            title: "Gen AI & NLP",
            icon: <Brain className="text-pink-400 mb-2" />,
            skills: ["RAG Systems", "LLMs (Llama 3)", "Vector DBs", "Prompt Eng.", "Multi-Agent Systems"]
        },
        {
            title: "Tools & Cloud",
            icon: <Cloud className="text-blue-400 mb-2" />,
            skills: ["AWS", "Azure MLOps", "Hugging Face", "Power BI", "Git", "Figma", "VS Code"]
        }
    ];

    return (
        <section className="py-20 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <Reveal>
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Tech Stack</h2>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <Reveal key={idx} delay={idx * 100}>
                            <div className="h-full p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1">
                                <div className="flex flex-col items-center text-center mb-4">
                                    {cat.icon}
                                    <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {cat.skills.map((skill, i) => (
                                        <span key={i} className="px-2 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded border border-white/5 hover:border-purple-500/30 transition-colors">
                                            {skill}
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

const AboutResume = () => {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-6 text-center">
                <Reveal>
                    <h2 className="text-3xl font-bold text-white mb-8">About & Resume</h2>
                    <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left">
                        <p className="text-gray-300 leading-relaxed mb-8">
                            I am an AI Engineer with a passion for building systems that reason. My journey started with data science competitions and evolved into architecting complex RAG pipelines. With strong roots in Python and Deep Learning, I bridge the gap between research and production.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="https://drive.google.com/file/d/1OD72NoM0UQIUznM-R-mMAteAXAkEzmjZ/view?usp=sharing" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                <Download size={18} /> Download Resume
                            </a>
                            <a href="#experience" className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-colors">
                                <Briefcase size={18} /> View Experience
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const Experience = () => {
    const jobs = [
        {
            company: "NoBroker",
            role: "Data Research Intern",
            period: "Nov 2024 - May 2025",
            details: [
                "Engineered a Python web scraper to automate data extraction, boosting team productivity by 80%.",
                "Built an automated data pipeline to transform unstructured web sources into structured datasets.",
                "Conducted Exploratory Data Analysis (EDA) on competitor metrics to optimize SEO strategy, ranking 11k+ pages.",
                "Replaced manual data workflows with programmatic collection methods, significantly improving integrity."
            ]
        },
        {
            company: "Intellipaat Software Solutions",
            role: "Data Science Intern",
            period: "Aug 2023 - Nov 2024",
            details: [
                "Optimized fraud detection systems using Random Forests, increasing model accuracy by 30%.",
                "Engineered LSTM-based RNNs to analyze temporal customer behavior for churn prediction (85% accuracy).",
                "Designed interactive Power BI dashboards to visualize model outputs and translate data into insights."
            ]
        }
    ];

    return (
        <section id="experience" className="py-24 relative z-10 bg-black/30">
            <div className="container mx-auto px-6">
                <Reveal>
                    <h2 className="text-4xl font-bold text-white mb-16 text-center">Work Experience</h2>
                </Reveal>

                <div className="space-y-12 max-w-4xl mx-auto">
                    {jobs.map((job, idx) => (
                        <Reveal key={idx} delay={idx * 150}>
                            <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-2xl">
                                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-2xl"></div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pl-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                                        <div className="text-purple-400 font-medium text-lg flex items-center gap-2 mt-1">
                                            <Briefcase size={16} /> {job.company}
                                        </div>
                                    </div>
                                    <span className="mt-2 md:mt-0 px-4 py-1 rounded-full bg-white/10 text-gray-300 text-sm font-mono border border-white/5 w-fit">
                                        {job.period}
                                    </span>
                                </div>
                                <ul className="space-y-3 pl-4">
                                    {job.details.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed text-sm md:text-base">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Education = () => {
    return (
        <section id="education" className="py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <Reveal>
                    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left hover:bg-white/10 transition-colors">
                        <div className="p-4 bg-purple-900/30 rounded-full text-purple-400">
                            <GraduationCap size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Techno Main Salt Lake</h3>
                            <p className="text-purple-300 font-medium">B.Tech in Computer Science & Engineering</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 text-gray-400 text-sm">
                                <span>Kolkata, India</span>
                                <span className="hidden md:inline">•</span>
                                <span>GPA: 8.52</span>
                                <span className="hidden md:inline">•</span>
                                <span>2019 - 2023</span>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};



const Projects = () => {
    const projects = [
        { name: "Meta Kaggler", desc: "Data analysis platform for Kaggle datasets.", tags: ["Python", "Pandas"], link: "https://github.com/Kaustav2023/Meta-Kaggler" },
        { name: "RAG-OneShot", desc: "Context-aware chatbot using Groq & Llama 3.", tags: ["LangChain", "RAG"], link: "https://github.com/Kaustav2023/RAG-OneShot" },
        { name: "Agent-AnalytiX", desc: "Multi-agent research system with CrewAI.", tags: ["AI Agents", "CrewAI"], link: "https://github.com/Kaustav2023/Agent-AnalytiX" },
        { name: "Netflix Recommender", desc: "Content-based recommendation engine.", tags: ["ML", "Scikit-learn"], link: "https://github.com/Kaustav2023/Netflix_Recommendation_System" },
        { name: "Disease Prediction WebApp", desc: "Multiple disease prediction webapp.", tags: ["Streamlit", "ML"], link: "https://github.com/Kaustav2023/multiple_disease_prediction_web_app" },
    ];

    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto px-6">
                <Reveal>
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
                </Reveal>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {projects.map((proj, i) => (
                        <Reveal key={i} delay={(i + 1) * 100}>
                            <a href={proj.link} target="_blank" rel="noreferrer" className="h-full p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group cursor-pointer block">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-lg bg-purple-500/20 text-purple-300">
                                        <Code size={24} />
                                    </div>
                                    <ExternalLink size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{proj.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{proj.desc}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {proj.tags.map(t => (
                                        <span key={t} className="px-2 py-1 text-xs rounded bg-white/5 text-gray-300 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        </Reveal>
                    ))}
                    {/* GitHub Card */}
                    <Reveal delay={600}>
                        <a href="https://github.com/Kaustav2023" target="_blank" rel="noreferrer" className="h-full flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all text-center group cursor-pointer">
                            <Github size={40} className="text-gray-400 group-hover:text-white mb-4 transition-colors" />
                            <h3 className="text-xl font-bold text-white">View More on GitHub</h3>
                            <p className="text-gray-500 text-sm mt-2">Explore 30+ repositories</p>
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

const Certificates = () => {
    const certs = [
        { name: "Complete Generative AI Course (Udemy)", link: "https://drive.google.com/file/d/1z9S8UVuJ8B8uqqs8pMz3UeKM91Hr57R4/view" },
        { name: "Advanced Certification in Data Science and AI (IIT Roorkee)", link: "https://drive.google.com/file/d/13iNagIrZmWalp_mcg9ipP1UbuIPaSqgV/view" },
        { name: "Getting Started with AWS Machine Learning", link: "https://www.coursera.org/account/accomplishments/verify/N993X3QKNPQS" },
        { name: "Data Analytics and Visualization (Accenture)", link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_bjrKYc3DQmA5JGGM3_1725078565580_completion_certificate.pdf" },
        { name: "Tableau Training for Data Science (Udemy)", link: "https://www.udemy.com/certificate/UC-e675672a-2059-4c8f-aa77-ba4bdc085f8a/" },
        { name: "Advanced Microsoft Excel Certificate (Udemy)", link: "https://www.udemy.com/certificate/UC-86e3dcbe-d72e-43e1-a008-c0b14ffbedd6/" },
        { name: "Python Data Analysis (Coursera)", link: "https://www.coursera.org/account/accomplishments/verify/TZQNL834LMCX?utm_source=mobile&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course" },
        { name: "Introduction to Big Data (Coursera)", link: "https://www.coursera.org/account/accomplishments/verify/L943E9YBBX3N?utm_source=mobile&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course" },
        { name: "Introduction to AWS Identity and Access Management (Coursera)", link: "https://www.coursera.org/account/accomplishments/verify/X62Q29TLN9BJ" }
    ];

    return (
        <section id="certificates" className="py-20 bg-black/30">
            <div className="container mx-auto px-6">
                <Reveal>
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Certifications</h2>
                </Reveal>
                <div className="grid md:grid-cols-3 gap-4">
                    {certs.map((cert, i) => (
                        <Reveal key={i} delay={i * 50}>
                            <a href={cert.link} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-purple-500/30 transition-all hover:bg-white/10 cursor-pointer">
                                <Award className="text-yellow-500 shrink-0" size={20} />
                                <span className="text-gray-300 font-medium text-sm">{cert.name}</span>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Articles = () => {
    const articles = [
        {
            title: "Multiple Disease Prediction WebApp",
            desc: "The Multiple Disease Prediction Web App is an interactive application designed to predict the likelihood of three major diseases: heart disease, diabetes, and Parkinson's disease...",
            link: "https://medium.com/@kaustavdey2015/multiple-disease-prediction-webapp-1f603c9588ce"
        },
        {
            title: "Zomato Sales Uncovered: Deep Analysis",
            desc: "The Zomato Sales Dashboard, developed using Power BI, provides an insightful analysis of Zomato's sales performance across various cities in India...",
            link: "https://medium.com/@kaustavdey2015/zomato-sales-dashboard-power-bi-aa493cf35081"
        }
    ];

    return (
        <section id="articles" className="py-20">
            <div className="container mx-auto px-6">
                <Reveal>
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Latest Articles</h2>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {articles.map((article, i) => (
                        <Reveal key={i} delay={(i + 1) * 100}>
                            <a href={article.link} target="_blank" rel="noreferrer" className="block p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all group cursor-pointer">
                                <div className="flex items-center gap-2 text-purple-400 mb-4 text-sm font-bold uppercase tracking-wider">
                                    <BookOpen size={16} /> Article
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-400 mb-6 line-clamp-2">
                                    {article.desc}
                                </p>
                                <div className="flex items-center gap-2 text-white font-medium">
                                    Read Article <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const GithubStats = () => {
    return (
        <section className="py-16 bg-[#0F111A] border-y border-white/5">
            <div className="container mx-auto px-6">
                <Reveal>
                    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-3xl p-10 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Github size={200} />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">Find more on GitHub</h3>
                                <p className="text-gray-400">I love to solve business problems & uncover hidden data stories.</p>
                                <a href="https://github.com/Kaustav2023" target="_blank" rel="noreferrer" className="inline-block mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors">
                                    Visit Profile
                                </a>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                {[
                                    { label: "Projects", value: "30+" },
                                    { label: "Experience", value: "1.8 Yrs" },
                                    { label: "LeetCode", value: "1507" },
                                    { label: "Coffee", value: "500+" }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5 backdrop-blur-sm min-w-[100px]">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative">
            <div className="container mx-auto px-6 text-center max-w-2xl">
                <Reveal>
                    <h2 className="text-4xl font-bold text-white mb-8">Let's Connect</h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Whether you have a question, a project opportunity, or just want to say hi, my inbox is always open.
                    </p>
                    <a href="mailto:kaustavdey2015@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105">
                        <Mail /> Say Hello
                    </a>

                    <div className="flex justify-center gap-8 mt-16">
                        <a href="https://www.linkedin.com/in/imkd/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={28} /></a>
                        <a href="https://github.com/Kaustav2023" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={28} /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Code size={28} /></a>
                    </div>

                    <div className="mt-16 text-gray-600 text-sm">
                        © 2025 Kaustav Dey. All rights reserved.
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const App = () => {
    return (
        <div className="bg-[#050511] min-h-screen text-white font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
            <StarField />
            <Navbar />
            <Hero />
            <TechStack />
            <AboutResume />
            <Experience />
            <Education />
            <Projects />
            <Certificates />
            <Articles />
            <GithubStats />
            <Contact />
            <AIChatWidget />
            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes orbit {
            from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
        }
        .animate-orbit {
            animation: orbit 5s linear infinite;
        }
        /* Custom Scrollbar for Chat */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
        </div>
    );
};

export default App;



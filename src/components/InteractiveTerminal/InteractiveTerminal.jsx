import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal, FaCode, FaCopy, FaCheck, FaPlay, FaRedo, FaExpandAlt } from 'react-icons/fa';
import { playClick, playPop } from '../../services/soundService';
import './InteractiveTerminal.css';

const codeSnippets = {
  hook: {
    title: 'useTypingEffect.js',
    lang: 'javascript',
    code: `import { useState, useEffect } from 'react';

export const useTypingEffect = (phrases, typeSpeed = 100, backSpeed = 50, pause = 1500) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? backSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  return displayText;
};`
  },
  audio: {
    title: 'soundService.js',
    lang: 'javascript',
    code: `// Synthesized 0-dependency Web Audio API sound FX
export const playMicroChime = (ctx) => {
  const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.05);
    gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.05);
    osc.stop(ctx.currentTime + i * 0.05 + 0.2);
  });
};`
  },
  canvas: {
    title: 'particleMesh.js',
    lang: 'javascript',
    code: `// 60FPS Reactive Canvas Particle Constellation
class ParticleMesh {
  update(mouse, width, height) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    
    // Smooth cursor repulsion
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 120) {
      const force = (120 - dist) / 120;
      this.x -= (dx / dist) * force * 3;
      this.y -= (dy / dist) * force * 3;
    }
  }
}`
  },
  firebase: {
    title: 'firestore.rules',
    lang: 'rules',
    code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{inquiryId} {
      allow create: if request.resource.data.email != null;
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
    match /site_content/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`
  }
};

const initialTerminalHistory = [
  { type: 'system', content: 'Laxman Dhakal DevShell v2.6.0 (x86_64-nepal-web)' },
  { type: 'system', content: 'Type "help" to view available developer commands, or "skills" / "projects".' }
];

const InteractiveTerminal = () => {
  const [activeTab, setActiveTab] = useState('hook');
  const [copied, setCopied] = useState(false);
  const [inputCommand, setInputCommand] = useState('');
  const [history, setHistory] = useState(initialTerminalHistory);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const terminalBottomRef = useRef(null);
  const terminalInputRef = useRef(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCopyCode = () => {
    playPop();
    navigator.clipboard.writeText(codeSnippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCommand = (e) => {
    e.preventDefault();
    const cmd = inputCommand.trim();
    if (!cmd) return;

    playClick();
    const lower = cmd.toLowerCase();
    const newHistory = [...history, { type: 'user', content: `$ ${cmd}` }];

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);
    setInputCommand('');

    if (lower === 'help') {
      newHistory.push({
        type: 'output',
        content: `Available commands:
  help       - Show this command reference
  bio        - View Er. Laxman Dhakal's background
  skills     - List core technical proficiencies
  projects   - Show highlighted client and web projects
  calc       - Scroll to dynamic project cost estimator
  nepali     - नमस्ते! नेपालीमा जानकारी र सन्देश
  contact    - Get direct email, phone, and links
  hire       - Current availability status & freelance rates
  matrix     - Run digital rain matrix animation
  clear      - Clear terminal screen
  whoami     - Display visitor session role`
      });
    } else if (lower === 'bio') {
      newHistory.push({
        type: 'output',
        content: `👤 Er. Laxman Dhakal
🎓 IT Professional & Web Developer
📍 Based in: Nepal (Available for Remote Global Freelance)
💼 5+ years of experience building modern React, SaaS, Full-Stack applications and responsive UI design systems.`
      });
    } else if (lower === 'skills') {
      newHistory.push({
        type: 'output',
        content: `⚡ Tech Stack Matrix:
  [Frontend]  React 19, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, Framer Motion
  [Backend]   Node.js, Express, Firebase Firestore, REST APIs, MongoDB, SQL
  [Design]    Figma, Responsive UI/UX, Design Systems, Glassmorphism
  [Tools]     Git/GitHub, Vite, Webpack, Vercel, Firebase Cloud, SEO 95+`
      });
    } else if (lower === 'projects') {
      newHistory.push({
        type: 'output',
        content: `🚀 Highlighted Projects:
  1. Modern Studio Website     - [React, Framer Motion, Clean Architecture]
  2. SaaS Product Landing Page - [Conversion UI, High Performance]
  3. Finance Dashboard App     - [Data Visualizations, Dark Mode, Firebase]
  4. Online Learning Platform  - [Course Management, Video Lessons, Auth]`
      });
    } else if (lower === 'calc') {
      newHistory.push({ type: 'output', content: `Opening Project Estimator...` });
      document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lower === 'nepali' || lower === 'namaste') {
      newHistory.push({
        type: 'output',
        content: `🙏 नमस्ते! म ई. लक्ष्मण ढकाल (Er. Laxman Dhakal)।
म आधुनिक वेबसाइट, वेब एप्लिकेसन, अनलाइन क्लास तथा डिजिटल सोलुसन निर्माण गर्दछु।
कुनै नयाँ प्रोजेक्ट सुरु गर्न वा सल्लाह लिनको लागि मलाई सिधै सम्पर्क गर्न सक्नुहुन्छ!`
      });
    } else if (lower === 'contact') {
      newHistory.push({
        type: 'output',
        content: `📬 Contact Details:
  Email:   dhakallaxman55@gmail.com
  Phone:   +977-9862215354
  GitHub:  https://github.com/Laxman-dhakal
  LinkedIn: https://www.linkedin.com/in/laxman-dhakal-b24510430/`
      });
    } else if (lower === 'hire') {
      newHistory.push({
        type: 'output',
        content: `🟢 AVAILABILITY: AVAILABLE FOR FREELANCE & CONTRACT WORK
  - Fast turnaround with clean, maintainable code
  - Full mobile responsiveness & 95+ SEO performance
  - Transparent pricing via the Project Estimator`
      });
    } else if (lower === 'matrix') {
      newHistory.push({
        type: 'output',
        content: `01001100 01100001 01111000 01101101 01100001 01101110
[+] Initializing neural interface...
[✓] Core systems online. Matrix mode active.
01000100 01101000 01100001 01101011 01100001 01101100`
      });
    } else if (lower === 'clear') {
      setHistory(initialTerminalHistory);
      return;
    } else if (lower === 'whoami') {
      newHistory.push({
        type: 'output',
        content: `visitor@laxmandhakal-portfolio [Role: Explorer / Potential Client / Collaborator]`
      });
    } else {
      newHistory.push({
        type: 'output',
        content: `zsh: command not found: ${cmd}. Type "help" for available commands.`
      });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      if (commandHistory.length === 0) return;
      const nextIdx = historyIdx + 1 < commandHistory.length ? historyIdx + 1 : historyIdx;
      setHistoryIdx(nextIdx);
      setInputCommand(commandHistory[commandHistory.length - 1 - nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputCommand(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputCommand('');
      }
    }
  };

  return (
    <section className="terminal-section" id="developer-console">
      <div className="container">
        <div className="section-title">
          <span>03.</span>
          <h2>Interactive Dev Console & Code Vault</h2>
        </div>

        <div className="terminal-layout-grid">
          {/* Terminal Console */}
          <div className="terminal-box glass-card" onClick={() => terminalInputRef.current?.focus()}>
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="terminal-title">
                <FaTerminal /> bash — laxman@devbox: ~
              </div>
              <button
                type="button"
                className="terminal-clear-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory(initialTerminalHistory);
                }}
                title="Reset Terminal"
              >
                <FaRedo />
              </button>
            </div>

            <div className="terminal-body">
              {history.map((line, idx) => (
                <div key={idx} className={`terminal-line ${line.type}`}>
                  {line.type === 'user' ? (
                    <span className="user-prompt">{line.content}</span>
                  ) : (
                    <pre>{line.content}</pre>
                  )}
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            <form className="terminal-input-row" onSubmit={handleRunCommand}>
              <span className="prompt-symbol">visitor@laxman:~$</span>
              <input
                ref={terminalInputRef}
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type help, skills, calc, or bio..."
                aria-label="Terminal command input"
                autoComplete="off"
                spellCheck="false"
              />
              <button type="submit" className="terminal-submit-btn" aria-label="Run command">
                <FaPlay />
              </button>
            </form>
          </div>

          {/* Tabbed Code Sandbox Viewer */}
          <div className="code-vault glass-card">
            <div className="code-vault-header">
              <div className="code-tabs">
                {Object.keys(codeSnippets).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`code-tab ${activeTab === key ? 'active' : ''}`}
                    onClick={() => {
                      playClick();
                      setActiveTab(key);
                    }}
                  >
                    <FaCode /> {codeSnippets[key].title}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="code-copy-btn"
                onClick={handleCopyCode}
                title="Copy code snippet"
              >
                {copied ? <><FaCheck /> Copied</> : <><FaCopy /> Copy</>}
              </button>
            </div>

            <div className="code-vault-body">
              <pre className="code-snippet">
                <code>{codeSnippets[activeTab].code}</code>
              </pre>
            </div>

            <div className="code-vault-footer">
              <span className="code-badge">⚡ Production Tested</span>
              <span className="code-badge">100% Modern ES6+ / JSX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;

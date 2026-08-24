import { useState, useRef, useEffect } from 'react';
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaMagic,
  FaVolumeUp,
  FaVolumeMute,
  FaCopy,
  FaCheck,
  FaTrashAlt
} from 'react-icons/fa';
import { playClick, playPop } from '../../services/soundService';
import './AICopilot.css';

const suggestionPrompts = [
  '💰 Estimate Project Cost',
  '🚀 Show Featured React Work',
  '🇳🇵 नमस्ते / परिचय दिनुहोस्',
  '👨‍💻 Core Tech Stack',
  '📞 How do I hire you?'
];

const buildSmartReply = (message) => {
  const text = String(message || '').toLowerCase();

  // Nepali / Devanagari / Romanized Nepali questions
  if (text.includes('namaste') || text.includes('नमस्ते') || text.includes('k cha') || text.includes('kasto cha') || text.includes('hi laxman')) {
    return '🙏 नमस्ते! म ई. लक्ष्मण ढकाल (Er. Laxman Dhakal) को AI Assistant हुँ। म वेबसाइट डिजाइन, रियाक्ट/फुल-स्ट्याक डेभलपमेन्ट, अनलाइन क्लास तथा प्रोजेक्ट इस्टिमेटमा तपाईंलाई सहयोग गर्न सक्छु। तपाईंलाई के सम्बन्धी जानकारी चाहिन्छ?';
  }

  if (text.includes('k k kam') || text.includes('kam garnuhunchha') || text.includes('service nepali') || text.includes('सुविधा') || text.includes('काम')) {
    return 'म मुख्यतया यी सेवाहरू प्रदान गर्दछु:\n1. आधुनिक तथा फास्ट विजनेस वेबसाइट निर्माण\n2. React / Next.js / Full-Stack Web Apps\n3. SaaS ड्यासबोर्ड तथा ई-कमर्स स्टोर\n4. SEO & Performance 95+ अप्टिमाइजेसन\n5. कम्प्युटर तथा वेब डेभलपमेन्ट अनलाइन क्लास';
  }

  if (text.includes('online class') || text.includes('class') || text.includes('course') || text.includes('सिक्न')) {
    return 'अनलाइन क्लास सम्बन्धी जानकारी:\n- Web Development (HTML, CSS, JavaScript, React)\n- Computer Fundamentals, Office Automation, Programming\n- माथिको "Online Class" पेजबाट सिधै गुगल मिटमा जोडिन वा भर्ना हुन सक्नुहुन्छ!';
  }

  if (text.includes('estimate') || text.includes('calc') || text.includes('cost') || text.includes('price') || text.includes('कति पर्छ') || text.includes('बजेट')) {
    return 'वेबसाइट वा प्रोजेक्टको लागत स्कोप र फिचर अनुसार निर्धारण हुन्छ:\n- Landing / Portfolio: $250 / रु. ३२,००० देखि\n- Business Website: $450 / रु. ५८,००० देखि\n- Full-Stack App: $750 / रु. ९८,००० देखि\nतपाईंले हाम्रो वेबसाइटको "Project Cost & Timeline Estimator" प्रयोग गरेर तुरुन्तै कोटेशन निकाल्न सक्नुहुन्छ!';
  }

  if (text.includes('contact') || text.includes('hire') || text.includes('email') || text.includes('phone') || text.includes('सम्पर्क')) {
    return 'ई. लक्ष्मण ढकालसँग सम्पर्क गर्न:\n📧 Email: dhakallaxman55@gmail.com\n📱 Phone/WhatsApp: +977-9862215354\n📍 Location: Nepal (Remote Global)\nतपाईं सिधै Contact फारम वा WhatsApp बाट कुरा गर्न सक्नुहुन्छ!';
  }

  if (text.includes('tech') || text.includes('skill') || text.includes('stack') || text.includes('react')) {
    return 'Core Tech Stack:\n- Frontend: React 19, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, Framer Motion\n- Backend: Node.js, Express, Firebase Firestore, MongoDB, SQL\n- Tools & Cloud: Git/GitHub, Vite, Vercel, Firebase Cloud, SEO 95+';
  }

  if (text.includes('portfolio') || text.includes('project') || text.includes('work')) {
    return 'तपाईंले Featured Work सेक्सनमा विभिन्न प्रोजेक्टहरू हेर्न सक्नुहुन्छ, जसमा SaaS Platform, Studio Web, Finance Dashboard, र Online Learning Hub समावेश छन्। त्यहाँ Device Simulator बाट Desktop/Mobile भ्यू पनि टेस्ट गर्न सकिन्छ!';
  }

  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return 'Hello! I’m the AI Assistant for Er. Laxman Dhakal. How can I help you today? You can ask about web development services, project estimates, tech stack, or online courses.';
  }

  return 'I can assist you with web development services, live project pricing, online courses, and direct consultation with Er. Laxman Dhakal. Try tapping one of the quick suggestions below!';
};

const AICopilot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '🙏 Namaste & Hello! I’m Er. Laxman Dhakal’s AI Copilot. Ask me anything about web development, pricing, project estimates, or online classes (English & नेपाली).'
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSpeak = (text) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyMessage = (text, index) => {
    playPop();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const handleClearChat = () => {
    playClick();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        sender: 'bot',
        text: 'Chat cleared! How else can I help you with your web project or inquiries?'
      }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    playClick();
    const userMsg = { sender: 'user', text: trimmed };
    const botReply = { sender: 'bot', text: buildSmartReply(trimmed) };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput('');
  };

  const handleSuggestionClick = (suggestion) => {
    playClick();
    const cleaned = suggestion.replace(/[^\w\s\u0900-\u097F/?]/gi, '').trim();
    const userMsg = { sender: 'user', text: cleaned };
    const botReply = { sender: 'bot', text: buildSmartReply(cleaned) };
    setMessages((prev) => [...prev, userMsg, botReply]);
  };

  return (
    <div className="ai-copilot">
      {!open && (
        <button
          type="button"
          className="ai-copilot-toggle"
          onClick={() => {
            playPop();
            setOpen(true);
          }}
          aria-label="Open AI Copilot"
        >
          <span className="copilot-pulse" />
          <FaRobot className="copilot-icon-spin" />
          <span>AI Assistant</span>
        </button>
      )}

      {open && (
        <div className="ai-copilot-panel glass-card">
          {/* Header */}
          <div className="ai-copilot-header">
            <div className="ai-copilot-brand">
              <span className="ai-copilot-icon"><FaRobot /></span>
              <div>
                <strong>Laxman AI Copilot</strong>
                <small>Bilingual (English / नेपाली) · Voice Enabled</small>
              </div>
            </div>
            <div className="ai-header-actions">
              <button
                type="button"
                className="ai-action-icon"
                onClick={handleClearChat}
                title="Clear Chat"
              >
                <FaTrashAlt />
              </button>
              <button
                type="button"
                className="ai-copilot-close"
                onClick={() => {
                  playClick();
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setOpen(false);
                }}
                aria-label="Close AI Copilot"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="ai-copilot-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.sender}`}>
                {msg.sender === 'bot' && <span className="ai-badge"><FaMagic /></span>}
                <div className="ai-message-bubble">
                  <p>{msg.text}</p>
                  {msg.sender === 'bot' && (
                    <div className="message-tools">
                      <button
                        type="button"
                        onClick={() => handleSpeak(msg.text)}
                        title={isSpeaking ? 'Stop voice' : 'Listen voice'}
                      >
                        {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.text, idx)}
                        title="Copy text"
                      >
                        {copiedIndex === idx ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="ai-suggestions">
            {suggestionPrompts.map((sug) => (
              <button
                key={sug}
                type="button"
                className="ai-suggestion"
                onClick={() => handleSuggestionClick(sug)}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Composer */}
          <form className="ai-composer" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in English or नेपाली..."
              aria-label="Ask AI Copilot"
            />
            <button type="submit" aria-label="Send message">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AICopilot;

import { useState } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaMagic } from 'react-icons/fa';
import './AICopilot.css';

const suggestions = [
  'What services do you offer?',
  'Show me your portfolio',
  'How do I contact you?',
  'Are you available for freelance work?'
];

const buildReply = (message) => {
  const text = String(message || '').toLowerCase();

  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return 'Hello! I’m your AI Copilot for Er.Laxman Dhakal. I can help with services, portfolio work, contact details, and project availability.';
  }

  if (text.includes('service') || text.includes('offer') || text.includes('what do you do')) {
    return 'I help with website design, React and frontend development, portfolio builds, dashboards, landing pages, website maintenance, and modern UX-focused product experiences.';
  }

  if (text.includes('portfolio') || text.includes('project') || text.includes('work')) {
    return 'You can explore featured work from the Portfolio section. Projects include conversion-focused landing pages, dashboards, product storytelling sites, and responsive web experiences.';
  }

  if (text.includes('contact') || text.includes('hire') || text.includes('email') || text.includes('call')) {
    return 'You can reach out through the Contact page or send an inquiry via the website form. I can also help you prepare a quick project brief before you contact me.';
  }

  if (text.includes('available') || text.includes('freelance') || text.includes('book') || text.includes('start')) {
    return 'Yes, freelance and collaboration work is available depending on the project timeline and scope. Share a brief and I can help assess fit and next steps.';
  }

  if (text.includes('price') || text.includes('cost') || text.includes('budget')) {
    return 'Project pricing depends on scope, timeline, complexity, and whether you need design, development, or ongoing support. A short project brief is the best place to start.';
  }

  if (text.includes('react') || text.includes('frontend') || text.includes('ui') || text.includes('ux')) {
    return 'React-based interfaces, polished UI systems, and conversion-focused user experiences are a core part of the work. I can help build responsive, clean, performant frontends.';
  }

  if (text.includes('thank') || text.includes('thanks') || text.includes('bye')) {
    return 'You’re welcome. I’m here whenever you need help with a project, design idea, or website plan.';
  }

  return 'I can help with portfolio highlights, services, project fit, contact details, and website strategy. Try asking about design, React work, pricing, or availability.';
};

const AICopilot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I’m your AI Copilot. Ask me about services, project work, pricing, or how to get in touch.'
    }
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) return;

    const userMessage = { sender: 'user', text: trimmed };
    const botReply = { sender: 'bot', text: buildReply(trimmed) };

    setMessages((previous) => [...previous, userMessage, botReply]);
    setInput('');
  };

  return (
    <div className="ai-copilot">
      {!open && (
        <button type="button" className="ai-copilot-toggle" onClick={() => setOpen(true)} aria-label="Open AI Copilot">
          <FaRobot />
          <span>AI Copilot</span>
        </button>
      )}

      {open && (
        <div className="ai-copilot-panel">
          <div className="ai-copilot-header">
            <div className="ai-copilot-brand">
              <span className="ai-copilot-icon"><FaRobot /></span>
              <div>
                <strong>AI Copilot</strong>
                <small>Smart assistant</small>
              </div>
            </div>
            <button type="button" className="ai-copilot-close" onClick={() => setOpen(false)} aria-label="Close AI Copilot">
              <FaTimes />
            </button>
          </div>

          <div className="ai-copilot-body">
            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}`} className={`ai-message ${message.sender}`}>
                {message.sender === 'bot' && <span className="ai-badge"><FaMagic /></span>}
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="ai-suggestions">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" className="ai-suggestion" onClick={() => setInput(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>

          <form className="ai-composer" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about services or projects..."
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

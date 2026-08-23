import { useEffect, useRef, useState } from 'react';
import { FaVideo, FaCopy, FaCalendarAlt, FaWhatsapp, FaArrowRight, FaClock, FaUsers, FaDesktop, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaPaperPlane } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import './OnlineClass.css';

const meetUrl = import.meta.env.VITE_ONLINE_CLASS_URL || 'https://meet.google.com/new';

const OnlineClass = () => {
  const [copied, setCopied] = useState(false);
  const [roomStarted, setRoomStarted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.open(meetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);

  const startRoom = async () => {
    if (!navigator.mediaDevices?.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setRoomStarted(true);
    } catch {
      setRoomStarted(false);
    }
  };

  const toggleTrack = (kind) => {
    const track = streamRef.current?.getTracks().find((item) => item.kind === kind);
    if (!track) return;
    track.enabled = !track.enabled;
    if (kind === 'video') setCameraEnabled(track.enabled);
    if (kind === 'audio') setMicrophoneEnabled(track.enabled);
  };

  const shareScreen = async () => {
    if (!navigator.mediaDevices?.getDisplayMedia) return;
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      screenTrack.addEventListener('ended', () => setCameraEnabled(true), { once: true });
      if (videoRef.current) videoRef.current.srcObject = screenStream;
    } catch {
      return;
    }
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((previous) => [...previous, { author: 'You', text: chatInput.trim() }]);
    setChatInput('');
  };

  return (
    <main className="page-content online-class-page">
      <section className="page-hero">
        <div className="container">
          <SectionHeading title="Online Class" subtitle="Join the live Google Meet session, access class details, and stay connected." />
        </div>
      </section>
      <section className="container online-class-content">
        <div className="online-class-card glass-card">
          <div className="online-class-icon"><FaVideo /></div>
          <span className="online-class-status"><i /> Google Meet classroom</span>
          <h2>Ready to join the class?</h2>
          <p>Use the secure Google Meet room for live lessons, screen sharing, questions, and discussion.</p>
          <div className="class-session-meta">
            <span><FaClock /> Next session: 7:00 PM</span>
            <span><FaUsers /> Interactive group class</span>
            <span><FaDesktop /> Screen sharing ready</span>
          </div>
          <div className="online-class-actions">
            <a href={meetUrl} target="_blank" rel="noreferrer" className="button primary">Join Google Meet <FaArrowRight /></a>
            <button type="button" className="button secondary" onClick={copyLink}><FaCopy /> {copied ? 'Link copied' : 'Copy class link'}</button>
          </div>
        </div>
        <div className="classroom-panel glass-card">
          <div className="classroom-header">
            <div><span className="classroom-label">Your classroom</span><h3>{roomStarted ? 'Device check complete' : 'Test your setup'}</h3></div>
            <span className={`classroom-live ${roomStarted ? 'ready' : ''}`}><i /> {roomStarted ? 'Ready' : 'Not started'}</span>
          </div>
          <div className="classroom-stage">
            <video ref={videoRef} autoPlay muted playsInline />
            {!roomStarted && <div className="classroom-placeholder"><FaVideo /><span>Camera preview appears here</span></div>}
          </div>
          <div className="classroom-controls">
            <button type="button" onClick={roomStarted ? () => toggleTrack('audio') : startRoom} aria-label={roomStarted ? 'Toggle microphone' : 'Start camera and microphone'}>{microphoneEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}<span>{roomStarted ? 'Mic' : 'Start'}</span></button>
            <button type="button" onClick={() => toggleTrack('video')} disabled={!roomStarted} aria-label="Toggle camera">{cameraEnabled ? <FaVideo /> : <FaVideoSlash />}<span>Camera</span></button>
            <button type="button" onClick={shareScreen} aria-label="Share screen"><FaDesktop /><span>Share</span></button>
          </div>
          <form className="classroom-chat" onSubmit={sendChat}>
            <div className="chat-heading"><FaUsers /> <strong>Class chat</strong><small>{chatMessages.length} messages</small></div>
            <div className="chat-messages">{chatMessages.length ? chatMessages.map((message, index) => <p key={`${message.author}-${index}`}><strong>{message.author}:</strong> {message.text}</p>) : <span>No messages yet. Say hello to the class.</span>}</div>
            <div className="chat-composer"><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Write a message..." aria-label="Write a class chat message" /><button type="submit" aria-label="Send class chat message"><FaPaperPlane /></button></div>
          </form>
        </div>
        <div className="online-class-tools">
          <a href="https://calendar.google.com/calendar/u/0/r/eventedit" target="_blank" rel="noreferrer" className="class-tool glass-card"><FaCalendarAlt /><span><strong>Add to Calendar</strong><small>Never miss a session</small></span></a>
          <a href="https://wa.me/9779768458058" target="_blank" rel="noreferrer" className="class-tool glass-card"><FaWhatsapp /><span><strong>Ask on WhatsApp</strong><small>Get class support</small></span></a>
        </div>
        <div className="online-class-notes">
          <h3>Before joining</h3>
          <ul>
            <li>Use a stable internet connection and headphones.</li>
            <li>Join a few minutes early and keep your microphone muted.</li>
            <li>Use the chat or raise-hand feature for questions.</li>
          </ul>
        </div>
        <div className="online-class-schedule glass-card">
          <div className="schedule-heading">
            <span>Class plan</span>
            <strong>This week</strong>
          </div>
          <div className="schedule-row active"><span>Today</span><strong>Frontend foundations</strong><small>7:00 PM</small></div>
          <div className="schedule-row"><span>Next</span><strong>React component patterns</strong><small>7:00 PM</small></div>
          <div className="schedule-row"><span>Next</span><strong>Responsive UI workshop</strong><small>7:00 PM</small></div>
        </div>
      </section>
    </main>
  );
};

export default OnlineClass;

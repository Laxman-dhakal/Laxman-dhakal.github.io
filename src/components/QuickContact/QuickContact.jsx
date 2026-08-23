import { useState } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaVideo, FaComments, FaTimes } from 'react-icons/fa';
import './QuickContact.css';

const phoneNumber = '+9779768458058';
const whatsappNumber = '9779768458058';
const bookingUrl = import.meta.env.VITE_BOOKING_URL || '/online-class';

const QuickContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`quick-contact ${open ? 'is-open' : ''}`}>
      <div className="quick-contact-menu" aria-hidden={!open}>
        <a href={`tel:${phoneNumber}`} className="quick-contact-item phone" tabIndex={open ? 0 : -1}>
          <FaPhone /> <span>Direct Call</span>
        </a>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="quick-contact-item whatsapp" tabIndex={open ? 0 : -1}>
          <FaWhatsapp /> <span>WhatsApp</span>
        </a>
        <a href={`mailto:laxmandhakal000@gmail.com`} className="quick-contact-item email" tabIndex={open ? 0 : -1}>
          <FaEnvelope /> <span>Email Me</span>
        </a>
        <a href={bookingUrl} className="quick-contact-item video" tabIndex={open ? 0 : -1}>
          <FaVideo /> <span>Online Call</span>
        </a>
      </div>
      <button type="button" className="quick-contact-toggle" onClick={() => setOpen((previous) => !previous)} aria-label={open ? 'Close contact options' : 'Open contact options'} aria-expanded={open}>
        {open ? <FaTimes /> : <FaComments />}
      </button>
    </div>
  );
};

export default QuickContact;

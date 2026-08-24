import { Link } from 'react-router-dom';
import { getSiteContent } from '../services/siteContentService';
import './NotFound.css';

const NotFound = () => {
  const { interactiveCopy } = getSiteContent();
  const copy = interactiveCopy.notFound;
  return (<main className="not-found page-content">
    <div className="not-found-card glass-card">
      <span className="not-found-code">{copy.code}</span>
      <h1>{copy.title}</h1>
      <p>{copy.text}</p>
      <div className="not-found-actions">
        <Link to="/" className="button primary">Back to Home</Link>
        <Link to="/portfolio" className="button secondary">View Portfolio</Link>
      </div>
    </div>
  </main>);
};

export default NotFound;

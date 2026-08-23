import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <main className="not-found page-content">
    <div className="not-found-card glass-card">
      <span className="not-found-code">404 / ROUTE_NOT_FOUND</span>
      <h1>This page took a wrong turn.</h1>
      <p>The page you requested is unavailable, but the rest of the portfolio is ready to explore.</p>
      <div className="not-found-actions">
        <Link to="/" className="button primary">Back to Home</Link>
        <Link to="/portfolio" className="button secondary">View Portfolio</Link>
      </div>
    </div>
  </main>
);

export default NotFound;

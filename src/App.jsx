import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import useTheme from './hooks/useTheme';
import useScrollPosition from './hooks/useScrollPosition';
import { AuthProvider } from './auth/AuthContext.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Services from './pages/Services';
import Experience from './pages/Experience';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './pages/ProjectDetails';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
const Blog = lazy(() => import('./pages/Blog'));
import OnlineClass from './pages/OnlineClass';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import DashboardLayout from './dashboard/DashboardLayout.jsx';
import DashboardHome from './dashboard/pages/DashboardHome.jsx';
import Analytics from './dashboard/pages/Analytics.jsx';
import Projects from './dashboard/pages/Projects.jsx';
import ServicesDashboard from './dashboard/pages/Services.jsx';
import MediaLibrary from './dashboard/pages/MediaLibrary.jsx';
import PageManager from './dashboard/pages/PageManager.jsx';
import SiteContent from './dashboard/pages/SiteContent.jsx';
import Messages from './dashboard/pages/Messages.jsx';
import Testimonials from './dashboard/pages/Testimonials.jsx';
import FAQDashboard from './dashboard/pages/FAQ.jsx';
import Profile from './dashboard/pages/Profile.jsx';
import Settings from './dashboard/pages/Settings.jsx';
import Notifications from './dashboard/pages/Notifications.jsx';
import Activity from './dashboard/pages/Activity.jsx';
import Preloader from './components/Preloader/Preloader';
import { trackPageView } from './services/analyticsService';
import NotFound from './pages/NotFound';

function PageMetadata() {
  const location = useLocation();
  const titles = {
    '/': 'Laxman Dhakal | Web Developer',
    '/about': 'About | Laxman Dhakal',
    '/skills': 'Skills | Laxman Dhakal',
    '/services': 'Services | Laxman Dhakal',
    '/experience': 'Experience | Laxman Dhakal',
    '/portfolio': 'Portfolio | Laxman Dhakal',
    '/blog': 'Blog | Laxman Dhakal',
    '/online-class': 'Online Class | Laxman Dhakal',
    '/contact': 'Contact | Laxman Dhakal'
  };

  useEffect(() => {
    document.title = titles[location.pathname] || 'Laxman Dhakal | Web Developer';
  }, [location.pathname]);

  return null;
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
}

function App() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const scrollY = useScrollPosition();

  useEffect(() => {
    const handleLoad = () => setTimeout(() => setIsLoading(false), 450);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div className={`app-shell ${theme}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>
      <AuthProvider>
        <Router>
          <AnalyticsTracker />
          <PageMetadata />
          <Routes>
            <Route path="/" element={<MainLayout theme={theme} toggleTheme={toggleTheme} mounted={mounted} scrollY={scrollY} />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="skills" element={<Skills />} />
              <Route path="services" element={<Services />} />
              <Route path="experience" element={<Experience />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="portfolio/:id" element={<ProjectDetails />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<Suspense fallback={<div className="route-loading">Loading blog...</div>}><Blog /></Suspense>} />
              <Route path="blog/:slug" element={<Suspense fallback={<div className="route-loading">Loading article...</div>}><Blog /></Suspense>} />
              <Route path="online-class" element={<OnlineClass />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="projects" element={<Projects />} />
                <Route path="services" element={<ServicesDashboard />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="pages" element={<PageManager />} />
                <Route path="site-content" element={<SiteContent />} />
                <Route path="messages" element={<Messages />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="faq" element={<FAQDashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="activity" element={<Activity />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

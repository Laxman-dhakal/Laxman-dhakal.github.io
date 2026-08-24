import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import AICopilot from '../components/AICopilot/AICopilot';
import InstallPrompt from '../components/InstallPrompt/InstallPrompt';
import QuickContact from '../components/QuickContact/QuickContact';
import CursorSpotlight from '../components/CursorSpotlight/CursorSpotlight';
import SiteNotice from '../components/SiteNotice/SiteNotice';

const MainLayout = ({ theme, toggleTheme, mounted, scrollY }) => (
  <>
    <CursorSpotlight />
    <SiteNotice />
    <Navbar theme={theme} toggleTheme={toggleTheme} mounted={mounted} scrollY={scrollY} />
    <div id="main-content"><Outlet /></div>
    <ScrollToTop />
    <AICopilot />
    <InstallPrompt />
    <QuickContact />
  </>
);

export default MainLayout;

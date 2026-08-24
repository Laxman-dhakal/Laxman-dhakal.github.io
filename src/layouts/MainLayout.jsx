import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import AICopilot from '../components/AICopilot/AICopilot';
import InstallPrompt from '../components/InstallPrompt/InstallPrompt';
import QuickContact from '../components/QuickContact/QuickContact';
import CursorSpotlight from '../components/CursorSpotlight/CursorSpotlight';
import CanvasBackground from '../components/CanvasBackground/CanvasBackground';
import CommandMenu from '../components/CommandMenu/CommandMenu';

const MainLayout = ({ theme, toggleTheme, mounted, scrollY }) => (
  <>
    <CanvasBackground />
    <CursorSpotlight />
    <Navbar theme={theme} toggleTheme={toggleTheme} mounted={mounted} scrollY={scrollY} />
    <div id="main-content"><Outlet /></div>
    <ScrollToTop />
    <AICopilot />
    <InstallPrompt />
    <QuickContact />
    <CommandMenu toggleTheme={toggleTheme} />
  </>
);

export default MainLayout;

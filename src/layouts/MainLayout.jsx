import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import AICopilot from '../components/AICopilot/AICopilot';

const MainLayout = ({ theme, toggleTheme, mounted, scrollY }) => (
  <>
    <Navbar theme={theme} toggleTheme={toggleTheme} mounted={mounted} scrollY={scrollY} />
    <Outlet />
    <ScrollToTop />
    <AICopilot />
  </>
);

export default MainLayout;

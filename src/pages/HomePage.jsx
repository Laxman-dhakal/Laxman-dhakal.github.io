import Hero from '../components/Hero/Hero';
import HomeSignal from '../components/HomeSignal/HomeSignal';
import ProjectCalculator from '../components/ProjectCalculator/ProjectCalculator';
import InteractiveTerminal from '../components/InteractiveTerminal/InteractiveTerminal';
import TechRadar from '../components/TechRadar/TechRadar';
import Portfolio from '../components/Portfolio/Portfolio';
import OnlineCourses from '../components/Skills/Skills';
import Experience from '../components/Experience/Experience';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <main className="main-layout">
      <Hero />
      <HomeSignal />
      <ProjectCalculator />
      <InteractiveTerminal />
      <TechRadar />
      <Portfolio />
      <OnlineCourses sectionId="online-courses" />
      <Experience />
      <Testimonials />
      <FAQ />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default HomePage;

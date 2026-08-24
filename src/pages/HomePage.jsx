import Hero from '../components/Hero/Hero';
import HomeSignal from '../components/HomeSignal/HomeSignal';
import About from '../components/About/About';
import SkillsCatalog from '../components/Services/Services';
import OnlineCourses from '../components/Skills/Skills';
import Experience from '../components/Experience/Experience';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <main className="main-layout">
      <Hero />
      <HomeSignal />
      <OnlineCourses sectionId="online-courses" />
      <SkillsCatalog />
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

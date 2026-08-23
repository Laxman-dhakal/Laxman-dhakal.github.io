import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Services from '../components/Services/Services';
import Experience from '../components/Experience/Experience';
import Portfolio from '../components/Portfolio/Portfolio';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <main className="main-layout">
      <Hero />
      <About />
      <Skills />
      <Services />
      <Experience />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
};

export default HomePage;

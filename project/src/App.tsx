import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
import Badges from './components/Badges';
import Internships from './components/Internships';
import Codolio from './components/Codolio';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin panel removed — development-only panel was deleted per request

function App() {
  const [activeSection, setActiveSection] = useState('home');
  // no dev-only UI shown; leave import.meta.env.DEV available if needed in future
  void import.meta.env.DEV;

  useEffect(() => {
    // Initialize dark mode
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      const sections = ['home', 'about', 'certifications', 'badges', 'internships', 'codolio', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simple scroll progress indicator (updates height of .scroll-progress > i)
    const prog = document.querySelector('.scroll-progress > i') as HTMLElement | null;
    const onScroll = () => {
      if (!prog) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      prog.style.height = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Custom cursor: small circular cursor that follows mouse
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="dark transition-colors duration-300">
      {/* Scroll progress + custom cursor */}
      <div className="scroll-progress"><i style={{ height: '0%' }} /></div>
      <div id="custom-cursor" style={{ position: 'fixed', pointerEvents: 'none', width: 16, height: 16, borderRadius: 9999, background: 'var(--color-accent)', transform: 'translate3d(-9999px,-9999px,0)', boxShadow: '0 0 12px rgba(74,127,167,0.6)', zIndex: 9999 }} />

      <div className="min-h-screen transition-colors duration-300 surface-bg">
        <Navigation activeSection={activeSection} />
        <Hero />
        <About />
        <Certifications />
        <Badges />
        <Internships />
        <Codolio />
        <Projects />
        <Contact />
        <Footer />

        {/* admin panel removed */}
      </div>
    </div>
  );
}

export default App;
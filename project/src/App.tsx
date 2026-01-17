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
import Corner3D from './components/Corner3D';

function App() {
  const [activeSection, setActiveSection] = useState('home');

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

  return (
    <div className="dark transition-colors duration-300">
      {/* Scrollbar styles matching ocean blue + cyan theme */}
      <style>{`
        /* WebKit browsers */
        .dark ::-webkit-scrollbar-track { background: rgba(10,15,26,0.6); }
        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,#22d3ee 0%, #06b6d4 100%);
          border-radius: 9999px;
          border: 3px solid rgba(0,0,0,0);
          background-clip: padding-box;
        }
        .dark ::-webkit-scrollbar-thumb:hover { filter: brightness(0.95); }

        /* Firefox */
        .dark { scrollbar-color: #06b6d4 rgba(10,15,26,0.6); }
      `}</style>

      <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-[#0a0f1a] via-[#0c1929] to-[#0a0f1a]">
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
        <Corner3D />
      </div>
    </div>
  );
}

export default App;
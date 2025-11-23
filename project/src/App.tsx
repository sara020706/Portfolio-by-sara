import React, { useState, useEffect } from 'react';
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

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);

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

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`${isDark ? 'dark' : 'not-dark'} transition-colors duration-300`}>
      {/* Scrollbar styles matching black + red theme */}
      <style>{`
        /* WebKit browsers */
        .dark ::-webkit-scrollbar-track { background: rgba(15,23,42,0.6); }
        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,#fb7185 0%, #ef4444 100%);
          border-radius: 9999px;
          border: 3px solid rgba(0,0,0,0);
          background-clip: padding-box;
        }
        .dark ::-webkit-scrollbar-thumb:hover { filter: brightness(0.95); }

        /* Firefox */
        .dark { scrollbar-color: #ef4444 rgba(15,23,42,0.6); }

        /* Light / not-dark fallback */
        .not-dark ::-webkit-scrollbar-track { background: rgba(243,244,246,0.6); }
        .not-dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,#94a3b8 0%, #64748b 100%);
          border-radius: 9999px;
          border: 3px solid rgba(255,255,255,0);
          background-clip: padding-box;
        }
        .not-dark { scrollbar-color: #64748b rgba(243,244,246,0.6); }
      `}</style>

      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
      }`}>
        <Navigation 
          activeSection={activeSection} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />
        <Hero />
        <About />
        <Certifications />
        <Badges />
        <Internships />
        <Codolio />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
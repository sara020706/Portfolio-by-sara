import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
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
      const sections = ['home', 'about', 'certifications', 'projects', 'contact'];
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
    <div className={`${isDark ? 'dark' : ''} transition-colors duration-300`}>
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
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Badges', href: '#badges' },
    { name: 'Internships', href: '#internships' },
    { name: 'Codolio', href: '#codolio' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: 'https://drive.google.com/file/d/1Gaql01VDTz_ycqmLbcjINc4DFpKKbuHP/view?usp=sharing', external: true },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'surface-bg border-b border-accent shadow-[0_8px_32px_rgba(74,127,167,0.12)]' : 'surface-bg/70 border-b border-accent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Animated Gradient */}
          <div className="flex-shrink-0">
            <button onClick={() => scrollToSection('#home')} className="group flex items-center gap-2 text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300">
              <Sparkles size={24} className="text-light group-hover:rotate-180 transition-transform duration-500" />
              Portfolio
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-4 py-2 text-sm font-medium text-light muted hover:text-light transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" style={{ background: 'linear-gradient(90deg, rgba(74,127,167,0.12), rgba(179,207,229,0.08))' }}></div>
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${activeSection === item.href.slice(1) ? 'text-light' : 'muted hover:text-light'}`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Active Indicator */}
                  {activeSection === item.href.slice(1) && (
                    <>
                      <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, rgba(74,127,167,0.18), rgba(179,207,229,0.12))' }}></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg,#4A7FA7,#B3CFE5)', boxShadow: '0 0 10px rgba(74,127,167,0.8)' }}></div>
                    </>
                  )}
                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" style={{ background: 'linear-gradient(90deg, rgba(74,127,167,0.12), rgba(179,207,229,0.08))' }}></div>
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative p-3 glass-effect rounded-xl text-light hover:scale-105 transition-transform duration-200" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Slide In */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="surface glass-effect border-t border-accent">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-4 py-3 text-base font-medium muted hover:text-light bg-slate-800/20 rounded-lg border border-accent transition-all duration-300"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg border transition-all duration-300 ${activeSection === item.href.slice(1) ? 'text-light bg-[rgba(74,127,167,0.12)] border-accent shadow-[0_0_15px_rgba(74,127,167,0.18)]' : 'muted hover:text-light bg-[rgba(26,61,99,0.12)] border-transparent'}`}
                >
                  {item.name}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

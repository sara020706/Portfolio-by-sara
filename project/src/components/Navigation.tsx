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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-orange-600/30 shadow-[0_8px_32px_rgba(34,211,238,0.15)]'
          : 'bg-slate-900/40 backdrop-blur-md border-b border-orange-600/20'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Animated Gradient */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#home')}
              className="group flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] hover:scale-105 transition-transform duration-300"
            >
              <Sparkles size={24} className="text-orange-500 group-hover:rotate-180 transition-transform duration-500" />
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
                  className="relative px-4 py-2 text-sm font-medium text-orange-300 hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${activeSection === item.href.slice(1)
                      ? 'text-white'
                      : 'text-orange-300 hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Active Indicator */}
                  {activeSection === item.href.slice(1) && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-orange-500/30 rounded-lg animate-pulse"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                    </>
                  )}
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative p-3 bg-slate-800/50 backdrop-blur-md border border-orange-600/30 rounded-xl text-orange-400 hover:bg-slate-800/70 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Slide In */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-orange-600/20">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-4 py-3 text-base font-medium text-orange-300 hover:text-white bg-slate-800/30 hover:bg-slate-800/50 rounded-lg border border-transparent hover:border-orange-600/30 transition-all duration-300"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg border transition-all duration-300 ${activeSection === item.href.slice(1)
                      ? 'text-white bg-gradient-to-r from-orange-600/30 to-orange-500/30 border-orange-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                      : 'text-orange-300 hover:text-white bg-slate-800/30 hover:bg-slate-800/50 border-transparent hover:border-orange-600/30'
                    }`}
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

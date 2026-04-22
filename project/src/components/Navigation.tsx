import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="fixed top-0 w-full z-50 rounded-none" style={{ background: 'rgba(11,15,26,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(245,158,11,0.12)', boxShadow: 'inset 0 1px 1px rgba(245,158,11,0.06), 0 4px 24px rgba(0,0,0,0.4)' }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Animated Gradient */}
          <div className="flex-shrink-0">
            <button onClick={() => scrollToSection('#home')} className="group flex items-center gap-3 text-2xl tracking-tight hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'var(--font-display)' }}>
              <Sparkles size={20} className="text-foreground" />
              <span className="text-foreground">Parthasarathy E</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground hover:text-foreground transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.10), rgba(252,211,77,0.06))' }}></div>
                  <div className="absolute inset-0 bg-amber-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 group ${activeSection === item.href.slice(1) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Active Indicator */}
                  {activeSection === item.href.slice(1) && (
                    <>
                      <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.10), rgba(252,211,77,0.05))' }}></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg,#F59E0B,#FCD34D)', boxShadow: '0 0 10px rgba(245,158,11,0.8)' }}></div>
                    </>
                  )}
                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.10), rgba(252,211,77,0.06))' }}></div>
                  <div className="absolute inset-0 bg-amber-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden relative p-3 liquid-glass rounded-full text-foreground hover:scale-[1.03] transition-transform" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Slide In */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="liquid-glass border-t border-accent">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground rounded-full transition-all duration-300"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-full transition-all duration-300 ${activeSection === item.href.slice(1) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
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

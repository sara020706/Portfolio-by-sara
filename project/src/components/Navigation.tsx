import React from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
    <nav className="fixed top-0 w-full z-50 bg-[#0D1117]/95 backdrop-blur-md border-b border-purple-500/30 shadow-lg shadow-purple-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-red-500 to-rose-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1 md:justify-end">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-300 text-rose-200 border-transparent hover:bg-red-900/10 hover:text-rose-100"
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? 'text-white bg-red-900/60 border-red-800/40'
                        : 'text-rose-200 border-transparent hover:bg-red-900/10 hover:text-rose-100'
                    }`}
                  >
                    {item.name}
                  </button>
                )
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900/50 border border-red-900/30 text-rose-200 hover:bg-red-900/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0D1117]/95 backdrop-blur-md border-t border-purple-500/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2 text-base font-medium rounded-lg border transition-all duration-300 text-rose-200 border-transparent hover:bg-red-900/10"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-lg border transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-white bg-red-900/60 border-red-800/40'
                      : 'text-rose-200 border-transparent hover:bg-red-900/10'
                  }`}
                >
                  {item.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
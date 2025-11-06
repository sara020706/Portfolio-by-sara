import React from 'react';
import { Heart, Github, Linkedin, Mail, Laptop2 } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/sara020706', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/parthasarthy-e-48019a327', label: 'LinkedIn' },
    { icon: Laptop2, href: 'https://codolio.com/profile/Sara0207', label: 'Codolio' },
    { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-black via-slate-900 to-rose-950 text-white py-12 border-t border-slate-800/50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-red-800/10 via-rose-600/8 to-red-900/6 blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-72 h-40 bg-gradient-to-tr from-rose-700/6 to-red-900/8 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
              Parthasarathy E
            </h3>
            <p className="text-gray-300 leading-relaxed">
🚀 Full-Stack Developer | ☁️ Cloud Enthusiast | 🤖 AI & Data Science Explorer
I build smart, scalable, and meaningful digital solutions that connect innovation with real-world impact. With a passion for technology and cloud systems, I turn data-driven ideas into smooth, efficient applications that work beautifully behind the scenes.            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {['Home', 'About', 'Certifications', 'Projects', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-left"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 rounded-lg hover:bg-rose-600/10 hover:border-rose-500/40 transform hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-rose-600/20"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} className="text-rose-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-12 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-rose-500" /> by Parthasarathy © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
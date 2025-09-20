import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full dark:opacity-30 opacity-20 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full dark:opacity-30 opacity-20 animate-pulse delay-1000 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Main Heading */}
          <br></br>
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold dark:text-white text-gray-900 leading-tight">
              <span className="block">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                Parthasarathy E 
              </span>
            </h1>
            <p className="text-xl sm:text-2xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Full-Stack Developer, Cloud Enthusiast, and UI/UX Designer with a background in Artificial Intelligence and Data Science. I specialize in building scalable applications, intuitive user experiences, and intelligent solutions that merge design, development, and data.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToAbout}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 border border-cyan-400/20"
            >
              <span className="flex items-center gap-2">
                View My Work
                <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </button>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com"
              className="px-8 py-4 border-2 dark:border-purple-500/50 border-purple-400 dark:text-purple-300 text-purple-600 font-semibold rounded-xl dark:hover:border-purple-400 hover:border-purple-500 dark:hover:text-purple-200 hover:text-purple-700 dark:hover:bg-purple-500/10 hover:bg-purple-100 transition-all duration-300 backdrop-blur-sm"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 pt-8">
            <a 
              href="https://github.com/sara020706" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 dark:bg-slate-800/50 bg-white/80 backdrop-blur-sm border dark:border-slate-700 border-gray-200 rounded-full shadow-lg hover:shadow-cyan-500/25 transform hover:scale-110 transition-all duration-300 dark:text-gray-300 text-gray-600 hover:text-cyan-400 dark:hover:bg-slate-700/50 hover:bg-white"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/parthasarthy-e-48019a327" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 dark:bg-slate-800/50 bg-white/80 backdrop-blur-sm border dark:border-slate-700 border-gray-200 rounded-full shadow-lg hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 dark:text-gray-300 text-gray-600 hover:text-blue-400 dark:hover:bg-slate-700/50 hover:bg-white"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com"
              className="p-4 dark:bg-slate-800/50 bg-white/80 backdrop-blur-sm border dark:border-slate-700 border-gray-200 rounded-full shadow-lg hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-300 dark:text-gray-300 text-gray-600 hover:text-purple-400 dark:hover:bg-slate-700/50 hover:bg-white"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Hero;
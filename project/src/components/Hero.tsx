import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0f1a] via-[#0c1929] to-[#0d2137] pt-16">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold dark:text-white text-gray-900 leading-tight pb-4">
              <span className="block mb-2">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent animate-pulse drop-shadow-2xl pb-6">
                Parthasarathy E 
              </span>
            </h1>
            <p className="text-xl sm:text-2xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto leading-relaxed drop-shadow-lg mt-8">
🚀 Full-Stack Developer | ☁️ Cloud Enthusiast | 🤖 AI & Data Science Explorer
I build smart, scalable, and meaningful digital solutions that connect innovation with real-world impact. With a passion for technology and cloud systems, I turn data-driven ideas into smooth, efficient applications that work beautifully behind the scenes.            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com"
              className="px-8 py-4 border-2 dark:border-cyan-500/50 border-cyan-400 dark:text-cyan-300 text-cyan-600 font-semibold rounded-xl dark:hover:border-cyan-400 hover:border-cyan-500 dark:hover:text-cyan-200 hover:text-cyan-700 dark:hover:bg-cyan-500/10 hover:bg-cyan-100 transition-all duration-300 backdrop-blur-sm"
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
              className="p-4 dark:bg-slate-800/50 bg-white/80 backdrop-blur-sm border dark:border-slate-700 border-gray-200 rounded-full shadow-lg hover:shadow-teal-500/25 transform hover:scale-110 transition-all duration-300 dark:text-gray-300 text-gray-600 hover:text-teal-400 dark:hover:bg-slate-700/50 hover:bg-white"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com"
              className="p-4 dark:bg-slate-800/50 bg-white/80 backdrop-blur-sm border dark:border-slate-700 border-gray-200 rounded-full shadow-lg hover:shadow-cyan-500/25 transform hover:scale-110 transition-all duration-300 dark:text-gray-300 text-gray-600 hover:text-cyan-400 dark:hover:bg-slate-700/50 hover:bg-white"
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
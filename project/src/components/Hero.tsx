import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0D1117] via-[#1F0A3A] to-[#3B1E54] pt-16">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold dark:text-white text-gray-900 leading-tight pb-4">
              <span className="block mb-2">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-rose-400 via-red-500 to-rose-600 bg-clip-text text-transparent animate-pulse drop-shadow-2xl pb-6">
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
import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'AmortizePro',
      description: 'Loan Amortization Calculator.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Django 5.2','HTML','TailwindCSS','Python 3.13'],
      github: 'https://github.com/sara020706/amortization-table',
      live: 'https://amortization-table.onrender.com/',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      title: 'Day-Wise',
      description: 'AI-Powered Task Scheduling Mobile App.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'TypeScript', 'Capacitor', 'Tailwind CSS'],
      github: 'https://github.com/sara020706/Day-Wise',
      live: 'https://github.com/sara020706/Day-Wise',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      title: 'Focus Sense',
      description: 'A beautiful, minimalist Pomodoro timer app built with React, Vite, and Capacitor for web and Android platforms.',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React 18 + TypeScript + Vite','Tailwind CSS','Lucide React','React Router','Capacitor','SQLite (Android) + IndexedDB (Web)','React Context + useReducer'],
      github: 'https://github.com/sara020706/focus-sense',
      live: 'https://github.com/sara020706/focus-sense',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Flames-By--Sara',
      description: 'A fun FLAMES game built with React, Vite, TailwindCSS, and Lucide icons. Enter two names, and discover your relationship compatibility — Friends, Love, Affection, Marriage, Enemy, or Sister 💕.',
      image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React 18 (with Vite) ⚡','TailwindCSS 🎨','Lucide React (for icons) 🔥'],
      github: 'https://github.com/sara020706/Flames-By--Sara',
      live: 'https://flames-by-sara.vercel.app/',
      color: 'from-cyan-500 to-teal-500'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-[#0d2137] via-[#0c1929] to-[#0d2137] relative border-t border-cyan-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-40 w-80 h-80 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-teal-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Here are some of the projects I've worked on that showcase my skills and passion for creating amazing user experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:transform hover:scale-[1.02] hover:border-cyan-500/30"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Project Links Overlay */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-900/90 backdrop-blur-sm border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors duration-200 text-white hover:text-cyan-400"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-900/90 backdrop-blur-sm border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors duration-200 text-white hover:text-cyan-400"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 text-cyan-300 rounded-full text-sm font-medium hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <div className="pt-4">
                  <a 
                    href={project.live}
                    target="https://github.com"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:gap-3 transition-all duration-300 hover:text-cyan-300"
                  >
                    View Project
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <a 
            href="https://github.com/sara020706"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-700 to-cyan-600 border border-cyan-400/20 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-500 hover:border-cyan-500/50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/20 backdrop-blur-sm"
          >
            View All Projects
            <Github size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

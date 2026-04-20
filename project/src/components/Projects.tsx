import React from 'react';
import { ExternalLink, Github, ArrowRight, Code2, Smartphone, Timer, Heart, Folder, Zap, Palette } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultProjects } from '../data/projects';
import { Project } from '../data/types';

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Code2,
  Smartphone,
  Timer,
  Heart,
  Folder,
  Zap,
  Palette,
};

const Projects: React.FC = () => {
  const [projects] = useLocalStorage<Project[]>('portfolio_projects', defaultProjects);

  return (
    <section id="projects" className="py-20 relative border-t border-accent surface-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(179,207,229,0.14), rgba(74,127,167,0.04))' }}></div>
        <div className="absolute bottom-40 left-40 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(74,127,167,0.12), rgba(179,207,229,0.02))' }}></div>
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
          {projects.map((project, index) => {
            const IconComponent = iconMap[project.icon] || Folder;
              return (
              <div key={index} className="group surface glass-effect border-accent rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:transform hover:scale-[1.02]">
              
                {/* Gradient Header with Icon */}
                <div className={`relative overflow-hidden h-48 flex items-center justify-center`} style={{ background: 'linear-gradient(135deg,var(--color-primary), var(--color-accent))' }}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white/30 rounded-lg rotate-12"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/20 rounded-xl rotate-45"></div>
                    </div>
                  </div>

                  {/* Large Icon */}
                  <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <IconComponent size={80} className={`text-light drop-shadow-2xl`} strokeWidth={1.5} />
                  </div>

                  {/* Project Links Overlay */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-colors duration-200 text-white hover:scale-110"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-colors duration-200 text-white hover:scale-110"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full animate-float"></div>
                    <div className="absolute top-20 right-16 w-1.5 h-1.5 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-16 left-20 w-1 h-1 bg-white/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-light transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[rgba(26,61,99,0.12)] border border-accent text-light rounded-full text-sm font-medium transition-all duration-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <div className="pt-4">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-light font-medium hover:gap-3 transition-all duration-300 hover:text-light"
                    >
                      View Project
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <a href="https://github.com/sara020706" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 btn-primary font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur-sm">
            View All Projects
            <Github size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

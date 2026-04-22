import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Folder, Globe, Code2, Smartphone, Timer, Heart, Zap, Palette } from 'lucide-react';
import { gsap } from 'gsap';

import { defaultProjects } from '../data/projects';
import { Project } from '../data/types';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const projects = defaultProjects;
  const activeProject = projects[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToProject = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(handleNext, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, handleNext]);

  useEffect(() => {
    if (spotlightRef.current) {
      gsap.fromTo(
        spotlightRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden surface-bg border-t border-accent/20"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Side: Spotlight Card */}
          <div className="w-full lg:w-3/5">
            <div className="mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text inline-block">
                Projects
              </h2>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                A showcase of my recent work, blending design aesthetics with robust engineering.
              </p>
            </div>

            <div
              ref={spotlightRef}
              className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden glass-effect border border-white/10 shadow-2xl group"
            >
              {/* Project Image */}
              <div className="absolute inset-0">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-xs font-semibold text-primary uppercase tracking-wider">
                      Featured Work
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-gray-300 text-lg max-w-2xl line-clamp-2 sm:line-clamp-none">
                    {activeProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs sm:text-sm text-gray-400 font-medium px-3 py-1 rounded-lg bg-white/5 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all hover:gap-3"
                    >
                      View Live <Globe size={18} />
                    </a>
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                    >
                      <Github size={22} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white pointer-events-auto hover:bg-primary transition-colors shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white pointer-events-auto hover:bg-primary transition-colors shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Project Queue */}
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Upcoming Projects</span>
              <div className="flex gap-1">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-700'}`}
                  />
                ))}
              </div>
            </div>

            <div ref={queueRef} className="grid grid-cols-1 gap-4">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                const IconComponent = iconMap[project.icon] || Folder;

                return (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`group relative text-left p-4 rounded-2xl border transition-all duration-500 overflow-hidden ${isActive
                      ? 'bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`p-3 rounded-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'
                        }`}>
                        <IconComponent size={20} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-bold transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-300 group-hover:text-white'
                            }`}>
                            {project.title}
                          </h4>
                          {isActive && <Zap size={14} className="text-primary animate-pulse" />}
                        </div>
                        <p className="text-gray-500 text-sm truncate mt-0.5">
                          {project.tags.slice(0, 2).join(' • ')}
                        </p>
                      </div>

                      {!isActive && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={18} className="text-primary" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-6 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/5 border border-primary/20 relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white mb-2">Explore More</h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Check out my complete portfolio of open-source projects on GitHub.
                </p>
                <a
                  href="https://github.com/sara020706"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                >
                  Open GitHub <ExternalLink size={16} />
                </a>
              </div>
              <Github className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 rotate-12 transition-transform group-hover:scale-110 group-hover:-rotate-6" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;

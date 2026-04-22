import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, ChevronLeft, ChevronRight, Globe, ExternalLink } from 'lucide-react';

import { defaultProjects } from '../data/projects';
import { getDirectImageLink } from '../utils/imageUtils';

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<any>(null);
  const projects = defaultProjects;

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
  }, [projects.length]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
    startTimer();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    startTimer();
  };

  const handleSelect = (projectIndex: number) => {
    setActiveIndex(projectIndex);
    startTimer();
  };

  // Helper to get slot layout based on window width
  const getSlotLayout = (slotIndex: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

    // Normalizing slot index: 0 is Spotlight, 1 is Med, 2 is Comp1, 3 is Comp2
    // Anything < 0 is "Exiting", anything > 3 is "Queued"

    if (isMobile) {
      if (slotIndex < 0) return { top: '-10%', left: '0', width: '100%', height: '0%', opacity: 0, zIndex: 0 };
      if (slotIndex === 0) return { top: '0', left: '0', width: '100%', height: '58%', opacity: 1, zIndex: 50 };
      if (slotIndex === 1) return { top: '61%', left: '0', width: '100%', height: '12%', opacity: 1, zIndex: 40 };
      if (slotIndex === 2) return { top: '75%', left: '0', width: '100%', height: '11%', opacity: 1, zIndex: 30 };
      if (slotIndex === 3) return { top: '88%', left: '0', width: '100%', height: '10%', opacity: 1, zIndex: 20 };
      return { top: '100%', left: '0', width: '100%', height: '0%', opacity: 0, zIndex: 10 };
    }

    // Desktop Bento
    // ┌─────────────────────────┬─────────────────┐
    // │                         │  Slot 1 (Med)   │
    // │   Slot 0 (Spotlight)    │  w: 38% h: 48%  │
    // │   w: 60% h: 100%        ├────────┬────────┤
    // │                         │ Slot 2 │ Slot 3 │
    // └─────────────────────────┴────────┴────────┘

    if (slotIndex < 0) return { top: '0', left: '-20%', width: '0%', height: '100%', opacity: 0, zIndex: 0 };
    if (slotIndex === 0) return { top: '0', left: '0', width: '60%', height: '100%', opacity: 1, zIndex: 50 };
    if (slotIndex === 1) return { top: '0', left: '62%', width: '38%', height: '48%', opacity: 1, zIndex: 40 };
    if (slotIndex === 2) return { top: '52%', left: '62%', width: '18%', height: '48%', opacity: 1, zIndex: 30 };
    if (slotIndex === 3) return { top: '52%', left: '82%', width: '18%', height: '48%', opacity: 1, zIndex: 20 };
    return { top: '52%', left: '100%', width: '0%', height: '48%', opacity: 0, zIndex: 10 };
  };

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden surface-bg"
      onMouseEnter={() => { setIsAutoPlaying(false); clearInterval(timerRef.current); }}
      onMouseLeave={() => { setIsAutoPlaying(true); startTimer(); }}
    >
      {/* Golden accent line divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/4 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.55)', marginBottom: '10px' }}>
              Engineering & Design
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 400,
                color: '#f6fafd',
                lineHeight: 1,
              }}
            >
              Projects
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={handlePrev} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all active:scale-90">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2 items-center">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex
                    ? 'w-8 bg-primary shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                />
              ))}
            </div>
            <button onClick={handleNext} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-primary hover:border-primary transition-all active:scale-90">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Bento Conveyor Container */}
        <div className="relative w-full h-[700px] lg:h-[550px]">
          {projects.map((project, index) => {
            // Calculate slot index based on activeIndex
            // 0 = spotlight, 1 = med, 2 = comp1, 3 = comp2
            // We want it to cycle.
            let slotIndex = (index - activeIndex + projects.length) % projects.length;

            // If it just exited (was spotlight at last index), make it -1 for exit animation
            // This is tricky with simple math. Let's just use the current slot.
            const layout = getSlotLayout(slotIndex);
            const isSpotlight = slotIndex === 0;
            const isMedium = slotIndex === 1;
            const isCompact = slotIndex === 2 || slotIndex === 3;
            const isHidden = slotIndex > 3 || slotIndex < 0;

            return (
              <div
                key={index}
                onClick={() => handleSelect(index)}
                className={`absolute transition-all duration-700 ease-in-out rounded-3xl overflow-hidden cursor-pointer border flex flex-col group
                  ${isSpotlight ? 'border-primary/30 shadow-[0_0_50px_rgba(245,158,11,0.07)]' : 'border-white/5 hover:border-primary/20'}
                  ${isHidden ? 'pointer-events-none' : ''}
                `}
                style={{
                  top: layout.top,
                  left: layout.left,
                  width: layout.width,
                  height: layout.height,
                  opacity: layout.opacity,
                  zIndex: layout.zIndex,
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={getDirectImageLink(project.image)}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-700
                      ${isSpotlight ? 'group-hover:scale-105 opacity-100' : 'opacity-40 group-hover:opacity-60'}
                      ${isCompact ? 'opacity-20' : ''}
                    `}
                  />
                  <div className={`absolute inset-0 transition-opacity duration-700
                    ${isSpotlight ? 'bg-gradient-to-t from-black/95 via-black/55 to-black/10' : 'bg-black/70'}
                    ${isMedium ? 'bg-gradient-to-t from-black/80 to-transparent' : ''}
                    ${isCompact ? 'bg-gradient-to-t from-black/90 to-black/50' : ''}
                  `} />
                </div>

                {/* Spotlight Content (Shows only when slotIndex === 0) */}
                <div className={`absolute inset-0 p-8 sm:p-10 flex flex-col justify-end transition-opacity duration-500 delay-200
                  ${isSpotlight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Spotlight</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-primary/80 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-xs hover:gap-3 transition-all active:scale-95">
                      View Live <ExternalLink size={14} />
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all">
                      <Github size={16} />
                    </a>
                  </div>
                </div>

                {/* Medium Card Content */}
                <div className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-500
                  ${isMedium ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{project.tags[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1.5">{project.title}</h4>
                    <p className="text-gray-400 text-[11px] line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>
                </div>

                {/* Compact Card Content */}
                <div className={`absolute inset-0 p-4 flex flex-col justify-between transition-opacity duration-500
                  ${isCompact ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="mb-2">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{project.tags[0]}</span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-tight truncate">{project.title}</h5>
                  </div>
                </div>

                {/* Plus N More Badge (Only for the last COMPACT slot if there are more) */}
                {slotIndex === 3 && projects.length > 4 && (
                  <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex flex-col items-center justify-center gap-1 group-hover:bg-primary/20 transition-all">
                    <span className="text-2xl font-black text-primary">+{projects.length - 4}</span>
                    <span className="text-[9px] text-primary/60 font-bold uppercase tracking-widest">Queue</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Status Bar */}
        <div className="mt-12 flex items-center justify-center gap-3 opacity-40">
          <div className={`h-[1px] rounded-full transition-all duration-700 ${isAutoPlaying ? 'w-12 bg-primary' : 'w-4 bg-gray-600'}`} />
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
            {isAutoPlaying ? 'Stream Active' : 'Paused'}
          </span>
          <div className={`h-[1px] rounded-full transition-all duration-700 ${isAutoPlaying ? 'w-12 bg-primary' : 'w-4 bg-gray-600'}`} />
        </div>
      </div>
    </section>
  );
};

export default Projects;

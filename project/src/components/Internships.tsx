import React, { useMemo } from 'react';
import { Calendar, ExternalLink, Building, Globe, MapPin } from 'lucide-react';
import { defaultInternships } from '../data/internships';
import { Internship } from '../data/types';

const TimelineNode = ({
  internship,
  isLeft
}: {
  internship: Internship,
  isLeft: boolean
}) => {
  const isVirtual = internship.type === 'virtual';

  return (
    <div className={`relative flex flex-col md:flex-row justify-between items-center w-full mb-8 md:mb-12 ${isLeft ? 'md:flex-row-reverse' : ''} group`}>

      {/* Desktop Date Spacer */}
      <div className="hidden md:flex w-5/12 items-center">
        <div className={`w-full ${isLeft ? 'text-left pl-10' : 'text-right pr-10'}`}>
          <span
            className="text-lg font-bold tracking-wide transition-colors duration-300"
            style={{ color: 'var(--color-muted)' }}
          >
            {internship.duration}
          </span>
        </div>
      </div>

      {/* The glowing dot */}
      <div
        className="absolute left-[1.35rem] md:left-1/2 w-3.5 h-3.5 rounded-full border-[2px] z-10 transition-all duration-500 transform -translate-x-1/2 group-hover:scale-150"
        style={{
          background: 'var(--color-bg)',
          borderColor: 'var(--color-primary)',
          boxShadow: '0 0 10px var(--amber- glow, rgba(245,158,11,0.5))'
        }}
      />

      {/* Card Content */}
      <div className="w-full pl-[4rem] md:pl-0 md:w-5/12 relative flex">
        {/* We use ms-auto for right-aligned cards to dock them closer to the center, and max-w to keep them compact */}
        <div
          className={`relative rounded-xl p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1.5 backdrop-blur-md w-full max-w-[420px] ${isLeft ? 'mr-auto' : 'ml-auto'}`}
          style={{
            background: 'rgba(17,24,39,0.7)',
            border: '1px solid rgba(245,158,11,0.15)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
          }}
        >
          {/* Card Hover Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(245,158,11,0.05)' }} />

          {/* Header row: Company and Type Badge */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="px-2.5 py-1 rounded-md shadow-sm flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300"
                style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-hover))' }}
              >
                <span className="text-white font-bold text-[9px] tracking-wider uppercase">
                  {internship.company.length > 20 ? internship.company.substring(0, 20) + '...' : internship.company}
                </span>
              </div>

              {/* Type Badge */}
              <div
                className="px-2 py-1 rounded-md flex items-center gap-1 border"
                style={{
                  background: isVirtual ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  borderColor: isVirtual ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                }}
              >
                {isVirtual ?
                  <Globe size={10} style={{ color: '#3B82F6' }} /> :
                  <MapPin size={10} style={{ color: '#10B981' }} />
                }
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: isVirtual ? '#3B82F6' : '#10B981' }}>
                  {internship.type}
                </span>
              </div>
            </div>

            {internship.certificate && internship.certificate !== '#' && (
              <a
                href={internship.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 px-2.5 py-1 rounded-md"
                style={{ background: 'var(--amber-10)', border: '1px solid var(--amber-15)' }}
              >
                <span className="text-[10px] font-semibold" style={{ color: 'var(--color-primary)' }}>Verify</span>
                <ExternalLink size={12} style={{ color: 'var(--color-primary)' }} />
              </a>
            )}
          </div>

          <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight leading-snug">
            {internship.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <Building size={14} style={{ color: 'var(--color-primary)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>{internship.company}</span>
          </div>

          {/* Mobile date format */}
          <div className="md:hidden flex items-center gap-2 mb-3">
            <Calendar size={12} style={{ color: 'var(--color-primary)' }} />
            <span className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>{internship.duration}</span>
          </div>

          <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--color-light)', opacity: 0.85 }}>
            {internship.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {internship.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
                style={{
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  color: 'var(--color-accent)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Internships: React.FC = () => {
  const sortedInternships = useMemo(() => {
    return [...defaultInternships].sort((a, b) => {
      // Very basic date extraction assuming formats like "Jul 2025 - Sep 2025" or "Jul 2025"
      // We'll split by '-' and take the first part to get the start date
      const getStartDate = (duration: string) => {
        const parts = duration.split('-');
        if (parts.length > 0) {
          const parsed = Date.parse(parts[0].trim());
          return isNaN(parsed) ? 0 : parsed;
        }
        return 0;
      };

      return getStartDate(a.duration) - getStartDate(b.duration);
    });
  }, []);

  return (
    <section id="internships" className="py-24 relative surface-bg" style={{ overflow: 'hidden' }}>

      {/* Golden accent line divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.04) 0%, transparent 70%)', filter: 'blur(70px)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.55)', marginBottom: '12px' }}>
            Professional Journey
          </p>
          <div className="inline-flex items-center gap-4">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 400,
                color: '#f6fafd',
                lineHeight: 1,
              }}
            >
              Internship Experience
            </h2>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-4xl mx-auto">

          {/* Main vertical line */}
          <div
            className="absolute left-[1.35rem] md:left-1/2 top-4 bottom-0 w-[2px] rounded-full transform md:-translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.4) 0%, rgba(245,158,11,0.1) 70%, transparent 100%)' }}
          />

          {/* Render Timeline Nodes unified array */}
          <div className="pt-4">
            {sortedInternships.length > 0 ? (
              sortedInternships.map((internship, index) => (
                <TimelineNode
                  key={index}
                  internship={internship}
                  isLeft={index % 2 === 0}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-12">
                No internships found.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Internships;

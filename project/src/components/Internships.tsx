import React from 'react';
import { Briefcase, Calendar, ExternalLink, Award, Building } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultInternships } from '../data/internships';
import { Internship } from '../data/types';

const Internships: React.FC = () => {
  const [allInternships] = useLocalStorage<Internship[]>('portfolio_internships', defaultInternships);

  // Filter by type
  const virtualInternships = allInternships.filter(i => i.type === 'virtual');

  return (
  <section id="internships" className="py-20 surface-bg relative border-t border-accent">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent-15) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent-10) 0%, transparent 60%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl shadow-lg" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}>
              <Briefcase size={32} className="text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
              Internship Experience
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            My journey through virtual internships and professional development opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Virtual Internships Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}>
                <Award size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Virtual Internships</h3>
            </div>

            {virtualInternships.map((internship, index) => (
              <div
                key={index}
                className="group glass-effect rounded-2xl p-6 shadow-2xl hover:shadow-lg transition-all duration-500 hover:transform hover:scale-[1.02] relative"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="px-2 py-1 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 flex items-center justify-center" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}>
                    <span className="text-white font-semibold text-[10px] text-center uppercase tracking-wider leading-tight whitespace-nowrap">
                      {internship.company.length > 15 ? internship.company.substring(0, 15) + '...' : internship.company}
                    </span>
                  </div>
                  <a
                    href={internship.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)' }}>
                      <span className="text-xs muted font-medium">View</span>
                      <ExternalLink size={12} style={{ color: 'var(--color-accent)' }} />
                    </div>
                  </a>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-white transition-colors duration-300">
                    {internship.title}
                  </h4>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Building size={16} style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm font-medium">{internship.company}</span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{internship.duration}</span>
                    </div>

                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {internship.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {internship.skills.map((skill: string) => (
                      <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)', color: 'var(--color-accent)' }}
                        >
                          {skill}
                        </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(74,127,167,0.06), rgba(179,207,229,0.03))' }}></div>
              </div>
            ))}
          </div>

          {/* Offline Internships Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}>
                <Building size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Offline Internships</h3>
            </div>

            {/* No Offline Internships Card */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-slate-700/50 rounded-full">
                <Briefcase size={48} className="text-gray-400" />
              </div>
              <h4 className="text-xl font-bold text-white">
                No Offline Internships Yet
              </h4>
              <p className="text-gray-300 leading-relaxed max-w-md">
                I haven't cracked any formal offline internships yet, but I'm actively seeking opportunities to gain hands-on industry experience and contribute to innovative projects.
              </p>
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)', color: 'var(--color-accent)' }}>
                  <span>🎯</span>
                  <span className="font-medium">Open to Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Internships;

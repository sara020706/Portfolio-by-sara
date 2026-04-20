import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultCertifications } from '../data/certifications';
import { Certification } from '../data/types';

const Certifications: React.FC = () => {
  const [certifications] = useLocalStorage<Certification[]>('portfolio_certifications', defaultCertifications);

  return (
    <section id="certifications" className="py-20 surface-bg relative border-t border-accent">
      {/* Background Effects - using palette */}
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
            <div
              className="p-3 rounded-xl shadow-lg"
              style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}
            >
              <Award size={32} className="text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
              Certifications
            </h2>
          </div>
          <p className="text-xl muted max-w-3xl mx-auto leading-relaxed">
            Professional certifications that validate my expertise across various technologies and platforms.
            Each certification includes both PDF download and online verification options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group glass-effect rounded-2xl p-6 shadow-2xl hover:shadow-lg transition-all duration-500 hover:transform hover:scale-105 relative"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative">
                <div
                  className="px-2 py-1 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 flex items-center justify-center"
                  style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}
                >
                  <span className="text-white font-semibold text-[10px] text-center uppercase tracking-wider leading-tight whitespace-nowrap">
                    {cert.issuer.length > 15 ? cert.issuer.substring(0, 15) + '...' : cert.issuer}
                  </span>
                </div>

                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors duration-200"
                    style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)' }}
                  >
                    <span className="text-xs muted font-medium">PDF</span>
                    <ExternalLink size={12} style={{ color: 'var(--color-accent)' }} />
                  </a>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors duration-200"
                    style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)' }}
                  >
                    <span className="text-xs muted font-medium">Verify</span>
                    <ExternalLink size={12} style={{ color: 'var(--color-accent)' }} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white transition-colors duration-300 line-clamp-2">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 muted">
                  <CheckCircle size={16} style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm font-medium">{cert.issuer}</span>
                </div>

                <div className="flex items-center gap-2 muted">
                  <Calendar size={16} />
                  <span className="text-sm">{cert.date}</span>
                </div>

                <p className="text-sm leading-relaxed muted">
                  {cert.description}
                </p>

                {/* Verification Badge */}
                <div className="flex items-center justify-between pt-3 border-t border-accent">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-accent)' }}></div>
                    <span className="text-xs muted font-medium">Verified</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full transition-colors duration-200 text-xs text-light font-medium"
                      style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)' }}
                    >
                      Download PDF
                    </a>
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full transition-colors duration-200 text-xs text-light font-medium"
                      style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)' }}
                    >
                      Verify Online
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay - palette only */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(90deg, rgba(74,127,167,0.06), rgba(179,207,229,0.03))' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

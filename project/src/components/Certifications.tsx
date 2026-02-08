import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultCertifications } from '../data/certifications';
import { Certification } from '../data/types';

const Certifications: React.FC = () => {
  const [certifications] = useLocalStorage<Certification[]>('portfolio_certifications', defaultCertifications);

  return (
    <section id="certifications" className="py-20 bg-gradient-to-b from-[#0d2137] via-[#0c1929] to-[#0d2137] relative border-t border-orange-600/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg">
              <Award size={32} className="text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
              Certifications
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional certifications that validate my expertise across various technologies and platforms.
            Each certification includes both PDF download and online verification options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-orange-600/20 transition-all duration-500 hover:transform hover:scale-105 hover:border-orange-600/50 relative"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative">
                <div className="px-2 py-1 bg-pumpkin rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-[10px] text-center uppercase tracking-wider leading-tight whitespace-nowrap">
                    {cert.issuer.length > 15 ? cert.issuer.substring(0, 15) + '...' : cert.issuer}
                  </span>
                </div>
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-orange-600/20 border border-orange-600/30 rounded-md hover:bg-orange-600/30 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-orange-500 font-medium">PDF</span>
                    <ExternalLink size={12} className="text-orange-500" />
                  </a>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-orange-600/20 border border-orange-600/30 rounded-md hover:bg-orange-600/30 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-orange-500 font-medium">Verify</span>
                    <ExternalLink size={12} className="text-orange-500" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle size={16} className="text-orange-500" />
                  <span className="text-sm font-medium">{cert.issuer}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <span className="text-sm">{cert.date}</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {cert.description}
                </p>



                {/* Verification Badge */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-orange-500 font-medium">Verified</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-orange-600/20 border border-orange-600/30 rounded-full hover:bg-orange-600/30 transition-colors duration-200 text-xs text-cyan-300 font-medium"
                    >
                      Download PDF
                    </a>
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-orange-600/20 border border-orange-600/30 rounded-full hover:bg-orange-600/30 transition-colors duration-200 text-xs text-cyan-300 font-medium"
                    >
                      Verify Online
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications; logoUrl: 'https://share.google/images/1pjDaRSTp7CsyFmBq'

import React, { useState } from 'react';
import { Shield, ExternalLink, Star, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultBadges } from '../data/badges';
import { Badge as BadgeType } from '../data/types';

const Badges: React.FC = () => {
  const [expandedBadges, setExpandedBadges] = useState<number[]>([]);
  const [badges] = useLocalStorage<BadgeType[]>('portfolio_badges', defaultBadges);

  const toggleExpand = (index: number) => {
    setExpandedBadges(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="badges" className="py-20 surface-bg relative border-t border-accent">
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
              <Shield size={32} className="text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
              Badges & Achievements
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Recognition and achievements earned through contributions, participation, and excellence in the developer community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => {
            const isExpanded = expandedBadges.includes(index);
            const shouldTruncate = badge.description.length > 100;

            return (
              <div
                key={index}
                className={`group glass-effect rounded-2xl p-6 shadow-2xl hover:shadow-lg transition-all duration-500 relative flex flex-col ${isExpanded ? 'h-auto' : 'h-[420px]'
                  }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="px-2 py-1 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}>
                    <span className="text-white font-semibold text-[10px] text-center uppercase tracking-wider leading-tight whitespace-nowrap">
                      {badge.issuer.length > 15 ? badge.issuer.substring(0, 15) + '...' : badge.issuer}
                    </span>
                  </div>
                  <a
                    href={badge.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
                    style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs muted font-medium">Verify</span>
                    <ExternalLink size={12} style={{ color: 'var(--color-accent)' }} />
                  </a>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col min-h-0">
                  <h3 className="text-lg font-bold text-white transition-colors duration-300 line-clamp-2 mb-3">
                    {badge.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Star size={16} style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm font-medium truncate">{badge.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <CheckCircle size={16} style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm">{badge.date}</span>
                  </div>

                  <div className={`mb-3 ${isExpanded ? '' : 'flex-1 overflow-hidden'}`}>
                    <p className={`text-gray-300 text-sm leading-relaxed ${!isExpanded && shouldTruncate ? 'line-clamp-3' : ''
                      }`}>
                      {badge.description}
                    </p>
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex items-center gap-1 muted text-xs font-medium mt-2 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            Show less <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            Show more <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* View Badge Link */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/50 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--color-accent)' }}></div>
                      <span className="text-xs muted font-medium">Earned</span>
                    </div>
                    <a
                      href={badge.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full transition-colors duration-200 text-xs text-light font-medium whitespace-nowrap"
                      style={{ background: 'var(--accent-10)', border: '1px solid var(--accent-15)' }}
                    >
                      View Badge
                    </a>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(74,127,167,0.06), rgba(179,207,229,0.03))' }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Badges;

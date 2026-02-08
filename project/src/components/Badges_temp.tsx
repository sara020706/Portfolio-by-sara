import React, { useState } from 'react';\r\nimport { useLocalStorage } from '../hooks/useLocalStorage';\r\nimport { defaultBadges } from '../data/badges';\r\nimport { Badge as BadgeType } from '../data/types';
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
    <section id="badges" className="py-20 bg-gradient-to-b from-[#0d2137] via-[#0c1929] to-[#0d2137] relative border-t border-orange-600/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg">
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
                className={`group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-orange-600/20 transition-all duration-500 hover:border-orange-600/50 relative flex flex-col ${isExpanded ? 'h-auto' : 'h-[420px]'
                  }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="px-2 py-1 bg-pumpkin rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-[10px] text-center uppercase tracking-wider leading-tight whitespace-nowrap">
                      {badge.issuer.length > 15 ? badge.issuer.substring(0, 15) + '...' : badge.issuer}
                    </span>
                  </div>
                  <a
                    href={badge.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-orange-600/20 border border-orange-600/30 rounded-md hover:bg-orange-600/30 transition-colors duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-orange-500 font-medium">Verify</span>
                    <ExternalLink size={12} className="text-orange-500" />
                  </a>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col min-h-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 mb-3">
                    {badge.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Star size={16} className="text-orange-500 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{badge.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <CheckCircle size={16} className="text-orange-500 flex-shrink-0" />
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
                        className="flex items-center gap-1 text-orange-500 text-xs font-medium mt-2 hover:text-cyan-300 transition-colors"
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
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="text-xs text-orange-500 font-medium">Earned</span>
                    </div>
                    <a
                      href={badge.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-orange-600/20 border border-orange-600/30 rounded-full hover:bg-orange-600/30 transition-colors duration-200 text-xs text-cyan-300 font-medium whitespace-nowrap"
                    >
                      View Badge
                    </a>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Badges;

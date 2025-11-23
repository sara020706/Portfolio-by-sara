import React, { useState } from 'react';
import { Shield, ExternalLink, Star, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Badges: React.FC = () => {
  const [expandedBadges, setExpandedBadges] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedBadges(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const badges = [
    {
      title: 'Applications & Use Cases Professional',
      issuer: 'Altair Engineering Inc.',
      date: '12.11.2025',
      description: 'Applications & Use Cases Professional is the first certification level, validating solid experience in ML basics, CRISP-DM, ML use cases, visualization, and model handling.',
      verificationUrl: 'https://openbadgepassport.com/app/badge/info/1042400',
      color: 'from-red-500 to-rose-500',
      logoUrl: 'https://logo.clearbit.com/altair.com'
    },
    {
      title: 'Data Engineering Professional',
      issuer: 'Altair Engineering Inc.',
      date: '22.11.2025',
      description: 'Data Engineering Professional is the first certification level, recognizing solid skills in data access, basic transformations, working with multiple datasets, pivot tables, routines, and simple text processing.',
      verificationUrl: 'https://openbadgepassport.com/app/badge/info/1042391',
      color: 'from-rose-400 to-rose-600',
      logoUrl: 'https://logo.clearbit.com/altair.com'
    },
    {
      title: 'CCNA: Introduction to Networks',
      issuer: 'Cisco Networking Academy',
      date: 'November 17, 2025',
      description: 'This badge certifies that the earner completed the Introduction to Networks course, gaining skills in IP addressing, Ethernet protocols, and configuring connectivity between switches, routers, and end devices, with up to 54 labs and 14 hours of hands-on practice using Cisco hardware or Packet Tracer.',
      verificationUrl: 'https://www.credly.com/badges/01550a49-2814-4a87-8038-5f4928e6b359/public_url',
      color: 'from-red-500 to-rose-500',
      logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg'
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: '10/30/2024',
      description: 'Cisco verifies the earner of this badge successfully completed the Introduction to Cybersecurity course. The holder of this student-level credential has introductory knowledge of cybersecurity, including the global implications of cyber threats on industries, and why cybersecurity is a growing profession. They understand vulnerabilities and threat detection and defense. They also have insight into opportunities available with pursuing cybersecurity certifications.',
      verificationUrl: 'https://www.credly.com/badges/be5f310f-827c-45c6-9674-071c5fb66db3/public_url',
      color: 'from-rose-500 to-red-600',
      logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg'
    },
    {
      title: 'Introduction to Data Science',
      issuer: 'Cisco Networking Academy',
      date: '1/27/2025',
      description: 'Cisco verifies the earner of this badge successfully completed the Introduction to Data Science course. The holder of this student-level credential has a broad understanding in basic concepts of Data Analytics, Data Engineering, Data Science and AI/ML related job functions. They also have insight into opportunities available for pursuing career in various data roles.',
      verificationUrl: 'https://www.credly.com/badges/c428971b-d593-49cb-98d3-d96006ad5eb9/public_url',
      color: 'from-red-500 to-rose-600',
      logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg'
    },
    {
      title: 'Introduction to IoT',
      issuer: 'Cisco Networking Academy',
      date: '1/25/2025',
      description: 'Cisco verifies the earner of this badge successfully completed the Introduction to Internet of Things course. The holder of this student-level credential has introductory knowledge of IoT and has an understanding how it enables the Digital Transformation along with emerging technologies such as data analytics, AI/ML and the increased attention on cybersecurity. They understand the importance of Intent Based Networking to be able to connect and secure tens of billions of new devices with ease.',
      verificationUrl: 'https://www.credly.com/badges/fae0c18f-50e2-4f18-8e68-7ce140434815/public_url',
      color: 'from-rose-400 to-red-500',
      logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg'
    },
    {
      title: 'Google Cloud Data Analytics Certificate',
      issuer: 'Google Cloud',
      date: '1/25/2025',
      description: 'This certificate program prepares learners for cloud data analyst, cloud data technician, and cloud operations analyst roles. It builds on foundational data analytics skills including basic SQL, data cleaning, analysis, visualization, and business intelligence. Cloud data analysts leverage cloud computing to prepare, process, and analyze data for key business decisions. Upon completion, learners will be able to share findings effectively with stakeholders and provide data-driven recommendations.',
      verificationUrl: 'https://www.credly.com/badges/2724893a-3e9b-4f86-9e63-0eb571c884d7/public_url',
      color: 'from-rose-400 to-red-500',
      logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg'
    },
  ];

  return (
    <section id="badges" className="py-20 bg-gradient-to-b from-[#3B1E54] via-[#1F0A3A] to-[#3B1E54] relative border-t border-purple-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-rose-400/20 to-red-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-red-500 rounded-xl shadow-lg">
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
                className={`group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-rose-500/20 transition-all duration-500 hover:border-rose-500/50 relative flex flex-col ${
                  isExpanded ? 'h-auto' : 'h-[420px]'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${badge.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 flex items-center justify-center w-16 h-16`}>
                    <img 
                      src={badge.logoUrl} 
                      alt={`${badge.issuer} logo`}
                      className={`w-10 h-10 object-contain ${badge.issuer.includes('Cisco') || badge.issuer.includes('Google') ? 'filter invert' : ''}`}
                    />
                  </div>
                  <a
                    href={badge.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-rose-500/20 border border-rose-500/30 rounded-md hover:bg-rose-500/30 transition-colors duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-rose-400 font-medium">Verify</span>
                    <ExternalLink size={12} className="text-rose-400" />
                  </a>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col min-h-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors duration-300 line-clamp-2 mb-3">
                    {badge.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Star size={16} className="text-rose-400 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{badge.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <CheckCircle size={16} className="text-rose-400 flex-shrink-0" />
                    <span className="text-sm">{badge.date}</span>
                  </div>

                  <div className={`mb-3 ${isExpanded ? '' : 'flex-1 overflow-hidden'}`}>
                    <p className={`text-gray-300 text-sm leading-relaxed ${
                      !isExpanded && shouldTruncate ? 'line-clamp-3' : ''
                    }`}>
                      {badge.description}
                    </p>
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex items-center gap-1 text-rose-400 text-xs font-medium mt-2 hover:text-rose-300 transition-colors"
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
                      <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="text-xs text-rose-400 font-medium">Earned</span>
                    </div>
                    <a
                      href={badge.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full hover:bg-rose-500/30 transition-colors duration-200 text-xs text-rose-300 font-medium whitespace-nowrap"
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

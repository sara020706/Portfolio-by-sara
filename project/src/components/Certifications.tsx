import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: 'Beginner: Google Cloud Data Analytics ',
      issuer: 'Google',
      date: '2025',
      credentialId: '',
      pdfUrl: 'https://drive.google.com/file/d/116lKGOQtmzyBZRf_zyAykcjgx9Qxdc1R/view?usp=drive_link',
      verificationUrl: 'https://www.credly.com/badges/2724893a-3e9b-4f86-9e63-0eb571c884d7',
      description: 'Demonstrates basic understanding of data analytics in cloud',
      color: 'from-orange-500 to-yellow-500',
      logo: '📊'
    },
    {
      title: 'Carrer essestials in cybersecurity by microsoft and linkdin',
      issuer: 'microsoft',
      date: '2025',
      credentialId: 'GCP-PD-2023-002',
      pdfUrl: 'https://drive.google.com/file/d/1BpV0Jt_CFxXTzmo-uyqJwx2n_kGk-Uty/view?usp=drive_link',
      verificationUrl: 'https://www.linkedin.com/learning/certificates/2906edea526205ae1f250bbbba2750ddfd33390feb50f40fcb40aff58419ecfb?trk=share_certificate',
      description: 'Validates skills in cyber security',
      color: 'from-blue-500 to-cyan-500',
      logo: '⚙️'
    },
    {
      title: 'Introduction to modern AI',
      issuer: 'Cisco networking academy',
      date: '2025',
      credentialId: 'META-FE-2023-003',
      pdfUrl: 'https://drive.google.com/file/d/1C15ap7DF7GhTcNy0_F4rm-lpBP_aj9QZ/view?usp=drive_link',
      verificationUrl: 'https://www.credly.com/badges/d176ad0d-8191-44f8-9fa5-c67c4229eada',
      description: 'Comprehensive program covering basics of modern AI',
      color: 'from-blue-600 to-purple-600',
      logo: '🤖'
    },
    {
      title: 'Introduction to datascience',
      issuer: 'Cisco networking academy',
      date: '2025',
      credentialId: 'MDB-DEV-2023-004',
      pdfUrl: 'https://drive.google.com/file/d/1nYmKn1Olc_euwrligracukCz7TMBduUO/view?usp=drive_link',
      verificationUrl: 'https://www.credly.com/badges/c428971b-d593-49cb-98d3-d96006ad5eb9',
      description: 'Intro to the basics of datascience and its related roles',
      color: 'from-green-500 to-emerald-500',
      logo: '🗃️'
    },
    {
      title: 'Introduction to iot and digital transformation',
      issuer: 'Cisco networking academy',
      date: '2025',
      credentialId: 'DCA-2022-005',
      pdfUrl: 'https://drive.google.com/file/d/17vqKkJqe0rHKC0lnVLZGoPE06uNDUATm/view?usp=drive_link',
      verificationUrl: 'https://www.credly.com/badges/fae0c18f-50e2-4f18-8e68-7ce140434815',
      description: 'Intro to the basics of iot and digital transformation',
      color: 'from-blue-400 to-blue-600',
      logo: '📱'
    },
    {
      title: 'Introduction to cyber security',
      issuer: 'Cisco networking academy',
      date: '2025',
      credentialId: 'CKA-2022-006',
      pdfUrl: 'https://drive.google.com/file/d/1EXD5D8_QWfk_2mElyqi4YC4V5BtMKgiS/view?usp=drive_link',
      verificationUrl: 'https://www.credly.com/badges/be5f310f-827c-45c6-9674-071c5fb66db3',
      description: 'Introduction to basics of cyber security',
      color: 'from-purple-500 to-indigo-500',
      logo: '⚙️'
    },
    
  ];

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl shadow-lg">
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
              className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:transform hover:scale-105 hover:border-cyan-500/50"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative">
                <div className={`text-4xl p-3 bg-gradient-to-r ${cert.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {cert.logo}
                </div>
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-md hover:bg-emerald-500/30 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-emerald-400 font-medium">PDF</span>
                    <ExternalLink size={12} className="text-emerald-400" />
                  </a>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-md hover:bg-cyan-500/30 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-cyan-400 font-medium">Verify</span>
                    <ExternalLink size={12} className="text-cyan-400" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                  {cert.title}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle size={16} className="text-emerald-400" />
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
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-400 font-medium">Verified</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full hover:bg-emerald-500/30 transition-colors duration-200 text-xs text-emerald-300 font-medium"
                    >
                      Download PDF
                    </a>
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full hover:bg-cyan-500/30 transition-colors duration-200 text-xs text-cyan-300 font-medium"
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

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-cyan-400 mb-2">6+</div>
            <div className="text-gray-300 text-sm">Active Certifications</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-emerald-400 mb-2">2</div>
            <div className="text-gray-300 text-sm">Cloud Platforms</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-gray-300 text-sm">Verification Rate</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-pink-400 mb-2">2025</div>
            <div className="text-gray-300 text-sm">Latest Certified</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-block p-8 bg-gradient-to-r from-slate-800/50 to-purple-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to verify a specific certification?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Click on any certification above to be redirected to the official verification portal.
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <CheckCircle size={20} />
              <span className="font-medium">All certifications are verified and up-to-date</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
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
      color: 'from-red-500 to-rose-500',
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
      color: 'from-rose-500 to-red-600',
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
      color: 'from-red-500 to-rose-600',
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
      color: 'from-rose-400 to-red-500',
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
      color: 'from-red-500 to-rose-500',
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
      color: 'from-rose-500 to-red-600',
      logo: '⚙️'
    },
    
  ];

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-slate-900 via-red-900 to-rose-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-rose-400/20 to-red-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-red-500 rounded-xl shadow-lg">
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
              className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-rose-500/20 transition-all duration-500 hover:transform hover:scale-105 hover:border-rose-500/50 relative"
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
                    className="flex items-center gap-1 px-2 py-1 bg-rose-500/20 border border-rose-500/30 rounded-md hover:bg-rose-500/30 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-rose-400 font-medium">PDF</span>
                    <ExternalLink size={12} className="text-rose-400" />
                  </a>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 bg-rose-500/20 border border-rose-500/30 rounded-md hover:bg-rose-500/30 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-rose-400 font-medium">Verify</span>
                    <ExternalLink size={12} className="text-rose-400" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors duration-300 line-clamp-2">
                  {cert.title}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle size={16} className="text-rose-400" />
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
                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-rose-400 font-medium">Verified</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full hover:bg-rose-500/30 transition-colors duration-200 text-xs text-rose-300 font-medium"
                    >
                      Download PDF
                    </a>
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full hover:bg-rose-500/30 transition-colors duration-200 text-xs text-rose-300 font-medium"
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
            <div className="text-3xl font-bold text-rose-400 mb-2">6+</div>
            <div className="text-gray-300 text-sm">Active Certifications</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-rose-300 mb-2">2</div>
            <div className="text-gray-300 text-sm">Cloud Platforms</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-rose-300 mb-2">100%</div>
            <div className="text-gray-300 text-sm">Verification Rate</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-rose-200 mb-2">2025</div>
            <div className="text-gray-300 text-sm">Latest Certified</div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Certifications;
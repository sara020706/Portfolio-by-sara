import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, Award, Building } from 'lucide-react';

const Internships: React.FC = () => {
  const virtualInternships = [
    {
      title: 'Iot Cloud Engineer virtual internship',
      company: 'amazon(through eduskills foundation)',
      duration: 'Jul 2025 - Sep 2025',
      location: 'Remote',
      description: 'During my AWS IoT Cloud Engineer Internship at Eduskills, I gained hands-on experience in AWS IoT Core, MQTT protocol, device connectivity and management, cloud-based data processing, IoT security best practices, and integrating IoT devices with cloud services.',
      technologies: ["AWS IoT Core", "MQTT", "Lambda", "Python"],
      certificate: 'https://drive.google.com/file/d/1etml6P72u0Ko-5k2LjFdMElPdh7mfljS/view?usp=sharing',
      color: 'from-teal-500 to-cyan-500',
      logoUrl: 'https://logo.clearbit.com/amazon.com'
    },
    {
      title: 'Cloud Engineering Intern',
      company: 'Cloud Solutions Inc.',
      duration: 'Jun 2024 - Aug 2024',
      location: 'Remote',
      description: 'Gained hands-on experience with AWS services, deployment automation, and cloud architecture.',
      technologies: ['AWS', 'Docker', 'Jenkins', 'Python'],
      certificate: '#',
      color: 'from-cyan-400 to-cyan-600',
      logoUrl: 'https://logo.clearbit.com/aws.amazon.com'
    },
  ];

  return (
    <section id="internships" className="py-20 bg-gradient-to-b from-[#0d2137] via-[#0c1929] to-[#0d2137] relative border-t border-cyan-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-teal-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl shadow-lg">
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
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg">
                <Award size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Virtual Internships</h3>
            </div>

            {virtualInternships.map((internship, index) => (
              <div
                key={index}
                className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:transform hover:scale-[1.02] hover:border-cyan-500/50 relative"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${internship.color} rounded-xl shadow-lg flex items-center justify-center w-16 h-16`}>
                    <img 
                      src={internship.logoUrl} 
                      alt={`${internship.company} logo`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <a
                    href={internship.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-md hover:bg-cyan-500/30 transition-colors duration-200">
                      <span className="text-xs text-cyan-400 font-medium">View</span>
                      <ExternalLink size={12} className="text-cyan-400" />
                    </div>
                  </a>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {internship.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building size={16} className="text-cyan-400" />
                    <span className="text-sm font-medium">{internship.company}</span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{internship.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {internship.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {internship.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${internship.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Offline Internships Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm">
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

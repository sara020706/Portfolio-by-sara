import React from 'react';
import { Code, Palette, Zap, Heart } from 'lucide-react';
import Img1 from './assets/img1.jpg';

const About: React.FC = () => {
  const skills = [
    { name: 'Frontend Development', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { name: 'UI/UX Design', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { name: 'Performance Optimization', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { name: 'User Experience', icon: Heart, color: 'from-red-500 to-rose-500' },
  ];

  const technologies = [
    "Python",
    "Java",
    "C++",
    "C",
    "JavaScript",
    "TypeScript",
    "HTML",
    "MySQL",
    "Node.js",
    "Firebase"
  ];

  return (
    <section id="about" className="py-20 relative bg-gradient-to-br from-slate-800 via-slate-900 to-purple-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Beyond development and design, I’m someone who thrives on learning. I’m exploring AI, cloud technologies, and problem-solving while working on projects that challenge me to think differently. My goal is to combine creativity and technical expertise to build solutions that make an impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="relative z-10">
            <div className="relative z-10">
              <img 
                src="project/src/assets/img1.jpg"
                alt="Parthasarathy"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-2 border-cyan-500/30"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-3xl opacity-50 -z-10 transform scale-110"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-300 leading-relaxed text-lg">
              With a foundation in Artificial Intelligence and Data Science and a passion for emerging technologies, I bring together analytical thinking and creative problem-solving. I believe that impactful technology should not only solve challenges at scale but also inspire innovation and curiosity.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div 
                    key={skill.name}
                    className="group p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:transform hover:scale-105 hover:border-cyan-500/30"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-sm">
                      {skill.name}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Technologies I work with
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 text-gray-300 rounded-full text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

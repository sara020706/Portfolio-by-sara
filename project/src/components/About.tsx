import React from 'react';
import { Code, Palette, Zap, Heart } from 'lucide-react';
// image imported via static path in markup

const About: React.FC = () => {
  const skills = [
    { name: 'Frontend Development', icon: Code, color: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' },
    { name: 'UI/UX Design', icon: Palette, color: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' },
    { name: 'Performance Optimization', icon: Zap, color: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' },
    { name: 'User Experience', icon: Heart, color: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' },
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
    <section id="about" className="py-24 relative surface-bg">
      {/* Golden accent line divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 60%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.55)', marginBottom: '10px' }}>
            Who I Am
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 400,
              color: '#f6fafd',
              lineHeight: 1,
            }}
          >
            About Me
          </h2>
          <p className="mt-8 text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed opacity-80">
            Beyond development, I’m someone who thrives on learning and exploring new technologies. I’m currently diving into AI, cloud computing, and problem-solving through projects that push me to think differently. My goal is to blend creativity with technical depth to build solutions that truly make an impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/profile.jpg"
                alt="Parthasarathy"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                style={{ border: '2px solid rgba(245,158,11,0.18)' }}
              />
            </div>
            <div className="absolute inset-0 rounded-2xl blur-3xl opacity-40 -z-10 transform scale-110" style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.10), rgba(252,211,77,0.05))' }}></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="prose pcyan-lg dark:pcyan-invert">
              <p className="text-gray-300 leading-relaxed text-lg">
                With a foundation in Artificial Intelligence and Data Science and a deep passion for emerging technologies, I blend analytical thinking with creative problem-solving. I believe technology should do more than solve challenges at scale — it should spark innovation, curiosity, and meaningful change              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group p-6 glass-effect rounded-xl shadow-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: skill.color }}>
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
                    className="px-4 py-2 glass-effect text-gray-300 rounded-full text-sm font-medium transition-all duration-200"
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

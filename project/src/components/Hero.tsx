import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(253, 128, 46, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      updateCanvasSize();
      // Reposition particles to fit new canvas size
      particles.forEach((particle) => {
        if (particle.x > canvas.width) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = canvas.height;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0a0f1a 0%, #0c1929 50%, #0d2137 100%)',
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Main Heading with Glow */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/10 border border-orange-600/30 rounded-full backdrop-blur-sm mb-4 animate-bounce">
              <Sparkles size={16} className="text-orange-500" />
              <span className="text-sm font-medium text-cyan-300">Welcome to my portfolio</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold leading-tight">
              <span className="block mb-4 text-white/90 animate-fade-in">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                Parthasarathy E
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              <span className="text-orange-500 font-semibold">🚀 Full-Stack Developer</span> |{' '}
              <span className="text-orange-400 font-semibold">☁️ Cloud Enthusiast</span> |{' '}
              <span className="text-purple-400 font-semibold">🤖 AI & Data Science Explorer</span>
            </p>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              I build smart, scalable, and meaningful digital solutions that connect innovation with real-world impact.
              Turning data-driven ideas into smooth, efficient applications that work beautifully.
            </p>
          </div>

          {/* Glassmorphic CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com"
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Mail size={24} />
                Get In Touch
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <button
              onClick={scrollToAbout}
              className="px-10 py-5 bg-white/5 backdrop-blur-md border-2 border-orange-600/30 text-cyan-300 font-bold text-lg rounded-2xl hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              View My Work
            </button>
          </div>

          {/* Floating Social Icons with Magnetic Hover */}
          <div className="flex justify-center space-x-6 pt-8">
            {[
              { Icon: Github, href: 'https://github.com/sara020706', color: 'cyan' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/parthasarthy-e-48019a327', color: 'teal' },
              { Icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com', color: 'purple' },
            ].map(({ Icon, href, color }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-5 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-${color}-500/50 transform hover:scale-110 hover:-translate-y-2 transition-all duration-300`}
              >
                <Icon size={28} className={`text-gray-400 group-hover:text-${color}-400 transition-colors duration-300`} />
                <div className={`absolute inset-0 bg-gradient-to-r from-${color}-500/20 to-${color}-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}></div>
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <button
              onClick={scrollToAbout}
              className="flex flex-col items-center gap-2 text-orange-500 hover:text-cyan-300 transition-colors duration-300"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown size={32} className="animate-pulse" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import * as THREE from 'three';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const threeMountRef = useRef<HTMLDivElement>(null);

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

    // Create particles (color uses strict palette --color-accent)
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
  // use CSS color --color-accent (B3CFE5) converted to rgba
  ctx.fillStyle = `rgba(179,207,229, ${particle.opacity})`;
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

  // Simple Three.js hero: low-poly tetrahedron + particle field
  useEffect(() => {
    const mount = threeMountRef.current;
    if (!mount) return;

    // Guard - don't initialize on low-power devices
    if (typeof window === 'undefined' || !('WebGLRenderingContext' in window)) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const hemi = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(hemi);

    const point = new THREE.PointLight(0x4a7fa7, 1.2, 50);
    point.position.set(5, 5, 5);
    scene.add(point);

    // Tetrahedron
    const geom = new THREE.TetrahedronGeometry(1.6, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0x4a7fa7, metalness: 0.2, roughness: 0.3, emissive: 0x0 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.rotation.x = 0.5;
    scene.add(mesh);

    // Particles
    const particleCount = 200;
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 0.08, color: 0xB3CFE5, transparent: true, opacity: 0.85 });
    const points = new THREE.Points(particlesGeom, particlesMat);
    scene.add(points);

    let rafId: number;
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', onResize);

    const animate = (t: number) => {
      rafId = requestAnimationFrame(animate);
      const time = t * 0.001;
      mesh.rotation.y = time * 0.3;
      mesh.rotation.x = 0.5 + Math.sin(time * 0.6) * 0.15;
      points.rotation.y = time * -0.02;
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    // cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      geom.dispose();
      mat.dispose();
      particlesGeom.dispose();
      particlesMat.dispose();
    };
  }, []);
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 50%, var(--color-primary) 100%)' }} />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(179,207,229,0.18), rgba(74,127,167,0.06))' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', background: 'radial-gradient(circle, rgba(74,127,167,0.14), rgba(26,61,99,0.04))' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', background: 'radial-gradient(circle, rgba(74,127,167,0.08), rgba(179,207,229,0.02))' }}></div>
      </div>

  {/* Three.js mount (decorative, pointer-events none) */}
  <div ref={threeMountRef} className="absolute right-8 top-20 hidden md:block" style={{ width: 480, height: 480, pointerEvents: 'none', zIndex: 0 }} />

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Main Heading with Glow */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm mb-4 animate-bounce" style={{ background: 'rgba(74,127,167,0.08)', border: '1px solid rgba(179,207,229,0.08)' }}>
              <Sparkles size={16} className="text-light" />
              <span className="text-sm font-medium muted">Welcome to my portfolio</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold leading-tight">
              <span className="block mb-4 text-light animate-fade-in">Hi, I'm</span>
              <span className="block gradient-text drop-shadow-[0_0_30px_rgba(74,127,167,0.45)]">
                Parthasarathy E
              </span>
            </h1>

            <p className="text-xl sm:text-2xl muted max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold">🚀 Full-Stack Developer</span> |{' '}
              <span className="font-semibold">☁️ Cloud Enthusiast</span> |{' '}
              <span className="font-semibold">🤖 AI & Data Science Explorer</span>
            </p>

            <p className="text-lg muted max-w-3xl mx-auto leading-relaxed">
              I build smart, scalable, and meaningful digital solutions that connect innovation with real-world impact.
              Turning data-driven ideas into smooth, efficient applications that work beautifully.
            </p>
          </div>

          {/* Glassmorphic CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com" className="group relative px-10 py-5 btn-primary font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-3">
                <Mail size={24} />
                Get In Touch
              </span>
              <div className="absolute inset-0" style={{ opacity: 0, transition: 'opacity 200ms', background: 'linear-gradient(90deg,var(--color-primary),var(--color-accent))' }}></div>
            </a>

            <button onClick={scrollToAbout} className="px-10 py-5 bg-[rgba(26,61,99,0.12)] border-2 border-accent font-bold text-lg rounded-2xl hover:bg-[rgba(26,61,99,0.18)] transition-all duration-300">
              View My Work
            </button>
          </div>

          {/* Floating Social Icons with Magnetic Hover */}
          <div className="flex justify-center space-x-6 pt-8">
            {[{ Icon: Github, href: 'https://github.com/sara020706' }, { Icon: Linkedin, href: 'https://www.linkedin.com/in/parthasarthy-e-48019a327' }, { Icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ps2601296@gmail.com' }].map(({ Icon, href }, index) => (
              <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="group relative p-5 glass-effect rounded-2xl shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <Icon size={28} className={`text-light transition-colors duration-300`} />
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} style={{ background: 'linear-gradient(90deg, rgba(74,127,167,0.12), rgba(179,207,229,0.08))' }}></div>
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <button onClick={scrollToAbout} className="flex flex-col items-center gap-2 text-light hover:text-light transition-colors duration-300">
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

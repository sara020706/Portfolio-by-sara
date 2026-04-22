import React, { useRef } from 'react';
import { ChevronDown, Mail } from 'lucide-react';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';



const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        {/* Hero (navigation is handled by site `Navigation` component) */}
        <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-24">
          <div className="text-sm text-muted-foreground tracking-widest uppercase mt-0 mb-4 animate-fade-rise" style={{ letterSpacing: '0.12em' }}>
            Welcome to my portfolio
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2px] font-normal text-foreground animate-fade-rise-delay">
            <span className="block">Hi, I'm</span>
            <span className="block"><em className="not-italic text-muted-foreground">Parthasarathy E</em></span>
          </h1>

          <div className="text-muted-foreground text-base sm:text-lg mt-6 tracking-wide animate-fade-rise-delay-2">
            <span className="font-semibold">🚀 Full-Stack Developer</span> {' | '}
            <span className="font-semibold">☁️ Cloud Enthusiast</span> {' | '}
            <span className="font-semibold">🤖 AI & Data Science Explorer</span>
          </div>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-6 leading-relaxed animate-fade-rise-delay-2">
            I build smart, scalable, and meaningful digital solutions that connect innovation with real-world impact. Turning data-driven ideas into smooth, efficient applications that work beautifully.
          </p>

          <div className="flex gap-4 mt-32 justify-center animate-fade-rise-delay-3">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="liquid-glass rounded-full px-10 py-4 text-base text-foreground hover:scale-[1.03] transition-transform"
            >
              <span className="flex items-center gap-2"><Mail size={18} /> Get In Touch</span>
            </button>

            <button onClick={scrollToAbout} className="liquid-glass rounded-full px-10 py-4 text-base text-muted-foreground hover:scale-[1.03] transition-transform">
              View My Work
            </button>
          </div>

          <div className="text-xs text-muted-foreground tracking-widest uppercase mt-16 animate-fade-rise-delay-3 flex flex-col items-center">
            <div>Scroll to explore</div>
            <div className="mt-2 flex items-center justify-center"><ChevronDown size={20} /></div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Mail, ArrowRight } from 'lucide-react';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

const FULL_NAME = 'Parthasarathy E';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/** Decodes character-by-character from random glyphs into the real name — the signature moment. */
function useDecodeText(target: string, { speed = 28, startDelay = 200 } = {}) {
  const [display, setDisplay] = useState(() => target.replace(/[^ ]/g, ' '));
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplay(target);
      setDone(true);
      return;
    }

    let frame = 0;
    let intervalId: ReturnType<typeof setInterval>;
    const revealedUpTo = () => Math.floor(frame / 3);

    const tick = () => {
      const settled = revealedUpTo();
      if (settled >= target.length) {
        setDisplay(target);
        setDone(true);
        clearInterval(intervalId);
        return;
      }

      const next = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < settled) return target[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      setDisplay(next);
      frame += 1;
    };

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(tick, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
  }, [target, speed, startDelay]);

  return { display, done };
}

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { display: decodedName, done } = useDecodeText(FULL_NAME, { speed: 32, startDelay: 350 });

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden surface-bg flex items-center" style={{ height: '100vh' }}>
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: content */}
          <div className="text-left order-2 lg:order-1 flex flex-col justify-center">
            <div
              className="inline-flex items-center gap-2 text-xs mb-4 animate-fade-rise"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', letterSpacing: '0.04em' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--color-primary)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--color-primary)' }} />
              </span>
              status: building &amp; learning
            </div>

            <h1
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-4xl sm:text-5xl lg:text-7xl leading-[0.98] tracking-[-0.02em] font-medium text-foreground animate-fade-rise-delay"
            >
              <span className="block text-2xl sm:text-3xl font-normal text-muted-foreground mb-1">Hi, I'm</span>
              <span className="block whitespace-pre" aria-label={FULL_NAME}>
                {decodedName}
                {!done && <span className="opacity-40">_</span>}
              </span>
            </h1>

            <div className="text-muted-foreground text-sm sm:text-base mt-5 tracking-wide animate-fade-rise-delay-2">
              <span className="font-semibold text-foreground">Full-Stack Developer</span> {' · '}
              <span className="font-semibold text-foreground">Cloud Enthusiast</span> {' · '}
              <span className="font-semibold text-foreground">AI &amp; Data Science Explorer</span>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-lg mt-4 leading-relaxed animate-fade-rise-delay-2">
              I build smart, scalable, and meaningful digital solutions that connect innovation with real-world impact — turning data-driven ideas into applications that work beautifully.
            </p>

            <div className="flex flex-wrap gap-4 mt-7 animate-fade-rise-delay-3">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="liquid-glass rounded-full px-8 py-3.5 text-sm sm:text-base text-foreground hover:scale-[1.03] transition-transform"
              >
                <span className="flex items-center gap-2"><Mail size={17} /> Get In Touch</span>
              </button>

              <button
                onClick={scrollToAbout}
                className="group rounded-full px-8 py-3.5 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                style={{ border: '1px solid rgba(245,158,11,0.18)' }}
              >
                View My Work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <button
              onClick={scrollToAbout}
              className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground tracking-widest uppercase mt-8 animate-fade-rise-delay-3 hover:text-foreground transition-colors self-start"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Scroll to explore <ChevronDown size={14} />
            </button>
          </div>

          {/* Right: anchored video panel, not full-bleed background */}
          <div className="relative order-1 lg:order-2 animate-fade-rise-delay w-full">
            <div
              className="relative rounded-[28px] overflow-hidden w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[5/6] max-h-[74vh] mx-auto lg:mx-0"
              style={{ border: '1px solid rgba(245,158,11,0.18)', boxShadow: '0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(245,158,11,0.06)' }}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={VIDEO_SRC}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,15,26,0.05) 0%, rgba(11,15,26,0.35) 100%)' }} />
              {/* Corner accent frame */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg opacity-70" style={{ borderColor: 'var(--color-primary)' }} />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg opacity-70" style={{ borderColor: 'var(--color-primary)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

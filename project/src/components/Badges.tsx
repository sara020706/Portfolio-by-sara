import React, { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

import { defaultBadges } from '../data/badges';
import { Badge } from '../data/types';

const brandTheme = (issuer: string) => {
  const norm = issuer.toLowerCase();
  if (norm.includes('altair')) {
    return {
      gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
      accent: '#3B82F6',
      glow: 'rgba(37,99,235,0.3)',
      initial: 'A',
    };
  }
  if (norm.includes('cisco')) {
    return {
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)',
      accent: '#0EA5E9',
      glow: 'rgba(14,165,233,0.3)',
      initial: 'C',
    };
  }
  if (norm.includes('google')) {
    return {
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #10B981 100%)',
      accent: '#F59E0B',
      glow: 'rgba(245,158,11,0.3)',
      initial: 'G',
    };
  }
  // Default fallback (golden hour)
  return {
    gradient: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
    accent: 'var(--color-primary)',
    glow: 'rgba(245,158,11,0.3)',
    initial: 'B',
  };
};

const BadgeCard = ({ badge }: { badge: Badge }) => {
  const theme = brandTheme(badge.issuer);

  return (
    <article
      className="badge-card-item relative flex-shrink-0 flex flex-col justify-between select-none group"
      style={{
        width: '320px',
        minHeight: '260px',
        borderRadius: '20px',
        background: 'rgba(17,24,39,0.82)',
        border: '1px solid rgba(245,158,11,0.10)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.30)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        scrollSnapAlign: 'start',
        cursor: 'default',
        padding: '28px 24px 22px',
        overflow: 'hidden',
        zIndex: 1,
        '--card-glow': theme.glow,
      } as React.CSSProperties}
    >
      {/* Top gradient bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: theme.gradient,
          borderRadius: '20px 20px 0 0',
        }}
      />

      {/* Watermark initial */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-12px',
          top: '-20px',
          fontSize: '160px',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-8px',
          background: theme.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: 0.07,
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: 'var(--font-display)',
        }}
      >
        {theme.initial}
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2 flex-1">
        {/* Issuer pill */}
        <span
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: `linear-gradient(90deg, ${theme.accent}22, ${theme.accent}11)`,
            border: `1px solid ${theme.accent}44`,
            color: theme.accent,
            marginBottom: '6px',
          }}
        >
          {badge.issuer}
        </span>

        {/* Title */}
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#f6fafd',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {badge.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '13px',
          color: 'rgba(179,207,229,0.7)',
          lineHeight: 1.5,
          marginTop: '8px',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1
        }}>
          {badge.description}
        </p>

        {/* Bottom row */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '12px', color: 'rgba(179,207,229,0.4)', fontWeight: 500 }}>
            {badge.date}
          </p>

          <a
            href={badge.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#fff',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
          >
            <ExternalLink size={12} /> Verify
          </a>
        </div>
      </div>
    </article>
  );
};

const ArrowBtn = ({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label={`Scroll ${dir}`}
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(245,158,11,0.18)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(245,158,11,0.8)',
      cursor: 'pointer',
      transition: 'background 0.2s ease, transform 0.2s ease',
      flexShrink: 0,
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.15)';
      (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
      (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
    }}
  >
    {dir === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
  </button>
);

const Badges: React.FC = () => {
  const badges = defaultBadges;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  }, []);

  return (
    <section id="badges" className="relative py-16 surface-bg border-t border-accent" style={{ overflow: 'visible' }}>
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: '10%', right: '-8%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.55)', marginBottom: '10px' }}>
            Recognition &amp; Feedback
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 400,
                color: '#f6fafd',
                lineHeight: 1,
              }}
            >
              Badges &amp; Honors
            </h2>
            {/* Arrow controls aligned to right */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <ArrowBtn dir="left" onClick={() => scroll('left')} />
              <ArrowBtn dir="right" onClick={() => scroll('right')} />
            </div>
          </div>
        </div>

        {/* Scroll wrapper */}
        <div style={{ position: 'relative' }}>
          {/* Horizontal scroll container */}
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              overflowY: 'visible',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingBottom: '24px',
              paddingTop: '12px',
              paddingLeft: '4px',
              paddingRight: '4px',
              cursor: 'grab',
            }}
            className="no-scroll-bar"
            onMouseDown={e => {
              const el = e.currentTarget;
              el.style.cursor = 'grabbing';
              const startX = e.pageX - el.offsetLeft;
              const scrollLeft = el.scrollLeft;
              const onMove = (me: MouseEvent) => {
                el.scrollLeft = scrollLeft - (me.pageX - el.offsetLeft - startX);
              };
              const onUp = () => {
                el.style.cursor = 'grab';
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onUp);
              };
              window.addEventListener('mousemove', onMove);
              window.addEventListener('mouseup', onUp);
            }}
          >
            {badges.map((badge, idx) => (
              <BadgeCard key={idx} badge={badge} />
            ))}
          </div>
        </div>

        {/* Count */}
        <p style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(179,207,229,0.35)', textAlign: 'right' }}>
          {badges.length} badges
        </p>
      </div>

      {/* CSS hover rules */}
      <style>{`
        .no-scroll-bar::-webkit-scrollbar { display: none; }

        .badge-card-item {
          transform: translateZ(0);
          will-change: transform;
          transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0s;
        }
        .badge-card-item:hover {
          transform: translateY(-8px) scale(1.02) translateZ(0);
          z-index: 10 !important;
          box-shadow: 0 20px 48px var(--card-glow, rgba(245,158,11,0.35)), 0 4px 16px rgba(0,0,0,0.4) !important;
        }
      `}</style>
    </section>
  );
};

export default Badges;

import React, { useRef, useCallback } from 'react';
import { FileText, ExternalLink, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

import { defaultCertifications } from '../data/certifications';
import { Certification } from '../data/types';

/* ─── Brand theme map ─────────────────────────────────────────────────── */
interface BrandTheme {
  gradient: string;
  glow: string;
  initial: string;
  accent: string;
}

const brandTheme = (issuer: string): BrandTheme => {
  const i = issuer.toLowerCase();
  if (i.includes('google'))
    return {
      gradient: 'linear-gradient(135deg, #1a73e8 0%, #ea4335 40%, #fbbc04 75%, #34a853 100%)',
      glow: 'rgba(26,115,232,0.45)',
      initial: 'G',
      accent: '#4285f4',
    };
  if (i.includes('microsoft'))
    return {
      gradient: 'linear-gradient(135deg, #0078d4 0%, #7b2ff7 60%, #00bcf2 100%)',
      glow: 'rgba(0,120,212,0.45)',
      initial: 'M',
      accent: '#0078d4',
    };
  if (i.includes('cisco'))
    return {
      gradient: 'linear-gradient(135deg, #00bceb 0%, #005073 60%, #1ba0d7 100%)',
      glow: 'rgba(0,188,235,0.45)',
      initial: 'C',
      accent: '#00bceb',
    };
  if (i.includes('aws') || i.includes('amazon'))
    return {
      gradient: 'linear-gradient(135deg, #ff9900 0%, #232f3e 55%, #ff9900 100%)',
      glow: 'rgba(255,153,0,0.45)',
      initial: 'A',
      accent: '#ff9900',
    };
  if (i.includes('nptel'))
    return {
      gradient: 'linear-gradient(135deg, #d62828 0%, #f77f00 55%, #fcbf49 100%)',
      glow: 'rgba(214,40,40,0.45)',
      initial: 'N',
      accent: '#f77f00',
    };
  if (i.includes('linkedin'))
    return {
      gradient: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 60%, #0077b5 100%)',
      glow: 'rgba(0,119,181,0.45)',
      initial: 'L',
      accent: '#0077b5',
    };
  /* default */
  return {
    gradient: 'linear-gradient(135deg, #4A7FA7 0%, #B3CFE5 100%)',
    glow: 'rgba(74,127,167,0.45)',
    initial: issuer[0]?.toUpperCase() ?? '?',
    accent: '#4A7FA7',
  };
};

/* ─── Single Card ─────────────────────────────────────────────────────── */
const CertCard: React.FC<{ cert: Certification }> = ({ cert }) => {
  const theme = brandTheme(cert.issuer);

  return (
    <article
      className="cert-card-item relative flex-shrink-0 flex flex-col justify-between select-none"
      style={{
        width: '320px',
        minHeight: '220px',
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
      }}
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
          {cert.issuer}
        </span>

        {/* Title */}
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#f6fafd',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {cert.title}
        </h3>

        {/* Year */}
        <p style={{ fontSize: '12px', color: 'rgba(179,207,229,0.6)', marginTop: '4px' }}>
          {cert.date}
        </p>
      </div>

      {/* Action chips */}
      <div className="relative z-10 flex items-center gap-2 mt-5 flex-wrap">
        {/* Verified chip */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 12px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#34d399',
            background: 'rgba(52,211,153,0.10)',
            border: '1px solid rgba(52,211,153,0.22)',
          }}
        >
          <CheckCircle size={12} strokeWidth={2.5} />
          Verified
        </span>

        {/* PDF chip */}
        <a
          href={cert.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 12px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(179,207,229,0.85)',
            background: 'rgba(179,207,229,0.07)',
            border: '1px solid rgba(179,207,229,0.15)',
            textDecoration: 'none',
            transition: 'background 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = `${theme.accent}22`;
            (e.currentTarget as HTMLElement).style.color = theme.accent;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(179,207,229,0.07)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(179,207,229,0.85)';
          }}
        >
          <FileText size={12} strokeWidth={2.5} />
          PDF
        </a>

        {/* Verify Online chip */}
        <a
          href={cert.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 12px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(179,207,229,0.85)',
            background: 'rgba(179,207,229,0.07)',
            border: '1px solid rgba(179,207,229,0.15)',
            textDecoration: 'none',
            transition: 'background 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = `${theme.accent}22`;
            (e.currentTarget as HTMLElement).style.color = theme.accent;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(179,207,229,0.07)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(179,207,229,0.85)';
          }}
        >
          <ExternalLink size={12} strokeWidth={2.5} />
          Verify
        </a>
      </div>
    </article>
  );
};

/* ─── Arrow Button ────────────────────────────────────────────────────── */
const ArrowBtn: React.FC<{ dir: 'left' | 'right'; onClick: () => void }> = ({ dir, onClick }) => (
  <button
    onClick={onClick}
    aria-label={dir === 'left' ? 'Scroll left' : 'Scroll right'}
    style={{
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(179,207,229,0.18)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(179,207,229,0.8)',
      cursor: 'pointer',
      transition: 'background 0.2s ease, transform 0.2s ease',
      flexShrink: 0,
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.background = 'rgba(74,127,167,0.25)';
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

/* ─── Main Section ────────────────────────────────────────────────────── */
const Certifications: React.FC = () => {
  const certifications = defaultCertifications;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  }, []);

  return (
    <section id="certifications" className="relative py-16" style={{ background: 'var(--color-bg)', overflow: 'visible' }}>
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: '10%', left: '-8%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.55)', marginBottom: '10px' }}>
            Credentials &amp; Achievements
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
              Certifications
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
          {/* Horizontal scroll container — overflow-y: visible prevents card clipping on hover */}
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
            {certifications.map((cert, idx) => (
              <CertCard key={idx} cert={cert} />
            ))}
          </div>
        </div>

        {/* Count */}
        <p style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(179,207,229,0.35)', textAlign: 'right' }}>
          {certifications.length} certifications
        </p>
      </div>

      {/* CSS hover rules — GPU-composited, no reflows */}
      <style>{`
        .no-scroll-bar::-webkit-scrollbar { display: none; }

        /* Card hover — only transform + box-shadow, both GPU-composited */
        .cert-card-item {
          transform: translateZ(0);
          will-change: transform;
          transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0s;
        }
        .cert-card-item:hover {
          transform: translateY(-8px) scale(1.02) translateZ(0);
          z-index: 10 !important;
        }
        /* Individual glow colour per issuer — set via CSS custom property on element */
        .cert-card-item:hover {
          box-shadow: 0 20px 48px var(--card-glow, rgba(245,158,11,0.35)), 0 4px 16px rgba(0,0,0,0.4) !important;
        }
      `}</style>
    </section>
  );
};

export default Certifications;

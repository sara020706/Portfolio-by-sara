import React, { useEffect, useRef } from 'react';

const Corner3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let frame: number | null = null;

    const handleMove = (e: MouseEvent) => {
      if (!container || !inner) return;
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Normalize by size and clamp
      const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));

      // Map to rotation degrees
      const rotateY = nx * 12; // left/right
      const rotateX = -ny * 12; // up/down (invert so cursor up -> rotateX negative)

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (inner) {
          inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
          inner.style.transition = 'transform 120ms linear';
        }
      });
    };

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      if (inner) {
        inner.style.transition = 'transform 400ms cubic-bezier(.2,.9,.2,1)';
        inner.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`;
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // hidden on small screens to avoid overlaying mobile interactions
    <div
      ref={containerRef}
      aria-hidden
      className="fixed right-6 bottom-6 z-50 hidden md:block"
      style={{ width: 112, height: 112 }}
    >
      {/* Perspective wrapper */}
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: 700,
          WebkitPerspective: 700,
        }}
      >
        <div
          ref={innerRef}
          className="w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform', transition: 'transform 300ms ease' }}
        >
          {/* 3D Fox/Cat Animal */}
          <div
            className="relative"
            style={{ transform: 'translateZ(48px)' }}
          >
            {/* Face */}
            <div className="w-14 h-12 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full relative">
              {/* Ears */}
              <div 
                className="absolute -top-3 left-1 w-0 h-0"
                style={{ 
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '14px solid #fb923c'
                }}
              />
              <div 
                className="absolute -top-3 right-1 w-0 h-0"
                style={{ 
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '14px solid #fb923c'
                }}
              />
              {/* Inner ears */}
              <div 
                className="absolute -top-1 left-2 w-0 h-0"
                style={{ 
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: '8px solid #fda4af'
                }}
              />
              <div 
                className="absolute -top-1 right-2 w-0 h-0"
                style={{ 
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: '8px solid #fda4af'
                }}
              />
              
              {/* Eyes */}
              <div className="absolute top-3 left-2 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-800 rounded-full relative">
                  <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
              <div className="absolute top-3 right-2 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-800 rounded-full relative">
                  <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
              
              {/* Nose */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-rose-400 rounded-full" />
              
              {/* Mouth */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-3 h-2 border-b-2 border-l border-r border-rose-300 rounded-b-full" />
              
              {/* Cheeks */}
              <div className="absolute top-5 -left-0.5 w-2 h-1.5 bg-rose-300/60 rounded-full" />
              <div className="absolute top-5 -right-0.5 w-2 h-1.5 bg-rose-300/60 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corner3D;

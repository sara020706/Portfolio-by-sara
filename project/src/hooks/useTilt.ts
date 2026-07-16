import { useEffect, useRef } from 'react';

/**
 * Shared cursor-tilt for cards, matching the depth language established in
 * the Hero (perspective + parallax). Same easing/intensity everywhere so
 * every section reads as one system rather than a per-component trick.
 */
export function useTilt<T extends HTMLElement>(maxTilt = 8) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(900px) rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg) translateZ(0) scale(1.015)`;
    };

    const handleLeave = () => {
      el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)';
    };

    el.style.transition = 'transform 300ms cubic-bezier(0.2,0.9,0.2,1)';
    el.style.willChange = 'transform';

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [maxTilt]);

  return ref;
}

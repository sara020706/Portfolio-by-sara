import React, { useEffect, useRef, useState } from 'react';

const Corner3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // Fun emojis to cycle through
  const emojis = ['🐶', '🐱', '🐼', '🦊', '🐨', '🦁', '🐯', '🐸', '🦄', '🐲'];

  // Fun messages to show on click
  const messages = [
    'Woof! 🎉',
    'Hello! 👋',
    'You found me! 🎊',
    'Keep clicking! ✨',
    'Having fun? 🌟',
    'Yay! 🎈',
    'Awesome! 🚀',
    'Nice! 💫',
  ];

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

      // Map to rotation degrees - more dramatic when hovered
      const intensity = isHovered ? 20 : 12;
      const rotateY = nx * intensity;
      const rotateX = -ny * intensity;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (inner) {
          inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0) scale(${isHovered ? 1.1 : 1})`;
          inner.style.transition = 'transform 120ms linear';
        }
      });
    };

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      if (inner) {
        inner.style.transition = 'transform 400ms cubic-bezier(.2,.9,.2,1)';
        inner.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)`;
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isHovered]);

  // Auto-cycle emojis slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    // Trigger jump animation
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);

    // Cycle to next emoji
    setCurrentEmoji((prev) => (prev + 1) % emojis.length);

    // Show random message
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);

    // Increment click count
    setClickCount((prev) => prev + 1);
  };

  return (
    // hidden on small screens to avoid overlaying mobile interactions
    <div
      ref={containerRef}
      aria-hidden
      className="fixed right-6 bottom-6 z-50 hidden md:block group cursor-pointer"
      style={{ width: 112, height: 140 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Click count badge */}
      {clickCount > 0 && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-pumpkin text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse z-10">
          {clickCount}
        </div>
      )}

      {/* Fun message - appears on click */}
      <div
        className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-pumpkin to-pumpkin-dark text-white text-sm font-bold rounded-full shadow-2xl whitespace-nowrap transition-all duration-300 ${showMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75'
          }`}
      >
        {messages[clickCount % messages.length]}
      </div>

      {/* Thank you message - appears on hover */}
      <div
        className={`absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg whitespace-nowrap transition-all duration-300 ${isHovered && !showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
      >
        Click me! 🎮
      </div>

      {/* Perspective wrapper */}
      <div
        className={`mt-6 transition-transform duration-500 ${isJumping ? 'animate-bounce' : ''}`}
        style={{
          width: '100%',
          height: 112,
          perspective: 700,
          WebkitPerspective: 700,
        }}
      >
        <div
          ref={innerRef}
          className="w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transition: 'transform 300ms ease',
          }}
        >
          {/* Cute emoji animal with glow effect */}
          <div
            className={`text-6xl select-none drop-shadow-2xl transition-all duration-300 ${isHovered ? 'filter brightness-125' : ''
              }`}
            style={{
              transform: 'translateZ(48px)',
              textShadow: isHovered ? '0 0 20px rgba(253, 128, 46, 0.6)' : 'none',
            }}
          >
            <span role="img" aria-label="animal" className="inline-block transition-transform duration-300">
              {emojis[currentEmoji]}
            </span>
          </div>
        </div>
      </div>

      {/* Ripple effect on click */}
      {isJumping && (
        <div className="absolute inset-0 rounded-full border-4 border-pumpkin animate-ping opacity-75"></div>
      )}
    </div>
  );
};

export default Corner3D;

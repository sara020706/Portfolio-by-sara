import React from 'react';
import { ExternalLink } from 'lucide-react';

const Codolio: React.FC = () => {
  return (
    <section id="codolio" className="py-24 relative surface-bg">
      {/* Golden accent line divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(179,207,229,0.12), rgba(74,127,167,0.04))' }}></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(74,127,167,0.12), rgba(179,207,229,0.02))' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.55)', marginBottom: '10px' }}>
            Coding Profile
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
            Codolio Profile
          </h2>
        </div>

        {/* Embedded Codolio Profile */}
        <div className="surface glass-effect rounded-2xl overflow-hidden shadow-2xl">
          <div className="w-full h-[1000px]">
            <iframe
              src="https://codolio.com/profile/Sara0207"
              className="w-full h-full border-0"
              title="Codolio Profile"
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>

          {/* View Full Profile Button */}
          <div className="p-6 text-center border-t border-slate-700/50">
            <a href="https://codolio.com/profile/Sara0207" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 btn-primary text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg">
              View Full Profile on Codolio
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Codolio;

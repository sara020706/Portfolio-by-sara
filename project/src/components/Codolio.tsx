import React from 'react';
import { Code, ExternalLink } from 'lucide-react';

const Codolio: React.FC = () => {
  return (
    <section id="codolio" className="py-20 relative border-t border-accent surface-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(179,207,229,0.12), rgba(74,127,167,0.04))' }}></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(74,127,167,0.12), rgba(179,207,229,0.02))' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl shadow-lg" style={{ background: 'linear-gradient(90deg,var(--color-primary),var(--color-accent))' }}>
              <Code size={32} className="text-light" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-light drop-shadow-lg">Codolio Profile</h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Check out my coding journey, projects, and achievements on Codolio.
          </p>
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

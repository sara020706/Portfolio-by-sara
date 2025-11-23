import React from 'react';
import { Code, ExternalLink } from 'lucide-react';

const Codolio: React.FC = () => {
  return (
    <section id="codolio" className="py-20 bg-gradient-to-b from-[#3B1E54] via-[#1F0A3A] to-[#3B1E54] relative border-t border-purple-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-rose-400/20 to-red-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-red-500 rounded-xl shadow-lg">
              <Code size={32} className="text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
              Codolio Profile
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Check out my coding journey, projects, and achievements on Codolio.
          </p>
        </div>

        {/* Embedded Codolio Profile */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
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
            <a
              href="https://codolio.com/profile/Sara0207"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-rose-500/50"
            >
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

import { useState, useEffect, lazy, Suspense } from 'react';
import { Settings } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
import Badges from './components/Badges';
import Internships from './components/Internships';
import Codolio from './components/Codolio';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Corner3D from './components/Corner3D';

// Lazy load AdminForm only in development - completely excluded from production builds
const AdminForm = import.meta.env.DEV
  ? lazy(() => import('./components/AdminForm').then(module => ({ default: module.AdminForm })))
  : null;

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAdminForm, setShowAdminForm] = useState(false);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    // Initialize dark mode
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      const sections = ['home', 'about', 'certifications', 'badges', 'internships', 'codolio', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="dark transition-colors duration-300">
      {/* Scrollbar styles matching pumpkin theme */}
      <style>{`
        /* WebKit browsers */
        .dark ::-webkit-scrollbar-track { background: rgba(10,15,26,0.6); }
        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #FD802E 0%, #E66A1A 100%);
          border-radius: 9999px;
          border: 3px solid rgba(0,0,0,0);
          background-clip: padding-box;
        }
        .dark ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(180deg, #FE9A56 0%, #FD802E 100%);
        }

        /* Firefox */
        .dark { scrollbar-color: #FD802E rgba(10,15,26,0.6); }
      `}</style>

      <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-[#0a0f1a] via-[#0c1929] to-[#0a0f1a]">
        <Navigation activeSection={activeSection} />
        <Hero />
        <About />
        <Certifications />
        <Badges />
        <Internships />
        <Codolio />
        <Projects />
        <Contact />
        <Footer />
        <Corner3D />

        {/* Development-only Admin Button */}
        {isDev && (
          <button
            onClick={() => setShowAdminForm(true)}
            className="fixed bottom-6 left-6 p-4 bg-pumpkin hover:bg-pumpkin-dark text-white rounded-full shadow-2xl hover:shadow-pumpkin/50 transition-all duration-300 hover:scale-110 z-50 group"
            title="Admin Panel (Dev Only)"
          >
            <Settings size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        )}

        {/* Admin Form Modal - Lazy loaded, excluded from production */}
        {isDev && showAdminForm && AdminForm && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
              <div className="text-white text-lg">Loading Admin Panel...</div>
            </div>
          }>
            <AdminForm onClose={() => setShowAdminForm(false)} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
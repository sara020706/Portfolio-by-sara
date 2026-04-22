import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from "emailjs-com";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');

    try {
      const result = await emailjs.send(
        "service_r1hy1a7",
        "template_670b3em",
        {
          name: formData.name,      // user's original key
          email: formData.email,     // user's original key
          from_name: formData.name, // standard emailjs key
          reply_to: formData.email,  // standard emailjs key
          message: formData.message,
          to_name: "Parthasarathy",
        },
        "n-dkkI1WtqLR68Dut"
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error: any) {
      console.error("FAILED...", error);
      setErrorMessage(error?.text || 'Something went wrong. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 relative surface-bg">
      {/* Golden accent line divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12), rgba(251,146,60,0.04))' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.08), rgba(245,158,11,0.02))' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.55)', marginBottom: '10px' }}>
            Let's Collaborate
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
            Get In Touch
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="surface glass-effect rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Connect
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.14)' }}>
                    <Mail size={24} className="text-light" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href="mailto:ps2601296@gmail.com" className="muted hover:text-light transition-colors">
                      ps2601296@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.14)' }}>
                    <Phone size={24} className="text-light" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a href="tel:+1234567890" className="muted hover:text-light transition-colors">
                      +91 9361162117
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.14)' }}>
                    <MapPin size={24} className="text-light" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-gray-300">
                      Avadi,Chennai,Tamil Nadu
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-2xl p-8 text-light shadow-2xl border border-accent surface">
              <h4 className="text-xl font-bold mb-2">Available for New Projects</h4>
              <p className="opacity-90">
                I'm currently accepting new freelance projects and collaborations. Let's build something amazing together!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl p-8 shadow-2xl" style={{ background: 'rgba(31,41,55,0.60)', backdropFilter: 'blur(14px)', border: '1px solid rgba(245,158,11,0.12)' }}>
            <h3 className="text-2xl font-bold text-white mb-6">
              Send Message
            </h3>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                <span className="text-red-400 text-sm">❌ {errorMessage}</span>
              </div>
            )}

            {isSubmitted && (
              <div className="mb-6 p-4" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={20} className="text-light" />
                <p className="muted font-medium">✅ Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium muted mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-600/50 bg-slate-700/30 backdrop-blur-sm text-light rounded-lg focus:ring-2" style={{ outlineColor: 'var(--color-primary)' }}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium muted mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-600/50 bg-slate-700/30 backdrop-blur-sm text-light rounded-lg focus:ring-2" style={{ outlineColor: 'var(--color-primary)' }}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium muted mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-600/50 bg-slate-700/30 backdrop-blur-sm text-light rounded-lg focus:ring-2 resize-none" style={{ outlineColor: 'var(--color-primary)' }}
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className={`w-full group px-6 py-4 btn-primary font-semibold rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-2xl border border-accent ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSending ? 'Sending...' : 'Send Message'}
                  {!isSending && <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

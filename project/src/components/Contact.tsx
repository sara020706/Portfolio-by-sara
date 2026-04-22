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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await emailjs.send(
        "service_r1hy1a7", // your service ID
        "template_cc3hyux", // your template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "n-dkkI1WtqLR68Dut" // your public key
      );

      if (result.status === 200) {
        setIsSubmitted(true); // ✅ show success message
        setFormData({ name: "", email: "", message: "" }); // reset form
        setTimeout(() => setIsSubmitted(false), 5000); // hide after 5s
      }
    } catch (error) {
      console.error("FAILED...", error);
    }
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 relative border-t border-accent surface-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12), rgba(251,146,60,0.04))' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.08), rgba(245,158,11,0.02))' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's discuss your next project or just say hello. I'm always excited to work on new challenges and meet fellow creators.
          </p>
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
                    <a href="mailto:alex@example.com" className="muted hover:text-light transition-colors">
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
              <button type="submit" className="w-full group px-6 py-4 btn-primary font-semibold rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-2xl border border-accent">
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
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

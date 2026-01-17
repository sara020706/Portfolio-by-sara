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
    <section id="contact" className="py-20 bg-gradient-to-b from-[#0d2137] via-[#0c1929] to-[#0d2137] relative border-t border-cyan-500/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's discuss your next project or just say hello. I'm always excited to work on new challenges and meet fellow creators.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Connect
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                    <Mail size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href="mailto:alex@example.com" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      ps2601296@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                    <Phone size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a href="tel:+1234567890" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      +91 9361162117
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                    <MapPin size={24} className="text-cyan-400" />
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
            <div className="bg-gradient-to-r from-teal-700 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl border border-cyan-400/30">
              <h4 className="text-xl font-bold mb-2">Available for New Projects</h4>
              <p className="opacity-90">
                I'm currently accepting new freelance projects and collaborations. Let's build something amazing together!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Send Message
            </h3>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center gap-2">
                <CheckCircle size={20} className="text-cyan-400" />
                <p className="text-cyan-300 font-medium">
                  ✅ Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-600/50 bg-slate-700/30 backdrop-blur-sm text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 placeholder-gray-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-600/50 bg-slate-700/30 backdrop-blur-sm text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 placeholder-gray-400"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-600/50 bg-slate-700/30 backdrop-blur-sm text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 resize-none placeholder-gray-400"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full group px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-500 transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 border border-cyan-400/20"
              >
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

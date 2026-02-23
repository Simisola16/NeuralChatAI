import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, User, MessageSquare } from 'lucide-react';



gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => setIsVisible(true),
    });

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !formRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current.querySelectorAll('.form-field'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! Our team will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-void-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-dark/50 to-void-black" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="font-mono-custom text-[10px] sm:text-xs text-neon-soft/60 uppercase tracking-wider mb-3 md:mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 md:mb-4">
            Contact Us
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto px-4">
            Have questions about our AI solutions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="form-field">
            <h3 className="font-display text-xl md:text-2xl text-white mb-4 md:mb-6">
              Let's Connect
            </h3>
            <p className="text-sm md:text-base text-white/50 mb-6 md:mb-8">
              Whether you're looking for enterprise solutions or have questions about our platform, our team is here to help.
            </p>

          </div>

          {/* Contact Form */}
          <div ref={formRef} className="form-field">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-white/5 border border-white/10">
              <div className="space-y-4 md:space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm text-white/60 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/30" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm text-white/60 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/30" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-xs md:text-sm text-white/60 mb-2">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/30" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm text-white/60 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 md:left-4 top-4 w-4 h-4 md:w-5 md:h-5 text-white/30" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project or questions..."
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 md:py-4 bg-neon-cyan text-void-black font-display text-sm md:text-base uppercase tracking-wider rounded-full hover:bg-neon-soft transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Youtube, Music2, Mail, Phone, MapPin, Send } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICON_MAP = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  music: Music2,
};

const Footer = () => {
  // Null check: if config is empty, do not render
  if (!footerConfig.brandName && !footerConfig.heroTitle && footerConfig.socialLinks.length === 0) {
    return null;
  }

  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const titleRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [email, setEmail] = useState('');
  const scrollTriggerRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax title effect
      if (titleRef.current && portraitRef.current) {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            if (titleRef.current) {
              // Title moves faster than portrait
              gsap.set(titleRef.current, {
                y: -self.progress * 100,
              });
            }
          },
        });
        scrollTriggerRefs.current.push(st);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggerRefs.current.forEach(st => st.kill());
      scrollTriggerRefs.current = [];
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(footerConfig.subscribeAlertMessage);
      setEmail('');
    }
  };

  const handleQuickLinkClick = (link) => {
    alert(`${link} page coming soon! Contact our team for more information.`);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-void-black overflow-hidden"
    >
      {/* Hero portrait section */}
      <div className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Background portrait */}
        <div
          ref={portraitRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md md:max-w-2xl aspect-[2/3] mx-auto px-4">
            <img
              src={footerConfig.portraitImage}
              alt={footerConfig.portraitAlt}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-void-black via-transparent to-transparent opacity-50" />
          </div>
        </div>

        {/* Parallax title overlay */}
        <div
          ref={titleRef}
          className="relative z-10 text-center will-change-transform px-4"
        >
          <h2 className="font-display text-[12vw] md:text-[15vw] text-white leading-none tracking-tighter">
            {footerConfig.heroTitle}
          </h2>
          <p className="font-mono-custom text-sm md:text-lg text-neon-soft/60 uppercase tracking-[0.3em] md:tracking-[0.5em] mt-2 md:mt-4">
            {footerConfig.heroSubtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
            <button
              onClick={() => scrollToSection('pricing')}
              className="w-full sm:w-auto px-6 md:px-8 py-3 bg-neon-cyan text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-neon-soft transition-colors active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={() => window.open(`mailto:${footerConfig.email}`, '_blank')}
              className="w-full sm:w-auto px-6 md:px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-colors active:scale-95"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* Artist name - hidden on mobile */}
        <div className="hidden md:block absolute bottom-20 left-12 z-20">
          <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider mb-2">
            {footerConfig.artistLabel}
          </p>
          <h3 className="font-display text-4xl text-white">{footerConfig.artistName}</h3>
          <p className="font-mono-custom text-sm text-neon-soft/60">{footerConfig.artistSubtitle}</p>
        </div>
      </div>

      {/* Footer content */}
      <div className="relative bg-void-black py-12 md:py-20 px-4 sm:px-6 lg:px-12">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto">
          {/* Footer grid - Main content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                  <Music2 className="w-4 h-4 md:w-5 md:h-5 text-neon-cyan" />
                </div>
                <span className="font-display text-xl md:text-2xl text-white">{footerConfig.brandName}</span>
              </div>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-4 md:mb-6">
                {footerConfig.brandDescription}
              </p>
              {/* Social links */}
              <div className="flex gap-3 md:gap-4">
                {footerConfig.socialLinks.map((social) => {
                  const IconComponent = SOCIAL_ICON_MAP[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-xs md:text-sm uppercase tracking-wider text-white mb-4 md:mb-6">
                {footerConfig.quickLinksTitle}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {footerConfig.quickLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleQuickLinkClick(link)}
                      className="text-xs md:text-sm text-white/50 hover:text-neon-soft transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-xs md:text-sm uppercase tracking-wider text-white mb-4 md:mb-6">
                {footerConfig.contactTitle}
              </h4>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-2 md:gap-3">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-neon-soft/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs text-white/50">{footerConfig.emailLabel}</p>
                    <a 
                      href={`mailto:${footerConfig.email}`} 
                      className="text-xs md:text-sm text-white hover:text-neon-soft transition-colors"
                    >
                      {footerConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-neon-soft/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs text-white/50">{footerConfig.phoneLabel}</p>
                    <a 
                      href={`tel:${footerConfig.phone.replace(/\D/g, '')}`}
                      className="text-xs md:text-sm text-white hover:text-neon-soft transition-colors"
                    >
                      {footerConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-neon-soft/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs text-white/50">{footerConfig.addressLabel}</p>
                    <span className="text-xs md:text-sm text-white">{footerConfig.address}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-display text-xs md:text-sm uppercase tracking-wider text-white mb-4 md:mb-6">
                {footerConfig.newsletterTitle}
              </h4>
              <p className="text-xs md:text-sm text-white/50 mb-3 md:mb-4">
                {footerConfig.newsletterDescription}
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-grow px-3 md:px-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg text-xs md:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50"
                />
                <button
                  type="submit"
                  className="px-3 md:px-4 py-2.5 md:py-3 bg-neon-cyan/20 text-neon-cyan rounded-lg text-xs md:text-sm font-medium hover:bg-neon-cyan/30 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Footer image grid */}
          {footerConfig.galleryImages.length > 0 && (
            <div className="mb-8 md:mb-12">
              <p className="font-mono-custom text-[10px] md:text-xs text-white/30 uppercase tracking-wider mb-3 md:mb-4">
                Gallery
              </p>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {footerConfig.galleryImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative aspect-square overflow-hidden rounded-lg footer-grid-item cursor-pointer"
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={image.src}
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        hoveredImage === index ? 'scale-110 brightness-110' : 'brightness-75'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom bar */}
          <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-[10px] md:text-xs text-white/30 font-mono-custom text-center md:text-left">
              {footerConfig.copyrightText}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {footerConfig.bottomLinks.map((link) => (
                <button 
                  key={link} 
                  onClick={() => handleQuickLinkClick(link)}
                  className="text-[10px] md:text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

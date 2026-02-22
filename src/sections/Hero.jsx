import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar, Menu, X } from 'lucide-react';
import { heroConfig } from '../config';

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
};

const Hero = () => {
  // Null check: if config is empty, do not render
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef(null);
  const navRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const TARGET_TEXT = heroConfig.decodeText;
  const CHARS = heroConfig.decodeChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
  const [isDecoding, setIsDecoding] = useState(true);

  // Decode text effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleCtaClick = (action) => {
    if (action === 'demo') {
      scrollToSection('contact');
    } else if (action === 'pricing') {
      scrollToSection('pricing');
    }
    setMobileMenuOpen(false);
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-void-black"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroConfig.backgroundImage})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 video-overlay" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-black/30 to-void-black" />
      </div>

      {/* Desktop Navigation pill */}
      <nav
        ref={navRef}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2 hidden md:block"
      >
        <div className="flex items-center gap-1">
          {heroConfig.navItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-void-black/95 backdrop-blur-lg flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            {heroConfig.navItems.map((item) => {
              const IconComponent = ICON_MAP[item.icon];
              return (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="flex items-center gap-3 text-xl font-mono-custom uppercase tracking-wider text-white/80 hover:text-neon-cyan transition-colors"
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={() => handleCtaClick('demo')}
                className="px-8 py-3 bg-neon-cyan text-void-black font-display text-sm uppercase tracking-wider rounded-full"
              >
                {heroConfig.ctaPrimary}
              </button>
              <button
                onClick={() => handleCtaClick('pricing')}
                className="px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full"
              >
                {heroConfig.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen pb-16 md:pb-20 px-4 sm:px-6">
        {/* Logo / Brand */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center">
              <Disc className="w-3.5 h-3.5 md:w-4 md:h-4 text-neon-cyan" />
            </div>
            <span className="font-display text-sm md:text-lg text-white">{heroConfig.brandName}</span>
          </div>
        </div>

        {/* Main title with decode effect */}
        <h1
          ref={titleRef}
          className="decode-text text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] font-bold text-white leading-none tracking-tighter mb-4 md:mb-6 text-center"
        >
          <span className={`${isDecoding ? 'text-glow-cyan' : ''} transition-all duration-300`}>
            {displayText}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono-custom text-xs sm:text-sm md:text-base text-neon-soft/70 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 text-center max-w-xs sm:max-w-md md:max-w-2xl px-4"
        >
          {heroConfig.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => handleCtaClick('demo')}
            className="w-full sm:w-auto px-6 md:px-8 py-3 bg-neon-cyan text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-neon-soft transition-colors duration-300 active:scale-95"
          >
            {heroConfig.ctaPrimary}
          </button>
          <button
            onClick={() => handleCtaClick('pricing')}
            className="w-full sm:w-auto px-6 md:px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-colors duration-300 active:scale-95"
          >
            {heroConfig.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      {/* Corner accents - hidden on mobile */}
      <div className="hidden md:block absolute top-8 right-8 text-right">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">{heroConfig.cornerLabel}</p>
        <p className="font-mono-custom text-xs text-neon-soft/60">{heroConfig.cornerDetail}</p>
      </div>
    </section>
  );
};

export default Hero;

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Globe, Shield, BarChart3, Cpu, Headphones } from 'lucide-react';
import { featuresConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  brain: Brain,
  globe: Globe,
  shield: Shield,
  chart: BarChart3,
  cpu: Cpu,
  headphones: Headphones,
};

const Features = () => {
  const sectionRef = useRef(null);
  const featuresRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
    if (!isVisible || !featuresRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        featuresRef.current.querySelectorAll('.feature-card'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-void-black overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-mono-custom text-[10px] sm:text-xs text-neon-soft/60 uppercase tracking-wider mb-3 md:mb-4">
            {featuresConfig.sectionLabel}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            {featuresConfig.sectionTitle}
          </h2>
        </div>

        {/* Features grid */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {featuresConfig.features.map((feature) => {
            const IconComponent = ICON_MAP[feature.icon];
            return (
              <div
                key={feature.id}
                className="feature-card group p-6 md:p-8 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:border-neon-cyan/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-neon-cyan/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-neon-cyan/20 transition-colors">
                  <IconComponent className="w-5 h-5 md:w-7 md:h-7 text-neon-cyan" />
                </div>
                <h3 className="font-display text-lg md:text-xl text-white mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

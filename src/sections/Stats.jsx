import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
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
    if (!isVisible || !statsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { y: 40, opacity: 0 },
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
      className="relative w-full py-12 md:py-20 bg-void-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-dark to-void-black" />

      <div ref={statsRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {statsConfig.stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center"
            >
              <p className="font-display text-3xl sm:text-4xl md:text-5xl text-neon-cyan mb-1 md:mb-2">
                {stat.value}
              </p>
              <p className="font-mono-custom text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Stats;

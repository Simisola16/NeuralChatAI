import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { solutionsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Solutions = () => {
  const sectionRef = useRef(null);
  const solutionsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);

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
    if (!isVisible || !solutionsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        solutionsRef.current.querySelectorAll('.solution-item'),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const handleLearnMore = (solution) => {
    alert(`Learn more about our ${solution.title} solution. Contact our sales team for a customized demo.`);
  };

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-void-dark overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-10 md:mb-16">
          <p className="font-mono-custom text-[10px] sm:text-xs text-neon-soft/60 uppercase tracking-wider mb-3 md:mb-4">
            {solutionsConfig.sectionLabel}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            {solutionsConfig.sectionTitle}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Solutions list */}
          <div ref={solutionsRef} className="space-y-3 md:space-y-4">
            {solutionsConfig.solutions.map((solution, index) => (
              <div
                key={solution.id}
                className={`solution-item group p-4 md:p-6 rounded-lg md:rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeSolution === index
                    ? 'bg-white/10 border-neon-cyan/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onMouseEnter={() => setActiveSolution(index)}
                onClick={() => handleLearnMore(solution)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg md:text-2xl text-white mb-1 md:mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-2 md:mb-3 line-clamp-2">
                      {solution.description}
                    </p>
                    <p className="font-mono-custom text-[10px] md:text-xs text-neon-cyan">
                      {solution.metrics}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-3 md:ml-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-cyan group-hover:bg-neon-cyan/10 transition-all">
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/50 group-hover:text-neon-cyan transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Preview image */}
          <div className="hidden lg:flex lg:items-center">
            <div className="sticky top-32 w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden">
              {solutionsConfig.solutions.map((solution, index) => (
                <img
                  key={solution.id}
                  src={solution.image}
                  alt={solution.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    activeSolution === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;

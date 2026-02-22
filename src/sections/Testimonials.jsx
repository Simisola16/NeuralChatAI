import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (!isVisible || !testimonialsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        testimonialsRef.current.querySelectorAll('.testimonial-card'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsConfig.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsConfig.testimonials.length) % testimonialsConfig.testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-void-dark overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="font-mono-custom text-[10px] sm:text-xs text-neon-soft/60 uppercase tracking-wider mb-3 md:mb-4">
            {testimonialsConfig.sectionLabel}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            {testimonialsConfig.sectionTitle}
          </h2>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <div className="testimonial-card p-6 rounded-xl bg-white/5 border border-white/10">
              <Quote className="w-6 h-6 text-neon-cyan/20 mb-4" />
              <p className="text-white/70 leading-relaxed mb-6 text-sm">
                "{testimonialsConfig.testimonials[currentIndex].quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10">
                  <img
                    src={testimonialsConfig.testimonials[currentIndex].image}
                    alt={testimonialsConfig.testimonials[currentIndex].author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-white text-sm">{testimonialsConfig.testimonials[currentIndex].author}</p>
                  <p className="text-xs text-white/50">{testimonialsConfig.testimonials[currentIndex].role}</p>
                  <p className="text-[10px] text-neon-cyan/60">{testimonialsConfig.testimonials[currentIndex].company}</p>
                </div>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonialsConfig.testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-neon-cyan' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div
          ref={testimonialsRef}
          className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonialsConfig.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card relative p-6 md:p-8 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              {/* Quote icon */}
              <div className="absolute top-4 md:top-6 right-4 md:right-6">
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-neon-cyan/20" />
              </div>

              {/* Quote text */}
              <p className="text-white/70 leading-relaxed mb-6 md:mb-8 text-sm md:text-base relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-white text-sm md:text-base truncate">{testimonial.author}</p>
                  <p className="text-xs md:text-sm text-white/50 truncate">{testimonial.role}</p>
                  <p className="text-[10px] md:text-xs text-neon-cyan/60 truncate">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

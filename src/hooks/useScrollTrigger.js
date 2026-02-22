import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollTrigger = (callback, options = {}) => {
  const elementRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const st = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 80%',
      end: options.end || 'bottom 20%',
      scrub: options.scrub ?? false,
      pin: options.pin ?? false,
      markers: options.markers ?? false,
      onUpdate: options.onUpdate,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
    });

    scrollTriggerRef.current = st;
    callback(element, st);

    return () => {
      st.kill();
    };
  }, []);

  return elementRef;
};

export default useScrollTrigger;

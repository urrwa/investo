import { useEffect, useRef, useState } from 'react';

/** Run decorative loops only while their section can actually be seen. */
export function useActiveAnimation<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inViewport = false;
    const update = () => setActive(inViewport && !document.hidden && !reducedMotion.matches);
    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting && entry.intersectionRatio > 0;
      update();
    }, { threshold: [0, 0.01] });

    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return { ref, active };
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero h2', { y: -50, opacity: 0, duration: 0.9 })
        .from('.hero p', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero .cta', { scale: 0.8, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.4');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    gsap.to(ctaRef.current, { scale: 1.08, duration: 0.25, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(ctaRef.current, { scale: 1, duration: 0.25, ease: 'power2.out' });
  };
  const handleDown = () => {
    gsap.to(ctaRef.current, { scale: 0.95, duration: 0.15 });
  };
  const handleUp = () => {
    gsap.to(ctaRef.current, { scale: 1.08, duration: 0.2 });
  };

  return (
    <section id="inicio" className="hero" ref={heroRef}>
      <h2>Adote um amigo de quatro patas</h2>
      <p>Transforme uma vida. Encontre seu novo melhor amigo hoje!</p>
      <a
        ref={ctaRef}
        href="#adotar"
        className="cta"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
      >
        Ver cães disponíveis
      </a>
    </section>
  );
}

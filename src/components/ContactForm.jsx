import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const sectionRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact h3', {
        y: -20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact h3', start: 'top 85%' },
      });
      gsap.from('.contact form > *', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact form', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleFocus = (e) => {
    gsap.to(e.target, { scale: 1.02, duration: 0.25, ease: 'power2.out' });
  };
  const handleBlur = (e) => {
    gsap.to(e.target, { scale: 1, duration: 0.25, ease: 'power2.out' });
  };
  const btnEnter = () => gsap.to(btnRef.current, { scale: 1.05, duration: 0.2 });
  const btnLeave = () => gsap.to(btnRef.current, { scale: 1, duration: 0.2 });
  const btnDown = () => gsap.to(btnRef.current, { scale: 0.95, duration: 0.1 });
  const btnUp = () => gsap.to(btnRef.current, { scale: 1.05, duration: 0.15 });

  return (
    <section id="contato" className="contact" ref={sectionRef}>
      <h3>Entre em contato</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nome completo"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <textarea
          placeholder="Mensagem"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          ref={btnRef}
          type="submit"
          onMouseEnter={btnEnter}
          onMouseLeave={btnLeave}
          onMouseDown={btnDown}
          onMouseUp={btnUp}
        >
          Enviar mensagem
        </button>
      </form>
    </section>
  );
}

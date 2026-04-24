import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: '1. Escolha seu pet', desc: 'Explore os perfis dos cães e encontre aquele que combina com você.' },
  { title: '2. Preencha o formulário', desc: 'Enviaremos informações e agendaremos uma visita.' },
  { title: '3. Leve pra casa', desc: 'Com carinho e responsabilidade, o pet será parte da sua vida.' },
];

export default function Steps() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.steps h3', {
        y: -20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.steps h3', start: 'top 85%' },
      });
      gsap.from('.step-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.step-list', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.04, y: -4, duration: 0.3, ease: 'power2.out' });
  };
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <section id="sobre" className="steps" ref={sectionRef}>
      <h3>Como Funciona?</h3>
      <div className="step-list">
        {steps.map((step, index) => (
          <div
            key={index}
            className="step-card"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

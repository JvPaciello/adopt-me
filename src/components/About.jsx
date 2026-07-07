import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text > *', {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      gsap.from('.about-img', {
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" className="about" ref={ref}>
      <div className="about-text">
        <h3>Nossa missão</h3>
        <p>
          Há 12 anos resgatamos, cuidamos e encontramos lares para cães
          abandonados. Cada adoção é acompanhada de perto pela nossa equipe,
          desde a primeira visita até muito depois de o pet chegar em casa.
        </p>
        <p>
          Trabalhamos com uma rede de ONGs parceiras e voluntários para
          garantir que cada cão receba cuidados veterinários, socialização e,
          principalmente, uma segunda chance.
        </p>
      </div>
      <img
        className="about-img"
        src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=700&q=80"
        alt="Voluntário cuidando de um cão no abrigo"
      />
    </section>
  );
}

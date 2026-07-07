import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DonationCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.donation-cta > *', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="donation-cta" ref={ref}>
      <h3>Não pode adotar agora?</h3>
      <p>Ajude com uma doação e contribua para o resgate e cuidado de mais cães.</p>
      <a href="#contato" className="cta">Quero doar</a>
    </section>
  );
}

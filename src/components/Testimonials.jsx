import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Carla Mendes',
    quote: 'Adotamos a Luna há 6 meses e ela transformou nossa casa. O processo foi todo acompanhado com muito cuidado.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rafael Souza',
    quote: 'A equipe foi super atenciosa em cada etapa. O Zeus se adaptou rapidinho e hoje é parte da família.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Patrícia Lima',
    quote: 'Nunca imaginei que adotar seria tão simples e transparente. Recomendo pra qualquer pessoa que queira dar um lar a um cão.',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
  },
];

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials" ref={ref}>
      <h3>Quem já adotou conta</h3>
      <div className="testimonial-list">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.name}>
            <img src={t.img} alt={t.name} className="testimonial-img" />
            <p>&ldquo;{t.quote}&rdquo;</p>
            <strong>{t.name}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

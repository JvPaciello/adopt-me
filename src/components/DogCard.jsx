import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DogCard({ dog, index = 0 }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -8, scale: 1.03, duration: 0.3, ease: 'power2.out' });
    gsap.to(imgRef.current, { scale: 1.12, duration: 0.5, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' });
  };

  return (
    <div
      className="card"
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="card-img-wrapper">
        <img ref={imgRef} src={dog.img} alt={dog.name} className="dog-img" />
      </div>
      <h4>{dog.name}</h4>
      <p>Idade: {dog.age} anos</p>
      <p>Porte: {dog.size}</p>
    </div>
  );
}

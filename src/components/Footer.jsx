import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, { y: -2, color: '#ff80ab', duration: 0.2 });
  };
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, color: '#ffffff', duration: 0.2 });
  };

  return (
    <footer ref={footerRef}>
      <p>&copy; {new Date().getFullYear()} Adote com Amor</p>
      <div className="socials">
        <a href="#" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Instagram</a>
        <a href="#" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Facebook</a>
      </div>
    </footer>
  );
}

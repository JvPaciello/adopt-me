import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiInstagram, FiFacebook } from 'react-icons/fi';

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
      <div className="footer-columns">
        <div className="footer-col">
          <h4>Adote com Amor</h4>
          <p>Conectando cães resgatados a famílias que querem transformar uma vida.</p>
        </div>
        <div className="footer-col">
          <h5>Links rápidos</h5>
          <a href="#inicio" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Início</a>
          <a href="#sobre" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Sobre</a>
          <a href="#adotar" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Adotar</a>
          <a href="#contato" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>Contato</a>
        </div>
        <div className="footer-col">
          <h5>Contato</h5>
          <p>contato@adotecomamor.org</p>
          <p>(11) 4002-8922</p>
        </div>
        <div className="footer-col">
          <h5>Endereço</h5>
          <p>Rua dos Resgatados, 123</p>
          <p>São Paulo - SP</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Adote com Amor</p>
        <div className="socials">
          <a href="#" aria-label="Instagram" onMouseEnter={handleEnter} onMouseLeave={handleLeave}><FiInstagram size={20} /></a>
          <a href="#" aria-label="Facebook" onMouseEnter={handleEnter} onMouseLeave={handleLeave}><FiFacebook size={20} /></a>
        </div>
      </div>
    </footer>
  );
}

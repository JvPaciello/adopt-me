import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header h1', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.header nav a', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power2.out',
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const handleHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      color: enter ? '#e91e63' : '#555',
      y: enter ? -2 : 0,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const navItems = [
    { href: '#inicio', label: 'Início' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#adotar', label: 'Adotar' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header className="header" ref={headerRef}>
      <h1>Adote com Amor</h1>
      <button
        className="menu-toggle"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>
      <nav className={isOpen ? 'nav-open' : ''}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

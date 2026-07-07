import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Quanto custa adotar um cão?',
    a: 'A adoção em si é gratuita. Pedimos apenas que a família esteja preparada para os custos de manutenção do pet (alimentação, vacinas, veterinário).',
  },
  {
    q: 'Quais são os requisitos para adotar?',
    a: 'Ser maior de 18 anos, morar em local seguro para o porte do cão e passar por uma breve entrevista com nossa equipe.',
  },
  {
    q: 'Como funciona o processo de adoção?',
    a: 'Você escolhe um cão no site, preenche o formulário de interesse, fazemos uma entrevista e agendamos uma visita para vocês se conhecerem antes de finalizar.',
  },
  {
    q: 'Existe acompanhamento após a adoção?',
    a: 'Sim, nossa equipe entra em contato periodicamente nos primeiros meses para ajudar na adaptação do pet à nova casa.',
  },
  {
    q: 'É possível devolver o cão se não der certo?',
    a: 'Sim. Preferimos que o cão volte para nós a ser abandonado — pedimos apenas que a família nos avise com antecedência.',
  },
];

export default function Faq() {
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="faq" ref={ref}>
      <h3>Perguntas frequentes</h3>
      <div className="faq-list">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div className="faq-item" key={item.q}>
              <button className="faq-question" onClick={() => toggle(index)}>
                <span>{item.q}</span>
                <FiChevronDown className={`faq-icon ${isOpen ? 'open' : ''}`} />
              </button>
              {isOpen && <p className="faq-answer">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

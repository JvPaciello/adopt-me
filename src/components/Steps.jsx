//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


export default function Steps() {
  return (
    <section id="sobre" className="steps">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Como Funciona?
      </motion.h3>

      <div className="step-list">
        {[ 
          {
            title: "1. Escolha seu pet",
            desc: "Explore os perfis dos cães e encontre aquele que combina com você.",
          },
          {
            title: "2. Preencha o formulário",
            desc: "Enviaremos informações e agendaremos uma visita.",
          },
          {
            title: "3. Leve pra casa",
            desc: "Com carinho e responsabilidade, o pet será parte da sua vida.",
          },
        ].map((step, index) => (
          <motion.div
            className="step-card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
          >
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

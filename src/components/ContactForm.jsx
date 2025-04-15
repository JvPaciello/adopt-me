// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <section id="contato" className="contact">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Entre em contato
      </motion.h3>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.input
          type="text"
          placeholder="Nome completo"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        <motion.input
          type="email"
          placeholder="Seu e-mail"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        <motion.textarea
          placeholder="Mensagem"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Enviar mensagem
        </motion.button>
      </motion.form>
    </section>
  );
}

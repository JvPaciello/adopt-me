// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Adote um amigo de quatro patas
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Transforme uma vida. Encontre seu novo melhor amigo hoje!
      </motion.p>

      <motion.a
        href="#adotar"
        className="cta"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Ver cães disponíveis
      </motion.a>
    </section>
  );
}

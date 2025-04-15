//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function DogCard({ dog }) {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card-img-wrapper">
        <motion.img
          src={dog.img}
          alt={dog.name}
          className="dog-img"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <h4>{dog.name}</h4>
      <p>Idade: {dog.age} anos</p>
      <p>Porte: {dog.size}</p>
    </motion.div>
  );
}

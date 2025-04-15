
import { useContext } from 'react';
import { DogsContext } from '../context/DogsContext';
import DogCard from './DogCard';


export default function Gallery() {
  const { dogs } = useContext(DogsContext);

  return (
    <section id="adotar" className="gallery">
      <h3>Cães para Adoção</h3>
      <div className="cards">
        {dogs.map((dog, index) => (
          <DogCard key={index} dog={dog} />
        ))}
      </div>
    </section>
  );
}

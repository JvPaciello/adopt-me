import { useContext, useState } from 'react';
import { DogsContext } from '../context/DogsContext';
import DogCard from './DogCard';

const FILTERS = ['Todos', 'Pequeno', 'Médio', 'Grande'];

export default function Gallery() {
  const { dogs } = useContext(DogsContext);
  const [filter, setFilter] = useState('Todos');

  const filteredDogs = filter === 'Todos' ? dogs : dogs.filter((dog) => dog.size === filter);

  return (
    <section id="adotar" className="gallery">
      <h3>Cães para Adoção</h3>
      <div className="filter-pills">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="cards">
        {filteredDogs.map((dog, index) => (
          <DogCard key={dog.name} dog={dog} index={index} />
        ))}
      </div>
    </section>
  );
}

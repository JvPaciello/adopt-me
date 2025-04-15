
import { createContext, useState } from 'react';

export const DogsContext = createContext();

export function DogsProvider({ children }) {
  const [dogs] = useState([
    { name: 'Luna', age: 2, size: 'Médio', img: 'https://blog.appegada.com/thumb/blog/1/780/500/1a09bacc2740e0f8e3c2b10bd5bf01ae.jpg' },
    { name: 'Toby', age: 3, size: 'Pequeno', img: 'https://fisiocarepet.com.br/wp-content/uploads/2024/12/Capas-para-blog-16-1024x575.png' },
    { name: 'Maggie', age: 4, size: 'Grande', img: 'https://cachorrosderaca.com.br/wp-content/uploads/2017/01/doberman-893931_960_720.jpg' }
  ]);

  return (
    <DogsContext.Provider value={{ dogs }}>
      {children}
    </DogsContext.Provider>
  );
}

import { createContext, useState } from 'react';

export const DogsContext = createContext();

export function DogsProvider({ children }) {
  const [dogs] = useState([
    { name: 'Luna', age: 2, size: 'Médio', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Toby', age: 3, size: 'Pequeno', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Maggie', age: 4, size: 'Grande', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bento', age: 1, size: 'Pequeno', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80' },
    { name: 'Nina', age: 5, size: 'Médio', img: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?auto=format&fit=crop&w=600&q=80' },
    { name: 'Zeus', age: 3, size: 'Grande', img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mel', age: 2, size: 'Pequeno', img: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Thor', age: 4, size: 'Médio', img: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&w=600&q=80' },
  ]);

  return (
    <DogsContext.Provider value={{ dogs }}>
      {children}
    </DogsContext.Provider>
  );
}

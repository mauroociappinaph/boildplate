import { useEffect, useState } from 'react';

export default function Home() {
  const [health, setHealth] = useState<string>('');

  useEffect(() => {
    // Ejemplo de llamada a la API
    fetch('http://localhost:3000/health')
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido a tu Aplicación
      </h1>
      <p className="mb-4">
        Este es un boilerplate para comenzar tu proyecto. Personaliza este componente según tus necesidades.
      </p>
      <div className="p-4 bg-gray-100 rounded">
        <p>Estado de la API: {health || 'Cargando...'}</p>
      </div>
    </main>
  );
}

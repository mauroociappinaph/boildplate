import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { disconnectPrisma } from './lib/prisma';
import routes from './routes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/api', routes);

// Middleware de manejo de errores (debe ir después de todas las rutas)
app.use(errorHandler as ErrorRequestHandler);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Manejo de errores
process.on('SIGINT', async () => {
  await disconnectPrisma();
  process.exit(0);
});

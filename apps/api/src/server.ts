import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { disconnectPrisma } from './lib/prisma';
import routes from './routes';
import healthRoutes from './routes/health';
import { httpRequestDurationMicroseconds, httpRequestsTotal } from './metrics';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Middleware para métricas
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration / 1000);
    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .inc();
  });
  next();
});

// Rutas
app.use('/api', routes);
app.use('/', healthRoutes);

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

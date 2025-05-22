import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';

// Configuración de variables de entorno
dotenv.config();

// Inicializar Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(Sentry.Handlers.requestHandler());

// Rutas base
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Aquí el usuario puede agregar sus propias rutas
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/auth', authRoutes);

// Manejador de errores global
app.use(Sentry.Handlers.errorHandler());
app.use((err: Error, _req: express.Request, res: express.Response) => {
  Sentry.captureException(err);
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

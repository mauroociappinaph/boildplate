import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configuración de variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas base
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Aquí el usuario puede agregar sus propias rutas
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/auth', authRoutes);

// Manejador de errores global
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

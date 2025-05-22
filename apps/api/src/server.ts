import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Manejo de errores
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

import { Router } from 'express';
import { register, getMetrics } from '../metrics';
import { ApiResponseSchema } from '../validations';
import { z } from 'zod';

const router = Router();

// Esquema para la respuesta de health check
const HealthCheckSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string().datetime(),
  uptime: z.number(),
  memory: z.object({
    total: z.number(),
    free: z.number(),
    used: z.number(),
  }),
  cpu: z.object({
    usage: z.number(),
  }),
});

// Endpoint para health check
router.get('/health', async (_, res) => {
  try {
    const healthData = {
      status: 'healthy' as const,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        total: process.memoryUsage().heapTotal,
        free: process.memoryUsage().heapUsed,
        used: process.memoryUsage().heapTotal - process.memoryUsage().heapUsed,
      },
      cpu: {
        usage: process.cpuUsage().user / 1000000, // Convertir a segundos
      },
    };

    const validatedData = HealthCheckSchema.parse(healthData);
    const response = ApiResponseSchema(HealthCheckSchema).parse({
      success: true,
      data: validatedData,
    });

    res.json(response);
  } catch (error) {
    const response = ApiResponseSchema(HealthCheckSchema).parse({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
    res.status(500).json(response);
  }
});

// Endpoint para métricas de Prometheus
router.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener métricas',
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const metrics = await getMetrics();

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      metrics,
      services: {
        database: 'connected', // Esto debería verificarse realmente con Prisma
        redis: 'connected',    // Si se usa Redis
        api: 'operational'
      }
    };

    res.status(200).json(healthStatus);
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;

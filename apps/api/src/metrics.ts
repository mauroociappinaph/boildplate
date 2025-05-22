import { Registry, Counter, Histogram } from 'prom-client';

// Crear un registro de métricas
const register = new Registry();

// Métricas de solicitudes HTTP
export const httpRequestDurationMicroseconds = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duración de las solicitudes HTTP en segundos',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

// Contador de solicitudes totales
export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Número total de solicitudes HTTP',
  labelNames: ['method', 'route', 'status_code'],
});

// Métricas de salud del sistema
export const systemUptime = new Counter({
  name: 'system_uptime_seconds',
  help: 'Tiempo de actividad del sistema en segundos',
});

// Registrar las métricas
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestsTotal);
register.registerMetric(systemUptime);

// Iniciar el contador de tiempo de actividad
setInterval(() => {
  systemUptime.inc(1);
}, 1000);

export { register };

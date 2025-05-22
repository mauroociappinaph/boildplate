# Endpoint de Health Check

## Descripción

El endpoint `/health` proporciona información sobre el estado actual del sistema, incluyendo métricas de rendimiento y estado de los servicios.

## Endpoints

### GET /health

Retorna el estado general del sistema y sus métricas.

#### Respuesta Exitosa (200)

```json
{
  "status": "healthy",
  "timestamp": "2024-03-14T12:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "total": 1024,
    "free": 512,
    "used": 512
  },
  "metrics": {
    "httpRequests": {
      "value": 1000
    },
    "systemUptime": {
      "value": 3600
    },
    "httpRequestDuration": {
      "buckets": {
        "0.1": 100,
        "0.5": 200,
        "1": 300,
        "2": 400,
        "5": 500
      }
    }
  },
  "services": {
    "database": "connected",
    "redis": "connected",
    "api": "operational"
  }
}
```

### GET /metrics

Retorna las métricas en formato Prometheus.

## Métricas Disponibles

### http_request_duration_seconds

- **Tipo**: Histograma
- **Descripción**: Duración de las solicitudes HTTP
- **Labels**: method, route, status_code
- **Buckets**: [0.1, 0.5, 1, 2, 5]

### http_requests_total

- **Tipo**: Contador
- **Descripción**: Número total de solicitudes HTTP
- **Labels**: method, route, status_code

### system_uptime_seconds

- **Tipo**: Contador
- **Descripción**: Tiempo de actividad del sistema
- **Actualización**: Cada segundo

## Implementación

### Archivos Relacionados

- `apps/api/src/routes/health.ts`: Endpoints de health check
- `apps/api/src/metrics.ts`: Configuración de métricas

### Dependencias

- prom-client: Para métricas Prometheus
- express: Para el servidor API
- zod: Para validación de respuestas

## Monitoreo

### Integración con Herramientas

- Prometheus: Para recolección de métricas
- Grafana: Para visualización
- AlertManager: Para alertas

### Alertas Recomendadas

- Uptime < 99.9%
- Latencia > 1s
- Error rate > 1%
- Memory usage > 80%

## Ejemplos de Uso

### cURL

```bash
# Health check
curl http://localhost:3000/health

# Métricas Prometheus
curl http://localhost:3000/metrics
```

### Prometheus Query

```promql
# Latencia promedio
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])

# Tasa de errores
sum(rate(http_requests_total{status_code=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
```

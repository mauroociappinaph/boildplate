# Health Check Endpoint

## Descripción

El endpoint de health check permite verificar el estado de la API y sus servicios dependientes.

## Endpoints Disponibles

### GET /v1/health

Verifica el estado general de la API.

**Respuesta:**

```json
{
  "status": "ok",
  "timestamp": "2024-03-20T12:00:00Z",
  "version": "1.0.0"
}
```

### GET /v1/health/detailed

Proporciona información detallada sobre el estado de todos los servicios.

**Respuesta:**

```json
{
  "status": "ok",
  "timestamp": "2024-03-20T12:00:00Z",
  "version": "1.0.0",
  "services": {
    "database": {
      "status": "ok",
      "latency": 15
    },
    "cache": {
      "status": "ok",
      "latency": 5
    },
    "storage": {
      "status": "ok",
      "latency": 25
    }
  }
}
```

## Códigos de Estado

- `200 OK`: Todos los servicios están funcionando correctamente
- `503 Service Unavailable`: Uno o más servicios no están disponibles

## Ejemplo de Uso

```bash
# Verificar estado general
curl -X GET https://api.ejemplo.com/v1/health

# Verificar estado detallado
curl -X GET https://api.ejemplo.com/v1/health/detailed
```

## Monitoreo

Este endpoint es utilizado por sistemas de monitoreo para:

- Verificar la disponibilidad de la API
- Medir tiempos de respuesta
- Detectar problemas en servicios dependientes
- Generar alertas automáticas

## Consideraciones

- No requiere autenticación
- Debe tener un tiempo de respuesta rápido
- No debe exponer información sensible
- Ideal para configurar health checks en balanceadores de carga

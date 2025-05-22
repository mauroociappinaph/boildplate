# Endpoints de la API

## Endpoints Disponibles

### Salud del Sistema

- [Health Check](./health/README.md) - Verificar el estado del sistema

### Usuarios

- [Gestión de Usuarios](./users/README.md) - CRUD de usuarios
- [Autenticación](./users/auth.md) - Login y registro

### Productos

- [Gestión de Productos](./products/README.md) - CRUD de productos
- [Categorías](./products/categories.md) - Gestión de categorías

## Convenciones de Nombrado

- Todos los endpoints siguen el patrón REST
- Utilizan kebab-case para las URLs
- Versiones en la URL: `/v1/resource`

## Formato de Peticiones

### GET

```bash
curl -X GET https://api.tudominio.com/v1/resource
```

### POST

```bash
curl -X POST https://api.tudominio.com/v1/resource \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

### PUT

```bash
curl -X PUT https://api.tudominio.com/v1/resource/1 \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

### DELETE

```bash
curl -X DELETE https://api.tudominio.com/v1/resource/1
```

## Paginación

Todos los endpoints que devuelven listas soportan paginación:

```bash
GET /v1/resource?page=1&limit=10
```

Respuesta:

```json
{
  "data": [],
  "meta": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

## Filtrado

Los endpoints soportan filtrado mediante query parameters:

```bash
GET /v1/resource?filter[status]=active&filter[type]=premium
```

## Ordenamiento

Soporte para ordenamiento:

```bash
GET /v1/resource?sort=createdAt:desc
```

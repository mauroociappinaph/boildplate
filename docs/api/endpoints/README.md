# Endpoints de la API

## Descripción General

Esta sección contiene la documentación detallada de todos los endpoints disponibles en la API.

## Endpoints Disponibles

### Health Check

- [Documentación de Health Check](./health/health.md)
- Verificación del estado de la API
- Monitoreo de servicios

### Usuarios

- [Documentación de Usuarios](./users/users.md)
- Gestión de usuarios
- Autenticación y autorización
- Perfiles y permisos

### Productos

- [Documentación de Productos](./products/products.md)
- Gestión de productos
- Inventario y stock
- Categorías y precios

## Convenciones Generales

### Formato de URLs

- Todas las URLs siguen el patrón REST
- Se utiliza kebab-case para las URLs
- Versión de la API incluida en la URL (v1)

### Formato de Respuestas

- Todas las respuestas son en formato JSON
- Incluyen código de estado HTTP apropiado
- Mensajes de error descriptivos

### Paginación

Los endpoints que devuelven listas soportan paginación con los siguientes parámetros:

- `page`: Número de página
- `limit`: Resultados por página
- `sort`: Campo para ordenar
- `order`: Orden (asc/desc)

### Autenticación

- La mayoría de los endpoints requieren autenticación
- Se utiliza Bearer Token en el header Authorization
- Algunos endpoints públicos no requieren autenticación

## Ejemplos de Uso

### Health Check

```bash
curl -X GET https://api.ejemplo.com/v1/health
```

### Usuarios

```bash
curl -X GET https://api.ejemplo.com/v1/users \
  -H "Authorization: Bearer token123"
```

### Productos

```bash
curl -X GET https://api.ejemplo.com/v1/products \
  -H "Authorization: Bearer token123"
```

## Consideraciones

- Todos los endpoints devuelven respuestas en formato JSON
- Se implementa rate limiting para prevenir abusos
- Se utilizan códigos de estado HTTP estándar
- Se mantiene versionado de la API
- Se documentan todos los cambios en el changelog

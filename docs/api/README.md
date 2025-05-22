# Documentación de la API

## Estructura de la Documentación

```
api/
├── endpoints/              # Documentación de endpoints
│   ├── health.md          # Endpoint de salud
│   ├── users.md           # Endpoints de usuarios
│   └── products.md        # Endpoints de productos
│
├── authentication/        # Documentación de autenticación
│   ├── jwt.md            # Autenticación JWT
│   ├── oauth.md          # Autenticación OAuth
│   └── security.md       # Consideraciones de seguridad
│
└── examples/             # Ejemplos de uso
    ├── requests/         # Ejemplos de peticiones
    ├── responses/        # Ejemplos de respuestas
    └── error-handling/   # Manejo de errores
```

## Información General

### Base URL

```
https://api.tudominio.com/v1
```

### Formato de Respuesta

Todas las respuestas siguen el siguiente formato:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "timestamp": "2024-03-21T12:00:00Z",
    "version": "1.0.0"
  }
}
```

### Códigos de Estado

- 200: Éxito
- 201: Creado
- 400: Error de validación
- 401: No autorizado
- 403: Prohibido
- 404: No encontrado
- 500: Error del servidor

## Autenticación

La API utiliza autenticación JWT. Consulta la [documentación de autenticación](./authentication/jwt.md) para más detalles.

## Rate Limiting

- 1000 peticiones por hora por IP
- 100 peticiones por minuto por usuario autenticado

## Versiones

La API está versionada. La versión actual es v1. Para más detalles sobre versiones, consulta la [documentación de versiones](./versions.md).

## Soporte

Para soporte técnico o reportar problemas:

- Email: api-support@tudominio.com
- GitHub Issues: [Repositorio de Issues](https://github.com/tuorg/api-issues)

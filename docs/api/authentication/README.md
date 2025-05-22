# Autenticación

## Métodos de Autenticación

### JWT (JSON Web Tokens)

- [Documentación JWT](./jwt/jwt.md)
- Autenticación basada en tokens
- Tokens de acceso y refresh

### OAuth 2.0

- [Documentación OAuth](./oauth/oauth.md)
- Autenticación con proveedores externos
- Flujos de autorización

### Seguridad

- [Consideraciones de Seguridad](./security/security.md)
- Mejores prácticas
- Protección contra ataques comunes

## Flujo de Autenticación

1. **Login**

   ```bash
   POST /v1/auth/login
   {
     "email": "usuario@ejemplo.com",
     "password": "contraseña"
   }
   ```

2. **Respuesta**

   ```json
   {
     "accessToken": "eyJhbGciOiJIUzI1NiIs...",
     "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
     "expiresIn": 3600
   }
   ```

3. **Uso del Token**
   ```bash
   GET /v1/resource
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```

## Refresh Token

```bash
POST /v1/auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Logout

```bash
POST /v1/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Consideraciones de Seguridad

- Tokens con tiempo de expiración corto
- Refresh tokens con tiempo de expiración largo
- Almacenamiento seguro de tokens
- Protección contra CSRF
- Rate limiting en endpoints de autenticación

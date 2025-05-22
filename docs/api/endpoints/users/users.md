# Endpoints de Usuarios

## Descripción

API para la gestión de usuarios del sistema.

## Endpoints Disponibles

### GET /v1/users

Obtiene la lista de usuarios.

**Parámetros de Query:**

- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Límite de resultados por página (default: 10)
- `sort` (opcional): Campo para ordenar (default: createdAt)
- `order` (opcional): Orden (asc/desc, default: desc)

**Respuesta:**

```json
{
  "data": [
    {
      "id": "user_123",
      "email": "usuario@ejemplo.com",
      "name": "Usuario Ejemplo",
      "role": "user",
      "createdAt": "2024-03-20T12:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### GET /v1/users/:id

Obtiene un usuario específico.

**Respuesta:**

```json
{
  "id": "user_123",
  "email": "usuario@ejemplo.com",
  "name": "Usuario Ejemplo",
  "role": "user",
  "createdAt": "2024-03-20T12:00:00Z",
  "updatedAt": "2024-03-20T12:00:00Z"
}
```

### POST /v1/users

Crea un nuevo usuario.

**Request Body:**

```json
{
  "email": "nuevo@ejemplo.com",
  "password": "contraseña123",
  "name": "Nuevo Usuario",
  "role": "user"
}
```

**Respuesta:**

```json
{
  "id": "user_123",
  "email": "nuevo@ejemplo.com",
  "name": "Nuevo Usuario",
  "role": "user",
  "createdAt": "2024-03-20T12:00:00Z"
}
```

### PUT /v1/users/:id

Actualiza un usuario existente.

**Request Body:**

```json
{
  "name": "Nombre Actualizado",
  "email": "actualizado@ejemplo.com"
}
```

**Respuesta:**

```json
{
  "id": "user_123",
  "email": "actualizado@ejemplo.com",
  "name": "Nombre Actualizado",
  "role": "user",
  "updatedAt": "2024-03-20T12:00:00Z"
}
```

### DELETE /v1/users/:id

Elimina un usuario.

**Respuesta:**

```json
{
  "message": "Usuario eliminado correctamente"
}
```

## Códigos de Estado

- `200 OK`: Operación exitosa
- `201 Created`: Usuario creado exitosamente
- `400 Bad Request`: Datos inválidos
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: No autorizado
- `404 Not Found`: Usuario no encontrado
- `409 Conflict`: Email ya registrado

## Validaciones

- Email debe ser válido y único
- Contraseña debe tener al menos 8 caracteres
- Nombre es requerido
- Role debe ser uno de los valores permitidos

## Ejemplos de Uso

```bash
# Obtener lista de usuarios
curl -X GET https://api.ejemplo.com/v1/users \
  -H "Authorization: Bearer token123"

# Crear usuario
curl -X POST https://api.ejemplo.com/v1/users \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nuevo@ejemplo.com",
    "password": "contraseña123",
    "name": "Nuevo Usuario"
  }'

# Actualizar usuario
curl -X PUT https://api.ejemplo.com/v1/users/user_123 \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nombre Actualizado"
  }'
```

## Consideraciones de Seguridad

- Todos los endpoints requieren autenticación excepto la creación de usuarios
- Las contraseñas se almacenan hasheadas
- Se implementa rate limiting para prevenir ataques de fuerza bruta
- Se validan los permisos del usuario antes de realizar operaciones

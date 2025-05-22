# Ejemplos de Uso de la API

## Estructura de Ejemplos

### Peticiones

- [Ejemplos de Peticiones](./requests/README.md)
  - Autenticación
  - CRUD básico
  - Consultas complejas

### Respuestas

- [Ejemplos de Respuestas](./responses/README.md)
  - Formatos de respuesta
  - Códigos de estado
  - Estructura de datos

### Manejo de Errores

- [Manejo de Errores](./error-handling/README.md)
  - Códigos de error
  - Mensajes de error
  - Solución de problemas comunes

## Ejemplos Comunes

### Autenticación

```bash
# Login
curl -X POST https://api.tudominio.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña"
  }'

# Usar token
curl -X GET https://api.tudominio.com/v1/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### CRUD de Usuarios

```bash
# Crear usuario
curl -X POST https://api.tudominio.com/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "contraseña"
  }'

# Obtener usuario
curl -X GET https://api.tudominio.com/v1/users/1

# Actualizar usuario
curl -X PUT https://api.tudominio.com/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez Actualizado"
  }'

# Eliminar usuario
curl -X DELETE https://api.tudominio.com/v1/users/1
```

### Consultas Avanzadas

```bash
# Paginación
curl -X GET "https://api.tudominio.com/v1/users?page=1&limit=10"

# Filtrado
curl -X GET "https://api.tudominio.com/v1/users?filter[status]=active"

# Ordenamiento
curl -X GET "https://api.tudominio.com/v1/users?sort=createdAt:desc"

# Búsqueda
curl -X GET "https://api.tudominio.com/v1/users?search=juan"
```

## Ejemplos en Diferentes Lenguajes

### JavaScript (Fetch)

```javascript
const response = await fetch('https://api.tudominio.com/v1/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
  }),
});
```

### Python (Requests)

```python
import requests

response = requests.post(
    'https://api.tudominio.com/v1/users',
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    },
    json={
        'name': 'Juan Pérez',
        'email': 'juan@ejemplo.com'
    }
)
```

### PHP (cURL)

```php
$ch = curl_init('https://api.tudominio.com/v1/users');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'name' => 'Juan Pérez',
    'email' => 'juan@ejemplo.com'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $token
]);
$response = curl_exec($ch);
```

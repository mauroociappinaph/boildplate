# Endpoints de Productos

## Descripción

API para la gestión de productos del sistema.

## Endpoints Disponibles

### GET /v1/products

Obtiene la lista de productos.

**Parámetros de Query:**

- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Límite de resultados por página (default: 10)
- `sort` (opcional): Campo para ordenar (default: createdAt)
- `order` (opcional): Orden (asc/desc, default: desc)
- `category` (opcional): Filtrar por categoría
- `minPrice` (opcional): Precio mínimo
- `maxPrice` (opcional): Precio máximo
- `search` (opcional): Búsqueda por nombre o descripción

**Respuesta:**

```json
{
  "data": [
    {
      "id": "prod_123",
      "name": "Producto Ejemplo",
      "description": "Descripción del producto",
      "price": 99.99,
      "category": "categoría",
      "stock": 100,
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

### GET /v1/products/:id

Obtiene un producto específico.

**Respuesta:**

```json
{
  "id": "prod_123",
  "name": "Producto Ejemplo",
  "description": "Descripción del producto",
  "price": 99.99,
  "category": "categoría",
  "stock": 100,
  "images": ["https://ejemplo.com/imagen1.jpg"],
  "createdAt": "2024-03-20T12:00:00Z",
  "updatedAt": "2024-03-20T12:00:00Z"
}
```

### POST /v1/products

Crea un nuevo producto.

**Request Body:**

```json
{
  "name": "Nuevo Producto",
  "description": "Descripción del nuevo producto",
  "price": 149.99,
  "category": "categoría",
  "stock": 50,
  "images": ["https://ejemplo.com/imagen1.jpg"]
}
```

**Respuesta:**

```json
{
  "id": "prod_123",
  "name": "Nuevo Producto",
  "description": "Descripción del nuevo producto",
  "price": 149.99,
  "category": "categoría",
  "stock": 50,
  "images": ["https://ejemplo.com/imagen1.jpg"],
  "createdAt": "2024-03-20T12:00:00Z"
}
```

### PUT /v1/products/:id

Actualiza un producto existente.

**Request Body:**

```json
{
  "name": "Producto Actualizado",
  "price": 199.99,
  "stock": 75
}
```

**Respuesta:**

```json
{
  "id": "prod_123",
  "name": "Producto Actualizado",
  "description": "Descripción del producto",
  "price": 199.99,
  "category": "categoría",
  "stock": 75,
  "images": ["https://ejemplo.com/imagen1.jpg"],
  "updatedAt": "2024-03-20T12:00:00Z"
}
```

### DELETE /v1/products/:id

Elimina un producto.

**Respuesta:**

```json
{
  "message": "Producto eliminado correctamente"
}
```

## Códigos de Estado

- `200 OK`: Operación exitosa
- `201 Created`: Producto creado exitosamente
- `400 Bad Request`: Datos inválidos
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: No autorizado
- `404 Not Found`: Producto no encontrado
- `409 Conflict`: Producto ya existe

## Validaciones

- Nombre es requerido y único
- Precio debe ser mayor a 0
- Stock no puede ser negativo
- Categoría debe ser válida
- Imágenes deben ser URLs válidas

## Ejemplos de Uso

```bash
# Obtener lista de productos
curl -X GET https://api.ejemplo.com/v1/products \
  -H "Authorization: Bearer token123"

# Crear producto
curl -X POST https://api.ejemplo.com/v1/products \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Producto",
    "description": "Descripción del producto",
    "price": 149.99,
    "category": "categoría",
    "stock": 50
  }'

# Actualizar producto
curl -X PUT https://api.ejemplo.com/v1/products/prod_123 \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 199.99,
    "stock": 75
  }'
```

## Consideraciones

- Todos los endpoints requieren autenticación
- Se implementa caché para mejorar el rendimiento
- Se validan los permisos del usuario antes de realizar operaciones
- Se mantiene un historial de cambios en precios y stock

# Documentación de Endpoints

## Autenticación

### POST /api/auth/login

```typescript
Request: {
  email: string;
  password: string;
}

Response: {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}
```

### POST /api/auth/register

```typescript
Request: {
  email: string;
  password: string;
  name: string;
}

Response: {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}
```

## Usuarios

### GET /api/users/me

```typescript
Response: {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
```

### PUT /api/users/me

```typescript
Request:
{
  name?: string;
  email?: string;
}

Response:
{
  id: string;
  email: string;
  name: string;
  updatedAt: string;
}
```

## Productos

### GET /api/products

```typescript
Query Parameters:
{
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

Response:
{
  data: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }>;
  total: number;
  page: number;
  limit: number;
}
```

### POST /api/products

```typescript
Request: {
  name: string;
  description: string;
  price: number;
  category: string;
}

Response: {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
}
```

## Códigos de Error

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Unprocessable Entity
- 500: Internal Server Error

## Rate Limiting

- 100 requests por minuto por IP
- 1000 requests por hora por usuario autenticado

# Autenticación

## JWT (JSON Web Tokens)

### Estructura del Token

```typescript
{
  header: {
    alg: "HS256",
    typ: "JWT"
  },
  payload: {
    sub: string; // user id
    email: string;
    iat: number; // issued at
    exp: number; // expiration
  }
}
```

### Configuración

```typescript
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d',
  refreshExpiresIn: '30d',
};
```

## Flujo de Autenticación

### 1. Login

1. Usuario envía credenciales
2. Servidor valida credenciales
3. Genera JWT y Refresh Token
4. Devuelve tokens al cliente

### 2. Refresh Token

1. Cliente envía Refresh Token
2. Servidor valida Refresh Token
3. Genera nuevo JWT
4. Devuelve nuevo JWT

### 3. Logout

1. Cliente elimina tokens localmente
2. Servidor invalida Refresh Token

## Middleware de Autenticación

```typescript
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

## Seguridad

### 1. Headers de Seguridad

```typescript
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
```

### 2. Rate Limiting

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite por IP
});
```

### 3. Protección contra Ataques

- CSRF Protection
- XSS Protection
- SQL Injection Protection
- Brute Force Protection

## Mejores Prácticas

1. Usar HTTPS
2. Implementar 2FA
3. Rotar tokens regularmente
4. Monitorear intentos fallidos
5. Implementar bloqueo de cuenta
6. Logging de eventos de autenticación

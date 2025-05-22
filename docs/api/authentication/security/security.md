# Seguridad en Autenticación

## Amenazas Comunes

### 1. Ataques de Fuerza Bruta

- Intentos repetidos de login
- Ataques de diccionario
- Credenciales por defecto

### 2. Ataques de Inyección

- SQL Injection
- NoSQL Injection
- Command Injection

### 3. Ataques de Sesión

- Session Hijacking
- Session Fixation
- CSRF (Cross-Site Request Forgery)

### 4. Ataques de Token

- Token Theft
- Token Replay
- Token Manipulation

## Medidas de Seguridad

### 1. Protección de Contraseñas

```typescript
import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
```

### 2. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos de login, intente más tarde',
});

app.use('/auth/login', loginLimiter);
```

### 3. Validación de Entrada

```typescript
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const validateLogin = (data: unknown) => {
  return loginSchema.parse(data);
};
```

### 4. Headers de Seguridad

```typescript
import helmet from 'helmet';

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  })
);
```

## Mejores Prácticas

### 1. Almacenamiento de Tokens

```typescript
// Configuración de cookies seguras
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
  })
);
```

### 2. Validación de Tokens

```typescript
const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar blacklist
    if (await isTokenBlacklisted(token)) {
      throw new Error('Token revocado');
    }

    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};
```

### 3. Logging de Seguridad

```typescript
const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'security.log' })],
});

const logSecurityEvent = (event: string, details: any) => {
  securityLogger.info({
    timestamp: new Date().toISOString(),
    event,
    ...details,
  });
};
```

## Configuración de Seguridad

### 1. Variables de Entorno

```env
# Seguridad
NODE_ENV=production
SESSION_SECRET=tu-session-secret
JWT_SECRET=tu-jwt-secret
REFRESH_TOKEN_SECRET=tu-refresh-token-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
ALLOWED_ORIGINS=https://tuapp.com
```

### 2. Configuración de CORS

```typescript
import cors from 'cors';

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
```

## Monitoreo y Alertas

### 1. Detección de Intrusiones

```typescript
const detectSuspiciousActivity = async (req: Request) => {
  const suspiciousPatterns = [
    /\.\.\//, // Path traversal
    /<script>/, // XSS
    /UNION\s+SELECT/, // SQL Injection
  ];

  const isSuspicious = suspiciousPatterns.some(
    (pattern) => pattern.test(req.body) || pattern.test(req.query)
  );

  if (isSuspicious) {
    await logSecurityEvent('suspicious_activity', {
      ip: req.ip,
      path: req.path,
      body: req.body,
    });
  }
};
```

### 2. Sistema de Alertas

```typescript
const sendSecurityAlert = async (alert: SecurityAlert) => {
  // Enviar email
  await sendEmail({
    to: 'security@tuapp.com',
    subject: 'Alerta de Seguridad',
    text: `Alerta: ${alert.message}`,
  });

  // Enviar a Slack
  await sendToSlack({
    channel: '#security-alerts',
    text: `🚨 ${alert.message}`,
  });
};
```

## Respuesta a Incidentes

### 1. Procedimiento de Bloqueo

```typescript
const blockUser = async (userId: string, reason: string) => {
  await User.updateOne(
    { _id: userId },
    {
      $set: {
        status: 'blocked',
        blockedAt: new Date(),
        blockReason: reason,
      },
    }
  );

  // Invalidar todos los tokens
  await Token.deleteMany({ userId });
};
```

### 2. Procedimiento de Recuperación

```typescript
const initiateAccountRecovery = async (userId: string) => {
  // Generar token de recuperación
  const recoveryToken = crypto.randomBytes(32).toString('hex');

  // Guardar token con expiración
  await RecoveryToken.create({
    userId,
    token: recoveryToken,
    expiresAt: new Date(Date.now() + 3600000), // 1 hora
  });

  // Enviar email de recuperación
  await sendRecoveryEmail(userId, recoveryToken);
};
```

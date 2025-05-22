# Seguridad

## Autenticación y Autorización

### JWT

```typescript
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});
```

### Middleware de Autenticación

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
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

## Protección de Datos

### Encriptación

```typescript
import { encrypt, decrypt } from '@boildplate/shared/utils/crypto';

const encrypted = encrypt(sensitiveData);
const decrypted = decrypt(encrypted);
```

### Sanitización

```typescript
import { sanitize } from '@boildplate/shared/utils/sanitize';

const cleanInput = sanitize(userInput);
```

## Mejores Prácticas

1. **Seguridad en APIs**

   - Validar inputs
   - Implementar rate limiting
   - Usar HTTPS
   - Sanitizar outputs

2. **Manejo de Sesiones**

   - Tokens de corta duración
   - Refresh tokens seguros
   - Logout en múltiples dispositivos

3. **Protección de Datos**

   - Encriptar datos sensibles
   - No almacenar passwords en texto plano
   - Implementar backup seguro

4. **Monitoreo**
   - Logging de eventos de seguridad
   - Alertas de actividad sospechosa
   - Auditorías regulares

## Checklist de Seguridad

- [ ] Implementar HTTPS
- [ ] Configurar CORS
- [ ] Validar inputs
- [ ] Sanitizar outputs
- [ ] Implementar rate limiting
- [ ] Configurar headers de seguridad
- [ ] Realizar auditorías de código
- [ ] Mantener dependencias actualizadas

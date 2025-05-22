# Guía de Despliegue en Staging

## Requisitos Previos

### 1. Cuentas Necesarias

- Vercel (Frontend)
- Railway/Heroku (Backend)
- PostgreSQL (Base de datos)
- Sentry (Monitoreo)

### 2. Variables de Entorno

```env
# Frontend
NEXT_PUBLIC_API_URL=https://staging-api.yourapp.com
NEXT_PUBLIC_SENTRY_DSN=xxx

# Backend
DATABASE_URL=xxx
JWT_SECRET=xxx
SENTRY_DSN=xxx
```

## Proceso de Deploy

### 1. Preparación

```bash
# 1. Cambiar a rama staging
git checkout staging

# 2. Actualizar desde main
git merge main

# 3. Resolver conflictos si existen
```

### 2. Tests

```bash
# 1. Tests unitarios
pnpm test

# 2. Tests e2e
pnpm test:e2e

# 3. Linting
pnpm lint
```

### 3. Deploy

#### Frontend

```bash
# 1. Build
pnpm build:web

# 2. Deploy
vercel --env staging
```

#### Backend

```bash
# 1. Build
pnpm build:api

# 2. Deploy
git push heroku staging:main
```

## Verificación

### 1. Health Checks

```bash
# Frontend
curl https://staging.yourapp.com/api/health

# Backend
curl https://staging-api.yourapp.com/health
```

### 2. Funcionalidades Críticas

1. Login/Registro
2. Flujos principales
3. Integraciones externas
4. Webhooks

### 3. Monitoreo

- Revisar logs en Sentry
- Verificar métricas
- Comprobar errores

## Rollback

### 1. Frontend

```bash
# 1. Listar deployments
vercel ls

# 2. Rollback
vercel rollback <deployment-id>
```

### 2. Backend

```bash
# 1. Listar releases
heroku releases

# 2. Rollback
heroku rollback v<version>
```

## Mantenimiento

### 1. Base de Datos

```bash
# 1. Backup
pg_dump -U postgres -d staging_db > staging_backup.sql

# 2. Migraciones
pnpm prisma migrate deploy
```

### 2. Limpieza

```bash
# 1. Logs antiguos
heroku logs --clear

# 2. Cache
vercel deploy --force
```

## Checklist de QA

### 1. Frontend

- [ ] Build exitoso
- [ ] Variables de entorno correctas
- [ ] No hay errores en consola
- [ ] Responsive design funciona
- [ ] Performance aceptable

### 2. Backend

- [ ] Build exitoso
- [ ] Migraciones aplicadas
- [ ] Endpoints responden
- [ ] Logs sin errores
- [ ] Conexión a BD estable

### 3. Integraciones

- [ ] Emails funcionan
- [ ] Webhooks responden
- [ ] APIs externas conectan
- [ ] WebSockets funcionan

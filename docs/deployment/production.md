# Guía de Despliegue en Producción

## Requisitos Previos

### 1. Cuentas Necesarias

- Vercel (Frontend)
- Railway/Heroku (Backend)
- PostgreSQL (Base de datos)
- Sentry (Monitoreo)
- New Relic (Métricas)

### 2. Variables de Entorno

```env
# Frontend
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_SENTRY_DSN=xxx
NEXT_PUBLIC_MIXPANEL_TOKEN=xxx

# Backend
DATABASE_URL=xxx
JWT_SECRET=xxx
SENTRY_DSN=xxx
NEW_RELIC_LICENSE_KEY=xxx
```

## Proceso de Deploy

### 1. Preparación

```bash
# 1. Actualizar versiones
pnpm update

# 2. Ejecutar tests
pnpm test
pnpm test:e2e

# 3. Build
pnpm build
```

### 2. Base de Datos

```bash
# 1. Backup
pg_dump -U postgres -d your_db > backup.sql

# 2. Migraciones
pnpm prisma migrate deploy
```

### 3. Deploy Frontend

```bash
# 1. Verificar configuración
vercel env ls

# 2. Deploy
vercel --prod
```

### 4. Deploy Backend

```bash
# 1. Verificar configuración
heroku config

# 2. Deploy
git push heroku main
```

## Monitoreo

### 1. Health Checks

```bash
# Frontend
curl https://yourapp.com/api/health

# Backend
curl https://api.yourapp.com/health
```

### 2. Métricas

- New Relic: Rendimiento y errores
- Sentry: Errores y excepciones
- Mixpanel: Analytics y eventos

### 3. Logs

```bash
# Frontend
vercel logs

# Backend
heroku logs --tail
```

## Mantenimiento

### 1. Actualizaciones

```bash
# 1. Dependencias
pnpm update

# 2. Base de datos
pnpm prisma migrate deploy

# 3. Deploy
vercel --prod
```

### 2. Backups

```bash
# Diario
pg_dump -U postgres -d your_db > backup_$(date +%Y%m%d).sql

# Semanal
tar -czf backups_$(date +%Y%m%d).tar.gz backup_*.sql
```

### 3. Limpieza

```bash
# Logs antiguos
find /var/log -name "*.log" -mtime +30 -delete

# Backups antiguos
find /backups -name "backup_*.sql" -mtime +90 -delete
```

## Troubleshooting

### 1. Problemas de Deploy

```bash
# 1. Verificar logs
vercel logs
heroku logs

# 2. Rollback
vercel rollback
heroku rollback
```

### 2. Problemas de Base de Datos

```bash
# 1. Verificar conexión
psql $DATABASE_URL

# 2. Restaurar backup
psql $DATABASE_URL < backup.sql
```

### 3. Problemas de Rendimiento

1. Revisar métricas en New Relic
2. Analizar logs en Sentry
3. Verificar uso de recursos
4. Optimizar consultas lentas

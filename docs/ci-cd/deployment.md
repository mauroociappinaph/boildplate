# Guía de Despliegue

## Entornos

### 1. Desarrollo

- URL: `dev.yourapp.com`
- Branch: `develop`
- Auto-deploy en push

### 2. Staging

- URL: `staging.yourapp.com`
- Branch: `staging`
- Deploy manual desde develop

### 3. Producción

- URL: `yourapp.com`
- Branch: `main`
- Deploy manual desde staging

## Proceso de Deploy

### 1. Preparación

```bash
# Actualizar dependencias
npm update

# Ejecutar tests
npm run test

# Build
npm run build
```

### 2. Verificación

- Revisar variables de entorno
- Verificar conexiones a servicios
- Comprobar migraciones pendientes

### 3. Deploy

```bash
# Staging
vercel --prod

# Producción
vercel --prod
```

## Rollback

```bash
# Listar deployments
vercel ls

# Rollback a versión específica
vercel rollback <deployment-id>
```

## Monitoreo Post-Deploy

1. Verificar logs
2. Comprobar métricas
3. Validar endpoints críticos
4. Revisar errores en Sentry

## Checklist de Deploy

- [ ] Tests pasando
- [ ] Build exitoso
- [ ] Variables de entorno configuradas
- [ ] Migraciones aplicadas
- [ ] Backups realizados
- [ ] Notificación al equipo

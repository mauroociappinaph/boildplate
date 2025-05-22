# Pipeline de CI/CD

## Estructura del Pipeline

El pipeline está dividido en tres fases principales:

1. **Validación**
2. **QA**
3. **Deploy**

## Fase 1: Validación

### Objetivo

Verificar la calidad del código y la funcionalidad básica.

### Pasos

1. **Linting**

   ```bash
   npm run lint
   ```

2. **Type Check**

   ```bash
   npm run type-check
   ```

3. **Tests Unitarios**

   ```bash
   npm run test
   ```

4. **Build**
   ```bash
   npm run build
   ```

## Fase 2: QA

### Objetivo

Validar la calidad y rendimiento de la aplicación.

### Pasos

1. **Tests E2E**

   ```bash
   npm run test:e2e
   ```

2. **Lighthouse**

   ```bash
   npm run lighthouse
   ```

3. **Análisis SonarQube**
   ```bash
   npm run sonar
   ```

## Fase 3: Deploy

### Objetivo

Desplegar la aplicación en producción de forma segura.

### Pasos

1. **Build de Producción**

   ```bash
   npm run build
   ```

2. **Deploy en Vercel**
   - Despliegue gradual
   - Verificación de health checks
   - Rollback automático si es necesario

## Configuración

### GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    name: Validación
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      # ... más pasos

  qa:
    name: QA
    needs: validate
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    # ... configuración

  deploy:
    name: Deploy
    needs: [validate, qa]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    # ... configuración
```

## Variables de Entorno

### Requeridas

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Opcionales

- `TEST_URL`
- `SONAR_TOKEN`
- `LIGHTHOUSE_API_KEY`

## Monitoreo

### Métricas

- Tiempo de build
- Tasa de éxito
- Tiempo de deploy
- Cobertura de tests

### Alertas

- Fallos en el pipeline
- Deployments fallidos
- Tests fallidos
- Problemas de calidad

## Mejores Prácticas

### 1. Commits

- Usar Conventional Commits
- Mantener mensajes descriptivos
- Referenciar issues

### 2. PRs

- Requerir reviews
- Mantener PRs pequeños
- Incluir descripción detallada

### 3. Deploy

- Usar feature flags
- Implementar canary releases
- Mantener rollback plan

## Troubleshooting

### Problemas Comunes

1. **Build Fallido**

   - Verificar dependencias
   - Revisar logs de build
   - Comprobar versiones de Node

2. **Tests Fallidos**

   - Revisar cambios recientes
   - Verificar fixtures
   - Comprobar variables de entorno

3. **Deploy Fallido**
   - Verificar credenciales
   - Comprobar configuración de Vercel
   - Revisar logs de deploy

### Comandos Útiles

```bash
# Ver logs de CI
gh run list
gh run view <run-id>

# Forzar re-run
gh run rerun <run-id>

# Cancelar run
gh run cancel <run-id>
```

# Pipelines de CI/CD

## Descripción General

Esta sección describe los diferentes pipelines de integración y despliegue continuo utilizados en el proyecto.

## Pipelines Disponibles

### Pipeline Principal

```yaml
name: CI/CD Pipeline Principal

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Instalar dependencias
        run: pnpm install
      - name: Ejecutar tests
        run: pnpm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Construir aplicación
        run: pnpm build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Desplegar a producción
        run: pnpm deploy:prod
```

### Pipeline de Desarrollo

```yaml
name: Pipeline de Desarrollo

on:
  push:
    branches: [develop]
  pull_request:
    branches: [develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Instalar dependencias
        run: pnpm install
      - name: Ejecutar tests
        run: pnpm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Construir aplicación
        run: pnpm build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Desplegar a staging
        run: pnpm deploy:staging
```

## Configuración de Pipelines

### Variables de Entorno

```yaml
env:
  NODE_ENV: production
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}
```

### Caché

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: |
      node_modules
      .pnpm-store
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
```

### Matrices de Construcción

```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x]
    os: [ubuntu-latest, windows-latest]
```

## Monitoreo y Notificaciones

### Slack Notifications

```yaml
- name: Notificar a Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    fields: repo,message,commit,author,action,eventName,ref,workflow,job,took
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Status Checks

```yaml
- name: Verificar estado
  run: |
    if [ "${{ job.status }}" == "success" ]; then
      echo "✅ Pipeline completado exitosamente"
    else
      echo "❌ Pipeline falló"
      exit 1
    fi
```

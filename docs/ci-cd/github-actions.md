# GitHub Actions

## Flujo de Trabajo

### 1. Validación

```yaml
name: Validate
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
```

### 2. QA

```yaml
name: QA
on:
  pull_request:
    types: [labeled]
jobs:
  qa:
    if: github.event.label.name == 'ready-for-qa'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:e2e
```

### 3. Deploy

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Secretos Necesarios

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `DATABASE_URL`
- `NEXT_PUBLIC_API_URL`

## Protección de Ramas

1. Requerir revisión de PR
2. Requerir status checks
3. Requerir firma de commits
4. No permitir force push

## Monitoreo

- Notificaciones en Slack
- Reportes de cobertura
- Análisis de seguridad

# Despliegue

## Entornos

### Desarrollo

```bash
# Variables de entorno
NODE_ENV=development
API_URL=http://localhost:3000
DB_URL=postgresql://user:pass@localhost:5432/dev

# Comandos
pnpm dev
```

### Staging

```bash
# Variables de entorno
NODE_ENV=staging
API_URL=https://staging-api.example.com
DB_URL=postgresql://user:pass@staging-db:5432/staging

# Comandos
pnpm build
pnpm start
```

### Producción

```bash
# Variables de entorno
NODE_ENV=production
API_URL=https://api.example.com
DB_URL=postgresql://user:pass@prod-db:5432/prod

# Comandos
pnpm build
pnpm start
```

## CI/CD

### GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: pnpm install
      - run: pnpm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: pnpm install
      - run: pnpm build
      - run: pnpm deploy
```

## Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=app
```

## Monitoreo

### Health Checks

```typescript
app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    await db.query('SELECT 1');
    res.send(health);
  } catch (error) {
    health.message = error;
    res.status(503).send(health);
  }
});
```

## Mejores Prácticas

1. **Despliegue**

   - Zero-downtime deployments
   - Rollback automático
   - Blue-green deployment
   - Canary releases

2. **Monitoreo**

   - Logs centralizados
   - Métricas en tiempo real
   - Alertas proactivas
   - Dashboards

3. **Seguridad**

   - Secrets management
   - Network policies
   - SSL/TLS
   - Firewall rules

4. **Escalabilidad**
   - Auto-scaling
   - Load balancing
   - Caché distribuido
   - CDN

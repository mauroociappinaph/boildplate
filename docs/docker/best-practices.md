# Mejores Prácticas de Docker

## Optimización de Imágenes

### 1. Usar imágenes base oficiales

```dockerfile
FROM node:18-alpine
```

### 2. Multi-stage builds

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
```

### 3. Minimizar capas

- Combinar comandos RUN
- Usar .dockerignore
- Limpiar caché

## Seguridad

### 1. No ejecutar como root

```dockerfile
USER node
```

### 2. Escanear vulnerabilidades

```bash
docker scan <image-name>
```

### 3. Firmar imágenes

```bash
docker trust sign <image-name>
```

## Networking

### 1. Usar redes definidas

```yaml
networks:
  frontend:
  backend:
```

### 2. Exponer solo puertos necesarios

```dockerfile
EXPOSE 3000
```

## Volúmenes

### 1. Usar volúmenes nombrados

```yaml
volumes:
  - postgres_data:/var/lib/postgresql/data
```

### 2. Backup de datos

```bash
docker run --rm -v postgres_data:/source -v $(pwd)/backup:/backup alpine tar -czf /backup/data.tar.gz -C /source .
```

## Monitoreo

### 1. Healthchecks

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1
```

### 2. Logging

```yaml
logging:
  driver: 'json-file'
  options:
    max-size: '10m'
    max-file: '3'
```

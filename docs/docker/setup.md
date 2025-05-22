# Configuración de Docker

## Requisitos Previos

- Docker Desktop instalado
- Docker Compose instalado
- Git instalado

## Estructura de Docker

El proyecto utiliza una configuración multi-container con:

- Frontend (Next.js)
- Backend (Node.js + Express)
- Base de datos (PostgreSQL)

## Comandos Básicos

### Construir las imágenes

```bash
docker-compose build
```

### Iniciar los servicios

```bash
docker-compose up
```

### Iniciar en modo detached

```bash
docker-compose up -d
```

### Detener los servicios

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f
```

## Variables de Entorno

Las variables de entorno necesarias se encuentran en:

- `.env.example` - Template de variables
- `.env` - Variables locales (no versionado)

## Troubleshooting

1. Si los contenedores no inician:

   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

2. Para limpiar recursos no utilizados:
   ```bash
   docker system prune
   ```

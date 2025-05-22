# Boilerplate Full Stack

Este es un boilerplate para aplicaciones full stack que utiliza una arquitectura de microservicios.

## Estructura del Proyecto

```
apps/
├── api/         # Backend API (Express + TypeScript)
└── web/         # Frontend (Next.js)
```

## Configuración Inicial

### Requisitos Previos

- Node.js (v18 o superior)
- Docker (opcional, para desarrollo local)
- pnpm (gestor de paquetes recomendado)

### Pasos para Comenzar

1. Instalar dependencias:

```bash
pnpm install
```

2. Configurar variables de entorno:

   - Copia `.env.example` a `.env` en cada aplicación
   - Ajusta las variables según tu entorno

3. Iniciar el desarrollo:

```bash
# Iniciar API
cd apps/api
pnpm dev

# Iniciar Frontend
cd apps/web
pnpm dev
```

## Personalización

### API (apps/api)

- La lógica de negocio debe implementarse en `src/controllers/`
- Los modelos de datos en `src/models/`
- Las rutas en `src/routes/`
- La configuración de la base de datos en `prisma/schema.prisma`

### Frontend (apps/web)

- Los componentes en `src/components/`
- Las páginas en `src/pages/`
- Los estilos en `src/styles/`

## Scripts Disponibles

### API

- `pnpm dev`: Inicia el servidor de desarrollo
- `pnpm build`: Compila el proyecto
- `pnpm start`: Inicia el servidor en producción

### Frontend

- `pnpm dev`: Inicia el servidor de desarrollo
- `pnpm build`: Compila el proyecto
- `pnpm start`: Inicia el servidor en producción

## Docker

Para desarrollo local con Docker:

```bash
docker-compose up
```

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

# Guía de Inicio Rápido

## Requisitos Previos

### 1. Herramientas

- Node.js 18+
- pnpm 8+
- Docker y Docker Compose
- Git

### 2. Extensiones VSCode Recomendadas

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- GitLens

## Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
# Editar .env con tus valores
```

### 4. Iniciar Base de Datos

```bash
docker-compose up -d postgres
```

### 5. Ejecutar Migraciones

```bash
pnpm prisma migrate dev
```

## Desarrollo

### 1. Iniciar Servicios de Desarrollo

```bash
# Terminal 1 - Frontend
pnpm dev:web

# Terminal 2 - Backend
pnpm dev:api
```

### 2. Ejecutar Tests

```bash
# Tests unitarios
pnpm test

# Tests e2e
pnpm test:e2e
```

### 3. Linting y Formateo

```bash
# Lint
pnpm lint

# Formatear código
pnpm format
```

## Estructura del Proyecto

```
├── apps/
│   ├── web/          # Frontend Next.js
│   └── api/          # Backend Express
├── packages/
│   ├── ui/           # Componentes UI
│   ├── utils/        # Utilidades
│   └── types/        # Tipos TypeScript
├── prisma/           # Modelos y migraciones
└── docs/            # Documentación
```

## Comandos Útiles

### Desarrollo

```bash
pnpm dev        # Inicia todos los servicios
pnpm dev:web    # Solo frontend
pnpm dev:api    # Solo backend
```

### Build

```bash
pnpm build      # Build de todos los servicios
pnpm build:web  # Build frontend
pnpm build:api  # Build backend
```

### Testing

```bash
pnpm test       # Tests unitarios
pnpm test:e2e   # Tests e2e
pnpm test:watch # Tests en modo watch
```

### Linting

```bash
pnpm lint       # Ejecutar ESLint
pnpm format     # Formatear código
```

## Troubleshooting

### 1. Problemas de Dependencias

```bash
pnpm clean
pnpm install
```

### 2. Problemas de Base de Datos

```bash
pnpm prisma generate
pnpm prisma migrate reset
```

### 3. Problemas de Build

```bash
rm -rf .next
rm -rf dist
pnpm build
```

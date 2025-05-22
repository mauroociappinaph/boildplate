# Carpeta apps

## Descripción

Esta carpeta contiene las aplicaciones principales del monorepo. Cada aplicación es un proyecto independiente que puede ser desarrollado, construido y desplegado por separado, pero comparte código y configuración común con otras aplicaciones del monorepo.

## Estructura

```
apps/
├── web/           # Aplicación frontend (Next.js)
└── api/           # Servidor backend (Express)
```

## Aplicaciones

### 1. Web (Frontend)

- **Tecnología**: Next.js
- **Propósito**: Interfaz de usuario principal
- **Características**:
  - Renderizado del lado del servidor (SSR)
  - Generación estática (SSG)
  - Enrutamiento dinámico
  - Optimización de imágenes
  - Estilos con Tailwind CSS

### 2. API (Backend)

- **Tecnología**: Express
- **Propósito**: Servidor de API REST
- **Características**:
  - Endpoints RESTful
  - Middleware de autenticación
  - Validación de datos
  - Integración con base de datos
  - Documentación con Swagger

## Desarrollo

### Configuración del Entorno

```bash
# Instalar dependencias
pnpm install

# Iniciar desarrollo
pnpm dev
```

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia todas las aplicaciones
pnpm dev:web      # Solo frontend
pnpm dev:api      # Solo backend

# Construcción
pnpm build        # Construye todas las aplicaciones
pnpm build:web    # Solo frontend
pnpm build:api    # Solo backend

# Pruebas
pnpm test         # Ejecuta todas las pruebas
pnpm test:web     # Pruebas del frontend
pnpm test:api     # Pruebas del backend
```

## Estructura de Carpetas

### Web (Frontend)

```
web/
├── components/    # Componentes reutilizables
├── pages/        # Páginas y rutas
├── public/       # Archivos estáticos
├── styles/       # Estilos globales
└── utils/        # Utilidades y helpers
```

### API (Backend)

```
api/
├── controllers/   # Controladores de rutas
├── middleware/    # Middleware personalizado
├── models/       # Modelos de datos
├── routes/       # Definición de rutas
└── services/     # Lógica de negocio
```

## Comunicación entre Aplicaciones

### Frontend a Backend

- Llamadas API REST
- WebSockets para tiempo real
- Autenticación JWT

### Compartiendo Código

- Paquetes compartidos en `/packages`
- Tipos TypeScript comunes
- Utilidades compartidas

## Despliegue

### Frontend

- Despliegue en Vercel/Netlify
- CDN para assets estáticos
- Variables de entorno configuradas

### Backend

- Despliegue en servidor Node.js
- Base de datos PostgreSQL
- Variables de entorno seguras

## Mejores Prácticas

### Desarrollo

1. Mantener la consistencia en el código
2. Seguir las convenciones de nombrado
3. Documentar cambios importantes
4. Escribir pruebas unitarias

### Estructura

1. Organizar código por funcionalidad
2. Mantener componentes pequeños
3. Reutilizar código común
4. Seguir principios SOLID

## Solución de Problemas

### Problemas Comunes

1. Errores de compilación

   - Verificar tipos TypeScript
   - Revisar dependencias
   - Limpiar caché

2. Problemas de desarrollo
   - Reiniciar servidores
   - Limpiar caché del navegador
   - Verificar variables de entorno

## Contribución

Para agregar una nueva aplicación:

1. Crear nueva carpeta en `apps/`
2. Configurar `package.json`
3. Agregar scripts en el root
4. Actualizar configuración de Turborepo
5. Documentar la nueva aplicación

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Express](https://expressjs.com/)
- [Guía de Monorepo](https://turbo.build/repo/docs)
- [Patrones de Diseño](https://refactoring.guru/design-patterns)

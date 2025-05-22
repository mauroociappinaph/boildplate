# Guía para el Video de Onboarding

## Estructura del Video

### 1. Introducción (2-3 minutos)

- Bienvenida al proyecto
- Visión general del boilerplate
- Tecnologías principales utilizadas

### 2. Requisitos Previos (2-3 minutos)

- Node.js 18+
- npm o yarn
- Git
- Docker (opcional)
- IDE recomendado (VS Code con extensiones)

### 3. Configuración Inicial (5-7 minutos)

- Clonar el repositorio
- Instalar dependencias
- Configurar variables de entorno
- Iniciar el proyecto en modo desarrollo

### 4. Estructura del Proyecto (5-7 minutos)

- Explicación de la estructura de carpetas
- Apps (web y api)
- Packages compartidos
- Configuración de Prisma
- Documentación

### 5. Flujo de Desarrollo (5-7 minutos)

- Crear una nueva feature
- Ejecutar tests
- Linting y formateo
- Commits y PRs
- CI/CD pipeline

### 6. Herramientas y Utilidades (3-5 minutos)

- Playwright para E2E
- Lighthouse para auditorías
- SonarQube para análisis de código
- Monitoreo y métricas

### 7. Mejores Prácticas (3-5 minutos)

- Convenciones de código
- Patrones de diseño
- Manejo de errores
- Seguridad

### 8. Recursos Adicionales (2-3 minutos)

- Documentación
- Comunidad
- Soporte
- Contribución

## Puntos Clave a Cubrir

1. **Instalación y Configuración**

   ```bash
   git clone [repo-url]
   cd [project-name]
   npm install
   cp .env.example .env
   npm run dev
   ```

2. **Estructura de Carpetas**

   ```
   apps/
   ├── web/          # Next.js frontend
   └── api/          # Express backend
   packages/
   ├── ui/           # Componentes compartidos
   ├── utils/        # Utilidades
   └── types/        # Tipos TypeScript
   ```

3. **Comandos Principales**

   ```bash
   npm run dev       # Desarrollo
   npm run build     # Build
   npm run test      # Tests unitarios
   npm run test:e2e  # Tests E2E
   npm run lint      # Linting
   ```

4. **Flujo de Trabajo**
   - Crear rama feature
   - Desarrollar
   - Tests y linting
   - PR y revisión
   - Merge y deploy

## Recursos para el Video

1. **Capturas de Pantalla Necesarias**

   - Estructura de carpetas
   - Configuración de IDE
   - Pipeline de CI/CD
   - Dashboard de métricas

2. **Diagramas**

   - Arquitectura del sistema
   - Flujo de CI/CD
   - Estructura de monorepo

3. **Ejemplos de Código**
   - Componente React
   - Endpoint API
   - Test E2E
   - Configuración de Prisma

## Notas para la Producción

1. **Calidad del Video**

   - Resolución: 1920x1080
   - FPS: 30
   - Audio: 48kHz, 16-bit

2. **Edición**

   - Transiciones suaves
   - Subtítulos en español
   - Capítulos marcados
   - Thumbnails informativos

3. **Distribución**
   - YouTube (público)
   - Google Drive (privado)
   - Documentación del proyecto

## Duración Total Estimada

- 30-40 minutos

## Próximos Pasos

1. Crear guión detallado
2. Preparar ambiente de grabación
3. Grabar secciones
4. Editar y post-producir
5. Revisar y aprobar
6. Publicar y compartir

# Guía del Proyecto

## Introducción

Este proyecto es una aplicación web moderna construida con React y TypeScript. Utiliza las mejores prácticas de desarrollo y herramientas modernas para garantizar un código limpio y mantenible.

## Instalación y Configuración Local

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Git

### Pasos para la instalación

1. Clonar el repositorio:

```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

2. Instalar dependencias:

```bash
npm install
# o
yarn install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## Tests y Linting

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

### Linting

```bash
# Ejecutar ESLint
npm run lint

# Corregir problemas de linting automáticamente
npm run lint:fix
```

## Convenciones de Commit

Seguimos las convenciones de [Conventional Commits](https://www.conventionalcommits.org/). Los mensajes de commit deben seguir este formato:

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[pie opcional]
```

Tipos de commit:

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan el significado del código
- `refactor`: Cambios que no arreglan bugs ni añaden funcionalidades
- `test`: Añadir o modificar tests
- `chore`: Cambios en el proceso de build o herramientas auxiliares

## Estructura de Carpetas

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── hooks/         # Custom hooks
├── utils/         # Funciones utilitarias
├── types/         # Definiciones de TypeScript
├── styles/        # Estilos globales y temas
├── services/      # Servicios y llamadas a API
└── assets/        # Recursos estáticos
```

## Husky y lint-staged

El proyecto utiliza Husky y lint-staged para asegurar la calidad del código antes de cada commit.

### Configuración

Los hooks de git están configurados en el archivo `package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

### Funcionamiento

- Antes de cada commit, Husky ejecuta los hooks configurados
- lint-staged ejecuta los linters solo en los archivos que están en staging
- Si hay errores, el commit se aborta

## Contacto y Recursos

### Equipo

- Tech Lead: [NOMBRE] - [EMAIL]
- Product Owner: [NOMBRE] - [EMAIL]

### Recursos Útiles

- [Documentación de la API](URL)
- [Figma del Proyecto](URL)
- [Jira Board](URL)
- [Wiki del Proyecto](URL)

### Canales de Comunicación

- Slack: [CANAL]
- Email: [EMAIL]
- Reuniones semanales: [DÍA Y HORA]

---

Para cualquier duda o sugerencia, no dudes en contactar al equipo de desarrollo.

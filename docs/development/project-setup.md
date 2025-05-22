# Configuración del Proyecto

## Dependencias

### Dependencias de Desarrollo

El proyecto utiliza las siguientes dependencias principales de desarrollo:

```json
{
  "devDependencies": {
    "node-cron": "^3.0.3",
    "@types/node-cron": "^3.0.11"
    // ... otras dependencias
  }
}
```

### Notas Importantes

- El proyecto utiliza npm como gestor de paquetes (versión 10.2.4)
- Se requiere Node.js >= 18.0.0
- Se ha eliminado temporalmente `@snyk/cli` debido a problemas de registro en npm

## Scripts Disponibles

```bash
# Construcción
npm run build

# Desarrollo
npm run dev

# Linting
npm run lint

# Formateo de código
npm run format

# Tests
npm run test

# Auditorías
npm run audit:deps      # Auditoría de dependencias
npm run audit:sonar     # Auditoría de calidad de código
npm run audit:lighthouse # Auditoría de rendimiento
npm run audit:deps-cruise # Análisis de dependencias
npm run audit:all       # Ejecuta todas las auditorías
```

## Configuración de TypeScript

El proyecto está configurado para usar TypeScript con las siguientes características:

- Soporte para módulos ES
- Configuración estricta de tipos
- Integración con ESLint y Prettier

## Estructura del Proyecto

```
packages/
  ├── core/
  │   ├── src/
  │   │   ├── config/
  │   │   ├── services/
  │   │   └── scripts/
  │   └── package.json
  └── ...
```

## Solución de Problemas

### Problemas Comunes

1. **Error de módulo no encontrado**

   - Ejecutar `npm install` en la raíz del proyecto
   - Verificar que todas las dependencias estén correctamente listadas en package.json

2. **Problemas con @snyk/cli**
   - Si se encuentra el error "404 Not Found - GET https://registry.npmjs.org/@snyk/cli"
   - Solución temporal: Eliminar la dependencia del package.json y ejecutar npm install
   - Alternativa: Usar una versión específica o un registro alternativo

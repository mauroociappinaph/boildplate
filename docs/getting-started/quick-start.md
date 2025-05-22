# Inicio Rápido

## Estructura del Proyecto

```
├── apps/                    # Aplicaciones principales
│   ├── web/                # Frontend Next.js
│   └── api/                # Backend API
├── packages/               # Paquetes compartidos
│   ├── ui/                # Componentes UI
│   ├── config/            # Configuraciones
│   └── types/             # Tipos TypeScript
└── docs/                  # Documentación
```

## Comandos Principales

### Desarrollo

```bash
# Iniciar en modo desarrollo
pnpm dev

# Ejecutar tests
pnpm test

# Linting
pnpm lint
```

### Construcción

```bash
# Construir para producción
pnpm build

# Iniciar en producción
pnpm start
```

### Base de Datos

```bash
# Ejecutar migraciones
pnpm prisma migrate dev

# Generar cliente Prisma
pnpm prisma generate
```

## Flujo de Trabajo Básico

1. **Crear una Nueva Característica**

   ```bash
   pnpm create:feature nombre-caracteristica
   ```

2. **Desarrollar**

   - Modifica los archivos en `apps/web` o `apps/api`
   - Los cambios se reflejarán automáticamente

3. **Probar**

   ```bash
   pnpm test
   ```

4. **Construir**
   ```bash
   pnpm build
   ```

## Recursos Adicionales

- [Guía de Estilo](./development/coding-standards/style-guide.md)
- [Patrones de Diseño](./development/design-patterns.md)
- [Testing](./development/testing.md)
- [Seguridad](./guides/security/README.md)

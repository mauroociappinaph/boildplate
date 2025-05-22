# Guía de Estilo

## Convenciones de Código

### TypeScript

- Usar tipos estrictos
- Evitar `any`
- Documentar interfaces y tipos complejos
- Usar enums para valores constantes

### React

- Componentes funcionales con hooks
- Props tipadas con interfaces
- Separar lógica de presentación
- Usar memo cuando sea necesario

### CSS/Tailwind

- Usar clases utilitarias de Tailwind
- Seguir el orden: layout > spacing > typography > colors
- Mantener consistencia en nombres de clases
- Usar variables CSS para valores reutilizables

## Estructura de Archivos

```
src/
├── components/     # Componentes reutilizables
├── hooks/         # Custom hooks
├── utils/         # Funciones utilitarias
├── types/         # Definiciones de tipos
├── services/      # Servicios y APIs
└── pages/         # Páginas y rutas
```

## Nombrado

- PascalCase para componentes
- camelCase para funciones y variables
- UPPER_CASE para constantes
- kebab-case para archivos

## Comentarios

- Documentar funciones complejas
- Explicar decisiones de diseño
- Mantener comentarios actualizados
- Usar JSDoc para documentación de API

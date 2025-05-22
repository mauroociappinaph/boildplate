# Integración con IA

## Descripción

Este módulo proporciona una integración con OpenAI para asistir en tareas de desarrollo como revisión de código, generación de tests, documentación y más.

## Estructura

```
packages/shared/src/ai/
├── config.ts      # Configuración y validación
├── prompts.ts     # Prompts predefinidos
├── service.ts     # Servicio principal
└── README.md      # Documentación de uso
```

## Configuración

1. Agregar la API key en `.env`:

```env
OPENAI_API_KEY=tu_api_key_aqui
```

2. Instalar dependencias:

```bash
pnpm install
```

## Uso

```typescript
import { AIService } from '@boildplate/shared/src/ai/service';

const aiService = AIService.getInstance();

// Revisar código
const codeReview = await aiService.reviewCode(codigo);

// Generar tests
const tests = await aiService.generateTests(codigo);

// Generar documentación
const docs = await aiService.generateDocumentation(codigo);

// Optimizar código
const optimized = await aiService.optimizeCode(codigo);

// Auditar seguridad
const securityAudit = await aiService.auditSecurity(codigo);
```

## Prompts Disponibles

- **Revisión de Código**: Análisis de seguridad, mejores prácticas, optimizaciones
- **Generación de Tests**: Cobertura completa, casos edge, mocks
- **Documentación**: Descripción, parámetros, ejemplos, dependencias
- **Optimización**: Rendimiento, legibilidad, mantenibilidad
- **Auditoría de Seguridad**: Vulnerabilidades, hardening, privacidad

## Mejores Prácticas

1. **Validación**: Revisar siempre el código generado
2. **Seguridad**: No enviar código sensible
3. **Costos**: Monitorear uso de la API
4. **Rate Limiting**: Implementar límites de uso

## Contribución

Para agregar nuevas funcionalidades:

1. Agregar prompt en `prompts.ts`
2. Implementar método en `service.ts`
3. Actualizar documentación
4. Agregar tests

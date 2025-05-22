# Servicio de IA para Desarrollo

Este servicio proporciona integración con OpenAI para asistir en tareas de desarrollo como revisión de código, generación de tests, documentación y más.

## Configuración

1. Agrega tu API key de OpenAI al archivo `.env`:

```env
OPENAI_API_KEY=tu_api_key_aqui
```

2. Importa y usa el servicio:

```typescript
import { AIService } from '@boildplate/shared/src/ai/service';

// Obtener instancia del servicio
const aiService = AIService.getInstance();

// Revisar código
const codeReview = await aiService.reviewCode(`
  function example() {
    // tu código aquí
  }
`);

// Generar tests
const tests = await aiService.generateTests(`
  function example() {
    // tu código aquí
  }
`);

// Generar documentación
const docs = await aiService.generateDocumentation(`
  function example() {
    // tu código aquí
  }
`);

// Optimizar código
const optimized = await aiService.optimizeCode(`
  function example() {
    // tu código aquí
  }
`);

// Auditar seguridad
const securityAudit = await aiService.auditSecurity(`
  function example() {
    // tu código aquí
  }
`);
```

## Prompts Predefinidos

El servicio incluye prompts optimizados para:

- Revisión de código
- Generación de tests
- Documentación técnica
- Optimización de código
- Auditoría de seguridad

## Mejores Prácticas

1. **Validación de Código**: Siempre revisa el código generado por IA antes de implementarlo.
2. **Seguridad**: No envíes código sensible o credenciales a la API.
3. **Costo**: Monitorea el uso de la API para controlar costos.
4. **Rate Limiting**: Implementa límites de uso para evitar sobrecarga.

## Contribuir

Para agregar nuevos prompts o funcionalidades:

1. Agrega el prompt en `prompts.ts`
2. Implementa el método correspondiente en `service.ts`
3. Actualiza la documentación
4. Agrega tests unitarios

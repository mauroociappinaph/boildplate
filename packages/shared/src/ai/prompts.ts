export const CODE_REVIEW_PROMPT = `Por favor, revisa el siguiente código y proporciona:
1. Análisis de seguridad
2. Mejores prácticas
3. Optimizaciones posibles
4. Sugerencias de refactorización
5. Problemas de rendimiento

Código a revisar:
\`\`\`typescript
{code}
\`\`\``;

export const TEST_GENERATION_PROMPT = `Genera tests unitarios para el siguiente código siguiendo las mejores prácticas:
1. Cobertura completa
2. Casos edge
3. Mocks necesarios
4. Assertions claros

Código a testear:
\`\`\`typescript
{code}
\`\`\``;

export const DOCUMENTATION_PROMPT = `Genera documentación técnica para el siguiente código:
1. Descripción general
2. Parámetros y tipos
3. Ejemplos de uso
4. Consideraciones importantes
5. Dependencias

Código a documentar:
\`\`\`typescript
{code}
\`\`\``;

export const CODE_OPTIMIZATION_PROMPT = `Optimiza el siguiente código considerando:
1. Rendimiento
2. Legibilidad
3. Mantenibilidad
4. Patrones de diseño
5. Buenas prácticas

Código a optimizar:
\`\`\`typescript
{code}
\`\`\``;

export const SECURITY_AUDIT_PROMPT = `Realiza una auditoría de seguridad del siguiente código:
1. Vulnerabilidades potenciales
2. Mejores prácticas de seguridad
3. Recomendaciones de hardening
4. Consideraciones de privacidad

Código a auditar:
\`\`\`typescript
{code}
\`\`\``;

# Tests End-to-End (E2E)

## Configuración

### Requisitos

- Node.js 18+
- Playwright 1.42.1+

### Instalación

```bash
npm install -D @playwright/test
npx playwright install
```

## Estructura de Tests

### Ubicación

```
apps/web/
├── e2e/
│   ├── auth.spec.ts      # Tests de autenticación
│   ├── navigation.spec.ts # Tests de navegación
│   └── forms.spec.ts     # Tests de formularios
└── playwright.config.ts  # Configuración de Playwright
```

## Configuración de Playwright

### Navegadores Soportados

- Chromium
- Firefox
- WebKit
- Mobile Chrome
- Mobile Safari

### Configuración Base

```typescript
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
```

## Ejecución de Tests

### Comandos Disponibles

```bash
# Ejecutar todos los tests
npm run test:e2e

# Ejecutar tests con UI
npm run test:e2e:ui

# Ejecutar tests en modo debug
npm run test:e2e:debug

# Ejecutar tests específicos
npx playwright test auth.spec.ts
```

## Ejemplos de Tests

### Test de Autenticación

```typescript
test('should login successfully', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Mejores Prácticas

### 1. Organización

- Agrupar tests por funcionalidad
- Usar describe blocks para contexto
- Mantener tests independientes

### 2. Selectores

- Preferir data-testid
- Evitar selectores CSS frágiles
- Usar roles ARIA cuando sea posible

### 3. Aserciones

- Verificar estado final
- Comprobar mensajes de error
- Validar redirecciones

### 4. Fixtures

- Usar fixtures para datos de prueba
- Mantener credenciales en variables de entorno
- Limpiar datos después de cada test

## CI/CD Integration

### GitHub Actions

```yaml
- name: Run E2E tests
  run: npm run test:e2e
  env:
    BASE_URL: ${{ secrets.TEST_URL }}
```

### Reportes

- HTML report: `playwright-report/`
- Screenshots: `test-results/`
- Traces: `test-results/`

## Troubleshooting

### Problemas Comunes

1. Tests flaky

   - Aumentar timeouts
   - Usar waitForSelector
   - Verificar estado de la app

2. Errores de CI
   - Verificar variables de entorno
   - Comprobar navegadores instalados
   - Revisar logs de CI

### Debugging

```bash
# Modo debug
npm run test:e2e:debug

# Ver reporte HTML
npx playwright show-report
```

# Testing

## Tipos de Tests

### Unit Tests

```typescript
describe('Calculator', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

### Integration Tests

```typescript
describe('UserService', () => {
  it('should create and fetch user', async () => {
    const user = await userService.create({ name: 'Test' });
    const fetched = await userService.getById(user.id);
    expect(fetched).toEqual(user);
  });
});
```

### E2E Tests

```typescript
test('user flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Configuración

### Jest

```typescript
// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### Playwright

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
});
```

## Mejores Prácticas

1. **Cobertura**

   - Mantener cobertura > 80%
   - Enfocarse en casos críticos
   - Testear edge cases

2. **Organización**

   - Tests descriptivos
   - Agrupar por funcionalidad
   - Mantener tests independientes

3. **Mocks**

   - Mockear servicios externos
   - Usar factories para datos
   - Limpiar mocks después de cada test

4. **CI/CD**
   - Ejecutar tests en pipeline
   - Bloquear PRs si fallan tests
   - Reportar cobertura

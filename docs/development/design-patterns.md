# Patrones de Diseño

## Patrones Estructurales

### Singleton

```typescript
class Database {
  private static instance: Database;
  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
```

### Factory

```typescript
interface Product {
  operation(): string;
}

class ProductFactory {
  static createProduct(type: string): Product {
    switch (type) {
      case 'A':
        return new ProductA();
      case 'B':
        return new ProductB();
      default:
        throw new Error('Invalid product type');
    }
  }
}
```

## Patrones de Comportamiento

### Observer

```typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(data: any): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}
```

### Strategy

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class PaymentContext {
  constructor(private strategy: PaymentStrategy) {}

  executePayment(amount: number): void {
    this.strategy.pay(amount);
  }
}
```

## Patrones Creacionales

### Builder

```typescript
class QueryBuilder {
  private query: string = '';

  select(fields: string[]): this {
    this.query += `SELECT ${fields.join(', ')}`;
    return this;
  }

  from(table: string): this {
    this.query += ` FROM ${table}`;
    return this;
  }

  build(): string {
    return this.query;
  }
}
```

## Mejores Prácticas

1. **Selección de Patrones**

   - Elegir patrones según el problema
   - Evitar sobre-ingeniería
   - Mantener simplicidad

2. **Implementación**

   - Seguir principios SOLID
   - Mantener cohesión alta
   - Reducir acoplamiento

3. **Documentación**
   - Documentar decisiones
   - Explicar beneficios
   - Mantener ejemplos actualizados

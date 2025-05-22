# Estándares de Código

## TypeScript

### 1. Tipado Estricto

```typescript
// ❌ Mal
const user = { name: 'John' };

// ✅ Bien
interface User {
  name: string;
  age?: number;
}
const user: User = { name: 'John' };
```

### 2. Nombres de Tipos

```typescript
// ❌ Mal
type user = { name: string };

// ✅ Bien
type User = { name: string };
interface UserProps {
  name: string;
}
```

### 3. Enums

```typescript
// ❌ Mal
const Status = {
  Active: 'active',
  Inactive: 'inactive',
};

// ✅ Bien
enum Status {
  Active = 'active',
  Inactive = 'inactive',
}
```

## React

### 1. Componentes

```typescript
// ❌ Mal
export default function Component(props) {
  return <div>{props.name}</div>;
}

// ✅ Bien
interface ComponentProps {
  name: string;
}

export const Component: React.FC<ComponentProps> = ({ name }) => {
  return <div>{name}</div>;
};
```

### 2. Hooks

```typescript
// ❌ Mal
const [state, setState] = useState();

// ✅ Bien
const [state, setState] = useState<StateType>(initialState);
```

### 3. Event Handlers

```typescript
// ❌ Mal
const handleClick = (e) => {
  console.log(e);
};

// ✅ Bien
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e);
};
```

## API

### 1. Endpoints

```typescript
// ❌ Mal
app.get('/users', (req, res) => {
  res.json(users);
});

// ✅ Bien
interface GetUsersResponse {
  users: User[];
  total: number;
}

app.get('/users', async (req: Request, res: Response<GetUsersResponse>) => {
  const users = await userService.getAll();
  res.json({ users, total: users.length });
});
```

### 2. Error Handling

```typescript
// ❌ Mal
try {
  await someFunction();
} catch (error) {
  console.log(error);
}

// ✅ Bien
try {
  await someFunction();
} catch (error) {
  if (error instanceof CustomError) {
    throw new HttpError(error.message, error.statusCode);
  }
  throw new HttpError('Internal Server Error', 500);
}
```

## Testing

### 1. Nombres de Tests

```typescript
// ❌ Mal
test('test 1', () => {});

// ✅ Bien
describe('UserService', () => {
  it('should create a new user', () => {});
  it('should throw error if email exists', () => {});
});
```

### 2. Assertions

```typescript
// ❌ Mal
expect(result).toBe(true);

// ✅ Bien
expect(result).toEqual({
  id: expect.any(String),
  name: expect.any(String),
});
```

## Git

### 1. Commits

```bash
# ❌ Mal
git commit -m "fixed stuff"

# ✅ Bien
git commit -m "fix(auth): handle expired tokens"
```

### 2. Branches

```bash
# ❌ Mal
feature/new-stuff

# ✅ Bien
feature/user-authentication
```

## Documentación

### 1. Comentarios

```typescript
// ❌ Mal
// This function does stuff
function doStuff() {}

// ✅ Bien
/**
 * Calculates the total price including taxes
 * @param price - Base price
 * @param taxRate - Tax rate as decimal
 * @returns Total price with taxes
 */
function calculateTotal(price: number, taxRate: number): number {}
```

### 2. README

- Mantener actualizado
- Incluir ejemplos de uso
- Documentar variables de entorno
- Incluir badges de estado

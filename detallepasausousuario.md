# Guía de Uso del Boilerplate

## ¿Cómo Usar Este Boilerplate?

### 1. Crear un Nuevo Proyecto

```bash
# 1. Clona este repositorio
git clone [URL_DEL_REPOSITORIO] mi-nuevo-proyecto

# 2. Entra al directorio
cd mi-nuevo-proyecto

# 3. Elimina el git existente
rm -rf .git

# 4. Inicializa un nuevo repositorio
git init

# 5. Instala las dependencias
pnpm install
```

### 2. Personalización Inicial

1. Modifica el `package.json`:

   ```json
   {
     "name": "mi-nuevo-proyecto",
     "version": "1.0.0",
     "description": "Descripción de mi proyecto",
     "private": true,
     "scripts": {
       // Mantén los scripts existentes
     }
   }
   ```

2. Configura las variables de entorno:

   ```bash
   # Copia el archivo de ejemplo
   cp .env.example .env

   # Edita el archivo .env con tus configuraciones
   # Ejemplo de variables típicas:
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_base_de_datos"
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   JWT_SECRET="tu-secreto-jwt"
   ```

3. Personaliza la base de datos:

   ```prisma
   // prisma/schema.prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   // Ejemplo de modelo
   model Usuario {
     id        Int      @id @default(autoincrement())
     email     String   @unique
     nombre    String
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

   ```bash
   # Genera y aplica las migraciones
   pnpm prisma migrate dev --name init

   # Genera el cliente de Prisma
   pnpm prisma generate
   ```

### 3. Desarrollo de Características

1. Estructura de Carpetas:

   ```
   mi-nuevo-proyecto/
   ├── apps/
   │   └── web/                    # Aplicación Next.js principal
   │       ├── app/               # Páginas y rutas
   │       ├── components/        # Componentes específicos de la app
   │       ├── lib/              # Utilidades y helpers
   │       └── styles/           # Estilos globales
   ├── packages/
   │   ├── ui/                    # Componentes UI reutilizables
   │   │   ├── src/
   │   │   │   ├── components/   # Componentes base
   │   │   │   ├── hooks/        # Hooks personalizados
   │   │   │   └── utils/        # Utilidades
   │   └── config/               # Configuraciones compartidas
   └── prisma/                    # Esquemas y migraciones
   ```

2. Crear una Nueva Página:

   ```typescript
   // apps/web/app/dashboard/page.tsx
   import { DashboardLayout } from '@/components/layouts/DashboardLayout'
   import { Card } from '@repo/ui/card'
   import { Button } from '@repo/ui/button'

   export default function DashboardPage() {
     return (
       <DashboardLayout>
         <div className="space-y-4">
           <h1 className="text-2xl font-bold">Dashboard</h1>
           <Card>
             <div className="p-4">
               <h2 className="text-xl mb-4">Resumen</h2>
               <Button>Ver Detalles</Button>
             </div>
           </Card>
         </div>
       </DashboardLayout>
     )
   }
   ```

3. Crear un Nuevo Componente Reutilizable:

   ```typescript
   // packages/ui/src/components/DataTable.tsx
   import { useState } from 'react'
   import { Table } from './Table'
   import { Pagination } from './Pagination'

   interface DataTableProps<T> {
     data: T[]
     columns: {
       header: string
       accessor: keyof T
     }[]
     pageSize?: number
   }

   export function DataTable<T>({ data, columns, pageSize = 10 }: DataTableProps<T>) {
     const [currentPage, setCurrentPage] = useState(1)

     // Lógica de paginación
     const totalPages = Math.ceil(data.length / pageSize)
     const startIndex = (currentPage - 1) * pageSize
     const paginatedData = data.slice(startIndex, startIndex + pageSize)

     return (
       <div className="space-y-4">
         <Table data={paginatedData} columns={columns} />
         <Pagination
           currentPage={currentPage}
           totalPages={totalPages}
           onPageChange={setCurrentPage}
         />
       </div>
     )
   }
   ```

4. Crear un Hook Personalizado:

   ```typescript
   // packages/ui/src/hooks/useLocalStorage.ts
   import { useState, useEffect } from 'react';

   export function useLocalStorage<T>(key: string, initialValue: T) {
     const [storedValue, setStoredValue] = useState<T>(() => {
       if (typeof window === 'undefined') return initialValue;

       try {
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : initialValue;
       } catch (error) {
         console.error(error);
         return initialValue;
       }
     });

     useEffect(() => {
       if (typeof window !== 'undefined') {
         window.localStorage.setItem(key, JSON.stringify(storedValue));
       }
     }, [key, storedValue]);

     return [storedValue, setStoredValue] as const;
   }
   ```

### 4. Flujo de Trabajo Diario

1. Iniciar el Entorno de Desarrollo:

   ```bash
   # Inicia los servicios de Docker
   docker-compose up -d

   # Verifica que los servicios estén corriendo
   docker-compose ps

   # Inicia el servidor de desarrollo
   pnpm dev
   ```

2. Desarrollo con Hot Reload:

   - Los cambios en `apps/web` se reflejan automáticamente
   - Los cambios en `packages/ui` requieren reiniciar el servidor
   - Los tests se ejecutan en watch mode
   - El linter verifica el código en tiempo real

3. Proceso de Testing:

   ```bash
   # Ejecuta todos los tests
   pnpm test

   # Ejecuta tests en watch mode
   pnpm test:watch

   # Ejecuta tests con coverage
   pnpm test:coverage
   ```

4. Linting y Formateo:

   ```bash
   # Verifica el código
   pnpm lint

   # Formatea el código
   pnpm format

   # Verifica tipos de TypeScript
   pnpm type-check
   ```

### 5. Despliegue

1. Preparación para Producción:

   ```bash
   # Construye todas las aplicaciones
   pnpm build

   # Verifica la construcción
   pnpm start
   ```

2. Despliegue en Vercel:

   ```bash
   # Instala Vercel CLI
   pnpm add -g vercel

   # Despliega
   vercel
   ```

3. Despliegue en Docker:

   ```bash
   # Construye la imagen
   docker build -t mi-app .

   # Ejecuta el contenedor
   docker run -p 3000:3000 mi-app
   ```

### 6. Monitoreo y Mantenimiento

1. Logs:

   ```bash
   # Ver logs de Docker
   docker-compose logs -f

   # Ver logs de la aplicación
   pnpm logs
   ```

2. Base de Datos:

   ```bash
   # Abrir Prisma Studio
   pnpm prisma studio

   # Resetear la base de datos
   pnpm prisma migrate reset
   ```

3. Limpieza:

   ```bash
   # Limpiar caché
   pnpm clean

   # Limpiar node_modules
   rm -rf node_modules
   pnpm install
   ```

### 7. Configuración del Backend

1. **Estructura del Backend**:

   ```
   mi-nuevo-proyecto/
   ├── apps/
   │   └── api/                    # Backend API
   │       ├── src/
   │       │   ├── controllers/   # Controladores de rutas
   │       │   ├── models/        # Modelos de datos
   │       │   ├── routes/        # Definición de rutas
   │       │   ├── services/      # Lógica de negocio
   │       │   ├── middleware/    # Middlewares
   │       │   └── utils/         # Utilidades
   │       └── prisma/            # Esquemas de base de datos
   ```

2. **Inicialización del Backend**:

   ```bash
   # Crear la estructura del backend
   mkdir -p apps/api/src/{controllers,models,routes,services,middleware,utils}

   # Instalar dependencias específicas del backend
   cd apps/api
   pnpm add express @prisma/client cors helmet express-rate-limit
   pnpm add -D @types/express @types/cors typescript ts-node-dev
   ```

3. **Configuración de TypeScript para el Backend**:

   ```json
   // apps/api/tsconfig.json
   {
     "extends": "../../../tsconfig.json",
     "compilerOptions": {
       "outDir": "./dist",
       "rootDir": "./src",
       "module": "commonjs",
       "target": "es2017",
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

4. **Configuración del Servidor Express**:

   ```typescript
   // apps/api/src/index.ts
   import express from 'express';
   import cors from 'cors';
   import helmet from 'helmet';
   import rateLimit from 'express-rate-limit';
   import { PrismaClient } from '@prisma/client';

   const app = express();
   const prisma = new PrismaClient();

   // Middleware
   app.use(cors());
   app.use(helmet());
   app.use(express.json());

   // Rate limiting
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutos
     max: 100, // límite de 100 peticiones por ventana
   });
   app.use(limiter);

   // Rutas
   app.get('/api/health', (req, res) => {
     res.json({ status: 'ok' });
   });

   // Iniciar servidor
   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => {
     console.log(`Servidor corriendo en puerto ${PORT}`);
   });
   ```

5. **Crear un Controlador de Ejemplo**:

   ```typescript
   // apps/api/src/controllers/userController.ts
   import { Request, Response } from 'express';
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   export const userController = {
     async getUsers(req: Request, res: Response) {
       try {
         const users = await prisma.usuario.findMany();
         res.json(users);
       } catch (error) {
         res.status(500).json({ error: 'Error al obtener usuarios' });
       }
     },

     async createUser(req: Request, res: Response) {
       try {
         const { email, nombre } = req.body;
         const user = await prisma.usuario.create({
           data: { email, nombre },
         });
         res.status(201).json(user);
       } catch (error) {
         res.status(500).json({ error: 'Error al crear usuario' });
       }
     },
   };
   ```

6. **Configurar Rutas**:

   ```typescript
   // apps/api/src/routes/userRoutes.ts
   import { Router } from 'express';
   import { userController } from '../controllers/userController';

   const router = Router();

   router.get('/users', userController.getUsers);
   router.post('/users', userController.createUser);

   export default router;
   ```

7. **Middleware de Autenticación**:

   ```typescript
   // apps/api/src/middleware/auth.ts
   import { Request, Response, NextFunction } from 'express';
   import jwt from 'jsonwebtoken';

   export const authMiddleware = (
     req: Request,
     res: Response,
     next: NextFunction
   ) => {
     const token = req.headers.authorization?.split(' ')[1];

     if (!token) {
       return res.status(401).json({ error: 'Token no proporcionado' });
     }

     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET!);
       req.user = decoded;
       next();
     } catch (error) {
       return res.status(401).json({ error: 'Token inválido' });
     }
   };
   ```

8. **Scripts de Desarrollo**:

   ```json
   // apps/api/package.json
   {
     "scripts": {
       "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
       "build": "tsc",
       "start": "node dist/index.js",
       "test": "jest"
     }
   }
   ```

9. **Variables de Entorno del Backend**:

   ```env
   # apps/api/.env
   PORT=3001
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_base_de_datos"
   JWT_SECRET="tu-secreto-jwt"
   NODE_ENV="development"
   ```

10. **Iniciar el Backend**:

    ```bash
    # En modo desarrollo
    cd apps/api
    pnpm dev

    # En producción
    pnpm build
    pnpm start
    ```

11. **Testing del Backend**:

    ```typescript
    // apps/api/src/__tests__/user.test.ts
    import request from 'supertest';
    import { app } from '../index';

    describe('User Endpoints', () => {
      it('should create a new user', async () => {
        const res = await request(app).post('/api/users').send({
          email: 'test@example.com',
          nombre: 'Test User',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('email');
      });
    });
    ```

12. **Documentación de API**:

    ```typescript
    // apps/api/src/utils/swagger.ts
    import swaggerJsdoc from 'swagger-jsdoc';

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'Documentación de la API',
        },
        servers: [
          {
            url: 'http://localhost:3001',
            description: 'Servidor de desarrollo',
          },
        ],
      },
      apis: ['./src/routes/*.ts'],
    };

    export const specs = swaggerJsdoc(options);
    ```

## Requisitos Previos

- Node.js (versión 18 o superior)
- pnpm (gestor de paquetes)
- Docker y Docker Compose (para desarrollo local)
- Git

## Pasos para Comenzar

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

### 2. Instalación de Dependencias

```bash
pnpm install
```

### 3. Configuración del Entorno

1. Copia el archivo `.env.example` a `.env` (si existe)
2. Configura las variables de entorno necesarias en el archivo `.env`

### 4. Iniciar el Entorno de Desarrollo

Para iniciar todos los servicios necesarios:

```bash
docker-compose up -d
```

### 5. Ejecutar el Proyecto

Para desarrollo:

```bash
pnpm dev
```

Para producción:

```bash
pnpm build
pnpm start
```

## Estructura del Proyecto

- `/apps`: Contiene las aplicaciones principales
- `/packages`: Contiene los paquetes compartidos
- `/docs`: Documentación del proyecto
- `/config`: Archivos de configuración
- `/prisma`: Configuración y esquemas de la base de datos

## Comandos Disponibles

- `pnpm dev`: Inicia el entorno de desarrollo
- `pnpm build`: Construye el proyecto
- `pnpm test`: Ejecuta las pruebas
- `pnpm lint`: Ejecuta el linter
- `pnpm format`: Formatea el código

## Características Principales

- Next.js para el frontend
- Prisma como ORM
- Tailwind CSS para estilos
- Jest para testing
- ESLint y Prettier para linting y formateo
- Docker para containerización
- Turborepo para monorepo

## Flujo de Trabajo Recomendado

1. Crear una nueva rama para cada feature
2. Desarrollar y probar localmente
3. Ejecutar tests y linting antes de hacer commit
4. Crear un Pull Request
5. Revisar y mergear los cambios

## Solución de Problemas Comunes

### Problemas de Dependencias

Si encuentras problemas con las dependencias:

```bash
pnpm clean
pnpm install
```

### Problemas con Docker

Si los contenedores no funcionan correctamente:

```bash
docker-compose down
docker-compose up -d
```

### Problemas de Base de Datos

Para resetear la base de datos:

```bash
pnpm prisma migrate reset
```

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Push a la rama
5. Crea un Pull Request

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Turborepo](https://turbo.build/repo/docs)

## Soporte

Si encuentras algún problema o tienes preguntas, por favor:

1. Revisa la documentación existente
2. Busca en los issues existentes
3. Crea un nuevo issue si es necesario

## Licencia

[Especificar la licencia del proyecto]

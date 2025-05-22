import { z } from 'zod';

// Esquema base para respuestas de API
export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
  });

// Esquema para validación de paginación
export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

// Esquema para validación de ordenamiento
export const SortSchema = z.object({
  field: z.string(),
  order: z.enum(['asc', 'desc']).default('asc'),
});

// Esquema para validación de filtros
export const FilterSchema = z.object({
  field: z.string(),
  operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'contains', 'in']),
  value: z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]),
});

// Esquema para validación de búsqueda
export const SearchSchema = z.object({
  query: z.string().min(1),
  fields: z.array(z.string()).optional(),
});

// Esquema para validación de fecha
export const DateRangeSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

// Esquema para validación de ID
export const IdSchema = z.string().uuid();

// Esquema para validación de email
export const EmailSchema = z.string().email();

// Esquema para validación de contraseña
export const PasswordSchema = z
  .string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
  });

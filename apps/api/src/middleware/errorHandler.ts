import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  console.error('Error:', err);

  // Error personalizado de la aplicación
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      code: err.code,
      message: err.message
    });
  }

  // Errores de Prisma
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({
          status: 'error',
          code: 'UNIQUE_CONSTRAINT_VIOLATION',
          message: 'Ya existe un registro con estos datos'
        });
      case 'P2025':
        return res.status(404).json({
          status: 'error',
          code: 'RECORD_NOT_FOUND',
          message: 'No se encontró el registro solicitado'
        });
      default:
        return res.status(500).json({
          status: 'error',
          code: 'DATABASE_ERROR',
          message: 'Error en la base de datos'
        });
    }
  }

  // Error de validación de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: 'Token inválido'
    });
  }

  // Error de token expirado
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      code: 'TOKEN_EXPIRED',
      message: 'Token expirado'
    });
  }

  // Error por defecto
  return res.status(500).json({
    status: 'error',
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Error interno del servidor'
  });
};

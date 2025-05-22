import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { AppError } from '../middleware/errorHandler';

export const userController = {
  async create(req: Request, res: Response) {
    try {
      const { email, name } = req.body;
      const user = await userService.create({ email, name });
      res.status(201).json(user);
    } catch  {
      throw new AppError('Error al crear usuario', 500, 'USER_CREATION_ERROR');
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch  {
      throw new AppError('Error al obtener usuarios', 500, 'USERS_FETCH_ERROR');
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      if (!user) {
        throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND');
      }
      res.json(user);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener usuario', 500, 'USER_FETCH_ERROR');
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, name } = req.body;
      const user = await userService.update(id, { email, name });
      if (!user) {
        throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND');
      }
      res.json(user);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al actualizar usuario', 500, 'USER_UPDATE_ERROR');
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.delete(id);
      if (!user) {
        throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND');
      }
      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al eliminar usuario', 500, 'USER_DELETE_ERROR');
    }
  }
};

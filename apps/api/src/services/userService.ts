import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

interface CreateUserData {
  email: string;
  name: string;
}

interface UpdateUserData {
  email?: string;
  name?: string;
}

export const userService = {
  async create(data: CreateUserData) {
    try {
      return await prisma.user.create({
        data
      });
    } catch  {
      throw new AppError('Error al crear usuario', 500, 'USER_CREATION_ERROR');
    }
  },

  async getAll() {
    try {
      return await prisma.user.findMany({
        include: {
          products: true
        }
      });
    } catch  {
      throw new AppError('Error al obtener usuarios', 500, 'USERS_FETCH_ERROR');
    }
  },

  async getById(id: string) {
    try {
      return await prisma.user.findUnique({
        where: { id },
        include: {
          products: true
        }
      });
    } catch  {
      throw new AppError('Error al obtener usuario', 500, 'USER_FETCH_ERROR');
    }
  },

  async update(id: string, data: UpdateUserData) {
    try {
      return await prisma.user.update({
        where: { id },
        data
      });
    } catch  {
      throw new AppError('Error al actualizar usuario', 500, 'USER_UPDATE_ERROR');
    }
  },

  async delete(id: string) {
    try {
      return await prisma.user.delete({
        where: { id }
      });
    } catch  {
      throw new AppError('Error al eliminar usuario', 500, 'USER_DELETE_ERROR');
    }
  }
};

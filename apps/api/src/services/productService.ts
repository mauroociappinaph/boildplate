import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

interface CreateProductData {
  title: string;
  description: string;
  price: number;
  userId: string;
}

interface UpdateProductData {
  title?: string;
  description?: string;
  price?: number;
}

export const productService = {
  async create(data: CreateProductData) {
    try {
      return await prisma.product.create({
        data,
        include: {
          user: true
        }
      });
    } catch  {
      throw new AppError('Error al crear producto', 500, 'PRODUCT_CREATION_ERROR');
    }
  },

  async getAll() {
    try {
      return await prisma.product.findMany({
        include: {
          user: true
        }
      });
    } catch  {
      throw new AppError('Error al obtener productos', 500, 'PRODUCTS_FETCH_ERROR');
    }
  },

  async getById(id: string) {
    try {
      return await prisma.product.findUnique({
        where: { id },
        include: {
          user: true
        }
      });
    } catch  {
      throw new AppError('Error al obtener producto', 500, 'PRODUCT_FETCH_ERROR');
    }
  },

  async update(id: string, data: UpdateProductData) {
    try {
      return await prisma.product.update({
        where: { id },
        data,
        include: {
          user: true
        }
      });
    } catch  {
      throw new AppError('Error al actualizar producto', 500, 'PRODUCT_UPDATE_ERROR');
    }
  },

  async delete(id: string) {
    try {
      return await prisma.product.delete({
        where: { id }
      });
    } catch  {
      throw new AppError('Error al eliminar producto', 500, 'PRODUCT_DELETE_ERROR');
    }
  }
};

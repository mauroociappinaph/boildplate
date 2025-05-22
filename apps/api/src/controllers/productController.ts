import { Request, Response } from 'express';
import { productService } from '../services/productService.js';
import { AppError } from '../middleware/errorHandler';

export const productController = {
  async create(req: Request, res: Response) {
    try {
      const { title, description, price, userId } = req.body;
      const product = await productService.create({ title, description, price, userId });
      res.status(201).json(product);
    } catch  {
      throw new AppError('Error al crear producto', 500, 'PRODUCT_CREATION_ERROR');
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const products = await productService.getAll();
      res.json(products);
    } catch  {
      throw new AppError('Error al obtener productos', 500, 'PRODUCTS_FETCH_ERROR');
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getById(id);
      if (!product) {
        throw new AppError('Producto no encontrado', 404, 'PRODUCT_NOT_FOUND');
      }
      res.json(product);
    } catch  {
      throw new AppError('Error al obtener producto', 500, 'PRODUCT_FETCH_ERROR');
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, price } = req.body;
      const product = await productService.update(id, { title, description, price });
      if (!product) {
        throw new AppError('Producto no encontrado', 404, 'PRODUCT_NOT_FOUND');
      }
      res.json(product);
    } catch  {
      throw new AppError('Error al actualizar producto', 500, 'PRODUCT_UPDATE_ERROR');
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.delete(id);
      if (!product) {
        throw new AppError('Producto no encontrado', 404, 'PRODUCT_NOT_FOUND');
      }
      res.status(204).send();
    } catch  {
      throw new AppError('Error al eliminar producto', 500, 'PRODUCT_DELETE_ERROR');
    }
  }
};

import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product, { IProduct } from '../models/product';
import { BadRequestError, ConflictError } from '../errors';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    return res.status(200).send({ items: [...products], total: products.length });
  } catch (err) {
    return next(err);
  }
};

export const createProduct = async (req: Request<{}, {}, IProduct>, res: Response, next: NextFunction) => {
  try {
    const { title, category, description, price, image } = req.body;
    const product = await Product.create({ title, category, description, price, image });
    return res.status(201).send(product);
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      return next(new BadRequestError('Ошибка валидации данных при создании товара'));
    }
    if (err instanceof Error && err.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }
    return next(err);
  }
};

import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import Order from '../models/order';
import { BadRequestError } from '../errors';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.create(req.body);
    return res.status(200).send(order);
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      return next(new BadRequestError('Ошибка валидации данных при создании заказа'));
    }
    return next(err);
  }
};

export default createOrder;

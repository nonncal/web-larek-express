import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import Order, {IOrder} from '../models/order';
import { BadRequestError } from '../errors';

const createOrder = async (req: Request<{}, {}, IOrder>, res: Response, next: NextFunction) => {
  try {
    const { email, phone, address, items, total, payment } = req.body;
    const order = await Order.create({ email, phone, address, items, total, payment });
    return res.status(200).send({ id: order._id, total: order.total });
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      return next(new BadRequestError('Ошибка валидации данных при создании заказа'));
    }
    return next(err);
  }
};

export default createOrder;

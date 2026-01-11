import { Request, Response } from "express";
import Order from "../models/order";
import { createOrderSchema } from "../validators/orderValidator";

export const createOrder = async (req: Request, res: Response) => {
  const {error} = createOrderSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  try {
    const order = await Order.create(req.body);
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка ${err}` });
  }
};


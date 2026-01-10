import { Request, Response } from "express";
import Product from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка ${err}` });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка ${err}` });
  }
}


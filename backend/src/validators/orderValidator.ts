import Joi from 'joi';

export const createOrderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().min(0).required(),
  items: Joi.array().items(Joi.string()).min(1).required(),
});


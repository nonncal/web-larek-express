import { celebrate, Segments, Joi } from 'celebrate';

const createOrderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required().messages({
    'any.only': 'Поле "payment" должно быть "card" или "online"',
    'any.required': 'Поле "payment" обязательно',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный email',
    'any.required': 'Поле "email" обязательно',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Поле "phone" обязательно',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Поле "address" обязательно',
  }),
  total: Joi.number().min(0).required().messages({
    'number.min': 'Сумма не может быть отрицательной',
    'any.required': 'Поле "total" обязательно',
  }),
  items: Joi.array().items(Joi.string()).min(1).required()
    .messages({
      'array.min': 'Массив товаров не может быть пустым',
      'any.required': 'Поле "items" обязательно',
    }),
});

export const validateCreateOrder = celebrate({
  [Segments.BODY]: createOrderSchema,
});

import { celebrate, Segments, Joi } from 'celebrate';

const createProductSchema = Joi.object({
  title: Joi.string().min(2).max(30).required()
    .messages({
      'string.min': 'Минимальная длина поля "title" - 2',
      'string.max': 'Максимальная длина поля "title" - 30',
      'any.required': 'Поле "title" должно быть заполнено',
    }),
  category: Joi.string().required().messages({
    'any.required': 'Поле "category" должно быть заполнено',
  }),
  description: Joi.string().allow('').optional(),
  price: Joi.number().allow(null),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
});

export const validateCreateProduct = celebrate({
  [Segments.BODY]: createProductSchema,
});

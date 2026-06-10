import Joi from "joi";

import { PRODUCT_CATEGORIES } from "../constants/categories.js";
import { commonJoiMessages } from "../constants/messages.js";

export const getFireplaceQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).label("Сторінка"),
  "per-page": Joi.number().integer().min(1).max(100).default(12).label("Кількість на сторінці"),
  category: Joi.string()
    .valid(...PRODUCT_CATEGORIES)
    .optional()
    .label("Категорія"),
}).messages(commonJoiMessages);

const fireplaceFields = {
  img: Joi.string().trim().uri().required().label("Зображення"),
  title: Joi.string().trim().min(2).max(200).required().label("Назва"),
  desc: Joi.string().trim().min(10).max(1000).required().label("Опис"),
  price: Joi.string().trim().min(1).max(20).required().label("Ціна"),
  category: Joi.string()
    .valid(...PRODUCT_CATEGORIES)
    .required()
    .label("Категорія"),
};

export const createFireplaceSchema = Joi.object(fireplaceFields).messages(commonJoiMessages);

export const updateFireplaceSchema = Joi.object({
  img: fireplaceFields.img.optional(),
  title: fireplaceFields.title.optional(),
  desc: fireplaceFields.desc.optional(),
  price: fireplaceFields.price.optional(),
  category: fireplaceFields.category.optional(),
})
  .min(1)
  .messages(commonJoiMessages);

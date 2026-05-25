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

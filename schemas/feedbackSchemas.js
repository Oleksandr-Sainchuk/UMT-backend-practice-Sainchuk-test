import Joi from "joi";

import { commonJoiMessages } from "../constants/messages.js";

export const createFeedbackSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required().label("Оцінка"),
  text: Joi.string().trim().min(10).max(2000).required().label("Текст відгуку"),
  author: Joi.string().trim().min(2).max(100).required().label("Автор"),
  location: Joi.string().trim().min(2).max(100).required().label("Місто"),
}).messages(commonJoiMessages);

export const updateFeedbackSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).label("Оцінка"),
  text: Joi.string().trim().min(10).max(2000).label("Текст відгуку"),
  author: Joi.string().trim().min(2).max(100).label("Автор"),
  location: Joi.string().trim().min(2).max(100).label("Місто"),
})
  .min(1)
  .messages(commonJoiMessages);

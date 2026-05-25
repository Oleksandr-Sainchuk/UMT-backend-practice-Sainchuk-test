import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import * as orderModel from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
  const order = orderModel.create(req.validatedBody);

  res.status(HTTP_STATUS.CREATED).json({
    message: apiMessages.orderCreated,
    order,
  });
});

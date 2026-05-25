import { HTTP_STATUS } from "../constants/httpStatus.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import * as feedbackModel from "../models/feedbackModel.js";

export const getFeedbacksList = asyncHandler(async (_req, res) => {
  const feedbacks = feedbackModel.findAll();
  res.status(HTTP_STATUS.OK).json(feedbacks);
});

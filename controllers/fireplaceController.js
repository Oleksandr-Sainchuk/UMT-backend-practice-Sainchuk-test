import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { HttpError } from "../helpers/error.js";
import * as fireplaceModel from "../models/fireplaceModel.js";

export const getFireplaceList = asyncHandler(async (req, res) => {
  const { page, "per-page": perPage, category } = req.validatedQuery;

  const result = await fireplaceModel.findPaginated({
    page,
    perPage,
    category,
  });

  res.status(HTTP_STATUS.OK).json(result);
});

export const getFireplaceById = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;
  const fireplace = await fireplaceModel.findById(id);

  if (!fireplace) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.fireplaceNotFound);
  }

  res.status(HTTP_STATUS.OK).json(fireplace);
});

export const createFireplace = asyncHandler(async (req, res) => {
  const fireplace = await fireplaceModel.create(req.validatedBody);

  res.status(HTTP_STATUS.CREATED).json({
    message: apiMessages.fireplaceCreated,
    fireplace,
  });
});

export const updateFireplace = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;

  const existing = await fireplaceModel.findById(id);
  if (!existing) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.fireplaceNotFound);
  }

  const fireplace = await fireplaceModel.update(id, req.validatedBody);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.fireplaceUpdated,
    fireplace,
  });
});

export const deleteFireplace = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;

  const existing = await fireplaceModel.findById(id);
  if (!existing) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.fireplaceNotFound);
  }

  const fireplace = await fireplaceModel.remove(id);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.fireplaceDeleted,
    fireplace,
  });
});

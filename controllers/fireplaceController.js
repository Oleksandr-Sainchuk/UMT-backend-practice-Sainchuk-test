import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../helpers/cloudinaryStorage.js";
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
  if (!req.file) {
    throw new HttpError(HTTP_STATUS.BAD_REQUEST, apiMessages.fireplaceImageRequired);
  }

  const img = await uploadImageToCloudinary(req.file);
  const fireplace = await fireplaceModel.create({
    ...req.validatedBody,
    img,
  });

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

  const updateData = { ...req.validatedBody };

  if (!req.file && Object.keys(updateData).length === 0) {
    throw new HttpError(HTTP_STATUS.BAD_REQUEST, apiMessages.fireplaceUpdateEmpty);
  }

  if (req.file) {
    updateData.img = await uploadImageToCloudinary(req.file);

    if (existing.img) {
      await deleteImageFromCloudinary(existing.img);
    }
  }

  const fireplace = await fireplaceModel.update(id, updateData);

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

  if (existing.img) {
    await deleteImageFromCloudinary(existing.img);
  }

  const fireplace = await fireplaceModel.remove(id);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.fireplaceDeleted,
    fireplace,
  });
});

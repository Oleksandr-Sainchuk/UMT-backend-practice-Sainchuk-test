import { HTTP_STATUS } from "../constants/httpStatus.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import * as fireplaceModel from "../models/fireplaceModel.js";

export const getFireplaceList = asyncHandler(async (req, res) => {
  const { page, "per-page": perPage, category } = req.validatedQuery;

  const result = fireplaceModel.findPaginated({
    page,
    perPage,
    category,
  });

  res.status(HTTP_STATUS.OK).json(result);
});

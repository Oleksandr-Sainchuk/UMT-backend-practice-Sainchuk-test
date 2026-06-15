import { fireplace as c } from "../../controllers/index.js";
import { createRouter, validateBody, validateParams, validateQuery } from "../../helpers/index.js";
import { upload } from "../../middlewares/multerUpload.js";
import {
  createFireplaceSchema,
  getFireplaceQuerySchema,
  idParamSchema,
  updateFireplaceSchema,
} from "../../schemas/index.js";

const fireplaceRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [validateQuery(getFireplaceQuerySchema)],
    controller: c.getFireplaceList,
  },
  {
    method: "get",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.getFireplaceById,
  },
  {
    method: "post",
    route: "/",
    middlewares: [upload.single("picture"), validateBody(createFireplaceSchema)],
    controller: c.createFireplace,
  },
  {
    method: "patch",
    route: "/:id",
    middlewares: [upload.single("picture"), validateParams(idParamSchema), validateBody(updateFireplaceSchema)],
    controller: c.updateFireplace,
  },
  {
    method: "delete",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.deleteFireplace,
  },
];

const fireplaceRouter = createRouter({ options: fireplaceRouterOptions });
fireplaceRouter.setRouter();

export default fireplaceRouter.router;

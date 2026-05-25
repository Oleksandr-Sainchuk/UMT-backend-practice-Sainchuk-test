import { fireplace as c } from "../../controllers/index.js";
import { createRouter, validateQuery } from "../../helpers/index.js";
import { getFireplaceQuerySchema } from "../../schemas/index.js";

const fireplaceRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [validateQuery(getFireplaceQuerySchema)],
    controller: c.getFireplaceList,
  },
];

const fireplaceRouter = createRouter({ options: fireplaceRouterOptions });
fireplaceRouter.setRouter();

export default fireplaceRouter.router;

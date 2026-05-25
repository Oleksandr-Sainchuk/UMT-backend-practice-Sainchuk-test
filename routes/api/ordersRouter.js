import { orders as c } from "../../controllers/index.js";
import { createRouter, validateBody } from "../../helpers/index.js";
import { createOrderSchema } from "../../schemas/index.js";

const ordersRouterOptions = [
  {
    method: "post",
    route: "/",
    middlewares: [validateBody(createOrderSchema)],
    controller: c.createOrder,
  },
];

const ordersRouter = createRouter({ options: ordersRouterOptions });
ordersRouter.setRouter();

export default ordersRouter.router;

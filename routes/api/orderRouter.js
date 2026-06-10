import { order as c } from "../../controllers/index.js";
import { createRouter, validateBody, validateParams } from "../../helpers/index.js";
import { createOrderSchema, idParamSchema, updateOrderSchema } from "../../schemas/index.js";

const orderRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [],
    controller: c.getOrderList,
  },
  {
    method: "get",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.getOrderById,
  },
  {
    method: "post",
    route: "/",
    middlewares: [validateBody(createOrderSchema)],
    controller: c.createOrder,
  },
  {
    method: "patch",
    route: "/:id",
    middlewares: [validateParams(idParamSchema), validateBody(updateOrderSchema)],
    controller: c.updateOrder,
  },
  {
    method: "delete",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.deleteOrder,
  },
];

const orderRouter = createRouter({ options: orderRouterOptions });
orderRouter.setRouter();

export default orderRouter.router;

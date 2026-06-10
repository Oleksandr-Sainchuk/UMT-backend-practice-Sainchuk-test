import { feedback as c } from "../../controllers/index.js";
import { createRouter, validateBody, validateParams } from "../../helpers/index.js";
import { createFeedbackSchema, idParamSchema, updateFeedbackSchema } from "../../schemas/index.js";

const feedbackRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [],
    controller: c.getFeedbackList,
  },
  {
    method: "get",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.getFeedbackById,
  },
  {
    method: "post",
    route: "/",
    middlewares: [validateBody(createFeedbackSchema)],
    controller: c.createFeedback,
  },
  {
    method: "patch",
    route: "/:id",
    middlewares: [validateParams(idParamSchema), validateBody(updateFeedbackSchema)],
    controller: c.updateFeedback,
  },
  {
    method: "delete",
    route: "/:id",
    middlewares: [validateParams(idParamSchema)],
    controller: c.deleteFeedback,
  },
];

const feedbackRouter = createRouter({ options: feedbackRouterOptions });
feedbackRouter.setRouter();

export default feedbackRouter.router;

import { feedbacks as c } from "../../controllers/index.js";
import { createRouter } from "../../helpers/index.js";

const feedbacksRouterOptions = [
  {
    method: "get",
    route: "/",
    middlewares: [],
    controller: c.getFeedbacksList,
  },
];

const feedbacksRouter = createRouter({ options: feedbacksRouterOptions });
feedbacksRouter.setRouter();

export default feedbacksRouter.router;

import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import config from "./envConfigs.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { noCache } from "./middlewares/noCache.js";
import { notFoundHandler } from "./middlewares/notFound.js";
import { fireplaceRouter, feedbacksRouter, ordersRouter } from "./routes/api/index.js";
import swaggerDocument from "./swagger.json" with { type: "json" };

const app = express();

const loggerFormat = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(loggerFormat));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS: origin ${origin} is not allowed`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", noCache);
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/fireplace", fireplaceRouter);
app.use("/api/feedbacks", feedbacksRouter);
app.use("/api/orders", ordersRouter);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;

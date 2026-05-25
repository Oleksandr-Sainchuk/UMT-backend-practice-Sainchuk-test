import "dotenv/config";

import app from "./app.js";
import config from "./envConfigs.js";

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Swagger UI: http://localhost:${config.port}/api-docs`);
});

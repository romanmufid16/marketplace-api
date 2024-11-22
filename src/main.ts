import { logger } from "./app/logging";
import { web } from "./app/web";

web.listen(3000,() => {
  logger.info("listening on port 3000");
})
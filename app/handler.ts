import routes from "./routes.ts";
import { handle } from "@http/route/handle";
import { staticRoute } from "@http/route/static-route";
import { intercept } from "@http/interceptor/intercept";
import { catchResponse } from "@http/interceptor/catch-response";

export default handle([
  intercept(routes, { error: catchResponse }),
  staticRoute("/", import.meta.resolve("./static")),
]);

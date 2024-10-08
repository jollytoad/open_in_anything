// IMPORTANT: This file has been automatically generated, DO NOT edit by hand.

import { byMethod } from "@http/route/by-method";
import { byPattern } from "@http/route/by-pattern";
import { cascade } from "@http/route/cascade";
import { lazy } from "@http/route/lazy";

export default cascade(
  byPattern(
    "/",
    lazy(async () => byMethod(await import("./routes/index.tsx"))),
  ),
  byPattern(
    "/_/tools",
    lazy(async () => byMethod(await import("./routes/_/tools.tsx"))),
  ),
  byPattern(
    "/_/open",
    lazy(async () => byMethod(await import("./routes/_/open.tsx"))),
  ),
);

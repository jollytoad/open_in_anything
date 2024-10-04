#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net=jsr.io,plugins.dprint.dev

import { generateRoutesModule } from "@http/generate/generate-routes-module";
import { dprintFormatModule } from "@http/generate/dprint-format-module";

function generateRoutes() {
  console.debug("\nGenerating routes");

  return generateRoutesModule({
    fileRootUrl: import.meta.resolve("../app/routes"),
    moduleOutUrl: import.meta.resolve("../app/routes.ts"),
    moduleImports: "dynamic",
    pathMapper: "@http/discovery/fresh-path-mapper",
    formatModule: dprintFormatModule(),
    verbose: true,
  });
}

export default generateRoutes;

if (import.meta.main) {
  await generateRoutes();
}

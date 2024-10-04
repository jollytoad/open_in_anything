#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net=jsr.io

import { generateRoutesModule } from "@http/generate/generate-routes-module";

function generateRoutes() {
  console.debug("\nGenerating routes");

  return generateRoutesModule({
    fileRootUrl: import.meta.resolve("../app/routes"),
    moduleOutUrl: import.meta.resolve("../app/routes.ts"),
    moduleImports: "dynamic",
    pathMapper: "@http/discovery/fresh-path-mapper",
    verbose: true,
  });
}

export default generateRoutes;

if (import.meta.main) {
  await generateRoutes();
}

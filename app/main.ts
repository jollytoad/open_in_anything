#!/usr/bin/env -S deno run --allow-net --allow-read

import handler from "./handler.ts";
import init from "@http/host-deno-deploy/init";

await Deno.serve(await init(handler)).finished;

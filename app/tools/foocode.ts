import type { Tool } from "../lib/types.ts";

export default {
  id: "foocode",
  name: "FooCode",
  desc: "Fictional application",
  redirect: (url) => `foocode://open?url=${url}`,
} satisfies Tool;

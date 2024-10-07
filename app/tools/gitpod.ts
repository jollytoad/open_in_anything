import type { Tool } from "../lib/types.ts";

export default {
  id: "gitpod",
  name: "Gitpod Flex",
  desc: "Open as a Gitpod workspace",
  redirect: (url) => `https://app.gitpod.io/#${url}`,
} satisfies Tool;

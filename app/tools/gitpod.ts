import type { Tool } from "../lib/types.ts";

export default {
  id: "gitpod",
  name: "Gitpod",
  desc: "Open as a Gitpod workspace",
  redirect: (url) => `https://app.gitpod.io/#${url}`,
  infoLink: "https://www.gitpod.io/docs/gitpod/introduction/overview",
} satisfies Tool;

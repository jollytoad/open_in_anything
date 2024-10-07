import type { Tool } from "../lib/types.ts";

export default {
  id: "devpod",
  name: "DevPod",
  desc: "Open using the DevPod desktop application",
  redirect: (url) => `devpod://open?source=${url}`,
  installLink: "https://devpod.sh/",
} satisfies Tool;

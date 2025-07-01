import type { Tool } from "../lib/types.ts";

export default {
  id: "devpod",
  name: "DevPod",
  desc: "Open using the DevPod desktop application",
  redirect: (url) => `devpod://open?source=${url}`,
  infoLink: "https://devpod.sh/docs/what-is-devpod",
  installLink: "https://devpod.sh/docs/getting-started/install",
} satisfies Tool;

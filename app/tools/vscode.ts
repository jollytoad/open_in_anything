import type { Tool } from "../lib/types.ts";

export default {
  id: "vscode",
  name: "Visual Studio Code",
  desc: "Open using your desktop VS Code, using it's dev containers extension",
  redirect: (url) =>
    `vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=${url}&windowId=_blank`,
  installLink: "https://code.visualstudio.com/",
} satisfies Tool;

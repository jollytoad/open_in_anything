export interface Tool {
  id: string;
  name: string;
  desc: string;
  redirect: (url: string) => string | undefined;
  installLink?: string;
}

export const tools: Record<string, Tool> = {
  "vscode": {
    id: "vscode",
    name: "Visual Studio Code",
    desc:
      "Open using your desktop VS Code, using it's dev containers extension",
    redirect: (url) =>
      `vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=${url}`,
    installLink: "https://code.visualstudio.com/",
  },

  "devpod": {
    id: "devpod",
    name: "DevPod",
    desc: "Open using the DevPod desktop application",
    redirect: (url) => `devpod://open?source=${url}`,
    installLink: "https://devpod.sh/",
  },

  "codespaces": {
    id: "codespaces",
    name: "Codespaces",
    desc: "Open via the Codespaces web site",
    redirect: (url) => {
      const match = new URLPattern("https://github.com/:owner/:repo").exec(url);
      const { owner, repo } = match?.pathname.groups ?? {};
      return owner && repo
        ? `https://codespaces.new/${owner}/${repo}`
        : undefined;
    },
  },
  // "foocode": {
  //   id: "foocode",
  //   name: "FooCode",
  //   desc: "Fictional application",
  //   redirect: (url) => `foocode://open?url=${url}`,
  // },
};

import type { Tool } from "../lib/types.ts";

export default {
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
} satisfies Tool;

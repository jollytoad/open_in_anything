import type { Tool } from "./types.ts";
import vscode from "../tools/vscode.ts";
import devpod from "../tools/devpod.ts";
import codespaces from "../tools/codespaces.ts";
// import foocode from "../tools/foocode.ts";
import gitpod from "../tools/gitpod.ts";

export const tools: Record<string, Tool> = {
  vscode,
  devpod,
  codespaces,
  gitpod,
  // foocode,
};

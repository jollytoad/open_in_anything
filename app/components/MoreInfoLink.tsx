import type { Tool } from "../lib/types.ts";

export function MoreInfoLink(
  { tool, children }: { tool: Tool; children?: string },
) {
  if (tool.infoLink) {
    return (
      <a
        href={tool.infoLink}
        title="More information"
        target="_blank"
        class={children ? undefined : "more-info iconbutton"}
      >
        {children}
      </a>
    );
  } else {
    return children;
  }
}

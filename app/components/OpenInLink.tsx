import { openInUrl } from "../lib/open_in_link.ts";
import type { Tool } from "../lib/types.ts";

export interface OpenInLinkProps {
  reqUrl: URL | string;
  url?: URL | string;
  tool: Tool;
  via?: URL | string;
}

export function OpenInLink(
  { reqUrl, url, tool, via }: OpenInLinkProps,
) {
  const redirectUrl = url && tool.redirect(url.toString());

  if (!url || redirectUrl) {
    return (
      <li class="tool-bar open-in-link" data-open-in={tool.id}>
        <a
          href={url ? openInUrl(reqUrl, url, tool.id, via) : undefined}
          title={tool.desc}
          class="big <button>"
        >
          <span>Open in&nbsp;</span>
          <span class="bold">{tool.name}</span>
        </a>
      </li>
    );
  }
}

import type { Tool } from "../lib/types.ts";
import { OpenInLink } from "./OpenInLink.tsx";

export interface OpenInListProps {
  reqUrl: URL | string;
  url?: URL | string;
  tools: Tool[];
  via?: URL | string;
}

export function OpenInList({ reqUrl, url, tools, via }: OpenInListProps) {
  return (
    <ul class="box ok list-of-links flow-gap open-in-list">
      {tools.map((tool) => (
        <OpenInLink
          reqUrl={reqUrl}
          url={url}
          tool={tool}
          via={via}
        />
      ))}
    </ul>
  );
}

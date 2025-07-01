import type { Tool } from "../lib/types.ts";
import { MoreInfoLink } from "./MoreInfoLink.tsx";

export function OpeningMessage({ tool }: { tool: Tool }) {
  return (
    <div class="box warn opening-message">
      <strong class="block titlebar">Attempting to open in {tool.name}</strong>
      <p>
        Your browser should now open{" "}
        <strong>
          <MoreInfoLink tool={tool}>{tool.name}</MoreInfoLink>
        </strong>, or ask you to confirm that you want to open it.
      </p>
      <p>
        You can close this window/tab once it opens.
      </p>
      <p>
        Otherwise, if nothing is happening then it may be that {tool.name}{" "}
        is not installed, or you cancelled it.
      </p>
      <p>
        You could {tool.installLink && (
          <>
            install <a href={tool.installLink}>{tool.name}</a>, or
            {" "}
          </>
        )}
        try an alternative tool:
      </p>
    </div>
  );
}

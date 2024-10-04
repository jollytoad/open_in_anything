import { html } from "@http/response/html";
import { seeOther } from "@http/response/see-other";
import { prependDocType } from "@http/response/prepend-doctype";
import { renderBody } from "@http/jsx-stream/serialize";
import { type Tool, tools } from "../lib/tools.ts";

export function GET(req: Request) {
  return html(
    prependDocType(
      renderBody(<Page req={req} />),
    ),
  );
}

interface RequestProps {
  req: Request;
}

function Page({ req }: RequestProps) {
  const reqUrl = URL.parse(req.url) ?? undefined;
  const openUrl = reqUrl?.searchParams.get("open") ?? undefined;
  const use = reqUrl?.searchParams.get("use") ?? undefined;

  const tool = tools[use!];
  const redirectUrl = !!openUrl && tool?.redirect(openUrl) || undefined;

  if (redirectUrl?.startsWith("http")) {
    throw seeOther(redirectUrl);
  }

  return (
    <html>
      <head>
        {redirectUrl
          ? <meta http-equiv="refresh" content={`0; url=${redirectUrl}`} />
          : null}

        {!openUrl ? <script src="/hash.js"></script> : null}

        <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.3" />
      </head>
      <body>
        <header>
          {redirectUrl && tool
            ? <h1>Attempting to open in {tool.name}</h1>
            : <h1>Open in a development container</h1>}
        </header>

        <main>
          {openUrl && (
            <p>
              URL: <a href={openUrl} target="_blank">{openUrl}</a>
            </p>
          )}

          {redirectUrl && tool && <OpeningMessage tool={tool} />}

          {openUrl && <OpenInLinks req={req} url={openUrl} />}
        </main>
        <footer>
          {openUrl && (
            <div>
              Link to this:{" "}
              <a href={openInHash(req.url, openUrl)}>
                {openInHash(req.url, openUrl)}
              </a>
            </div>
          )}
        </footer>
      </body>
    </html>
  );
}

function OpeningMessage({ tool }: { tool: Tool }) {
  return (
    <div class="box warn">
      <p>
        Your browser should now open {tool.name}{" "}
        or ask you to confirm that you want to open it.
      </p>
      <p>
        If nothing is happening then it may be that {tool.name}{" "}
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

function OpenInLinks({ req, url }: RequestProps & { url: string }) {
  return (
    <>
      {Object.values(tools).map((tool) => (
        <OpenIn
          req={req}
          url={url}
          tool={tool}
        />
      ))}
    </>
  );
}

function OpenIn(
  { req, url, tool }: RequestProps & { url: string; tool: Tool },
) {
  const redirectUrl = tool.redirect(url);

  if (redirectUrl) {
    return (
      <p>
        <a href={openInUrl(req.url, url, tool.id)} title={tool.desc}>
          Open in {tool.name}
        </a>
      </p>
    );
  }
}

function openInUrl(reqUrl: string, openUrl: string, use: string) {
  const href = new URL("/", reqUrl);
  href.searchParams.set("open", openUrl);
  href.searchParams.set("use", use);
  return href.toString();
}

function openInHash(reqUrl: string, openUrl: string) {
  const href = new URL("/", reqUrl);
  href.hash = openUrl;
  return href.toString();
}

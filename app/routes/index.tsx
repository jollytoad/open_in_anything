import { seeOther } from "@http/response/see-other";
import { tools } from "../lib/tools.ts";
import { OpenInList } from "../components/OpenInList.tsx";
import { openInHash } from "../lib/open_in_hash.ts";
import { About } from "../components/About.tsx";
import { AboutDevContainers } from "../components/AboutDevContainers.tsx";
import { UrlForm } from "../components/UrlForm.tsx";
import { Templates } from "../components/Templates.tsx";
import { OpeningMessage } from "../components/OpeningMessage.tsx";
import type { RequestProps } from "../lib/types.ts";
import { renderHtml } from "../lib/render_html.tsx";

export const GET = renderHtml(Page);

const GITHUB_REPO = "https://github.com/jollytoad/open_in_anything";

function Page({ req }: RequestProps) {
  const reqUrl = new URL(req.url);
  const openUrl = reqUrl.searchParams.get("open") ?? undefined;
  const use = reqUrl.searchParams.get("use") ?? undefined;

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

        <script src="/hash.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.3" />
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <header>
          <h1>Open in a development container</h1>
        </header>

        <main>
          <UrlForm url={openUrl} />

          {redirectUrl && tool && <OpeningMessage tool={tool} />}

          {openUrl && (
            <OpenInList
              reqUrl={reqUrl}
              url={openUrl}
              tools={Object.values(tools)}
            />
          )}

          <details open={!openUrl}>
            <summary>What is this site all about?</summary>
            <About reqUrl={reqUrl} exampleUrl={GITHUB_REPO} />
          </details>

          <details>
            <summary>What is a development container?</summary>
            <AboutDevContainers />
          </details>

          {openUrl && (
            <details>
              <summary>Templates for this link</summary>
              <Templates url={openInHash(reqUrl, openUrl)} />
            </details>
          )}
        </main>
        <footer>
          {openUrl && (
            <div>
              Link to this:{" "}
              <a href={openInHash(reqUrl, openUrl)}>
                {openInHash(reqUrl, openUrl)}
              </a>
              <a href={openInHash(reqUrl)} class="float:right">Home</a>
            </div>
          )}
        </footer>
      </body>
    </html>
  );
}

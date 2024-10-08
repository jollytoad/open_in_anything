import { tools } from "../../lib/tools.ts";
import { OpenInList } from "../../components/OpenInList.tsx";
import type { RequestProps } from "../../lib/types.ts";
import { renderHtml } from "../../lib/render_html.tsx";

export const GET = renderHtml(Page);

function Page({ req }: RequestProps) {
  const reqUrl = new URL(req.url);
  const openUrl = reqUrl.searchParams.get("open") ?? undefined;

  return (
    <html>
      <head>
        <script src="/hash.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.3" />
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <OpenInList
          reqUrl={reqUrl}
          url={openUrl}
          tools={Object.values(tools)}
          via="/_/open"
        />
      </body>
    </html>
  );
}

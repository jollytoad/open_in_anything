import { tools } from "../../lib/tools.ts";
import { OpeningMessage } from "../../components/OpeningMessage.tsx";
import { renderHtml } from "../../lib/render_html.tsx";
import type { RequestProps } from "@http/jsx-stream/types";

export const GET = renderHtml(Page);

function Page({ req }: RequestProps) {
  const reqUrl = new URL(req.url);
  const openUrl = reqUrl.searchParams.get("open") ?? undefined;
  const use = reqUrl.searchParams.get("use") ?? undefined;

  const tool = tools[use!];
  const redirectUrl = !!openUrl && tool?.redirect(openUrl) || undefined;

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
        {redirectUrl && tool && <OpeningMessage tool={tool} />}
      </body>
    </html>
  );
}

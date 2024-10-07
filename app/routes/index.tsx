import { html } from "@http/response/html";
import { seeOther } from "@http/response/see-other";
import { prependDocType } from "@http/response/prepend-doctype";
import { renderBody } from "@http/jsx-stream/serialize";
import { tools } from "../lib/tools.ts";
import type { Tool } from "../lib/types.ts";

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

const GITHUB_REPO = "https://github.com/jollytoad/open_in_anything";

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

        <script src="/hash.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.3" />
      </head>
      <body>
        <header>
          <h1>Open in a development container</h1>
        </header>

        <main>
          <UrlForm url={openUrl} />

          {redirectUrl && tool && <OpeningMessage tool={tool} />}

          {openUrl && <OpenInLinks req={req} url={openUrl} />}

          <details open={!openUrl}>
            <summary>What is this site all about?</summary>
            <About req={req} />
          </details>

          <details>
            <summary>What is a development container?</summary>
            <AboutDevContainers />
          </details>

          {openUrl && (
            <details>
              <summary>Templates for this link</summary>
              <Templates req={req} url={openUrl} />
            </details>
          )}
        </main>
        <footer>
          {openUrl && (
            <div>
              Link to this:{" "}
              <a href={openInHash(req.url, openUrl)}>
                {openInHash(req.url, openUrl)}
              </a>
              <a href={openInHash(req.url)} class="float:right">Home</a>
            </div>
          )}
        </footer>
      </body>
    </html>
  );
}

function About({ req }: RequestProps) {
  return (
    <div>
      <p>
        Allow people to open your git repo in their preferred dev container tool
        via a single URL.
      </p>
      <p>
        Rather than providing links to 'Open in VS Code', 'Open in Codespaces',
        'Open in DevPod', et al.
      </p>
      <p>
        Just have one link:
      </p>
      <p class="mono-font">
        {new URL("/", req.url).toString()}#<i>&lt;your-repo-url-here&gt;</i>
      </p>
      <h3 class="<h5>">Example:</h3>
      <p>
        <a href={openInHash(req.url, GITHUB_REPO)}>Open in a dev container</a>
      </p>
    </div>
  );
}

function AboutDevContainers() {
  return (
    <div>
      <p>
        From the{" "}
        <a href="https://containers.dev" target="_blank">
          Development Containers
        </a>{" "}
        site:
      </p>
      <blockquote>
        A development container (or dev container for short) allows you to use a
        container as a full-featured development environment. It can be used to
        run an application, to separate tools, libraries, or runtimes needed for
        working with a codebase, and to aid in continuous integration and
        testing. Dev containers can be run locally or remotely, in a private or
        public cloud, in a variety of supporting tools and editors.
      </blockquote>
    </div>
  );
}

function UrlForm({ url = "" }: { url?: string }) {
  return (
    <form class="box info">
      <label for="url" class="block titlebar">
        {url ? "Repository" : "Create a link"}
      </label>
      <p>
        <input
          id="url"
          name="open"
          type="url"
          class="width:100%"
          placeholder="Paste your repository URL here"
          value={url}
        />
      </p>
    </form>
  );
}

function Templates({ req, url }: RequestProps & { url: string }) {
  const exampleLink = openInHash(req.url, url);
  return (
    <div>
      <h3 class="<h5>">URL</h3>
      <code class="block box language-url">
        {exampleLink}
      </code>
      <h3 class="<h5>">HTML</h3>
      <code class="block box language-html">
        {`<a href="${exampleLink}">Open in a dev container</a>`}
      </code>
      <h3 class="<h5>">Markdown</h3>
      <code class="block box language-md">
        {`[Open in a dev container](${exampleLink})`}
      </code>
    </div>
  );
}

function OpeningMessage({ tool }: { tool: Tool }) {
  return (
    <div class="box warn">
      <strong class="block titlebar">Attempting to open in {tool.name}</strong>
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
    <div class="box ok">
      {Object.values(tools).map((tool) => (
        <OpenIn
          req={req}
          url={url}
          tool={tool}
        />
      ))}
    </div>
  );
}

function OpenIn(
  { req, url, tool }: RequestProps & { url: string; tool: Tool },
) {
  const redirectUrl = tool.redirect(url);

  if (redirectUrl) {
    return (
      <p>
        <a
          href={openInUrl(req.url, url, tool.id)}
          title={tool.desc}
        >
          Open in <span class="bold">{tool.name}</span>
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

function openInHash(reqUrl: string, openUrl = "") {
  const href = new URL("/", reqUrl);
  href.hash = openUrl;
  return href.toString();
}

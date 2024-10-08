import { openInHash } from "../lib/open_in_hash.ts";

export interface AboutProps {
  reqUrl: URL | string;
  exampleUrl?: URL | string;
}

export function About({ reqUrl, exampleUrl }: AboutProps) {
  return (
    <div class="about">
      <p>
        Allow people to open your git repo in their preferred dev container tool
        via a single URL.
      </p>
      <p>
        Rather than providing separate links to 'Open in VS Code', 'Open in
        Codespaces', 'Open in DevPod', and others.
      </p>
      <p>
        Just have one link:
      </p>
      <p class="mono-font">
        {new URL("/", reqUrl).toString()}#<i>&lt;your-repo-url-here&gt;</i>
      </p>
      {exampleUrl
        ? (
          <>
            <h3 class="<h5>">Example:</h3>
            <p>
              <a href={openInHash(reqUrl, exampleUrl)}>
                Open in a dev container
              </a>
            </p>
          </>
        )
        : null}
    </div>
  );
}

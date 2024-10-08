export function Templates({ url }: { url: URL | string }) {
  return (
    <div class="templates">
      <h3 class="<h5>">URL</h3>
      <code class="block box language-url">
        {url.toString()}
      </code>
      <h3 class="<h5>">HTML</h3>
      <code class="block box language-html">
        {`<a href="${url.toString()}">Open in a dev container</a>`}
      </code>
      <h3 class="<h5>">Markdown</h3>
      <code class="block box language-md">
        {`[Open in a dev container](${url.toString()})`}
      </code>
    </div>
  );
}

export function UrlForm({ url = "" }: { url?: URL | string }) {
  return (
    <form class="box info url-form">
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
          value={url.toString()}
        />
        <a href={url.toString()} target="_blank" class="float:right <small>">
          Visit
        </a>
      </p>
    </form>
  );
}

export function openInUrl(
  reqUrl: URL | string,
  openUrl: URL | string,
  use: string,
  via: URL | string = "/",
) {
  const href = new URL(via, reqUrl);
  href.searchParams.set("open", openUrl.toString());
  href.searchParams.set("use", use);
  return href.toString();
}

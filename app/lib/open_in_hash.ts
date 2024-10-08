export function openInHash(reqUrl: URL | string, openUrl: URL | string = "") {
  const href = new URL("/", reqUrl);
  href.hash = openUrl.toString();
  return href.toString();
}

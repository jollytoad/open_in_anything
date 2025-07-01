export interface Tool {
  id: string;
  name: string;
  desc: string;
  redirect: (url: string) => string | undefined;
  /**
   * Link directly to the most useful info/about page for the tool, not the marketing BS.
   */
  infoLink?: string;
  /**
   * Link to installation documentation, only for installable tools.
   */
  installLink?: string;
}

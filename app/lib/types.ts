export interface Tool {
  id: string;
  name: string;
  desc: string;
  redirect: (url: string) => string | undefined;
  installLink?: string;
}

export interface RequestProps {
  req: Request;
}

import type { ComponentType, RequestProps } from "@http/jsx-stream/types";
import { renderHtmlResponse } from "@http/html-stream/render-html-response";

export const renderHtml =
  (Component: ComponentType<RequestProps>) => (req: Request) =>
    renderHtmlResponse(<Component req={req} />);

import type { ComponentType } from "@http/jsx-stream/types";
import type { RequestProps } from "./types.ts";
import { html } from "@http/response/html";
import { prependDocType } from "@http/response/prepend-doctype";
import { renderBody } from "@http/jsx-stream/serialize";

export function renderHtml(Component: ComponentType<RequestProps>) {
  return (req: Request) =>
    html(
      prependDocType(
        renderBody(<Component req={req} />),
      ),
    );
}

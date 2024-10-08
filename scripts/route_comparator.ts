import type { ComparableRoute } from "@http/discovery/types";
import pathnameLexicalRouteComparator from "@http/discovery/pathname-lexical-route-comparator";

export default function (a: ComparableRoute, b: ComparableRoute): number {
  // Ensure / is the first route checked
  return a.pattern.pathname === "/" ? -1 : pathnameLexicalRouteComparator(a, b);
}

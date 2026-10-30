// Server-side helpers that prepare entities for presentation (including pre-highlighted
// example JSON, so client components never need the highlighter).
import { highlight } from "@/components/site/code-block";
import type { EntityView } from "@/components/spec/entity-detail";
import { getDomains, getEntities, getEntity } from "./load";
import type { Entity } from "./types";

async function toView(entity: Entity): Promise<EntityView> {
  const domainName = getDomains().find((d) => d.id === entity.domain)?.name ?? entity.domain;
  return { ...entity, domainName, exampleHtml: await highlight(JSON.stringify(entity.example, null, 2), "json") };
}

export async function getEntityView(name: string) {
  const entity = getEntity(name);
  return entity ? toView(entity) : undefined;
}

export function getEntityViews() {
  return Promise.all(getEntities().map(toView));
}

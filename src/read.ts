import { GetQBOQueryableEntityType, QBOQueryableEntityType, SnakeToCamelCase } from "./types";
import { Config } from "./config";
import {
  getJson,
  getSignalForTimeout,
  isQueryableEntity,
  makeRequestURL,
  recastAbortError, snakeCaseToCamelCase,
  tokenAuth
} from "./utils";
import { v4 as uuid } from "uuid";

export type QueryResponse<T extends QBOQueryableEntityType> = {
  [K in T as SnakeToCamelCase<K> extends SnakeToCamelCase<T> ? SnakeToCamelCase<T> : never]: GetQBOQueryableEntityType<T>
} & {
  time: string
};

interface ReadInit {
  config: Config
}
export interface ReadArgs<T extends QBOQueryableEntityType> {
  entity: T,
  entityId: string
}

export const read = ({
  config
}: ReadInit) => async <T extends QBOQueryableEntityType>({
  entity,
  entityId
}: ReadArgs<T>): Promise<GetQBOQueryableEntityType<T>> => {
  if (!isQueryableEntity(entity)) {
    throw new Error(`Invalid entity: ${entity}`);
  } else if (Number.isNaN(Number(entityId))) {
    throw new Error(`Invalid entity id: ${entityId}, should be a string of numbers`);
  }

  const Entity = snakeCaseToCamelCase(entity);
  const url = makeRequestURL({
    config,
    path: `/${Entity.toLowerCase()}/${entityId}`
  });

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "qbo-api",
      "Request-Id": uuid(),
      "Authorization": tokenAuth({ config }),
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    signal: getSignalForTimeout({ config })
  })
    .then(getJson<QueryResponse<T>>())
    .catch(recastAbortError);

  return data[Entity];
};
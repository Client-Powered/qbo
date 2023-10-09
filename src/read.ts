import { GetQBOQueryableEntityType, QBOQueryableEntityType, SnakeToCamelCase } from "./lib/types";
import { Config } from "./lib/config";
import {
  getJson,
  getSignalForTimeout,
  isQueryableEntity,
  makeRequestURL,
  recastAbortError, snakeCaseToCamelCase,
  tokenAuth
} from "./lib/utils";
import { v4 as uuid } from "uuid";

export type QueryResponse<T extends QBOQueryableEntityType> = {
  [K in T as SnakeToCamelCase<K> extends SnakeToCamelCase<T> ? SnakeToCamelCase<T> : never]: GetQBOQueryableEntityType<T>
} & {
  time: string
};

interface ReadInit {
  config: Config,
  initFetchFn: typeof fetch
}
export interface ReadArgs<T extends QBOQueryableEntityType> {
  entity: T,
  entity_id: string,
  /** @desc A custom fetch function to use for this read request. This will override any fetchFn passed to the client. */
  fetchFn?: typeof fetch
}

export type ReadResponse<T extends QBOQueryableEntityType> = GetQBOQueryableEntityType<T>;

export const read = ({
  config,
  initFetchFn = fetch
}: ReadInit) => async <T extends QBOQueryableEntityType>({
  entity,
  entity_id,
  fetchFn: _fetchFn
}: ReadArgs<T>): Promise<ReadResponse<T>> => {
  if (!isQueryableEntity(entity)) {
    throw new Error(`Invalid entity: ${entity}`);
  } else if (Number.isNaN(Number(entity_id))) {
    throw new Error(`Invalid entity id: ${entity_id}, should be a string of numbers`);
  }
  const fetchFn = _fetchFn ?? initFetchFn;

  const Entity = snakeCaseToCamelCase(entity);
  const url = makeRequestURL({
    config,
    path: `/${Entity.toLowerCase()}/${entity_id}`
  });

  const data = await fetchFn(url, {
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
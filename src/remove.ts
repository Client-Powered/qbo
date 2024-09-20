import { GetQBOQueryableEntityType, QBOQueryableEntityType, SnakeToCamelCase } from "./lib/types";
import { Config } from "./lib/config";
import {
  getJson,
  getSignalForTimeout,
  isQueryableEntity,
  makeRequestURL,
  handleQBOError, snakeCaseToCamelCase,
  tokenAuth
} from "./lib/utils";
import { v4 as uuid } from "uuid";
import { QBOError } from "./lib/errors/error-classes";

export type QueryResponse<T extends QBOQueryableEntityType> = {
  [K in T as SnakeToCamelCase<K> extends SnakeToCamelCase<T> ? SnakeToCamelCase<T> : never]: GetQBOQueryableEntityType<T>
} & {
  time: number,
  intuitTid: string | null
};

interface RemoveInit {
  initFetchFn: typeof fetch,
  config: Config
}

export type RemoveEntityArgs = {
  Id: string,
  SyncToken: string
};
export interface RemoveArgs<T extends QBOQueryableEntityType> {
  entity: T,
  record: RemoveEntityArgs,
  fetchFn?: typeof fetch
}
export type RemoveEntityResponse = {
  Id: string,
  status: string,
  domain: string
};

export type RemoveResponse<T extends QBOQueryableEntityType> = {
  entity: RemoveEntityResponse,
  time: number,
  intuitTid: string | null
};

export const remove = ({
  initFetchFn = fetch,
  config
}: RemoveInit) => async <T extends QBOQueryableEntityType>({
  entity,
  record,
  fetchFn: _fetchFn
}: RemoveArgs<T>): Promise<Result<RemoveResponse<T>, QBOError>> => {
  if (!isQueryableEntity(entity)) {
    throw new Error(`Invalid entity: ${entity}`);
  }
  const fetchFn = _fetchFn ?? initFetchFn;

  const Entity = snakeCaseToCamelCase(entity);
  const {
    error: makeRequestError, data: url
  } = makeRequestURL({
    config,
    path: `/${Entity.toLowerCase()}`
  });
  if (makeRequestError) {
    return err(makeRequestError);
  }

  const {
    error, data
  } = await fetchFn(`${url}&operation=delete`, {
    method: "POST",
    headers: {
      "User-Agent": "qbo-api",
      "Request-Id": uuid(),
      "Authorization": tokenAuth({ config }),
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record),
    signal: getSignalForTimeout({ config })
  })
    .then(getJson<QueryResponse<T>>())
    .catch(handleQBOError);
  if (error) {
    return err(error);
  }
  return ok({
    // @ts-ignore
    entity: data[Entity],
    time: data.time,
    intuitTid: data.intuitTid
  });
};
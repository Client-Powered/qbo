import { GetQBOQueryableEntityType, QBOQueryableEntityType, SnakeToCamelCase, SnakeToCamelCase_ } from "./lib/types";
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

export type QueryResponseJustEntity<T extends QBOQueryableEntityType> = {
  [K in T as SnakeToCamelCase<K> extends SnakeToCamelCase<T> ? SnakeToCamelCase<T> : never]: GetQBOQueryableEntityType<T>
};

export type QueryResponse<T extends QBOQueryableEntityType> =
  & {
    time: number,
    intuitTid: string | null
  }
  & QueryResponseJustEntity<T>;

const getEntityData = <T extends QBOQueryableEntityType>(
  Entity: SnakeToCamelCase<T>,
  data: QueryResponseJustEntity<T>
): GetQBOQueryableEntityType<T> => {
  const entityData = data[Entity];
  return entityData as GetQBOQueryableEntityType<T>;
};


interface UpsertInit {
  initFetchFn: typeof fetch,
  config: Config
}
export interface UpsertArgs<T extends QBOQueryableEntityType> {
  entity: T,
  record: GetQBOQueryableEntityType<T>,
  /** @desc A custom fetch function to use for this upsert request. This will override any fetchFn passed to the client. */
  fetchFn?: typeof fetch
}

export type UpsertResponse<T extends QBOQueryableEntityType> = {
  entity: GetQBOQueryableEntityType<T>,
  time: number,
  intuitTid: string | null
};

export const upsert = ({
  initFetchFn = fetch,
  config
}: UpsertInit) => async <T extends QBOQueryableEntityType>({
  entity,
  record,
  fetchFn: _fetchFn
}: UpsertArgs<T>): Promise<Result<UpsertResponse<T>, QBOError>> => {
  if (!isQueryableEntity(entity)) {
    throw new Error(`Invalid entity: ${entity}`);
  }
  const fetchFn = _fetchFn ?? initFetchFn;

  const Entity = snakeCaseToCamelCase<T>(entity);
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
  } = await fetchFn(url, {
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
    entity: getEntityData(Entity, data),
    time: data.time,
    intuitTid: data.intuitTid
  });
};
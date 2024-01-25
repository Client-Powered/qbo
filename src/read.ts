import { GetQBOQueryableEntityType, QBOQueryableEntityType, SnakeToCamelCase } from "./lib/types";
import { Config } from "./lib/config";
import {
  getJson,
  getSignalForTimeout,
  isQueryableEntity,
  makeRequestURL,
  handleQBOError, ensureQboError, snakeCaseToCamelCase,
  tokenAuth
} from "./lib/utils";
import { v4 as uuid } from "uuid";
import { InvalidQueryArgsError, QBOError } from "./lib/errors/error-classes";

export type QueryResponse<T extends QBOQueryableEntityType> = {
  [K in T as SnakeToCamelCase<K> extends SnakeToCamelCase<T> ? SnakeToCamelCase<T> : never]: GetQBOQueryableEntityType<T>
} & {
  time: string,
  intuitTid: string | null
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

export type ReadResponse<T extends QBOQueryableEntityType> = {
  entity: GetQBOQueryableEntityType<T>,
  time: string,
  intuitTid: string | null
};

export const read = ({
  config,
  initFetchFn = fetch
}: ReadInit) => async <T extends QBOQueryableEntityType>({
  entity,
  entity_id,
  fetchFn: _fetchFn
}: ReadArgs<T>): Promise<Result<ReadResponse<T>, QBOError>> => {
  if (!isQueryableEntity(entity)) {
    return err(new InvalidQueryArgsError(`Invalid entity: ${entity}`, null));
  } else if (Number.isNaN(Number(entity_id))) {
    return err(new InvalidQueryArgsError(`Invalid entity id: ${entity_id}, should be a string of numbers`, null));
  }
  const fetchFn = _fetchFn ?? initFetchFn;

  const Entity = snakeCaseToCamelCase(entity);
  const {
    error: makeRequestError, data: url
  } = makeRequestURL({
    config,
    path: `/${Entity.toLowerCase()}/${entity_id}`
  });
  if (makeRequestError) {
    return err(new InvalidQueryArgsError(makeRequestError.message, null));
  }

  const {
    error, data
  } = await fetchFn(url, {
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
    .catch(handleQBOError);
  if (error) {
    return err(error);
  }
  return ok({
    entity: data[Entity],
    time: data.time,
    intuitTid: data.intuitTid
  });
};
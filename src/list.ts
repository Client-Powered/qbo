import {
  GetQBOQueryableEntityType,
  GetQBOQueryablePropsForEntityType,
  QBOQueryableEntityType,
  QueryOperatorType, SnakeToCamelCase
} from "./lib/types";
import {
  getJson,
  getSignalForTimeout,
  isQueryableEntity,
  makeRequestURL,
  quote,
  handleQBOError, snakeCaseToCamelCase,
  tokenAuth
} from "./lib/utils";
import { Config } from "./lib/config";
import { v4 as uuid } from "uuid";
import { InvalidQueryArgsError, QBOError } from "./lib/errors/error-classes";
import { withResult } from "ts-error-as-value";

export const combine = <T extends QBOQueryableEntityType>(
  Entity: SnakeToCamelCase<T>,
  first: FetchListResponse<T>,
  second: FetchListResponse<T>
): FetchListResponse<T> => ({
  time: second.time,
  QueryResponse: {
    maxResults: second.QueryResponse.maxResults,
    startPosition: second.QueryResponse.startPosition,
    [Entity]: [
      ...first.QueryResponse[Entity],
      ...second.QueryResponse[Entity]
    ]
  }
} as FetchListResponse<T>);

export type StringIfObject<
  T extends QBOQueryableEntityType,
  K extends keyof GetQBOQueryableEntityType<T>
> =
  Exclude<GetQBOQueryableEntityType<T>[K], undefined> extends object ? string : Exclude<GetQBOQueryableEntityType<T>[K], undefined>;

export type QueryOptsBase<T extends QBOQueryableEntityType>  = {
  offset?: number,
  limit?: number,
  fetch_all?: boolean,
  where?: {
    [K in keyof GetQBOQueryableEntityType<T>]: K extends "Id" ? never : K extends "SyncToken" ? never : GetQBOQueryablePropsForEntityType<T, K> extends never ? never : {
      field: K,
      value: (StringIfObject<T, K> | StringIfObject<T, K>[]),
      operator: QueryOperatorType
    }
  }[keyof GetQBOQueryableEntityType<T>][]
} & (
  | {
    asc?: keyof GetQBOQueryableEntityType<T>,
    desc?: never
  }
  | {
    desc?: keyof GetQBOQueryableEntityType<T>,
    asc?: never
  });

export type QueryOptsInternal<T extends QBOQueryableEntityType> = Omit<QueryOptsBase<T>, "fetchAll" | "limit" | "offset"> & {
  fetch_all: boolean,
  limit: number,
  offset: number
};

export const optsToListQueryCondition = <T extends QBOQueryableEntityType>(opts: QueryOptsInternal<T>): string => {
  const queryConditionItems: string[] = [];
  if (opts.where && Object.values(opts.where ?? {})?.length) {
    const queryItems: string[] = [];
    for (const { field, value, operator } of opts.where) {
      const queryValueQuoted = Array.isArray(value)
        ? `(${value.map(quote).join(",")})`
        : quote(String(value));
      queryItems.push(
        `${String(field)} ${operator} ${queryValueQuoted}`
      );
    }
    queryConditionItems.push(`where ${queryItems.join(" and ")}`);
  }

  if (opts.asc) {
    queryConditionItems.push(`orderby ${String(opts.asc)} asc`);
  } else if (opts.desc) {
    queryConditionItems.push(`orderby ${String(opts.desc)} desc`);
  }

  return queryConditionItems.join(" ");
};

interface FetchListQuery<T extends QBOQueryableEntityType> {
  config: Config,
  opts: QueryOptsInternal<T>,
  Entity: SnakeToCamelCase<T>,
  headers: object,
  fetchFn: typeof fetch
}


export type FetchListResponse<T extends QBOQueryableEntityType> = {
  time: number,
  QueryResponse: {
    [K in T as SnakeToCamelCase<K> extends SnakeToCamelCase<T> ? SnakeToCamelCase<T> : never]: GetQBOQueryableEntityType<T>[]
  } & {
    startPosition: number,
    maxResults: number
  },
  intuitTid: string
};
export const fetchListQuery = async <T extends QBOQueryableEntityType>({
  config,
  opts,
  Entity,
  headers,
  fetchFn
}: FetchListQuery<T>): Promise<Result<FetchListResponse<T>>> => {
  const {
    error: makeRequestError, data: url
  } = makeRequestURL({
    config,
    path: "/query",
    query_params: {
      limit: opts.limit,
      offset: opts.offset,
      query: `select * from ${Entity} ${optsToListQueryCondition(opts)}`.trim()
    }
  });
  if (makeRequestError) {
    throw makeRequestError;
  }

  const {
    error, data
  } = await fetchFn(url, {
    headers: headers as any,
    signal: getSignalForTimeout({ config })
  })
    .then(getJson<FetchListResponse<T>>())
    .catch(handleQBOError);
  if (error) {
    return err(error);
  }

  if (!opts.fetch_all || data.QueryResponse[Entity]?.length !== opts.limit) {
    return ok(data);
  } else {
    return ok(combine(
      Entity,
      data,
      (await fetchListQuery({
        config,
        opts: {
          ...opts,
          offset: opts.offset + data.QueryResponse[Entity]?.length
        },
        Entity,
        headers,
        fetchFn
      })).successOrThrow()
    ));
  }
};

interface ListInit {
  initFetchFn: typeof fetch,
  config: Config
}

export interface ListArgs<T extends QBOQueryableEntityType> {
  entity: T,
  opts?: QueryOptsBase<T>,
  /** @desc A custom fetch function to use for this list request. This will override any fetchFn passed to the client. */
  fetchFn?: typeof fetch
}

export type ListResponse<T extends QBOQueryableEntityType> = {
  entities: GetQBOQueryableEntityType<T>[],
  time: number,
  intuitTid: string | null
};

export const list = ({
  initFetchFn = fetch,
  config
}: ListInit) => async <T extends QBOQueryableEntityType>({
  entity,
  opts,
  fetchFn: _fetchFn
}: ListArgs<T>): Promise<Result<ListResponse<T>, QBOError>> => {
  if (!isQueryableEntity(entity)) {
    return err(new InvalidQueryArgsError(`Invalid entity: ${entity}`, null));
  }
  const fetchFn = _fetchFn ?? initFetchFn;

  const Entity = snakeCaseToCamelCase(entity);

  const {
    error, data
  } = await fetchListQuery<T>({
    config,
    opts: {
      ...(opts ?? {}),
      fetch_all: !!opts?.fetch_all,
      offset: opts?.offset ?? 1,
      limit: opts?.limit ?? 1000
    },
    Entity,
    headers: {
      "User-Agent": "qbo-api",
      "Request-Id": uuid(),
      "Authorization": tokenAuth({ config }),
      "Accept": "application/json"
    },
    fetchFn: fetchFn
  });
  if (error) {
    return err(error);
  }

  return ok({
    entities: data?.QueryResponse[Entity] ?? [],
    time: data.time,
    intuitTid: data.intuitTid
  });
};


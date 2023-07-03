import {
  GetQBOQueryableEntityType,
  GetQBOQueryablePropsForEntityType,
  QBOQueryableEntityType,
  QueryOperatorType, SnakeToCamelCase
} from "./types";
import {
  getJson,
  getSignalForTimeout,
  isQueryableEntity,
  makeRequestURL,
  quote,
  recastAbortError, snakeCaseToCamelCase,
  tokenAuth
} from "./utils";
import { Config } from "./config";
import { v4 as uuid } from "uuid";


export const combine = <T extends QBOQueryableEntityType>(
  Entity: SnakeToCamelCase<T>,
  first: QueryResponse<T>,
  second: QueryResponse<T>
): QueryResponse<T> => ({
  time: second.time,
  QueryResponse: {
    maxResults: second.QueryResponse.maxResults,
    startPosition: second.QueryResponse.startPosition,
    [Entity]: [
      ...first.QueryResponse[Entity],
      ...second.QueryResponse[Entity]
    ]
  }
} as QueryResponse<T>);

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

export const optsToQueryCondition = <T extends QBOQueryableEntityType>(opts: QueryOptsInternal<T>): string => {
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

interface FetchQuery<T extends QBOQueryableEntityType> {
  config: Config,
  opts: QueryOptsInternal<T>,
  Entity: SnakeToCamelCase<T>,
  headers: object,
  fetchFn: typeof fetch
}

export const fetchQuery = async <T extends QBOQueryableEntityType>({
  config,
  opts,
  Entity,
  headers,
  fetchFn
}: FetchQuery<T>): Promise<QueryResponse<T>> => {
  const url = makeRequestURL({
    config,
    path: "/query",
    query_params: {
      limit: opts.limit,
      offset: opts.offset,
      query: `select * from ${Entity} ${optsToQueryCondition(opts)}`.trim()
    }
  });

  const data = await fetchFn(url, {
    headers: headers as any,
    signal: getSignalForTimeout({ config })
  })
    .then(getJson<QueryResponse<T>>())
    .catch(recastAbortError);

  if (!opts.fetch_all || data.QueryResponse[Entity]?.length !== opts.limit) {
    return data;
  } else {
    return combine(
      Entity,
      data,
      await fetchQuery({
        config,
        opts: {
          ...opts,
          offset: opts.offset + data.QueryResponse[Entity]?.length
        },
        Entity,
        headers,
        fetchFn
      })
    );
  }
};

interface QueryInit {
  config: Config
}

export interface QueryArgs<T extends QBOQueryableEntityType> {
  entity: T,
  opts?: QueryOptsBase<T>
}

export type QueryResponse<T extends QBOQueryableEntityType> = {
  time: string,
  QueryResponse: {
    [K in T as SnakeToCamelCase<K> extends SnakeToCamelCase<T> ? SnakeToCamelCase<T> : never]: GetQBOQueryableEntityType<T>[]
  } & {
    startPosition: number,
    maxResults: number
  }
};

export const query = ({
  config
}: QueryInit) => async <T extends QBOQueryableEntityType>({
  entity,
  opts
}: QueryArgs<T>): Promise<GetQBOQueryableEntityType<T>[]> => {
  if (!isQueryableEntity(entity)) {
    throw new Error(`Invalid entity: ${entity}`);
  }

  const Entity = snakeCaseToCamelCase(entity);

  const data = await fetchQuery<T>({
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
    fetchFn: fetch
  });

  return data?.QueryResponse[Entity] ?? [];
};


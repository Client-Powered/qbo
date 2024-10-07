import {
  qboQueryableEntities,
  QBOQueryableEntityType,
  qboReportEntities,
  QBOReportEntityType, SnakeToCamelCase
} from "./types";
import { Config } from "./config";
import { isValid, parseISO } from "date-fns";
import { getErrorFromResponse } from "./errors";
import { QBOError, RequestTimeoutError, UnknownQBOError } from "./errors/error-classes";
import { withResult } from "ts-error-as-value";


export const makeFormBody = (obj: object): URLSearchParams => {
  const formBody = new URLSearchParams();
  for (const [ key, value ] of Object.entries(obj)) {
    formBody.append(key, value);
  }
  return formBody;
};

export const snakeCaseToCamelCase = <T extends string>(str: T): SnakeToCamelCase<T> => {
  const replaced = str.replace(
    /(?!^)_(.)/g,
    (_, char) => char.toUpperCase()
  );
  return title(replaced) as SnakeToCamelCase<T>;
};

interface BasicAuth {
  client_id: string,
  client_secret: string
}
export const basicAuth = ({
  client_id,
  client_secret
}: BasicAuth): string =>
  `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`;

interface TokenAuth {
  config: Config
}
export const tokenAuth = ({
  config
}: TokenAuth) =>
  `Bearer ${config.ACCESS_TOKEN}`;

export const isQueryableEntity = (val: any): val is QBOQueryableEntityType =>
  typeof val === "string" && qboQueryableEntities.includes(val as any);

export const isReportEntity = (val: any): val is QBOReportEntityType =>
  typeof val === "string" && qboReportEntities.includes(val as any);

const makeQueryParams = <T extends object>(opts: T) => {
  const encodedCriteria = Object.entries(opts)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");
  if (encodedCriteria.length) {
    return `?${encodedCriteria}`;
  }
  return "";
};

interface MakeRequestURL<T extends object>{
  path: `/${string}`,
  config: Config,
  query_params?: T
}
export const makeRequestURL = withResult(<T extends object>({
  path,
  config,
  query_params
}: MakeRequestURL<T>): URL =>
  new URL(`${config.V3_ENDPOINT_BASE_URL}${config.REALM_ID}${path}${makeQueryParams({
    ...(query_params ?? {}),
    minorversion: 65
  })}`));

export const title = <T extends string>(str: T): Capitalize<T> =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<T>;

export const quote = (x: any) =>
  typeof x === "string" ? `'${x.replace(/'/g, "\\'")}'` : x;

interface GetSignalForTimeout {
  config: Config
}
export const getSignalForTimeout = ({
  config: { MAX_TIMEOUT_IN_MS }
}: GetSignalForTimeout) => {
  if (!MAX_TIMEOUT_IN_MS) {
    return undefined;
  }
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), MAX_TIMEOUT_IN_MS);

  return signal;
};

export const ensureQboError = (e: any): QBOError => {
  if (!(e instanceof QBOError)) {
    return new UnknownQBOError(e.message, null);
  }
  return e;
};

export const handleQBOError = (e: any): Result<never, QBOError> => {
  if (e?.name === "AbortError") {
    return err(new RequestTimeoutError(
      "Max timeout exceeded when waiting for response from QBO",
      null
    ));
  }
  return err(ensureQboError(e));
};

export const getJson = <T>() => async (res: Response): Promise<Result<T, QBOError>> => {
  const intuitTid = res?.headers?.get("intuit_tid") ?? null;
  if (!res.ok) {
    return err(await getErrorFromResponse(res, intuitTid));
  }
  return ok({
    ...await res.json(),
    intuitTid
  });
};

export const isISODateString = (s: any): s is string => {
  if (typeof s !== "string") {
    return false;
  }
  try {
    return isValid(parseISO(s));
  } catch (error) {
    return false;
  }
};
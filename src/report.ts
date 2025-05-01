import { GetEntitySpecificReport, qboReportEntities, QBOReportEntityType } from "./lib/types";
import { Config } from "./lib/config";
import {
  getJson,
  getSignalForTimeout, isISODateString,
  isReportEntity,
  makeRequestURL,
  handleQBOError,
  snakeCaseToCamelCase,
  tokenAuth
} from "./lib/utils";
import { v4 as uuid } from "uuid";
import { isCommasOption, optsByEntity, ReportQuery } from "./reports";
import { format, parseISO } from "date-fns";
import { QBOError } from "./lib/errors/error-classes";
import { UTCDate } from "@date-fns/utc";

interface CreateReportOpts<T extends QBOReportEntityType> {
  entity: T,
  opts?: ReportQuery<T>
}
export const createReportOpts = <T extends QBOReportEntityType>({
  entity,
  opts: _opts
}: CreateReportOpts<T>): Result<Record<string, string> | void> => {
  if (!_opts) {
    return ok<void>();
  }
  const {
    data: opts, error, success
  } = optsByEntity[entity].safeParse(_opts);
  if (!success || error || !opts) {
    return err(new Error(`Invalid report query options: ${error.format()}`));
  }
  try {
    const newOpts: Record<string, string> = {};
    for (const [ key, value ] of Object.entries(opts)) {
      if (isCommasOption(key)) {
        newOpts[key] = Array.isArray(value) ? value.join(",") : typeof value === "string" ? value : String(value);
      } else if (value instanceof Date) {
        const utcDate = new UTCDate(value);
        console.log(utcDate.toLocaleString());
        newOpts[key] = format(utcDate, "yyyy-MM-dd");
      } else if (isISODateString(value)) {
        newOpts[key] = format(parseISO(value, {
          in: arg => {
            return new UTCDate(arg);
          }
        }), "yyyy-MM-dd");
      } else {
        newOpts[key] = Array.isArray(value) ? value.join(",") : typeof value === "string" ? value : String(value);
      }
    }
    return ok(newOpts);
  } catch (e) {
    return err(new Error(`Error creating report options: ${(e as Error)?.message ?? "Unknown error"}`));
  }
};

interface ReportInit {
  config: Config,
  initFetchFn: typeof fetch
}
export interface ReportArgs<T extends QBOReportEntityType> {
  entity: T,
  opts?: ReportQuery<T>,
  /** @desc A custom fetch function to use for this report request. This will override any fetchFn passed to the client. */
  fetchFn?: typeof fetch
}

export type ReportResponse<T extends QBOReportEntityType> = GetEntitySpecificReport<T>;

export const report = ({
  config,
  initFetchFn = fetch
}: ReportInit) => async <T extends QBOReportEntityType>({
  entity,
  opts,
  fetchFn: _fetchFn
}: ReportArgs<T>): Promise<Result<ReportResponse<T>, QBOError>> => {
  if (!isReportEntity(entity)) {
    return err(new Error(`Invalid entity: ${entity} given to report. Expected one of ${qboReportEntities.join(", ")}`));
  }
  const fetchFn = _fetchFn ?? initFetchFn;

  const {
    error: optsError, data: queryParams
  } = createReportOpts<T>({ entity, opts });
  if (optsError) {
    return err(new Error(`Error parsing query params in opts property for report type...\n${optsError.message}\n${optsError?.stack}`));
  }

  const {
    error: makeRequestError, data: url
  } = makeRequestURL({
    config,
    path: `/reports/${snakeCaseToCamelCase(entity)}`,
    query_params: queryParams
  });
  if (makeRequestError) {
    return err(new Error(makeRequestError.message));
  }

  return fetchFn(url, {
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
    .then(getJson<GetEntitySpecificReport<T>>())
    .catch(handleQBOError);
};

import { GetEntitySpecificReport, QBOReportEntityType } from "./types";
import { Config } from "./config";
import {
  getJson,
  getSignalForTimeout, isISODateString,
  isReportEntity,
  makeRequestURL,
  recastAbortError,
  snakeCaseToCamelCase,
  tokenAuth
} from "./utils";
import { v4 as uuid } from "uuid";
import { isCommasOption, ReportQuery } from "./report-query";
import { format, parseISO } from "date-fns";

interface CreateReportOpts<T extends QBOReportEntityType> {
  opts?: ReportQuery<T>
}
export const createReportOpts = <T extends QBOReportEntityType>({
  opts
}: CreateReportOpts<T>): Record<string, string> | undefined => {
  if (!opts) {
    return;
  }
  const newOpts: Record<string, string> = {};
  for (const [ key, value ] of Object.entries(opts)) {
    if (isCommasOption(key)) {
      newOpts[key] = Array.isArray(value) ? value.join(",") : value;
    } else if (value instanceof Date) {
      newOpts[key] = format(value, "yyyy-MM-dd");
    } else if (isISODateString(value)) {
      newOpts[key] = format(parseISO(value), "yyyy-MM-dd");
    } else {
      newOpts[key] = value;
    }
  }
  return newOpts;
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
}: ReportArgs<T>): Promise<ReportResponse<T>> => {
  if (!isReportEntity(entity)) {
    throw new Error(`Invalid entity: ${entity}`);
  }
  const fetchFn = _fetchFn ?? initFetchFn;

  const queryParams = createReportOpts<T>({ opts });

  const url = makeRequestURL({
    config,
    path: `/reports/${snakeCaseToCamelCase(entity)}`,
    query_params: queryParams
  });

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
    .catch(recastAbortError);
};
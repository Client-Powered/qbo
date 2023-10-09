import { QBOQueryableEntityType, QBOReportEntityType, RefreshTokenResponse, Tokens } from "./types";
import { basicAuth, getJson, getSignalForTimeout, makeFormBody, recastAbortError } from "./utils";
import { getConfig } from "./config";
import { list, ListArgs, ListResponse } from "./list";
import { upsert, UpsertArgs, UpsertResponse } from "./upsert";
import { read, ReadArgs, ReadResponse } from "./read";
import { report, ReportArgs, ReportResponse } from "./report";


export type { Tokens, QBOQueryableEntityType, QBOReportEntityType, GetQBOQueryableEntityType, GetEntitySpecificReport } from "./types";
export type { ReportArgs, ReportResponse } from "./report";
export type { ReadArgs, ReadResponse } from "./read";
export type { UpsertArgs, UpsertResponse } from "./upsert";
export type { ListArgs, ListResponse } from "./list";

export interface ClientArgs {
  client_id: string,
  client_secret: string,
  access_token: string,
  refresh_token: string,
  realm_id: string,
  max_timeout_in_ms?: number,
  use_sandbox?: boolean,
  /** @desc A custom implementation of fetch to use everywhere in this library instead of the global fetch. */
  fetchFn?: typeof fetch
}

export interface QboClient {
  refreshAccessToken(): Promise<void>,
  revokeAccess(tokenType: "REFRESH" | "ACCESS"): Promise<void>,
  get tokens(): Tokens,

  /** @desc Read one QBO entity of a given type by id */
  read<T extends QBOQueryableEntityType>({
    entity,
    entity_id,
    fetchFn
  }: ReadArgs<T>): Promise<ReadResponse<T>>,

  /** @desc List QBO entities of a given type with optional query parameters */
  list<T extends QBOQueryableEntityType>({
    entity,
    opts,
    fetchFn
  }: ListArgs<T>): Promise<ListResponse<T>>,

  /** @desc Update if exists, otherwise insert one QBO entity of a given type */
  upsert<T extends QBOQueryableEntityType>({
    entity,
    record,
    fetchFn
  }: UpsertArgs<T>): Promise<UpsertResponse<T>>,

  /** @desc Query a QBO report of a given type with optional query parameters */
  report<T extends QBOReportEntityType>({
    entity,
    opts,
    fetchFn
  }: ReportArgs<T>): Promise<ReportResponse<T>>
}

export const client = async ({
  client_id,
  client_secret,
  access_token,
  refresh_token,
  realm_id,
  use_sandbox = false,
  max_timeout_in_ms,
  fetchFn = fetch
}: ClientArgs): Promise<QboClient> => {
  const config = await getConfig({
    fetchFn,
    use_sandbox: use_sandbox,
    access_token: access_token,
    refresh_token: refresh_token,
    realm_id: realm_id,
    max_timeout_in_ms: max_timeout_in_ms
  });
  return {
    async refreshAccessToken() {
      const refreshTokenResponse = await fetchFn(config.TOKEN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: basicAuth({ client_id, client_secret })
        },
        body: makeFormBody({
          grant_type: "refresh_token",
          refresh_token: config.REFRESH_TOKEN
        }),
        signal: getSignalForTimeout({ config })
      })
        .then(getJson<RefreshTokenResponse>())
        .catch(recastAbortError);
      config.REFRESH_TOKEN = refreshTokenResponse.refresh_token;
      config.ACCESS_TOKEN = refreshTokenResponse.access_token;
    },
    async revokeAccess(tokenType: "REFRESH" | "ACCESS") {
      const token = tokenType === "REFRESH" ? config.REFRESH_TOKEN : config.ACCESS_TOKEN;
      if (!token) {
        throw new Error(`No ${tokenType} token found to revoke`);
      }
      const res = await fetchFn(config.REVOKE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: basicAuth({ client_id: client_id, client_secret: client_secret })
        },
        body: makeFormBody({
          token: token
        }),
        signal: getSignalForTimeout({ config })
      }).catch(recastAbortError);
      if (!res.ok) {
        throw new Error(`Request failed with status code ${res.status}`);
      }
      config.ACCESS_TOKEN = null;
      if (tokenType === "REFRESH") {
        config.REFRESH_TOKEN = null;
        config.REALM_ID = null;
      }
    },
    get tokens(): Tokens {
      const refreshToken = config.REFRESH_TOKEN;
      const accessToken = config.ACCESS_TOKEN;
      if (!refreshToken || !accessToken) {
        throw new Error("No tokens found");
      }
      return {
        access_token: accessToken,
        refresh_token: refreshToken
      };
    },
    list: list({ config, initFetchFn: fetchFn }),
    upsert: upsert({ config, initFetchFn: fetchFn }),
    read: read({ config, initFetchFn: fetchFn }),
    report: report({ config, initFetchFn: fetchFn })
  };
};
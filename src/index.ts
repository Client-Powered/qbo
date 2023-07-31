import { DePromisify, RefreshTokenResponse, Tokens } from "./types";
import { basicAuth, getJson, getSignalForTimeout, makeFormBody, recastAbortError } from "./utils";
import { getConfig } from "./config";
import * as fs from "fs";
import { list } from "./list";
import { upsert } from "./upsert";
import { read } from "./read";
import { report } from "./report";

export interface ClientArgs {
  client_id: string,
  client_secret: string,
  access_token: string,
  refresh_token: string,
  realm_id: string,
  max_timeout_in_ms?: number,
  use_sandbox?: boolean
}
const _client = async ({
  client_id,
  client_secret,
  access_token,
  refresh_token,
  realm_id,
  use_sandbox = false,
  max_timeout_in_ms,
  ...args
}: ClientArgs) => {
  const config = await getConfig({
    use_sandbox: use_sandbox,
    access_token: access_token,
    refresh_token: refresh_token,
    realm_id: realm_id,
    max_timeout_in_ms: max_timeout_in_ms
  });
  return {
    async refreshAccessToken() {
      const refreshTokenResponse = await fetch(config.TOKEN_URL, {
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
      if ((args as any).____write_to_file) {
        fs.writeFileSync("tokens.json", JSON.stringify({ refresh_token: config.REFRESH_TOKEN, access_token: config.ACCESS_TOKEN }), "utf-8");
      }
    },
    async revokeAccess(tokenType: "REFRESH" | "ACCESS") {
      const token = tokenType === "REFRESH" ? config.REFRESH_TOKEN : config.ACCESS_TOKEN;
      if (!token) {
        throw new Error(`No ${tokenType} token found to revoke`);
      }
      const res = await fetch(config.REVOKE_URL, {
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
    list: list({ config }),
    upsert: upsert({ config }),
    read: read({ config }),
    report: report({ config })
  };
};

export type QboClient = DePromisify<ReturnType<typeof _client>>;

export const client = async ({
  use_sandbox,
  client_id,
  client_secret,
  access_token,
  refresh_token,
  realm_id,
  max_timeout_in_ms,
  ...args
}: ClientArgs): Promise<QboClient> => _client({
  use_sandbox: use_sandbox,
  client_id: client_id,
  client_secret: client_secret,
  access_token: access_token,
  refresh_token: refresh_token,
  realm_id: realm_id,
  max_timeout_in_ms: max_timeout_in_ms,
  ...args
});
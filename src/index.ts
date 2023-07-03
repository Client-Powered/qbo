import { DePromisify, RefreshTokenResponse } from "./types";
import { basicAuth, getJson, getSignalForTimeout, makeFormBody, recastAbortError } from "./utils";
import { getConfig } from "./config";
import * as fs from "fs";
import { query } from "./query";
import { upsert } from "./upsert";
import { read } from "./read";
import { report } from "./report";

export interface ClientArgs {
  use_sandbox: boolean,
  client_id: string,
  client_secret: string,
  access_token: string,
  refresh_token: string,
  realm_id: string,
  max_timeout_in_ms?: number
}
const _client = async ({
  use_sandbox,
  client_id,
  client_secret,
  access_token,
  refresh_token,
  realm_id,
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
    query: query({ config }),
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

if (require.main === module) {
  require("dotenv").config({
    path: require("path").resolve(require("app-root-path").path, "env")
  });
  const {
    refresh_token,
    access_token
  } = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));
  client({
    use_sandbox: true,
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    access_token: access_token,
    refresh_token: refresh_token,
    realm_id: process.env.REALM_ID as string,
    max_timeout_in_ms: 10000,
    ____write_to_file: true
  } as any)
    .then(async client => {
      await client.refreshAccessToken();
      // const transactions = await client.report({
      //   entity: "transactionList"
      // });
      // const colId = transactions.Rows.Row[0].Rows.Row[0].ColData[0].value;
      // console.log(colId);
      // const customer2 = await client.query({
      //   entity: "customer"
      // });
      // console.log(customer2);
      const employee = await client.query({
        entity: "employee"
        // opts: {
        //   where: [{
        //     field: "PrimaryEmailAddr",
        //     operator: "=",
        //     value: "lg@intuit.com"
        //   }]
        // }
      });
      console.log(employee);

      const customer = await client.query({
        entity: "customer",
        opts: {
          where: [{
            field: "PrimaryEmailAddr",
            operator: "=",
            value: "lg@intuit.com"
          }]
        }
      });
      console.log(customer);
      const firstCustomer = customer[0];
      const readRes = await client.read({
        entity: "customer",
        entityId: firstCustomer.Id
      });
      console.log(readRes);
      const updatedCustomer = await client.upsert({
        entity: "customer",
        record: {
          ...firstCustomer,
          PrimaryPhone:  {
            FreeFormNumber: "534-525-1234"
          }
        }
      });
      console.log(updatedCustomer);
      // await client.refreshAccessToken();
      // await client.revokeAccess("REFRESH");
    })
    .catch(console.error);
}
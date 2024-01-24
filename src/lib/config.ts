import { discovery, DiscoveryConfig } from "./discovery";
import { withResult } from "ts-error-as-value";

export interface Config extends DiscoveryConfig {
  REFRESH_TOKEN: string | null,
  ACCESS_TOKEN: string | null,
  REALM_ID: string | null,
  MAX_TIMEOUT_IN_MS?: number
}

interface GetConfigArgs {
  use_sandbox: boolean,
  access_token: string,
  refresh_token: string,
  realm_id: string,
  max_timeout_in_ms?: number,
  fetchFn: typeof fetch
}
export const getConfig = withResult(async ({
  use_sandbox,
  access_token,
  refresh_token,
  realm_id,
  max_timeout_in_ms,
  fetchFn
}: GetConfigArgs): Promise<Config> => ({
  ...(await discovery({ fetchFn, use_sandbox: use_sandbox })).successOrThrow(),
  REFRESH_TOKEN: refresh_token as string | null,
  ACCESS_TOKEN: access_token as string | null,
  REALM_ID: realm_id as string | null,
  MAX_TIMEOUT_IN_MS: max_timeout_in_ms
}));


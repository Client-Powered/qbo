import { getJson, handleQBOError } from "./utils";
import { GetEntitySpecificReport } from "./types";

export const DISCOVERY_URL_SANDBOX = "https://developer.intuit.com/.well-known/openid_sandbox_configuration/";

export const DISCOVERY_URL_LIVE = "https://developer.intuit.com/.well-known/openid_configuration/";

interface DiscoveryResponse {
  authorization_endpoint: string,
  token_endpoint: string,
  userinfo_endpoint: string,
  revocation_endpoint: string,
  intuitTid: string | null
}

export interface DiscoveryConfig {
  TOKEN_URL: string,
  REVOKE_URL: string,
  USER_INFO_URL: string,
  AUTHORIZATION_URL: string,
  APP_CENTER_BASE: string,
  V3_ENDPOINT_BASE_URL: string
}

interface DiscoveryArgs {
  use_sandbox: boolean,
  fetchFn: typeof fetch
}
export const discovery = async ({
  use_sandbox,
  fetchFn
}: DiscoveryArgs): Promise<Result<DiscoveryConfig>> => {
  const discoveryURL = !use_sandbox
    ? DISCOVERY_URL_LIVE
    : DISCOVERY_URL_SANDBOX;
  const {
    error, data: discoveryResponse
  } = await fetchFn(discoveryURL, {
    headers: {
      Accept: "application/json"
    }
  })
    .then(getJson<DiscoveryResponse>())
    .catch(handleQBOError);
  if (error) {
    return err(error);
  }
  const v3Endpoint = !use_sandbox
    ? "https://quickbooks.api.intuit.com/v3/company/"
    : "https://sandbox-quickbooks.api.intuit.com/v3/company/";
  return ok({
    APP_CENTER_BASE: "https://appcenter.intuit.com",
    V3_ENDPOINT_BASE_URL: v3Endpoint,
    TOKEN_URL: discoveryResponse.token_endpoint,
    REVOKE_URL: discoveryResponse.revocation_endpoint,
    USER_INFO_URL: discoveryResponse.userinfo_endpoint,
    AUTHORIZATION_URL: discoveryResponse.authorization_endpoint
  });
};




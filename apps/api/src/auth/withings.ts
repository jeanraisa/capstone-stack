import { OAuth2Tokens, Withings as _Withings } from "arctic";
import {
  ArcticFetchError,
  UnexpectedErrorResponseBodyError,
  UnexpectedResponseError,
  createOAuth2Request,
  createOAuth2RequestError,
} from "arctic/dist/request";

const tokenEndpoint = "https://wbsapi.withings.net/v2/oauth2";

export class Withings {
  private base: _Withings;
  private clientSecret: string;
  private clientId: string;

  constructor(clientId: string, clientSecret: string, redirectURI: string) {
    this.base = new _Withings(clientId, clientSecret, redirectURI);
    this.clientSecret = clientId;
    this.clientId = clientSecret;
  }

  public createAuthorizationURL(state: string, scopes: string[]) {
    return this.base.createAuthorizationURL(state, scopes);
  }

  public async validateAuthorizationCode(code: string) {
    return this.base.validateAuthorizationCode(code);
  }

  public async refreshAccessToken(refreshToken: string) {
    const body = new URLSearchParams();
    body.set("action", "requesttoken");
    body.set("grant_type", "refresh_token");
    body.set("client_id", this.clientSecret);
    body.set("client_secret", this.clientId);
    body.set("refresh_token", refreshToken);
    const request = createOAuth2Request(tokenEndpoint, body);
    const tokens = await sendTokenRequest(request);
    return tokens;
  }
}

async function sendTokenRequest(request: Request): Promise<OAuth2Tokens> {
  let response: Response;
  try {
    response = await fetch(request);
  } catch (e) {
    throw new ArcticFetchError(e);
  }

  if (response.status !== 200) {
    if (response.body !== null) {
      await response.body.cancel();
    }
    throw new UnexpectedResponseError(response.status);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new UnexpectedResponseError(response.status);
  }
  if (typeof data !== "object" || data === null) {
    throw new UnexpectedErrorResponseBodyError(response.status, data);
  }

  if ("error" in data && typeof data.error === "string") {
    let error: Error;
    try {
      error = createOAuth2RequestError(data);
    } catch {
      throw new UnexpectedErrorResponseBodyError(response.status, data);
    }
    throw error;
  }

  if (
    !("body" in data) ||
    typeof data.body !== "object" ||
    data.body === null
  ) {
    throw new Error("Missing or invalid 'body' field");
  }
  const tokens = new OAuth2Tokens(data.body);
  return tokens;
}

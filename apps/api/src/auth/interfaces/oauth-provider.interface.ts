import { OAuthProviderName } from '../constants/oauth.constants';
import { OAuthUser } from './oauth-user.interface';

export interface OAuthToken {
  accessToken: string;

  refreshToken?: string;

  expiresIn: number;

  refreshExpiresIn?: number;

  scope?: string;

  tokenType?: string;

  providerUserId?: string;
}

export interface OAuthProvider {
  readonly name: OAuthProviderName;

  getAuthorizationUrl(state: string): string;

  exchangeCodeForToken(code: string): Promise<OAuthToken>;

  getUser(accessToken: string): Promise<OAuthUser>;

  refreshToken?(refreshToken: string): Promise<OAuthToken>;

  revokeToken?(accessToken: string): Promise<void>;
}

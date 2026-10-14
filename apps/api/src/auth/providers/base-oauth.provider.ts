import { OAuthProviderName } from '../constants/oauth.constants';
import {
  OAuthProvider,
  OAuthToken,
} from '../interfaces/oauth-provider.interface';
import { OAuthUser } from '../interfaces/oauth-user.interface';

export abstract class BaseOAuthProvider implements OAuthProvider {
  abstract readonly name: OAuthProviderName;

  abstract getAuthorizationUrl(state: string): string;

  abstract exchangeCodeForToken(code: string): Promise<OAuthToken>;

  abstract getUser(accessToken: string): Promise<OAuthUser>;

  refreshToken?(refreshToken: string): Promise<OAuthToken>;

  revokeToken?(accessToken: string): Promise<void>;
}

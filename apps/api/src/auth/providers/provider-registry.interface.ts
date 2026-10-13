import { OAuthProviderName } from '../constants/oauth.constants';

import { OAuthProvider } from '../interfaces/oauth-provider.interface';
// import { BaseOAuthProvider } from './base-oauth.provider';

export type OAuthProviderRegistry = Map<OAuthProviderName, OAuthProvider>;

// export class TikTokProvider extends BaseOAuthProvider {}

import { Injectable } from '@nestjs/common';

import { OAuthProviderName } from '../constants/oauth.constants';

import { OAuthToken } from '../interfaces/oauth-provider.interface';

import { OAuthUser } from '../interfaces/oauth-user.interface';

import { BaseOAuthProvider } from './base-oauth.provider';

@Injectable()
export class TikTokProvider extends BaseOAuthProvider {
  readonly name: OAuthProviderName = 'tiktok';

  getAuthorizationUrl(state: string): string {
    throw new Error('Not implemented.');
  }

  exchangeCodeForToken(code: string): Promise<OAuthToken> {
    throw new Error('Not implemented.');
  }

  getUser(accessToken: string): Promise<OAuthUser> {
    throw new Error('Not implemented.');
  }
}

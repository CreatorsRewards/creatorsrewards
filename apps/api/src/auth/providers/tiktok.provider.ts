// auth/providers/tiktok.provider.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuthProviderName } from '../constants/oauth.constants';
import { OAuthToken } from '../interfaces/oauth-provider.interface';
import { OAuthUser } from '../interfaces/oauth-user.interface';
import { BaseOAuthProvider } from './base-oauth.provider';
import {
  TikTokTokenResponse,
  TikTokUserResponse,
} from '../interfaces/tiktok.interface';

@Injectable()
export class TikTokProvider extends BaseOAuthProvider {
  readonly name: OAuthProviderName = 'tiktok';

  // Depending on how BaseOAuthProvider is set up, you may need to call super()
  // or use whatever dependency injection pattern you established there.
  constructor(private readonly config: ConfigService) {
    super();
  }

  // 1. Generate the URL to redirect the user to TikTok's consent screen
  getAuthorizationUrl(state: string): string {
    const clientKey = this.config.getOrThrow<string>('TIKTOK_CLIENT_KEY');
    const redirectUri = this.config.getOrThrow<string>(
      'TIKTOK_CLIENT_CALLBACK_URL',
    );

    // Scopes required by your app
    const scope = 'user.info.basic';

    // TikTok diverges from standard OAuth2 by requiring 'client_key' instead of 'client_id'
    return `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
  }

  // 2. Exchange the code TikTok sends back for an Access Token
  async exchangeCodeForToken(code: string): Promise<OAuthToken> {
    const clientKey = this.config.getOrThrow<string>('TIKTOK_CLIENT_KEY');
    const clientSecret = this.config.getOrThrow<string>('TIKTOK_CLIENT_SECRET');
    const redirectUri = this.config.getOrThrow<string>(
      'TIKTOK_CLIENT_CALLBACK_URL',
    );

    const response = await fetch(
      'https://open.tiktokapis.com/v2/oauth/token/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_key: clientKey, // Again, client_key instead of client_id
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        }),
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to exchange TikTok authorization code',
      );
    }

    const data = (await response.json()) as TikTokTokenResponse;

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in ?? 86400, // TikTok usually returns expires_in, fallback to 1 day
    };
  }

  // 3. Use the Access Token to fetch the user's profile details
  async getUser(accessToken: string): Promise<OAuthUser> {
    // Append the specific fields you need to the query parameters
    const url =
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name';

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to fetch user profile from TikTok',
      );
    }

    const responseData = (await response.json()) as TikTokUserResponse;
    const user = responseData.data.user;

    // Map this to match your unified OAuthUser interface
    return {
      provider: 'tiktok',
      providerId: user.open_id,
      displayName: user.display_name,
      avatar: user.avatar_url,
      // accessToken,
    };
  }
}

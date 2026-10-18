// auth/providers/instagram.provider.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuthToken } from '../interfaces/oauth-provider.interface';
import { OAuthUser } from '../interfaces/oauth-user.interface';
import { BaseOAuthProvider } from './base-oauth.provider';
import {
  InstagramTokenResponse,
  InstagramUserResponse,
} from '../interfaces/instagram.interface';

@Injectable()
export class InstagramProvider extends BaseOAuthProvider {
  readonly name = 'instagram';

  constructor(private readonly config: ConfigService) {
    super();
  }

  getAuthorizationUrl(state: string): string {
    const clientId = this.config.getOrThrow<string>('INSTAGRAM_CLIENT_ID');
    const redirectUri = this.config.getOrThrow<string>(
      'INSTAGRAM_CLIENT_CALLBACK_URL',
    );

    // Required for Graph API access (Business or Creator accounts only)
    const scope = 'instagram_business_basic';

    return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  }

  async exchangeCodeForToken(code: string): Promise<OAuthToken> {
    const clientId = this.config.getOrThrow<string>('INSTAGRAM_CLIENT_ID');
    const clientSecret = this.config.getOrThrow<string>(
      'INSTAGRAM_CLIENT_SECRET',
    );
    const redirectUri = this.config.getOrThrow<string>(
      'INSTAGRAM_CLIENT_CALLBACK_URL',
    );

    const response = await fetch(
      'https://api.instagram.com/oauth/access_token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code,
        }),
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to exchange Instagram authorization code',
      );
    }

    const data = (await response.json()) as InstagramTokenResponse;

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in ?? 3600, // Short-lived tokens are valid for 1 hour
    };
  }

  async getUser(accessToken: string): Promise<OAuthUser> {
    // For the Graph API, we fetch directly from graph.instagram.com
    // Passing the access token as a query parameter is standard for Meta Graph endpoints
    const url = `https://graph.instagram.com/me?fields=id,username,account_type,profile_picture_url&access_token=${accessToken}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to fetch user profile from Instagram',
      );
    }

    const user = (await response.json()) as InstagramUserResponse;

    return {
      provider: 'instagram',
      providerId: user.id,
      displayName: user.username,
      avatar: user.profile_picture_url,
    };
  }
}

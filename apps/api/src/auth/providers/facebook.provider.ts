// auth/providers/facebook.provider.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuthToken } from '../interfaces/oauth-provider.interface';
import { OAuthUser } from '../interfaces/oauth-user.interface';
import { BaseOAuthProvider } from './base-oauth.provider';
import {
  FacebookTokenResponse,
  FacebookUserResponse,
} from '../interfaces/facebook.interface';

@Injectable()
export class FacebookProvider extends BaseOAuthProvider {
  readonly name = 'facebook';

  constructor(private readonly config: ConfigService) {
    super();
  }

  getAuthorizationUrl(state: string): string {
    const clientId = this.config.getOrThrow<string>('FACEBOOK_CLIENT_ID');
    const redirectUri = this.config.getOrThrow<string>(
      'FACEBOOK_CLIENT_CALLBACK_URL',
    );

    const scope = 'email,public_profile';
    // Using v20.0 (or current Graph API version)
    return `https://www.facebook.com/v20.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&response_type=code`;
  }

  async exchangeCodeForToken(code: string): Promise<OAuthToken> {
    const clientId = this.config.getOrThrow<string>('FACEBOOK_CLIENT_ID');
    const clientSecret = this.config.getOrThrow<string>(
      'FACEBOOK_CLIENT_SECRET',
    );
    const redirectUri = this.config.getOrThrow<string>(
      'FACEBOOK_CLIENT_CALLBACK_URL',
    );

    const url = new URL('https://graph.facebook.com/v20.0/oauth/access_token');
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('client_secret', clientSecret);
    url.searchParams.append('redirect_uri', redirectUri);
    url.searchParams.append('code', code);

    const response = await fetch(url.toString(), {
      method: 'GET', // Facebook token endpoint accepts GET with query params
    });

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to exchange Facebook authorization code',
      );
    }

    const data = (await response.json()) as FacebookTokenResponse;

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in ?? 5184000, // Typically 60 days
    };
  }

  async getUser(accessToken: string): Promise<OAuthUser> {
    const url =
      'https://graph.facebook.com/me?fields=id,name,email,picture.type(large)';

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to fetch user profile from Facebook',
      );
    }

    const user = (await response.json()) as FacebookUserResponse;

    return {
      provider: 'facebook',
      providerId: user.id,
      displayName: user.name,
      email: user.email,
      avatar: user.picture?.data?.url,
    };
  }
}

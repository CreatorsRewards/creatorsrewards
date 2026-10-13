// auth/providers/x.provider.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OAuthProvider,
  OAuthToken,
} from '../interfaces/oauth-provider.interface';
import { XTokenResponse, XUserResponse } from '../interfaces/x.interface';

@Injectable()
export class XProvider implements OAuthProvider {
  readonly name = 'x';

  // Hardcoded PKCE for boilerplate.
  // TODO: Generate a unique random string per user, save to session/cookie, and verify dynamically.
  private readonly pkceVerifier =
    'my-secure-pkce-verifier-string-needs-to-be-dynamic';

  constructor(private config: ConfigService) {}

  // 1. Generate the URL to redirect the user to X's consent screen
  getAuthorizationUrl(state: string): string {
    const clientId = this.config.getOrThrow<string>('X_CLIENT_ID');
    const redirectUri = this.config.getOrThrow<string>('X_CLIENT_CALLBACK_URL');

    // Required scopes for basic user info
    const scope = encodeURIComponent('users.read tweet.read offline.access');

    return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=${this.pkceVerifier}&code_challenge_method=plain`;
  }

  // 2. Exchange the code for an Access Token
  async exchangeCodeForToken(code: string): Promise<OAuthToken> {
    const clientId = this.config.getOrThrow<string>('X_CLIENT_ID');
    const clientSecret = this.config.getOrThrow<string>('X_CLIENT_SECRET');
    const redirectUri = this.config.getOrThrow<string>('X_CLIENT_CALLBACK_URL');

    // X API v2 requires basic auth header using Client ID and Secret
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const response = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code_verifier: this.pkceVerifier, // Must match the challenge sent in getAuthorizationUrl
      }),
    });

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to exchange X (Twitter) authorization code',
      );
    }

    const data = (await response.json()) as XTokenResponse;

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in ?? 7200,
    };
  }

  // 3. Use the Access Token to fetch the user's X profile details
  async getUser(accessToken: string): Promise<any> {
    const url =
      'https://api.twitter.com/2/users/me?user.fields=profile_image_url';

    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new UnauthorizedException('Failed to fetch user profile from X');
    }

    const responseData = (await response.json()) as XUserResponse;
    const user = responseData.data;

    return {
      provider: 'x',
      providerId: user.id,
      displayName: user.name,
      handle: user.username,
      avatar: user.profile_image_url?.replace('_normal', ''), // Remove '_normal' to get higher resolution image
      accessToken,
    };
  }
}

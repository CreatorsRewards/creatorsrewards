// auth/providers/google.provider.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OAuthProvider,
  OAuthToken,
} from '../interfaces/oauth-provider.interface';
import {
  GoogleProfileResponse,
  GoogleTokenResponse,
} from '../interfaces/google.interface';

@Injectable()
export class GoogleProvider implements OAuthProvider {
  readonly name = 'google';

  constructor(private config: ConfigService) {}

  // 1. Generate the URL to redirect the user to Google's consent screen
  getAuthorizationUrl(state: string): string {
    const clientId = this.config.getOrThrow<string>('GOOGLE_CLIENT_ID');
    const redirectUri = this.config.getOrThrow<string>(
      'GOOGLE_CLIENT_CALLBACK_URL',
    );

    // We request the exact same scopes you had in your Passport config
    const scope = encodeURIComponent('email profile');

    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
  }

  // 2. Exchange the code Google sends back for an Access Token
  async exchangeCodeForToken(code: string): Promise<OAuthToken> {
    const clientId = this.config.getOrThrow<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.config.getOrThrow<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.config.getOrThrow<string>(
      'GOOGLE_CLIENT_CALLBACK_URL',
    );

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code,
      }),
    });

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to exchange Google authorization code',
      );
    }

    const data = (await response.json()) as GoogleTokenResponse;
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in ?? 3600,
    };
  }

  // 3. Use the Access Token to fetch the user's profile details
  async getUser(accessToken: string): Promise<any> {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to fetch user profile from Google',
      );
    }

    const profile = (await response.json()) as GoogleProfileResponse;

    // Notice this matches the exact return object from your old `validate()` method
    return {
      provider: 'google',
      email: profile.email,
      firstName: profile.given_name,
      lastName: profile.family_name,
      picture: profile.picture,
      accessToken, // Passing this along just in case your AuthService needs it
    };
  }
}

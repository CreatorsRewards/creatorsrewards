// auth/providers/youtube.provider.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OAuthProvider,
  OAuthToken,
} from '../interfaces/oauth-provider.interface';
import {
  YouTubeChannelResponse,
  YouTubeTokenResponse,
} from '../interfaces/google.interface';

@Injectable()
export class YouTubeProvider implements OAuthProvider {
  readonly name = 'youtube';

  constructor(private config: ConfigService) {}

  // 1. Generate the URL to redirect the user to Google's consent screen for YouTube
  getAuthorizationUrl(state: string): string {
    const clientId = this.config.getOrThrow<string>('YOUTUBE_CLIENT_ID');
    const redirectUri = this.config.getOrThrow<string>(
      'YOUTUBE_CLIENT_CALLBACK_URL',
    );

    // Requesting read-only access to the user's YouTube account
    const scope = encodeURIComponent(
      'https://www.googleapis.com/auth/youtube.readonly',
    );

    // YouTube uses standard Google OAuth 2.0 endpoints
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}&access_type=offline&prompt=consent`;
  }

  // 2. Exchange the code for an Access Token
  async exchangeCodeForToken(code: string): Promise<OAuthToken> {
    const clientId = this.config.getOrThrow<string>('YOUTUBE_CLIENT_ID');
    const clientSecret = this.config.getOrThrow<string>(
      'YOUTUBE_CLIENT_SECRET',
    );
    const redirectUri = this.config.getOrThrow<string>(
      'YOUTUBE_CLIENT_CALLBACK_URL',
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
        'Failed to exchange YouTube authorization code',
      );
    }

    const data = (await response.json()) as YouTubeTokenResponse;
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in ?? 3600,
    };
  }

  // 3. Use the Access Token to fetch the user's YouTube Channel details
  async getUser(accessToken: string): Promise<any> {
    // Fetch the user's own channel details using the YouTube Data API v3
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException(
        'Failed to fetch user channel from YouTube',
      );
    }

    const data = (await response.json()) as YouTubeChannelResponse;

    // Check if the user actually has a YouTube channel created
    if (!data.items || data.items.length === 0) {
      throw new UnauthorizedException('No YouTube channel found for this user');
    }

    const channel = data.items[0];

    return {
      provider: 'youtube',
      providerId: channel.id,
      displayName: channel.snippet.title,
      handle: channel.snippet.customUrl,
      avatar:
        channel.snippet.thumbnails?.high?.url ||
        channel.snippet.thumbnails?.default?.url,
      accessToken,
    };
  }
}

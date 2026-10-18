import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { EnvironmentVariables } from '../interfaces/environment.interface';
import { TikTokUser, TikTokUserResponse } from '../interfaces/tiktok.interface';

@Injectable()
export class TiktokStrategy extends PassportStrategy(Strategy, 'tiktok') {
  private readonly logger = new Logger(TiktokStrategy.name);

  private async fetchUser(accessToken: string): Promise<TikTokUser> {
    const { data } = await axios.get<TikTokUserResponse>(
      'https://open.tiktokapis.com/v2/user/info/',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fields: 'open_id,union_id,avatar_url,display_name',
        },
      },
    );

    return data.data.user;
  }

  constructor(private readonly config: ConfigService<EnvironmentVariables>) {
    super({
      // TikTok API v2 Endpoints
      authorizationURL: 'https://www.tiktok.com/v2/auth/authorize/',
      tokenURL: 'https://open.tiktokapis.com/v2/oauth/token/',
      // We pass it to clientID here so passport doesn't complain,
      // but we will override the actual params sent in the methods below.
      clientID: config.getOrThrow('TIKTOK_CLIENT_KEY'),
      clientSecret: config.getOrThrow('TIKTOK_CLIENT_SECRET'),
      callbackURL: config.getOrThrow('TIKTOK_CLIENT_CALLBACK_URL'),
      scope: ['user.info.basic'],
    });
  }

  // TikTok diverges from standard OAuth2 by requiring 'client_key' instead of 'client_id'
  // in the authorization URL query parameters.
  authorizationParams(): { [key: string]: string } {
    return {
      client_key: this.config.getOrThrow<string>('TIKTOK_CLIENT_KEY'),
    };
  }

  // We also inject 'client_key' into the token exchange payload.
  tokenParams(): { [key: string]: string } {
    return {
      client_key: this.config.getOrThrow<string>('TIKTOK_CLIENT_KEY'),
    };
  }

  // passport-oauth2 is generic, so we have to manually tell it how to fetch the TikTok profile
  override userProfile(
    accessToken: string,
    done: (err: Error | null, profile?: TikTokUser) => void,
  ): void {
    this.fetchUser(accessToken)
      .then((user) => done(null, user))
      .catch((error: unknown) => {
        done(error instanceof Error ? error : new Error(String(error)));
      });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      provider: 'tiktok',
      providerId: profile.open_id,
      displayName: profile.display_name,
      picture: profile.avatar_url,
      accessToken,
      refreshToken,
    };
  }
}

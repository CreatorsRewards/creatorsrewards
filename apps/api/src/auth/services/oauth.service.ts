// auth/services/oauth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { OAuthProvider } from '../interfaces/oauth-provider.interface';
import { AuthService } from './auth.service';
import { GoogleProvider } from '../providers/google.provider';
import { TikTokProvider } from '../providers/tiktok.provider';
import { FacebookProvider } from '../providers/facebook.provider';
import { InstagramProvider } from '../providers/instagram.provider';
import { YouTubeProvider } from '../providers/youtube.provider';
import { XProvider } from '../providers/x.provider';

@Injectable()
export class OAuthService {
  private providers = new Map<string, OAuthProvider>();

  constructor(
    private readonly authService: AuthService,
    private readonly googleProvider: GoogleProvider,
    private readonly tiktokProvider: TikTokProvider,
    private readonly facebookProvider: FacebookProvider,
    private readonly instagramProvider: InstagramProvider,
    private readonly youtubeProvider: YouTubeProvider,
    private readonly xProvider: XProvider,
  ) {
    // Register your providers
    this.providers.set('google', this.googleProvider);
    this.providers.set('tiktok', this.tiktokProvider);
    this.providers.set('facebook', this.facebookProvider);
    this.providers.set('instagram', this.instagramProvider);
    this.providers.set('youtube', this.youtubeProvider);
    this.providers.set('x', this.xProvider);
  }

  private getProvider(name: string): OAuthProvider {
    const provider = this.providers.get(name.toLowerCase());
    if (!provider) {
      throw new BadRequestException(`Unsupported OAuth provider: ${name}`);
    }
    return provider;
  }

  getAuthorizationUrl(providerName: string, state: string): string {
    const provider = this.getProvider(providerName);
    return provider.getAuthorizationUrl(state);
  }

  async handleCallback(
    providerName: string,
    code: string,
  ): Promise<{ accessToken: string }> {
    const provider = this.getProvider(providerName);

    // 1. Get the token object
    const tokens = await provider.exchangeCodeForToken(code);

    // 2. Fetch the user profile using the access token from the object
    const profile = await provider.getUser(tokens.accessToken);

    // 3. Delegate to your AuthService and cast the result
    const jwtContent = await this.authService.loginOAuthUser(profile);

    return jwtContent as { accessToken: string };
  }
}

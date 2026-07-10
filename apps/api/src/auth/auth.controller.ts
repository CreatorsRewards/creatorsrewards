import {
  Controller,
  Get,
  Param,
  Query,
  // Request,
  Res,
  // UseGuards,
} from '@nestjs/common';

import type { Response } from 'express';

// import { GoogleAuthGuard } from './guards/google-auth.guard';
// import { AuthService } from './services/auth.service';
import { OAuthService } from './services/oauth.service';

interface JwtAuthResponse {
  accessToken: string;
}

@Controller('auth')
export class AuthController {
  // constructor(private readonly authService: AuthService) {}
  constructor(private readonly oauthService: OAuthService) {}

  @Get(':provider')
  login(@Param('provider') provider: string, @Res() res: Response) {
    // Generate a random state string here for CSRF protection if needed
    const state = 'random-state-string';
    const url = this.oauthService.getAuthorizationUrl(provider, state);

    // Redirect the user to Google/TikTok/Discord
    res.redirect(url);
  }

  @Get(':provider/callback')
  async callback(
    @Param('provider') provider: string,
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    // Orchestrate the token exchange and user creation
    const jwtContent = (await this.oauthService.handleCallback(
      provider,
      code,
    )) as JwtAuthResponse;

    // Redirect back to your frontend with YOUR token
    const frontendRedirectUrl = `http://localhost:5173/auth/callback?token=${jwtContent.accessToken}`;
    res.redirect(frontendRedirectUrl);
  }
}

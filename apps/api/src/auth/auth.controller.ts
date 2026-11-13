import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  // Request,
  Res,
  UnauthorizedException,
  // UseGuards,
} from '@nestjs/common';

import type { Response } from 'express';

// import { GoogleAuthGuard } from './guards/google-auth.guard';
// import { AuthService } from './services/auth.service';
import { OAuthService } from './services/oauth.service';
import { JwtAuthResponse } from './interfaces/oauth-user.interface';
import { LoginDto, RegisterDto } from './dto/local-auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService,
  ) {}

  // Helper method to keep cookie configuration DRY
  private setTokenCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  // --- LOCAL AUTH ROUTES ---

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<JwtAuthResponse> {
    // 1. Service handles database + generates token string
    const { accessToken } = await this.authService.register(dto);

    if (!accessToken) {
      throw new UnauthorizedException('Authentication failed');
    }

    // 2. Controller handles setting the cookie
    this.setTokenCookie(res, accessToken);

    return { message: 'Registered successfully' };
  }

  @Post('signin')
  async signIn(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<JwtAuthResponse> {
    // 1. Service validates credentials + generates token string
    const { accessToken } = await this.authService.login(dto);
    //Check if it exists first

    if (!accessToken) {
      throw new UnauthorizedException('Authentication failed');
    }

    // 2. Controller handles setting the cookie
    this.setTokenCookie(res, accessToken);

    return { message: 'Signed in successfully' };
  }

  // --- OAUTH ROUTES ---
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
    @Res({ passthrough: true }) res: Response,
  ) {
    // authService.loginOAuthUser logic here, set the cookie on `res`,
    // and then redirect the user to your frontend dashboard without passing the token in the URL query string!
    const jwtContent = (await this.oauthService.handleCallback(
      provider,
      code,
    )) as { accessToken: string };

    //Check if it exists first
    if (!jwtContent || !jwtContent.accessToken) {
      throw new UnauthorizedException('Authentication failed');
    }

    // Setting it as a cookie during OAuth callback is much more secure than passing it via URL query params:
    this.setTokenCookie(res, jwtContent.accessToken);

    const frontendRedirectUrl = `${process.env.FRONTEND_URL}/dashboard`; // No token leak in URL query!
    res.redirect(frontendRedirectUrl);
  }
}

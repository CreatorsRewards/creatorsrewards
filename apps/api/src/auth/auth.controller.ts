import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {} // Passport automatically redirects the browser to Google's consent screen

  @Get('google/google-redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}

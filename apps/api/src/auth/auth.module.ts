import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma.module';
import { OAuthService } from './services/oauth.service';
import { GoogleProvider } from './providers/google.provider';
import { FacebookProvider } from './providers/facebook.provider';
import { TikTokProvider } from './providers/tiktok.provider';
import { XProvider } from './providers/x.provider';
import { InstagramProvider } from './providers/instagram.provider';
import { YouTubeProvider } from './providers/youtube.provider';

@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleAuthGuard,
    OAuthService,
    GoogleProvider,
    FacebookProvider,
    TikTokProvider,
    XProvider,
    InstagramProvider,
    YouTubeProvider,
  ],
  exports: [OAuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma.module';
import { OAuthService } from './services/oauth.service';
import { GoogleProvider } from './providers/google.provider';

@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleAuthGuard,
    OAuthService,
    GoogleProvider,
  ],
  exports: [OAuthService],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  // so google can return refresh token, we need to set accessType to offline
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
}

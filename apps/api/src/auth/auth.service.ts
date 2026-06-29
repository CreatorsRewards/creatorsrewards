import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async googleLogin(user: any) {
    // TODO:
    // Find user in DB
    // Create if missing

    const token = await this.jwt.signAsync({
      email: user.email,
    });

    return {
      success: true,
      accessToken: token,
      user,
    };
  }
}

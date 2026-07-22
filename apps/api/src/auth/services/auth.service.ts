import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthResponse, OAuthUser } from '../interfaces/oauth-user.interface';
import { User } from '../../generated/prisma/client';
import { LoginDto, RegisterDto } from '../dto/local-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService, // Inject Prisma here
  ) {}

  async loginOAuthUser(profile: OAuthUser): Promise<{ accessToken: string }> {
    try {
      // 1. Try to find the user by their unique provider ID
      let user: User | null = await this.prisma.user.findFirst({
        where: {
          authProvider: profile.provider,
          authProviderId: profile.providerId,
        },
      });

      // 2. Fallback: If they don't exist by ID, check if they exist by email
      // (e.g., they signed up with email, but are now logging in with Google)
      if (!user && profile.email) {
        user = await this.prisma.user.findUnique({
          where: { email: profile.email },
        });

        // If found by email, link their OAuth account to this existing user
        if (user) {
          user = await this.prisma.user.update({
            where: { id: user.id },
            data: {
              authProvider: profile.provider,
              authProviderId: profile.providerId,
            },
          });
        }
      }

      // 3. If they STILL don't exist, create a brand new user
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            authProvider: profile.provider,
            authProviderId: profile.providerId,
            email: profile.email || null, // TikTok might be null
            fullName:
              `${profile.displayName || ''} ${profile.username || ''}`.trim() ||
              'New Creator',
            role: 'UGC_CREATOR',
            // passwordHash is left undefined because they used OAuth
          },
        });
      }

      // 4. Generate the JWT using your internal User ID
      const payload = { sub: user.id, email: user.email, role: user.role };
      const token = await this.jwt.signAsync(payload);

      return {
        accessToken: token,
      };
    } catch (error) {
      console.error('Database error during OAuth login:', error);
      throw new InternalServerErrorException('Failed to process user login');
    }
  }

  async register(dto: RegisterDto): Promise<JwtAuthResponse> {
    // 1. Check if the user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    // 2. Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // 3. Create the user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        fullName: dto.fullName,
        authProvider: 'local', // Default based on your Prisma schema
      },
    });

    // 4. Return JWT
    return this.generateToken(user);
  }

  async login(dto: LoginDto): Promise<JwtAuthResponse> {
    // 1. Find the user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // 2. Verify user exists and has a password (prevents OAuth-only users from logging in with a blank password)
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // 3. Verify the password
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // 4. Return JWT
    return this.generateToken(user);
  }

  private generateToken(user: any): JwtAuthResponse {
    // Ensure this payload matches what your OAuthService generates!
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}

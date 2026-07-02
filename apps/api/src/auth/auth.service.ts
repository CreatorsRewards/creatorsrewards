import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// Define the expected shape of the user data coming from Google OAuth
export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  accessToken?: string;
}

// Create a custom Request interface that includes your GoogleUser
export interface RequestWithUser extends Request {
  user?: GoogleUser;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}
  googleLogin(req: RequestWithUser) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}

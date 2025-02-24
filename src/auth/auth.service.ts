import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getUser(userId: string) {
    try {
    } catch (error) {
      console.log('getUser error:', error);
    }
  }

  async login(email: string, password: string, response: any) {
    try {
    } catch (error) {
      console.log('login error:', error);
    }
  }

  async register(email: string, password: string, response: any) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      return {
        email,
        password: hashedPassword,
      };
    } catch (error) {
      console.log('register error:', error);
    }
  }

  async changeUserPassword(
    email: string,
    oldPassword: string,
    newPassword: string,
    response: any,
  ) {
    try {
    } catch (error) {
      console.log('changeUserPassword error:', error);
    }
  }

  async resetUserPassword(body: any, response) {
    try {
    } catch (error) {
      console.log('resetUserPassword error:', error);
    }
  }
}

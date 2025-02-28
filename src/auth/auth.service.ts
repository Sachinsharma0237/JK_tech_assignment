import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return { status: 404, message: 'Invalid email or password' };
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return { status: 404, message: 'Invalid email or password' };
      }

      const token = this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      await this.userRepository.update(
        { email: email },
        { accessToken: token },
      );

      return {
        status: 200,
        accessToken: token,
        message: 'Logged In!',
      };
    } catch (error) {
      console.error('Login error:', error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async register(email: string, password: string, role: string) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        return { status: 400, message: 'User already exists' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        email,
        password: hashedPassword,
        role,
      });
      await this.userRepository.save(newUser);

      return { status: 201, message: 'User registered successfully' };
    } catch (error) {
      console.error('Register error:', error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async changeUserPassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        return { status: 404, message: 'User not found' };
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return { status: 400, message: 'Incorrect old password' };
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);

      return { status: 200, message: 'Password changed successfully' };
    } catch (error) {
      console.error('Change password error:', error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}

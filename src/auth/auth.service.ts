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
    private usersService: UsersService
  ) {}

  async login(email: string, password: string, response: any) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        response.status(404).send({
          message: 'Invalid email or password',
        });
        return;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        response.status(404).send({
          message: 'Invalid email or password',
        });
        return;
      }

      const token = this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      response.status(200).send({
        accessToken: token,
        message: 'logged In!',
      });
      return;
    } catch (error) {
      console.log('login error:', error);
    }
  }

  async register(email: string, password: string, response: any) {
    try {
      const isUserExist = await this.userRepository.findOne({
        where: { email },
      });

      if (isUserExist) {
        response.status(200).send({
          message: 'user already exists!',
        });
        return;
      }

      const hashedPassword = await this.hashPassword(password);
      const user = this.userRepository.create({
        email,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      return {
        email,
        password: hashedPassword,
        message: 'user created sucessfully',
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
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        response.status(404).send({
          message: 'User not found!',
        });
        return;
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        response.status(401).send({
          message: 'old password is not correct!',
        });
        return;
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);
      return { message: 'Password changed successfully' };
    } catch (error) {
      console.log('changeUserPassword error:', error);
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

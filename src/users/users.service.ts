import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    try {
      const users = await this.userRepository.find();
      return { status: 200, users };
    } catch (error) {
      console.error('Get All Users Error:', error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return { status: 404, message: 'User not found' };
      }
      return { status: 200, user };
    } catch (error) {
      console.error('Get User By ID Error:', error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async updateUser(id: number, updateData: Partial<User>) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return { status: 404, message: 'User not found' };
      }

      await this.userRepository.update(id, updateData);
      return { status: 200, message: 'User updated successfully' };
    } catch (error) {
      console.error('Update User Error:', error);
      return { status: 500, message: 'Internal server error' };
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return { status: 404, message: 'User not found' };
      }

      await this.userRepository.delete(id);
      return { status: 200, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Delete User Error:', error);
      return { status: 500, message: 'Internal server error' };
    }
  }
}

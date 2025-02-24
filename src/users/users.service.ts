import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(response: any) {
    try {
      const users = await this.userRepository.find();
      response.status(200).send({
        users,
        message: 'user list',
      });
      return;
    } catch (error) {
      console.log('getAllUsers error:', error);
    }
  }

  async updateUserRole(userId: number, newRole: UserRole, response: any) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        response.status(404).send({
          message: 'User not found!',
        });
        return;
      }

      user.role = newRole;
      return this.userRepository.save(user);
    } catch (error) {
      console.log('updateUserRole error:', error);
    }
  }

  async deleteUser(userId: number, response: any) {
    try {
      const result = await this.userRepository.delete(userId);
      if (result.affected === 0) {
        response.status(404).send({
          message: 'User not found!',
        });
        return;
      }

      return { message: 'User deleted successfully' };
    } catch (error) {
      console.log('deleteUser error:', error);
    }
  }
}
